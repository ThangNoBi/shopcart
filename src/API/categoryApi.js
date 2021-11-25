import axiosClient from "./axiosClient";

const categoryAPI = {
  getAll(params) {
    const Url = "/categories";
    return axiosClient.get(Url, { params });
  },

  get(id) {
    const Url = `/categories/${id}`;
    return axiosClient.get(Url);
  },

  add(data) {
    const Url = "/categories";
    return axiosClient.post(Url, data);
  },

  update(data) {
    const Url = `/categories/${data.id}`;
    return axiosClient.patch(Url, data);
  },

  remove(id) {
    const Url = `/categories/${id}`;
    return axiosClient.delete(Url);
  },
};

export default categoryAPI;
