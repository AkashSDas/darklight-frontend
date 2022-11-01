import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/store";

import Button from "./button";

function GifClip({ src }) {
  return (
    <div className="relative h-[385px] w-[500px]">
      <Image
        src={src}
        height={385}
        width={500}
        layout="fixed"
        alt=""
        className="absolute top-0 left-0"
      />
      <div className="w-[500px] h-[385px] bg-radial-mask top-0 left-0 absolute"></div>
    </div>
  );
}

export default function AuthLayout({ children }) {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var user = useAppSelector((state) => state.user.data);

  function RightSideButton() {
    if (user) {
      return (
        <Button
          onClick={() => {}}
          label="Logout"
          variant="outlined"
          size="md"
        />
      );
    }

    var hasSignedUp = user?.email && user?.username;
    return (
      <Button
        onClick={() => {}}
        label={hasSignedUp ? "Login" : "Signup"}
        variant="outlined"
        size="md"
      />
    );
  }

  return (
    <div className="p-6 flex gap-6 relative">
      <aside className="bg-black h-[calc(100vh-48px)] w-full max-w-[684px] sticky rounded-3xl overflow-hidden flex flex-col items-center justify-center p-4">
        <GifClip src="/gifs/sit.gif" />
      </aside>

      <main className="h-[calc(100vh-48px)] sticky rounded-3xl max-w-[684px] flex-grow flex flex-col gap-6 py-3">
        <nav className="flex justify-between items-center">
          <div className="font-syne font-bold text-2xl">DarkLight</div>
          <RightSideButton />
        </nav>

        {children}
      </main>
    </div>
  );
}

export function getAuthLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
}
