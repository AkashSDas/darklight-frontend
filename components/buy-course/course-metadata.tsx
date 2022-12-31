import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { useAppDispatch, useBuyCourse, useUser } from "@lib/hooks.lib";
import { setShowDynamicHeader } from "@store/buy-course/slice";

import { buyCourse } from "../../services/enrolled-course.service";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { createPaymentIntentAndCharge } from "services/payments.service";

dayjs.extend(relativeTime);

export default function CourseMetadata(): JSX.Element {
  var ref = useRef(null);
  var isInView = useInView(ref);
  var dispatch = useAppDispatch();
  var { info, course } = useBuyCourse();
  var [loading, setLoading] = useState(false);
  var [paymentLoading, setPaymentLoading] = useState(false);
  var { accessToken, user } = useUser();
  var router = useRouter();

  var stripe = useStripe();
  var elements = useElements();

  // response from the back-end from the payment intent
  var [paymentIntent, setPaymentIntent] = useState<any>();

  // update based on whether the element is in view
  useEffect(
    function updateDynamicHeader() {
      dispatch(setShowDynamicHeader(!isInView));
    },
    [isInView, dispatch]
  );

  function Badge({ children }: { children: string }): JSX.Element {
    return (
      <span className="px-[3px] py-[1px] flex justify-center items-center bg-background2 rounded-sm">
        {children}
      </span>
    );
  }

  async function handleEnroll() {
    var response = await buyCourse(course._id, accessToken);

    if (response.success) {
      toast.success("Enrolled successfully");
      router.push(`/course/${response.enrolledCourse.course}/learn`);
    } else toast.error("Something went wrong");
  }

  async function createPaymentIntent() {
    if (!stripe || !elements || !course) return;
    if (!user) {
      toast.error("Please login to enroll");
      return;
    }

    var amountToCharge = Math.min(Math.max(course.price, 50), 99999999);

    setLoading(true);

    var response = await createPaymentIntentAndCharge(
      amountToCharge,
      accessToken
    );

    if (!response.success) {
      toast.error("Something went wrong");
      setLoading(false);
      return;
    }

    var pi = response.paymentIntent;
    setPaymentIntent(pi);
    setLoading(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements || !paymentIntent) return;

    setPaymentLoading(true);

    var response = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: { name: user?.username, email: user?.email },
        },
      }
    );

    setPaymentLoading(false);

    if (response.error) {
      toast.error(response.error.message ?? "Something went wrong");
      return;
    }

    if (response.paymentIntent?.status == "succeeded") {
      await handleEnroll();
    } else toast.error("Something went wrong");
  }

  return (
    <>
      {/* Heading */}
      <h1 className="font-gilroy text-[40px] font-extrabold text-text1">
        {info?.title}
      </h1>

      {/* Basic info */}
      <div ref={ref} className="flex gap-1 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Badge>{dayjs(new Date(info?.lastEditedOn)).fromNow()}</Badge>
          <Badge>Course duration is 12h</Badge>
          <Badge>
            {info?.difficulty[0].toUpperCase() +
              info?.difficulty.slice(1) +
              " level"}
          </Badge>
          <Badge>{"⭐".repeat(Math.abs(info?.rating ?? 1))}</Badge>
          <Badge>{info?.enrolled + " enrolled"}</Badge>
        </div>

        <button
          onClick={createPaymentIntent}
          disabled={loading}
          hidden={paymentIntent}
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
        >
          {loading ? "Loading..." : ` Enroll for ₹${info?.price}`}
        </button>
      </div>

      {paymentIntent && (
        <form
          className="flex gap-4 items-center w-full"
          hidden={!paymentIntent}
          onSubmit={handleSubmit}
        >
          <CardElement
            options={{ hidePostalCode: true }}
            className="w-full font-urbanist font-medium"
          />

          <button
            className="px-16 text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
            type="submit"
            disabled={!stripe || !elements || paymentLoading}
          >
            {paymentLoading ? "Loading..." : "Pay"}{" "}
          </button>
        </form>
      )}
    </>
  );
}
