import axios from 'axios';

import { api_server_url } from '../../../shared/constants/serverType';
import { UtilityItem } from '../types/utility';

export const fetchAllUtilities = async () => {
  const response = await axios.get<UtilityItem[]>(
    `${api_server_url}/api/utility`,
    {},
  );
  return response.data;
};
