import axios, { AxiosRequestConfig } from "axios";

import { handleAsync } from "@lib/handle-async";

var axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

interface Response {
  status: number;
  msg: string;
  data?: { [key: string]: any };
}

/** Make RESTful request to the back-end */
async function fetchAPI(
  endpoint: string,
  opts: AxiosRequestConfig
): Promise<Response> {
  var [data, error] = await handleAsync(axiosInstance(endpoint, opts));

  // Return cleaned data
  if (typeof error == "string") {
    return { status: 500, msg: "Something went wrong" };
  } else if (error?.response?.data) {
    return { status: error.response.status, msg: error.response.data.msg };
  } else {
    return { status: 200, msg: data.data.msg, data: data.data.data };
  }
}

export default fetchAPI;
