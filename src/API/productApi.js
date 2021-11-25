import axiosClient from "./axiosClient";

const proDuctAPI = {
  async getAll(params) {
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);

    delete newParams._page;

    //Fetch API productList & count
    const productList = await axiosClient.get("/products", {
      params: newParams,
    });
    const count = await axiosClient.get("/products/count", {
      params: newParams,
    });

    //Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },

  //
  get(id) {
    const Url = `/products/${id}`;
    return axiosClient.get(Url);
  },

  add(data) {
    const Url = "/products";
    return axiosClient.post(Url, data);
  },

  update(data) {
    const Url = `/products/${data.id}`;
    return axiosClient.patch(Url, data);
  },

  remove(id) {
    const Url = `/products/${id}`;
    return axiosClient.delete(Url);
  },
};

export default proDuctAPI;
