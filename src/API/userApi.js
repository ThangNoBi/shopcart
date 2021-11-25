import axiosClient from "./axiosClient";

const UserAPI = {
  //API đăng ký tài khoản user
  register(data) {
    const Url = "/auth/local/register";
    return axiosClient.post(Url, data);
  },

  // API login 1 tài khoản
  login(data) {
    const Url = "/auth/local";
    return axiosClient.post(Url, data);
  },
};

export default UserAPI;
