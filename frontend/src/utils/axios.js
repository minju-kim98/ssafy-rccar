import axios from "axios";
const DOMAIN = "http://127.0.0.1:3000"
const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});
export const api = {
  companionship: {
    findAll: () => request.get("/companionship"),
    findOne: (id) => request.get(`/companionship/${id}`),
  },
};