import axios from "axios";
import { url } from "../../config/url";
const backendUrl = url + "/api/v1/users";

const userInstance = axios.create({
  baseURL: backendUrl,
});

export const signInUser = async (user) => {
  const response = await userInstance.post(`/signin`, user);
  return response.data;
};

export const signUpUser = async (user) => {
  const response = await userInstance.post(`/signup`, user);
  return response.data;
};

export const signOutUser = async () => {
  const response = await userInstance.get(`/signout`);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await userInstance.patch(`/updateMe`, user, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("real_state-token")}`,
    },
  });
  return response.data;
};
