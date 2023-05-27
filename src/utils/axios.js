import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export { axiosInstance };
