import apiClient from "../utils/apiClient";
import globalService from "./globalService";

// getUserProfileByHimSelf
export const getUserProfileByHimSelf = async () => {
  const res = await apiClient.get(
    `${globalService.routes.users}/getUserProfileByHimSelf`
  );
  return res.data;
};
// updateUserProfileByUserHimSelf
export const updateUserProfileByUserHimSelf = async (formData) => {
  const res = await apiClient.put(
    `${globalService.routes.users}/updateUserProfileByHimSelf`,
    formData
  );
  return res.data;
};
// changeUserPasswordByUserHimSelf
export const changeUserPasswordByUserHimSelf = async (formData) => {
  const res = await apiClient.put(
    `${globalService.routes.users}/changeUserPasswordByUserHimSelf`,
    formData
  );
  //   const token = JSON.parse(localStorage.getItem("persist:root"))?.user;
  //   const getToken = JSON.parse(token)?.currentUser?.token;

  const newToken = res.data.token;

  let storedData = JSON.parse(localStorage.getItem("persist:root")) || {};
  let userData = storedData.user ? JSON.parse(storedData.user) : {};

  if (userData.currentUser) {
    userData.currentUser.token = newToken;
    storedData.user = JSON.stringify(userData);

    localStorage.setItem("persist:root", JSON.stringify(storedData));
  }

  return res.data;
};
// deleteUserAccountByUserHimSelf
export const deleteUserAccountByUserHimSelf = async () => {
  const res = await apiClient.delete(
    `${globalService.routes.users}/deleteUserAccountByUserHimSelf`
  );
  return res.data;
};
