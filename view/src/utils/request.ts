import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { loadEnv } from "vite";

const route = useRoute();
const router = useRouter();

interface Result {
  code: number;
  message: string;
}
interface ResponseData<T = any> extends Result {
  data?: T;
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (localStorage.getItem("EinziegCloud_USER")) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

service.interceptors.response.use(
  (
    response: AxiosResponse<any, any>
  ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 403) {

        router.push("/login").then((r) => r);
      }
    }
    return response;
  },
  (error) => {
    if (error.response.status === 403) {

      router.push("/login").then((r) => r);
    }
  }
);

export default service;
