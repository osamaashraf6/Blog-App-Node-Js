import globalService from "../services/globalService";
import apiClient from "../utils/apiClient";

// createOnePost
export const createOnePost = async (dataForm) => {
  const res = await apiClient.post(globalService.routes.posts, dataForm);
  return res.data;
};
// getAllPost
export const getAllPost = async (limit, page, sort, search, category, tags) => {
  let queryParams = `limit=${limit}&page=${page}&sort=${sort}`;
  if (search) {
    queryParams += `&search=${search}`;
  }
  if (category) {
    queryParams += `&category=${category}`;
  }

  if (tags) {
    queryParams += `&tags=${tags}`;
  }

  const res = await apiClient.get(
    `${globalService.routes.posts}?${queryParams}`
  );
  return res.data;
};

// getOnePost
export const getOnePost = async (id) => {
  const res = await apiClient.get(`${globalService.routes.posts}/${id}`);
  return res.data;
};
// updateOnePost
export const updateOnePost = async ({ id, formData }) => {
  const res = await apiClient.put(
    `${globalService.routes.posts}/${id}`,
    formData
  );
  return res.data;
};
// deleteOnePost
export const deleteOnePost = async (id) => {
  const res = await apiClient.delete(`${globalService.routes.posts}/${id}`);
  return res.data;
};
