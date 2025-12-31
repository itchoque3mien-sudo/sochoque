
import React, { useState, useMemo } from 'react';
import { ViewState, Debtor, DebtType } from './types';
import { INITIAL_DEBTORS } from './constants';
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import NewDebtView from './views/NewDebtView';
import PaymentView from './views/PaymentView';
import SuccessView from './views/SuccessView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [debtors, setDebtors] = useState<Debtor[]>(INITIAL_DEBTORS);
  const [selectedDebtorId, setSelectedDebtorId] = useState<string | null>(null);
  const [lastPaymentAmount, setLastPaymentAmount] = useState<number>(0);

  const activeDebtor = useMemo(() => 
    debtors.find(d => d.id === selectedDebtorId) || null
  , [debtors, selectedDebtorId]);

  const handleSelectDebtor = (id: string) => {
    setSelectedDebtorId(id);
    setCurrentView('DETAIL');
  };

  const handleAddDebt = (newDebtor: Debtor) => {
    setDebtors(prev => [newDebtor, ...prev]);
    setCurrentView('HOME');
  };

  const handleConfirmPayment = (amount: number) => {
    if (!activeDebtor) return;
    
    setDebtors(prev => prev.map(d => {
      if (d.id === activeDebtor.id) {
        const newTotal = d.totalDebt - amount;
        const newTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
          item: 'Trả bớt tiền',
          amount: amount,
          isPayment: true
        };
        return {
          ...d,
          totalDebt: newTotal,
          history: [newTransaction, ...d.history],
          lastUpdate: 'Vừa xong'
        };
      }
      return d;
    }));
    
    setLastPaymentAmount(amount);
    setCurrentView('SUCCESS');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView onSelectDebtor={handleSelectDebtor} onAddDebt={() => setCurrentView('NEW_DEBT')} debtors={debtors} />;
      case 'DETAIL':
        return activeDebtor ? (
          <DetailView 
            debtor={activeDebtor} 
            onBack={() => setCurrentView('HOME')} 
            onPay={() => setCurrentView('PAYMENT')}
            onAddDebt={() => setCurrentView('NEW_DEBT')} 
          />
        ) : null;
      case 'NEW_DEBT':
        return <NewDebtView onBack={() => setCurrentView('HOME')} onSave={handleAddDebt} />;
      case 'PAYMENT':
        return activeDebtor ? (
          <PaymentView 
            debtor={activeDebtor} 
            onBack={() => setCurrentView('DETAIL')} 
            onConfirm={handleConfirmPayment} 
          />
        ) : null;
      case 'SUCCESS':
        return activeDebtor ? (
          <SuccessView 
            debtor={activeDebtor} 
            amount={lastPaymentAmount} 
            onHome={() => setCurrentView('HOME')} 
            onRevisit={() => setCurrentView('DETAIL')}
          />
        ) : null;
      default:
        return <HomeView onSelectDebtor={handleSelectDebtor} onAddDebt={() => setCurrentView('NEW_DEBT')} debtors={debtors} />;
    }
  };

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden font-display">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
