import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import * as icons from '@mui/icons-material';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { FC, useState } from 'react';

const LISTBOX_PADDING = 4;

const iconsList = Object.keys(icons);

export type iconsType = keyof typeof icons;

export const renderIcon = (icon: iconsType) => React.createElement(icons[icon]);

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component='div' style={style}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <ListItem {...dataSet[0]} style={style}>
      <ListItemIcon>{renderIcon(dataSet[1])}</ListItemIcon>
      <ListItemText primary={dataSet[1]} />
    </ListItem>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const itemCount = itemData.length;
  const itemSize = 48;

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

interface IconPickerProps {
  defaultValue?: iconsType;
  onSelect: (value: iconsType | null) => void;
}

const IconPicker: FC<IconPickerProps> = ({ defaultValue, onSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState<iconsType | undefined>(
    defaultValue,
  );

  const handleSelection = (e: any, value: string | null) => {
    onSelect && onSelect(value as iconsType);
    setSelectedIcon(value as iconsType);
  };

  return (
    <Stack direction='row' gap={1} alignItems='flex-end'>
      <Box>{renderIcon(selectedIcon || defaultValue || 'Circle')}</Box>
      <Autocomplete
        fullWidth
        disableListWrap
        value={selectedIcon}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={iconsList}
        groupBy={(icon) => icon[0].toUpperCase()}
        renderInput={(params) => (
          <TextField variant='standard' {...params} label='Icon' />
        )}
        onChange={handleSelection}
        renderOption={(props, option, state) =>
          [props, option, state.index] as React.ReactNode
        }
        renderGroup={(params) => params as any}
      />
    </Stack>
  );
};

export default IconPicker;
