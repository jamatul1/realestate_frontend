import axios from "axios";
import { autoCompleteUrl } from "../../config/config";
import { url } from "../../config/url";
const backendUrl = url + "/api/v1/properties";

const propertyInstance = axios.create({
  baseURL: backendUrl,
});
export const addProperty = async (property) => {
  let response = propertyInstance.post("/", property, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("real_state-token")}`,
    },
  });
  return await response;
};
export const uploadPropertyImages = async (propertyId, imgData) => {
  let response = propertyInstance.post("/upload/" + propertyId, imgData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("real_state-token")}`,
    },
  });
  return await response;
};

export const removePropertyImages = async (propertyId, imgData) => {
  let response = propertyInstance.patch("/remove/" + propertyId, imgData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("real_state-token")}`,
    },
  });
  return await response;
};

export const updateProperty = async (propertyId, property) => {
  let response = propertyInstance.patch("/" + propertyId, property, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("real_state-token")}`,
    },
  });
  return await response;
};

export const getAllProperties = async () => {
  let response = propertyInstance.get("/?sort=createdAt", {
    headers: {
      Accept: "application/json",
    },
  });
  return await response;
};

export const getRecentProperties = async () => {
  let response = propertyInstance.get("/recents", {
    headers: {
      Accept: "application/json",
    },
  });
  return await response;
};
export const getSingleProperty = async (propertyId) => {
  let response = propertyInstance.get("/" + propertyId, {
    headers: {
      Accept: "application/json",
    },
  });
  return await response;
};
export const callAutoComplete = async (text) => {
  let response = await axios.get(autoCompleteUrl.replace("YOUR_TEXT", text));
  return await response;
};

export const searchPropertiesWithin = async (lat, long) => {
  let response = propertyInstance.get(
    `/properties-within/5/center/${lat},${long}/unit/mi`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return await response;
};

export const getPropertiesByAgentId = async (agentId) => {
  let response = await propertyInstance.get(`/?owner=${agentId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await response;
};
