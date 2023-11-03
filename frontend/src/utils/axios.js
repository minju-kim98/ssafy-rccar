import axios from "axios";
const DOMAIN = "http://3.36.75.253:3000"
const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});
export const api = {
  companionship: {
    findAll: () => request.get("/companionship"),
    findOne: (id) => request.get(`/companionship/${id}`),
  },
};