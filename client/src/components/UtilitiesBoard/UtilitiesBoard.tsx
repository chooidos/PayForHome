import {
  Box,
  Button,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Edit } from '@mui/icons-material';
import * as icons from '@mui/icons-material';
import React from 'react';

import { actions, selectors } from '../../modules/utilities/store';
import { AppDispatch } from '../../store';
import UtilityForm from '../UtilityForm/UtilityForm';
import { UtilityItem } from '../../modules/utilities/types/utility';

const UtilitiesBoard = ({}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedUtility, setEditedUtility] = useState<UtilityItem | undefined>(
    undefined,
  );

  const handleCancelEdit = () => {
    setEditedUtility(undefined);
    setIsFormOpen(false);
  };

  const dispatch: AppDispatch = useDispatch();
  const utilitiesList = useSelector(selectors.selectUtility);

  const utilitiesListArr = utilitiesList ? Object.keys(utilitiesList) : [];

  useEffect(() => {
    dispatch(actions.getAllUtilities());
  }, []);

  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null,
  );

  return (
    <>
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => setIsFormOpen(true)}
        // sx={{
        //   position: 'fixed',
        //   bottom: '20px',
        //   right: '20px',
        //   zIndex: 100,
        // }}
      >
        Add
      </Button>
      <List>
        {utilitiesListArr.map((utility: string) => (
          <ListItem
            key={utility}
            secondaryAction={
              <IconButton edge='end'>
                <Edit />
              </IconButton>
            }
          >
            {utilitiesList[utility].name}
          </ListItem>
        ))}
      </List>
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
            <UtilityForm
              onCancel={handleCancelEdit}
              // defaultValues={editedRealty}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UtilitiesBoard;
