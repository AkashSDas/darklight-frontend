import { ReactElement } from "react";

import BaseLayout from "@components/shared/base-layout";

export default function ExplorePage(): JSX.Element {
  return <div></div>;
}

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
