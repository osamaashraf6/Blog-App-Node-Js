import apiClient from "../utils/apiClient";
import globalService from "./globalService";

// createOneArchive
export const createOneArchive = async (postId) => {
  const res = await apiClient.post(
    `${globalService.routes.posts}/${postId}/archives`
  );
  return res.data;
};
// getAllArchiveOfUser
export const getAllArchiveOfUser = async () => {
  const res = await apiClient.get(`${globalService.routes.archives}`);
  return res.data;
};
// deleteOneArchive
export const deleteOneArchive = async (id) => {
  const res = await apiClient.delete(`${globalService.routes.archives}/${id}`);
  return res.data;
};
