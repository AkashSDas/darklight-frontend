import axios, { AxiosError, AxiosRequestConfig } from "axios";

var axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

async function fetchFromAPI(URL: string, config: AxiosRequestConfig) {
  try {
    var response = await axiosInstance(URL, config);
    var success = true;
  } catch (error) {
    if (error instanceof AxiosError) var responseError = error.response;
    var success = false;
  }

  return {
    success,
    statusCode: response!?.status ?? responseError?.status,
    data: response!?.data,
    error: responseError?.data,
  };
}

export default fetchFromAPI;
