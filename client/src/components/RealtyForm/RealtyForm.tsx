import { FC, useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";

import CountrySelector from "../CountrySelector/CountrySelector";
import axios, { AxiosError } from "axios";
import { api_server_url } from "../../shared/constants/serverType";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  country: string;
  city: string;
  address: string;
};

const RealtyForm: FC = (props: any) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [errors, setErrors] = useState([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios
      .post(api_server_url + "/api/realty", data)
      .then((res) => {
        setErrors([]);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          setErrors(err.response?.data.message.errors);
        }
      });
  };

  return (
    <Box p='20px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' spacing={2} width={300}>
          <TextField
            error={errors.length > 0}
            // required
            label='Name'
            variant='standard'
            {...register("name", { required: true })}
          />
          <CountrySelector {...register("country")} />
          <TextField label='City' variant='standard' {...register("city")} />
          <TextField
            label='Address'
            variant='standard'
            {...register("address")}
          />
          <Button type='submit' variant='outlined' startIcon={<AddCircle />}>
            Add
          </Button>
          {errors.map((error: any) => (
            <Alert severity='error' key={error.message}>
              {error.message}
            </Alert>
          ))}
        </Stack>
      </form>
    </Box>
  );
};

export default RealtyForm;
