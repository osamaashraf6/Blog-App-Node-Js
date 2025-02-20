import globalService from "../services/globalService";
import apiClient from "../utils/apiClient";

// createOneComment
export const createOneComment = async ({ postId, formData }) => {
  const res = await apiClient.post(
    `${globalService.routes.posts}/${postId}/comments`,
    formData
  );
  return res.data;
};
// getAllCommentOfPost
export const getAllCommentOfPost = async (
  postId,
  limit,
  page,
  sort,
  search,
  category,
  tags
) => {
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
    `${globalService.routes.posts}/${postId}/comments?${queryParams}`
  );
  return res.data;
};

// getAllCommentOfUser
export const getAllCommentOfUser = async (
  limit,
  page,
  sort,
  search,
  category,
  tags
) => {
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
    `${globalService.routes.comments}/userComments?${queryParams}`
  );
  return res.data;
};

// updateOneComment
export const updateOneComment = async (id, formData) => {
  const res = await apiClient.put(
    `${globalService.routes.comments}/${id}`,
    formData
  );
  return res.data;
};
// deleteOneComment
export const deleteOneComment = async (id) => {
  const res = await apiClient.delete(`${globalService.routes.comments}/${id}`);
  return res.data;
};
