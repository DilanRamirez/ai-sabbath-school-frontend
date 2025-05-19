import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-sabbath-school-backend-production.up.railway.app/api/v1",
});

export default api;
