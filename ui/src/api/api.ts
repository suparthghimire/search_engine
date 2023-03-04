import { ReturnType } from "@/@types";
import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});

axiosRetry(instance, {
  retries: 1,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

export async function SearchAPI(
  query: string,
  page?: string
): Promise<ReturnType> {
  const urlParams = new URLSearchParams({
    q: query,
    page: page ? page.toString() : "1",
  });
  const response = await instance.get(`/api/search?${urlParams.toString()}`);
  return response.data;
}
