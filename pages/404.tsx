import Image from "next/image";
import { ReactElement } from "react";

import BaseLayout from "@components/shared/base-layout";

export default function NotFoundPage(): JSX.Element {
  return (
    <section className="mt-16 w-full flex flex-col gap-4 justify-center items-center font-urbanist font-medium">
      <div className="relative w-[500px] h-[300px]">
        <Image
          src="https://media.giphy.com/media/iF0J8RlEJamCQ/giphy.gif"
          alt="Page not found gif"
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-[20px] text-text1">Page not found</h3>
    </section>
  );
}

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
