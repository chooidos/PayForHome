import axios from 'axios';
import {
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import RealtyInfoCard from '../RealtyInfoCard/RealtyInfoCard';
import RealtyForm from '../RealtyForm/RealtyForm';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../modules/realty/store';
import { useState } from 'react';
import { RealtyItem } from '../../modules/realty/types/realty';
import { api_server_url } from '../../shared/constants/serverType';

const RealtyBoard: React.FC<any> = (props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedRealty, setEditedRealty] = useState<RealtyItem | undefined>(
    undefined,
  );
  const [deleteRealtyItem, setDeleteRealtyItem] = useState<
    RealtyItem | undefined
  >(undefined);

  const dispatch = useDispatch();
  const realtyList = useSelector(selectors.selectRealty);

  const realtyListArr = [];
  for (const realty in realtyList) {
    realtyListArr.push(realty);
  }

  const handleEdit = (realty: RealtyItem) => {
    setIsFormOpen(true);
    setEditedRealty(realtyList[realty.name]);
  };

  const handleCancelEdit = () => {
    setEditedRealty(undefined);
    setIsFormOpen(false);
  };

  const handleModalDelete = (realty: RealtyItem) => {
    setIsDeleteOpen(true);
    setDeleteRealtyItem(realtyList[realty.name]);
  };

  const handleModalCancelDelete = () => {
    setDeleteRealtyItem(undefined);
    setIsDeleteOpen(false);
  };

  const handleDeleteRealty = async () => {
    deleteRealtyItem &&
      axios
        .delete(`${api_server_url}/api/realty/${deleteRealtyItem.name}`)
        .then((res) => {
          if (res.status === 200) {
            handleModalCancelDelete();
            dispatch(actions.getAllRealty() as any);
          }
        })
        .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid container direction='row' spacing={2} justifyContent='center'>
        {realtyListArr.map((realty: string) => (
          <Grid key={realty} item xs='auto'>
            <RealtyInfoCard
              realty={realtyList[realty]}
              onEdit={handleEdit}
              onDelete={handleModalDelete}
            />
          </Grid>
        ))}
      </Grid>
      <Modal open={isDeleteOpen} closeAfterTransition>
        <Fade in={isDeleteOpen}>
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
              Do you want to delete "{deleteRealtyItem?.name}"?
            </Typography>
            <Stack spacing={2} direction='row'>
              <Button
                type='submit'
                variant='outlined'
                sx={{ width: '50%' }}
                onClick={handleModalCancelDelete}
              >
                No
              </Button>
              <Button
                type='submit'
                variant='outlined'
                sx={{ width: '50%' }}
                onClick={handleDeleteRealty}
              >
                Yes
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      <Modal open={isFormOpen} closeAfterTransition>
        <Fade in={isFormOpen}>
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
            <RealtyForm
              onCancel={handleCancelEdit}
              defaultValues={editedRealty}
            />
          </Box>
        </Fade>
      </Modal>
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => setIsFormOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
        }}
      >
        Add
      </Button>
    </>
  );
};

export default RealtyBoard;
