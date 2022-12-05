import Link from "next/link";

import { LoginForm } from "../../components/auth";
import { TextBadge } from "../../components/badges";
import { LoginWithFacebook, LoginWithGoogle, LoginWithTwitter } from "../../components/button";
import { AuthGif } from "../../components/gifs";

function LoginPage() {
  return (
    <div className="font-urbanist font-medium w-full flex justify-center">
      <div className="flex items-center gap-8 mt-16">
        <aside className="w-[600px] overflow-hidden">
          <AuthGif src="https://media.giphy.com/media/3o7aDgf134NzaaHI8o/giphy-downsized.gif" />
        </aside>

        <main className="w-[600px] overflow-hidden flex items-center flex-col gap-6 px-8">
          <div>
            <h1 className="h2 text-center mb-3">Welcome back</h1>
            <p className="leading-[140%] text-text2 text-center max-w-[450px]">
              Resume your learning <TextBadge variant="regular">🎓</TextBadge>{" "}
              and have fun. {"Don't"} leave again{" "}
              <TextBadge variant="regular">🥺</TextBadge>
            </p>
          </div>

          <TextBadge variant="highlight">
            <TextBadge variant="regular">👇</TextBadge>
            <TextBadge variant="highlight">use your socail account</TextBadge>
          </TextBadge>

          <div className="flex items-center justify-center gap-8">
            <LoginWithGoogle />
            <LoginWithTwitter />
            <LoginWithFacebook />
          </div>

          <TextBadge variant="highlight">OR</TextBadge>

          <LoginForm />

          <div>
            {"Don't"} have an account?{" "}
            <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
            <Link href="/auth/signup" className="text-link">
              Signup
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
