import { useEffect, useState } from "react";

interface Props {
  callback: Function;
}

function DebugAPIResponse({ callback }: Props) {
  var [responseData, setResponseData] = useState(null);

  useEffect(
    function makeAPIRequest() {
      (async function DebugAPIIIFE() {
        var response = await callback();
        setResponseData(response);
      })();
    },
    [callback]
  );

  return (
    <section>
      <h4 className="-text-h4">Debug API Response</h4>
      <pre className="-text-body1">{JSON.stringify(responseData)}</pre>
    </section>
  );
}
export default DebugAPIResponse;
