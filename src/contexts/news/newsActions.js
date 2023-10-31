import axios from "axios";
import { autoCompleteUrl, newsUrl } from "../../config/config";
const backendUrl = newsUrl;

const propertyInstance = axios.create({
  baseURL: backendUrl,
});
export const getNews = async () => {
  let response = propertyInstance.get("/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response;
};
