import { ReactElement } from "react";

import { ForgotPasswordForm } from "@components/_auth/forgot-password";
import { TextBadge } from "@components/badges/text";
import { AuthGif } from "@components/gifs/auth";
import BaseLayout from "@components/shared/base-layout";

export default function ForgotPasswordPage(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-urbanist font-medium">
      <div className="mt-16 flex gap-8 items-center">
        <SidePromotion />
        <ForgotPasswordSection />
      </div>
    </div>
  );
}

function ForgotPasswordSection(): JSX.Element {
  return (
    <main className="w-[600px] px-8 overflow-hidden flex gap-6 items-center flex-col">
      <section>
        <h1 className="h2 text-center mb-3">Reset your Password</h1>

        <p className="max-w-[450px] leading-[140%] text-center">
          Enter the email address you used when you joined and {"we'll"} send
          you <TextBadge variant="regular">📜</TextBadge> instructions to reset
          your password
        </p>
      </section>

      <ForgotPasswordForm />
    </main>
  );
}

function SidePromotion(): JSX.Element {
  return (
    <aside className="w-[600px] overflow-hidden">
      <AuthGif src="https://media.giphy.com/media/CpI5CkrkmNjDG/giphy.gif" />
    </aside>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
