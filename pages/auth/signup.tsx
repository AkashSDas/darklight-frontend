import Link from "next/link";

import { SignupForm } from "../../components/auth";
import { TextBadge } from "../../components/badges";
import { SignupWithFacebook, SignupWithGoogle, SignupWithTwitter } from "../../components/button";
import { AuthGif } from "../../components/gifs";

function SignupPage() {
  return (
    <div className="w-full flex justify-center">
      <section className="flex items-center gap-8 mt-16">
        <aside className="w-[600px] overflow-hidden">
          <AuthGif src="https://media.giphy.com/media/oWjyixDbWuAk8/giphy.gif" />
        </aside>

        <main className="w-[600px] overflow-hidden flex items-center flex-col gap-6 px-8">
          <div>
            <h1 className="h2 text-center mb-3">Join the Future</h1>
            <p className="leading-[140%] text-text2 text-center max-w-[450px]">
              DarkLight takes you on a journey. A journey from the{" "}
              <TextBadge variant="regular">🌕</TextBadge> known to the{" "}
              <TextBadge variant="regular">🌑</TextBadge> unknown.
            </p>
          </div>

          <TextBadge variant="highlight">
            <TextBadge variant="regular">🗝️</TextBadge>
            <TextBadge variant="highlight">use your socail account</TextBadge>
          </TextBadge>

          <div className="flex items-center justify-center gap-8">
            <SignupWithGoogle />
            <SignupWithTwitter />
            <SignupWithFacebook />
          </div>

          <TextBadge variant="highlight">OR</TextBadge>

          <SignupForm />

          <div>
            Already have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
            <Link href="/auth/login" className="text-link">
              Login
            </Link>
          </div>
        </main>
      </section>
    </div>
  );
}

export default SignupPage;
