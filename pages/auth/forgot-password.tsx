import Link from "next/link";

import { ForgotPasswordForm } from "../../components/auth/forgot-password.component";
import { TextBadge } from "../../components/badges";
import { AuthGif } from "../../components/gifs";

function ForgotPasswordPage() {
  return (
    <div className="font-urbanist font-medium w-full flex justify-center">
      <div className="flex items-center gap-8 mt-16">
        <aside className="w-[600px] overflow-hidden">
          <AuthGif src="https://media.giphy.com/media/CpI5CkrkmNjDG/giphy.gif" />
        </aside>

        <main className="w-[600px] overflow-hidden flex items-center flex-col gap-6 px-8">
          <div>
            <h1 className="h2 text-center mb-3">Reset your Password</h1>
            <p className="leading-[140%] text-text2 text-center max-w-[450px]">
              Enter the email address you used when you joined and {"we'll"}{" "}
              send you <TextBadge variant="regular">📜</TextBadge> instructions
              to reset your password
            </p>
          </div>

          <ForgotPasswordForm />

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

export default ForgotPasswordPage;
