import axios from 'axios';

import { api_server_url } from '../../../shared/constants/serverType';
import { UtilityPaymentItem } from '../types/utilityPayment';

interface fetchUtilityPaymentProps {
  realtyId: string;
  utilityId: string;
}

export const fetchUtilityPayment = async ({
  realtyId,
  utilityId,
}: fetchUtilityPaymentProps) => {
  const response = await axios.get<UtilityPaymentItem[]>(
    `${api_server_url}/api/utilityPaiment/${realtyId}/${utilityId}`,
    {},
  );
  return response.data;
};
