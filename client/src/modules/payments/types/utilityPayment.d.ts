export interface UtilityPaymentItem {
  id: string;
  realtyUtilityId: string;
  date: Date | string;
  value?: number;
  consumed?: number;
  price: number;
  totalPrice?: number;
  paid: string;
  recipe?: string;
}
