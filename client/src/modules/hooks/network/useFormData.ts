import axios, { AxiosError } from 'axios';
import { SubmitHandler } from 'react-hook-form';

import { UtilityItem } from '../../utilities/types/utility';
import { api_server_url } from '../../../shared/constants/serverType';
import { RealtyItem } from '../../realty/types/realty';

interface UseFormDataProps {
  apiUrl: string;
  defaultValues?: any;
  onResponse?: (errors: string[]) => void;
}

const useFormData = ({
  apiUrl,
  defaultValues,
  onResponse,
}: UseFormDataProps) => {
  const handleSubmitSuccess = () => {
    onResponse && onResponse([]);
  };

  const handleSubmitError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      onResponse && onResponse(err.response?.data.message.errors);
    }
  };

  const onSubmit: SubmitHandler<UtilityItem | RealtyItem> = async (data) => {
    const url = defaultValues
      ? `${api_server_url}/api/${apiUrl}/${defaultValues.id}`
      : `${api_server_url}/api/${apiUrl}`;

    try {
      defaultValues ? await axios.put(url, data) : await axios.post(url, data);

      handleSubmitSuccess();
    } catch (err: any) {
      handleSubmitError(err);
    }
  };

  return {
    onSubmit,
  };
};

export default useFormData;
