import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { buyCourse } from "services/enrolled-course.service";

import { useAppSelector, useBuyCourse, useUser } from "@lib/hooks.lib";
import { StripeCardElement } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntentAndCharge } from "services/payments.service";

export default function DynamicHeader(): JSX.Element {
  var { info, course } = useBuyCourse();
  var show = useAppSelector((state) => state.buyCourse.showDynamicHeader);
  var variants = {
    hidden: { visibility: "hidden", y: -20 },
    visible: { visibility: "visible", y: 0 },
  } as Variants;
  var [loading, setLoading] = useState(false);
  var { accessToken, user } = useUser();
  var router = useRouter();
  var [paymentLoading, setPaymentLoading] = useState(false);

  var stripe = useStripe();
  var elements = useElements();

  // response from the back-end from the payment intent
  var [paymentIntent, setPaymentIntent] = useState<any>();

  function CoverImage(): JSX.Element {
    return (
      <div className="w-[240px] h-[120px] relative">
        <Image
          src={
            info?.coverImageURL ??
            "https://media.giphy.com/media/cS83sLRzgVOeY/giphy.gif"
          }
          alt="Course cover image"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
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
    <motion.div
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      className="fixed z-20 top-0 py-2 w-full max-w-[800px] flex flex-col gap-4 items-center bg-background1 border-b border-solid border-b-border"
    >
      <div className="w-full flex gap-4 items-center">
        <CoverImage />

        <h2 className="flex-grow font-gilroy text-[25px] font-extrabold text-text1">
          {info?.title}
        </h2>

        <button
          onClick={createPaymentIntent}
          disabled={loading}
          hidden={paymentIntent}
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
        >
          {loading ? "Loading..." : ` Enroll for ₹${info?.price}`}
        </button>
      </div>

      <div className="w-full">
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
      </div>
    </motion.div>
  );
}
