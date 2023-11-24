import axios from "axios";
import { api_server_url } from "../../../shared/constants/serverType";
import { RealtyItem } from "../types/realty";

export const fetchAllRealty = async () => {
  const response = await axios.get<RealtyItem[]>(
    `${api_server_url}/api/realty`,
    {},
  );
  return response.data;
};
