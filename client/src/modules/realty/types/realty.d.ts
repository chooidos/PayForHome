import { UtilityItem } from '../../utilities/types/utility';

export interface RealtyItem {
  id: string;
  name: string;
  country?: string;
  city?: string;
  address?: string;
  Utilities?: UtilityItem[];
}
