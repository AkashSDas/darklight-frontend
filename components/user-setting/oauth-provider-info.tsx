import { useUser } from "../../lib/hooks.lib";
import Facebook from "../../public/social-icons/facebook.svg";
import Google from "../../public/social-icons/google.svg";
import Twitter from "../../public/social-icons/twitter.svg";
import btnStyles from "../../styles/components/button/oauth.module.css";
import { TextBadge } from "../badges/text";

export default function OAuthProviderInfo() {
  var { user } = useUser();

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🆔</TextBadge>{" "}
          <span className="text-text1">OAuth providers</span>
        </div>

        <p className="text-sm">OAuth providers that are being used by you</p>
      </div>

      <div className="w-full max-w-[300px]">
        <div className="flex flex-wrap gap-6">
          {["google", "facebook", "twitter"].map((provider: any) => (
            <OAuthProviderBadge
              key={provider}
              provider={provider}
              connected={user?.oauthProviders.includes(provider)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OAuthProviderBadge({
  provider,
  connected,
}: {
  provider: "google" | "facebook" | "twitter";
  connected: boolean;
}) {
  function handleClick() {
    if (connected) return;
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/${provider}`,
      "_self"
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${btnStyles.btn} ${connected ? "border-light-primary" : ""} ${
        !connected ? "cursor-pointer" : ""
      }`}
    >
      {provider === "google" && <Google />}
      {provider === "facebook" && <Facebook />}
      {provider === "twitter" && <Twitter />}
    </div>
  );
}
