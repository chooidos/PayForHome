import { iconsType } from '../../../components/IconPicker/IconPicker';

export interface UtilityItem {
  id: string;
  name: string;
  isCountable: boolean;
  isDeleted: boolean;
  units?: string;
  price: number;
  icon: iconsType;
  comment: string;
}
