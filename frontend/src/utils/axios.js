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

  devices: {
    findAll: () => request.get("/devices"),
    findOne: (id) => request.get(`/devices/${id}`),
    create: (name, location) => {
      return request.post(`/devices`, {
        name: name,
        location: location,
      });
    },
    updateState: (id, state) =>
      request.patch(`/devices/1/${id}`, {
        state: state,
      }),
    updateInfo: (id, name, location) =>
      request.patch(`/devices/2/${id}`, {
        name: name,
        location: location,
      }),
    delete: (id) => request.delete(`/devices/${id}`),
  },
};
