import { ReactElement } from "react";

import BaseLayout from "@components/shared/base-layout";

export default function TeachPage(): JSX.Element {
  return <div></div>;
}

TeachPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
