import { toast } from "react-hot-toast";

import { TextBadge } from "@components/badges/text";
import { useUser } from "@lib/hooks.lib";
import FacebookLogo from "@public/social-icons/facebook.svg";
import GoogleLogo from "@public/social-icons/google.svg";
import TwitterLogo from "@public/social-icons/twitter.svg";
import btnStyles from "@styles/components/button/oauth.module.css";

export default function OAuthProviderInfo(): JSX.Element {
  var { user } = useUser();

  return (
    <section className="w-full flex gap-2 justify-between items-center">
      <div className="w-full flex flex-col gap-2">
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

interface OAuthProviderBadgeProps {
  provider: "google" | "facebook" | "twitter";
  connected: boolean;
}

function OAuthProviderBadge(props: OAuthProviderBadgeProps): JSX.Element {
  var { connected, provider } = props;

  function handleClick() {
    if (connected) return;
    toast.success(
      "Soon you will be able to connect your account with " + provider + "!",
      { icon: "🚧" }
    );
  }

  return (
    <div
      onClick={connected ? () => {} : handleClick}
      className={`${btnStyles.btn} ${connected ? "border-light-primary" : ""} ${
        !connected ? "cursor-pointer" : ""
      }`}
    >
      {props.provider == "google" && <GoogleLogo />}
      {props.provider == "facebook" && <FacebookLogo />}
      {props.provider == "twitter" && <TwitterLogo />}
    </div>
  );
}
