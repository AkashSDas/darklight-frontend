import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromEnrolledCourse(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/payment/${URL}`, config);
}

export async function createPaymentIntentAndCharge(
  amountToCharge: number,
  accessToken?: string
) {
  var response = await fetchFromEnrolledCourse(`charge`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { amountToCharge },
  });

  console.log(response);
  if (response.statusCode == 200 && response.data) {
    return {
      success: response.success,
      paymentIntent: response.data?.data?.paymentIntent,
    };
  }

  return { success: false };
}
