import Link from "next/link";
import { ReactElement } from "react";

import PasswordResetForm from "@components/auth/password-reset-form";
import { TextBadge } from "@components/badges/text";
import { AuthGif } from "@components/gifs/auth";
import BaseLayout from "@components/shared/base-layout";

export default function PasswordResetPage(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-urbanist font-medium">
      <div className="mt-16 flex gap-8 items-center">
        <SidePromotion />
        <PasswordResetSection />
      </div>
    </div>
  );
}

function PasswordResetSection(): JSX.Element {
  return (
    <main className="w-[600px] px-8 overflow-hidden flex gap-6 items-center flex-col">
      <section>
        <h1 className="h2 text-center mb-3">Reset your Password</h1>
        <p className="max-w-[450px] leading-[140%] text-center">
          Enter your new <TextBadge variant="regular">💪</TextBadge> password
        </p>
      </section>

      <PasswordResetForm />

      <section>
        Already have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
        <Link href="/auth/login" className="text-link">
          Login
        </Link>
      </section>
    </main>
  );
}

function SidePromotion(): JSX.Element {
  return (
    <aside className="w-[600px] overflow-hidden">
      <AuthGif src="https://media.giphy.com/media/81xwEHX23zhvy/giphy.gif" />
    </aside>
  );
}

PasswordResetPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
