import { ReactElement } from "react";

import BaseLayout from "@components/shared/base-layout";

export default function HomePage(): JSX.Element {
  return <div></div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
