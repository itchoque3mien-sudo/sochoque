
import { Debtor, DebtType } from './types';

export const INITIAL_DEBTORS: Debtor[] = [
  {
    id: '1',
    name: 'Chị Hương',
    phone: '0975586455',
    category: 'Hàng Cá',
    totalDebt: 12500000,
    type: DebtType.CUSTOMER_OWES_ME,
    lastUpdate: '20/05/2024',
    history: [
      { id: 'h1', date: '20/05', item: 'Lô cá trắm', quantity: '50kg', amount: 12500000 }
    ]
  },
  {
    id: '2',
    name: 'Anh Tuấn',
    phone: '0981223344',
    category: 'Rau Củ',
    totalDebt: 3200000,
    type: DebtType.CUSTOMER_OWES_ME,
    lastUpdate: 'Hôm qua',
    history: [
      { id: 'h2', date: '21/05', item: 'Su su, Bắp cải', quantity: '2 bao', amount: 3200000 }
    ]
  },
  {
    id: '3',
    name: 'Cô Ba',
    phone: '0912345678',
    category: 'Hàng Rau',
    totalDebt: 500000,
    type: DebtType.CUSTOMER_OWES_ME,
    lastUpdate: '24/05/2024',
    history: [
      { id: 'h3', date: '24/05', item: 'Ghi nợ rau củ', quantity: '', amount: 500000 }
    ]
  },
  {
    id: '4',
    name: 'Kho Buôn Tuấn Hưng',
    phone: '0975586455',
    category: 'Nhà cung cấp',
    totalDebt: 5200000,
    type: DebtType.I_OWE_SUPPLIER,
    lastUpdate: '20/10/2023',
    history: [
      { id: 'h4', date: '20/10', item: 'Lô áo sơ mi', quantity: '50 cái', amount: 5200000 }
    ]
  }
];
