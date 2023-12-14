import {
  Box,
  Button,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Edit } from '@mui/icons-material';

import { actions, selectors } from '../../modules/utilities/store';
import { AppDispatch } from '../../store';
import UtilityForm from '../../components/UtilityForm/UtilityForm';
import { UtilityItem } from '../../modules/utilities/types/utility';
import { renderIcon } from '../../components/IconPicker/IconPicker';

const UtilitiesBoard = ({}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedUtility, setEditedUtility] = useState<UtilityItem | undefined>(
    undefined,
  );
  const utilitiesList = useSelector(selectors.selectUtility);
  const utilitiesListArr = utilitiesList ? Object.keys(utilitiesList) : [];
  const dispatch: AppDispatch = useDispatch();

  const handleCancelEdit = () => {
    setIsFormOpen(false);
    setTimeout(() => {
      setEditedUtility(undefined);
    }, 100);
  };

  const handleOpenEditModal = (utility: string) => {
    setEditedUtility(utilitiesList[utility]);
    setIsFormOpen(true);
  };

  return (
    <>
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => setIsFormOpen(true)}
      >
        Add
      </Button>
      <List>
        {utilitiesListArr.map((utility: string) => (
          <ListItem
            key={utility}
            secondaryAction={
              <IconButton
                edge='end'
                onClick={() => handleOpenEditModal(utility)}
              >
                <Edit />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {renderIcon(utilitiesList[utility].icon || 'Circle')}
              </ListItemIcon>
              <ListItemText primary={utilitiesList[utility].name} />
              <ListItemText primary={utilitiesList[utility].comment} />
              <ListItemText
                primary={`${utilitiesList[utility].price}/${utilitiesList[utility].units}`}
              />
              <ListItemIcon>
                {renderIcon(
                  utilitiesList[utility].isCountable
                    ? 'Speed'
                    : 'CalendarMonth',
                )}
              </ListItemIcon>
            </ListItemButton>
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
              defaultValues={editedUtility}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UtilitiesBoard;
