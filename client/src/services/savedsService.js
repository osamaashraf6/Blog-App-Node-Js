import apiClient from "../utils/apiClient";
import globalService from "./globalService";

// createOneSaved
export const createOneSaved = async (postId) => {
  const res = await apiClient.post(
    `${globalService.routes.posts}/${postId}/saveds`
  );
  return res.data;
};
// getAllSavedOfUser
export const getAllSavedOfUser = async () => {
  const res = await apiClient.get(`${globalService.routes.saveds}`);
  return res.data;
};
// deleteOneSaved
export const deleteOneSaved = async (id) => {
  const res = await apiClient.delete(`${globalService.routes.saveds}/${id}`);
  return res.data;
};
