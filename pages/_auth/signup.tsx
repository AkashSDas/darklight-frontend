import Link from "next/link";
import { useSWRConfig } from "swr";

import { CompleteOAuthForm } from "../../components/_auth/complete-oauth";
import { SignupForm } from "../../components/_auth/signup.component";
import { TextBadge } from "../../components/badges/text";
import { SignupWithGoogle } from "../../components/button/google-auth";
import { SignupWithFacebook, SignupWithTwitter } from "../../components/button/oauth";
import { AuthGif } from "../../components/gifs/auth";
import { useUser } from "../../lib/hooks.lib";
import { cancelOAuth } from "../../services/auth.service";

function SignupPage() {
  var { user } = useUser();
  var { mutate } = useSWRConfig();

  async function cancelOAuthSignup() {
    await cancelOAuth();
    await mutate("user", { success: null, user: null, error: null });
  }

  function Info() {
    if (!user) {
      return (
        <p className="leading-[140%] text-text2 text-center max-w-[450px]">
          DarkLight takes you on a journey. A journey from the{" "}
          <TextBadge variant="regular">🌕</TextBadge> known to the{" "}
          <TextBadge variant="regular">🌑</TextBadge> unknown.
        </p>
      );
    }

    return (
      <p className="leading-[140%] text-text2 text-center max-w-[450px]">
        Your account <TextBadge variant="regular">👑</TextBadge> {user.fullName}{" "}
        will be connected to your new DarkLight account. Wrong identity?{" "}
        <TextBadge variant="regular">🥤</TextBadge>{" "}
        <span onClick={cancelOAuthSignup} className="text-link cursor-pointer">
          Start over
        </span>
      </p>
    );
  }

  return (
    <div className="font-urbanist font-medium w-full flex justify-center">
      <div className="flex items-center gap-8 mt-16">
        <aside className="w-[600px] overflow-hidden">
          <AuthGif
            src={
              user
                ? "https://media.giphy.com/media/AuwBPJztsEWkw/giphy.gif"
                : "https://media.giphy.com/media/oWjyixDbWuAk8/giphy.gif"
            }
          />
        </aside>

        <main className="w-[600px] overflow-hidden flex items-center flex-col gap-6 px-8">
          <div>
            <h1 className="h2 text-center mb-3">
              {!user ? "Join the Future" : "Complete your Account"}
            </h1>
            <Info />
          </div>

          {!user && (
            <TextBadge variant="highlight">
              <TextBadge variant="regular">👇</TextBadge>
              <TextBadge variant="highlight">use your socail account</TextBadge>
            </TextBadge>
          )}

          {!user && (
            <div className="flex items-center justify-center gap-8">
              <SignupWithGoogle />
              <SignupWithTwitter />
              <SignupWithFacebook />
            </div>
          )}

          {!user && <TextBadge variant="highlight">OR</TextBadge>}

          {user ? <CompleteOAuthForm /> : <SignupForm />}

          <div>
            Already have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
            <Link href="/auth/login" className="text-link">
              Login
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignupPage;
