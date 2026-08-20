export type SizeLabel = "1.5L" | "2.5L" | "3.5L" | "5L" | "Standard";

export interface MenuVariant {
  id: string;
  size: SizeLabel;
  price: number; // in Naira
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  variants: MenuVariant[];
  isAvailable: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  note?: string; // e.g. "Sold by portion, not by litre"
  items: MenuItem[];
}

export interface CartLine {
  lineId: string; // unique per cart line (item + variant)
  itemId: string;
  itemName: string;
  categoryName: string;
  size: SizeLabel;
  unitPrice: number;
  quantity: number;
}

/**
 * PAYMENT STATUS — set by the customer ("payment sent") and confirmed only
 * by the vendor after checking the bank account. Never auto-advances.
 */
export type PaymentStatus =
  | "awaiting_transfer" // order placed, waiting for customer to pay
  | "payment_verification" // customer tapped "I've Made Payment"
  | "payment_received" // vendor manually confirmed the funds arrived
  | "payment_not_received"; // vendor checked and money never came

/**
 * ORDER / FOOD STATUS — moves forward only after payment_received,
 * driven entirely by the vendor from the kitchen.
 */
export type OrderStatus =
  | "order_received"
  | "preparing"
  | "cooking"
  | "ready"
  | "completed"
  | "cancelled";

export const ORDER_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "order_received", label: "Order Received" },
  { key: "preparing", label: "Preparing" },
  { key: "cooking", label: "Cooking" },
  { key: "ready", label: "Ready" },
  { key: "completed", label: "Completed" }
];

export interface Order {
  id: string;
  orderNumber: string; // e.g. "1045" (displayed as #1045)
  customerName: string;
  phone: string;
  tableOrLocation?: string;
  items: CartLine[];
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VendorBankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}
