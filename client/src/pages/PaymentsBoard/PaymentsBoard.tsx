import { Box, Button, Fade, Modal } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import UtilityPaymentForm from '../../components/UtilityPaymentForm/UtilityPaymentForm';
import { AppDispatch } from '../../store';
import { selectors as realtySelectors } from '../../modules/realty/store';
import { selectors as utilitiesSelectors } from '../../modules/utilities/store';
import { actions, selectors } from '../../modules/payments/store';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', minWidth: 120 },
  {
    field: 'value',
    headerName: 'Value',
    editable: true,
    sortable: false,
  },
  {
    field: 'consumed',
    headerName: 'Consumed',
    editable: false,
    sortable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    editable: true,
    sortable: false,
  },
  {
    field: 'totalPrice',
    headerName: 'Total price',
    editable: false,
  },
  {
    field: 'paid',
    headerName: 'Paid',
    editable: true,
  },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const PaymentsBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { realtyName = '', utilityName = '' } = useParams();

  const utilitiesList = useSelector(utilitiesSelectors.selectUtility);
  const realtyList = useSelector(realtySelectors.selectRealty);
  const utilityPaymentsList = useSelector(selectors.selectutilityPayment);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isFirstLoad && realtyList && utilitiesList) {
      dispatch(
        actions.getUtilityPayment({
          realtyId: realtyList[realtyName].id,
          utilityId: utilitiesList[utilityName].id,
        }),
      );
      setIsFirstLoad(false);
    }
    if (realtyList && utilitiesList) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, realtyList]);

  return (
    <Box>
      <Button
        onClick={() => setIsFormOpen(true)}
        variant='contained'
        startIcon={<Add />}
        sx={{ mb: 2 }}
      >
        Add
      </Button>
      <Box sx={{ minHeight: 300, width: '100%' }}>
        <DataGrid
          rows={utilityPaymentsList || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
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
            <UtilityPaymentForm
              onCancel={() => setIsFormOpen(false)}
              values={{ realtyName, utilityName }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PaymentsBoard;
