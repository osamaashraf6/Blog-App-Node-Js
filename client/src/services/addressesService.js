import apiClient from "../utils/apiClient";
import globalService from "./globalService";

// createOneAddress
export const createOneAddress = async (formData) => {
  const res = await apiClient.post(`${globalService.routes.addresses}`, {
    address: formData, //! impotant send at object with key and value pairs as it in schema [{}]
  });
  return res.data;
};
// getAllAddressOfUser
export const getAllAddressOfUser = async () => {
  const res = await apiClient.get(`${globalService.routes.addresses}`);
  return res.data;
};
// deleteOneAddress
export const deleteOneAddress = async (addressId) => {
  const res = await apiClient.delete(
    `${globalService.routes.addresses}/${addressId}`
  );
  return res.data;
};
