import Link from "next/link";
import { ReactElement } from "react";

import { AuthGif } from "@components/auth/auth-gifs";
import LoginForm from "@components/auth/login-form";
import BaseLayout from "@components/shared/base-layout";
import { LoginWithGoogle } from "@components/shared/google-auth-btns";
import { LoginWithFacebook, LoginWithTwitter } from "@components/shared/oauth-btns";
import { TextBadge } from "@components/shared/text-badge";

export default function LoginPage(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-urbanist font-medium">
      <div className="mt-16 flex gap-8 items-center">
        <SidePromotion />
        <LoginSection />
      </div>
    </div>
  );
}

function LoginSection(): JSX.Element {
  return (
    <main className="w-[600px] px-8 overflow-hidden flex gap-6 items-center flex-col">
      <section>
        <h1 className="h2 text-center mb-3">Welcome Back</h1>

        <p className="max-w-[450px] leading-[140%] text-center">
          Resume your learning <TextBadge variant="regular">🎓</TextBadge> and
          have fun. {"Don't"} leave again{" "}
          <TextBadge variant="regular">🥺</TextBadge>
        </p>
      </section>

      <TextBadge variant="highlight">
        <TextBadge variant="regular">👇</TextBadge>
        <TextBadge variant="highlight">use your socail account</TextBadge>
      </TextBadge>

      <section className="flex gap-8 items-center justify-center">
        <LoginWithGoogle />
        <LoginWithTwitter />
        <LoginWithFacebook />
      </section>

      <TextBadge variant="highlight">OR</TextBadge>

      <LoginForm />

      <section>
        {"Don't"} have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
        <Link href="/auth/signup" className="text-link">
          Signup
        </Link>
      </section>
    </main>
  );
}

function SidePromotion(): JSX.Element {
  return (
    <aside className="w-[600px] overflow-hidden">
      <AuthGif src="https://media.giphy.com/media/3o7aDgf134NzaaHI8o/giphy-downsized.gif" />
    </aside>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
