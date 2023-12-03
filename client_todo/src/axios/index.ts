import axios from "axios";

export const axiosApi = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL });
