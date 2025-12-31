
export enum DebtType {
  CUSTOMER_OWES_ME = 'CUSTOMER_OWES_ME',
  I_OWE_SUPPLIER = 'I_OWE_SUPPLIER'
}

export interface Transaction {
  id: string;
  date: string; // ISO format or DD/MM
  item: string;
  quantity?: string;
  amount: number;
  isPayment?: boolean;
}

export interface Debtor {
  id: string;
  name: string;
  phone: string;
  category: string;
  totalDebt: number;
  type: DebtType;
  history: Transaction[];
  lastUpdate: string;
}

export type ViewState = 'HOME' | 'DETAIL' | 'NEW_DEBT' | 'PAYMENT' | 'SUCCESS';
