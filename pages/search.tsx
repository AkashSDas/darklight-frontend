import { ReactElement } from "react";

import BaseLayout from "@components/shared/base-layout";

export default function SearchPage(): JSX.Element {
  return <div></div>;
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
