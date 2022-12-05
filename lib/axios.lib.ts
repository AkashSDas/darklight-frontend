import axios, { AxiosRequestConfig } from "axios";

var axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

async function fetchFromAPI(URL: string, config: AxiosRequestConfig) {
  try {
    var response = await axiosInstance(URL, config);
    var success = true;
  } catch (error) {
    var success = false;
  }

  return { success, statusCode: response!?.status, data: response!?.data };
}

export default fetchFromAPI;
