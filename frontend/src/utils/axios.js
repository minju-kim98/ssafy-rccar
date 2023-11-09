import axios from "axios";
const DOMAIN = "http://127.0.0.1:3000";
const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});
export const api = {
  companionship: {
    findAll: () => request.get("/companionship"),
    findOne: (id) => request.get(`/companionship/${id}`),

    create: (name, file) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      return request.post(`/companionship`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    // 수정
    update: (id, name) =>
      request.patch(`/companionship/${id}`, {
        name: name,
      }),

    // 이미지 수정
    updateImage: (id, file) => {
      const formData = new FormData();
      formData.append("file", file);
      return request.post(`/companionship/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    // 메뉴 삭제
    delete: (id) => request.delete(`/companionship/${id}`),
  },
  command: {
    create: (time, cmd_string, arg_string) => {

      return request.post(`/command`, {
        time,
        cmd_string,
        arg_string,
      });
    },
  },
};
