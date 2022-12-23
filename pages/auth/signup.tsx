import Link from "next/link";
import { ReactElement } from "react";
import { cancelOAuth } from "services/auth.service";

import { AuthGif } from "@components/auth/auth-gifs";
import CompleteOAuthForm from "@components/auth/complete-oauth-form";
import SignupForm from "@components/auth/signup-form";
import { SignupWithGoogle } from "@components/button/google-auth";
import { SignupWithFacebook, SignupWithTwitter } from "@components/button/oauth";
import BaseLayout from "@components/shared/base-layout";
import { TextBadge } from "@components/shared/text-badge";
import { useUser } from "@lib/hooks.lib";

export default function SignupPage(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-urbanist font-medium">
      <div className="mt-16 flex gap-8 items-center">
        <SidePromotion />
        <SignupSection />
      </div>
    </div>
  );
}

function SignupSection(): JSX.Element {
  var { user } = useUser();

  return (
    <main className="px-8 w-[600px] overflow-hidden flex flex-col gap-6 items-center">
      <section>
        <h1 className="h2 mb-3 text-center">
          {!user ? "Join the Future" : "Complete your Account"}
        </h1>

        <SignupMessage />
      </section>

      {!user && (
        <TextBadge variant="highlight">
          <TextBadge variant="regular">👇</TextBadge>
          <TextBadge variant="highlight">use your socail account</TextBadge>
        </TextBadge>
      )}

      {!user && (
        <section className="flex gap-8 items-center justify-center">
          <SignupWithGoogle />
          <SignupWithTwitter />
          <SignupWithFacebook />
        </section>
      )}

      {!user && <TextBadge variant="highlight">OR</TextBadge>}

      {user ? <CompleteOAuthForm /> : <SignupForm />}

      <section>
        Already have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
        <Link href="/auth/login" className="text-link">
          Login
        </Link>
      </section>
    </main>
  );
}

function SignupMessage(): JSX.Element {
  var { user, mutateUser } = useUser();

  async function cancelOAuthSignup() {
    await mutateUser({ success: false, user: null }, { revalidate: false });
    await cancelOAuth();
  }

  if (!user) {
    // Tell user's account that is signing up and give option to cancel OAuth signup

    return (
      <p className="max-w-[450px] leading-[140%] text-center">
        DarkLight takes you on a journey. A journey from the{" "}
        <TextBadge variant="regular">🌕</TextBadge> known to the{" "}
        <TextBadge variant="regular">🌑</TextBadge> unknown.
      </p>
    );
  }

  return (
    <p className="max-w-[450px] leading-[140%] text-center">
      Your account <TextBadge variant="regular">👑</TextBadge> {user.fullName}{" "}
      will be connected to your new DarkLight account. Wrong identity?{" "}
      <TextBadge variant="regular">🥤</TextBadge>{" "}
      <span onClick={cancelOAuthSignup} className="text-link cursor-pointer">
        Start over
      </span>
    </p>
  );
}

function SidePromotion(): JSX.Element {
  var { user } = useUser();
  var gifURL = user
    ? "https://media.giphy.com/media/AuwBPJztsEWkw/giphy.gif"
    : "https://media.giphy.com/media/oWjyixDbWuAk8/giphy.gif";

  return (
    <aside className="w-[600px] overflow-hidden">
      <AuthGif src={gifURL} />
    </aside>
  );
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
