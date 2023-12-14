import {
  Box,
  Button,
  Chip,
  Fade,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RealtyItem } from '../../modules/realty/types/realty';
import { renderIcon } from '../IconPicker/IconPicker';
import UtilityPicker from '../UtilityPicker/UtilityPicker';
import { api_server_url } from '../../shared/constants/serverType';
import { UtilityItem } from '../../modules/utilities/types/utility';
import { AppDispatch } from '../../store';
import { actions } from '../../modules/realty/store';

interface RealtyUtilitiesListProps {
  realty: RealtyItem;
}

const RealtyUtilitiesList: FC<RealtyUtilitiesListProps> = ({ realty }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedUtility, setSelectedUtility] = useState<UtilityItem | null>(
    null,
  );

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleAddUtility = async () => {
    if (selectedUtility) {
      axios
        .post(
          `${api_server_url}/api/realty/add-utility/${selectedUtility.id}`,
          { realtyId: realty.id },
        )
        .then(() => {
          setSelectedUtility(null);
          setIsEditOpen(false);
          dispatch(actions.getAllRealty());
        })
        .catch((error) => console.log(error));
    }
  };

  const handleRemoveUtility = async (utilityId: string) => {
    axios
      .put(`${api_server_url}/api/realty/delete-utility/${utilityId}`, {
        realtyId: realty.id,
      })
      .then(() => {
        dispatch(actions.getAllRealty());
      })
      .catch((err) => console.log(err));
  };

  const utilitiesListArr = realty.utilities
    ? Object.keys(realty.utilities)
    : [];

  return (
    <Stack spacing={1}>
      <Typography variant='body2'>Utilities</Typography>
      <Stack spacing={0.5} direction='row' useFlexGap flexWrap='wrap'>
        {utilitiesListArr.map((utility) => (
          <Chip
            key={utility}
            color='primary'
            icon={renderIcon(realty.utilities[utility].icon)}
            label={utility}
            onClick={() =>
              navigate(
                `/realty/${realty.name}/${realty.utilities[utility].name}`,
              )
            }
            onDelete={() => handleRemoveUtility(realty.utilities[utility].id)}
          />
        ))}
        <Chip
          color='primary'
          icon={<Add />}
          label='Add'
          onClick={() => setIsEditOpen(true)}
        />
      </Stack>
      <Modal open={isEditOpen} closeAfterTransition>
        <Fade in={isEditOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              gutterBottom
              variant='h5'
              sx={{ mb: 2 }}
              textAlign='center'
            >
              Select Utility
            </Typography>
            <UtilityPicker onSelect={setSelectedUtility} />
            <Stack spacing={2} direction='row' pt={4}>
              <Button
                type='submit'
                variant='outlined'
                sx={{ width: '50%' }}
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='outlined'
                sx={{ width: '50%' }}
                onClick={handleAddUtility}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Stack>
  );
};

export default RealtyUtilitiesList;
