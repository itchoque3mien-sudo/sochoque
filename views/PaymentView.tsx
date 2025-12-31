
import React, { useState } from 'react';
import { Debtor } from '../types';

interface PaymentViewProps {
  debtor: Debtor;
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ debtor, onBack, onConfirm }) => {
  const [amount, setAmount] = useState<string>(debtor.totalDebt.toLocaleString('vi-VN'));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      setAmount(parseInt(value).toLocaleString('vi-VN'));
    } else {
      setAmount('');
    }
  };

  const handleQuickSelect = (percent: number) => {
    const calculated = Math.floor(debtor.totalDebt * percent);
    setAmount(calculated.toLocaleString('vi-VN'));
  };

  const currentNumericAmount = parseInt(amount.replace(/\D/g, '')) || 0;

  return (
    <div className="bg-background-light min-h-screen flex flex-col antialiased relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-bright/5 pointer-events-none z-0"></div>
      
      <header className="relative z-10 flex items-center justify-between px-4 pt-6 pb-2 bg-white/90 backdrop-blur-sm sticky top-0">
        <button onClick={onBack} className="flex items-center justify-center size-12 bg-white rounded-full shadow-sm border border-gray-100 active:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-gray-800" style={{ fontSize: '28px' }}>arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-black uppercase tracking-tight text-gray-900">
          ĐÃ TRẢ TIỀN
        </h1>
        <div className="size-12"></div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar px-5 py-4 flex flex-col items-center w-full max-w-md mx-auto">
        <div className="w-full h-2 mb-6 bg-repeat-x opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #2bee6c 0, #2bee6c 10px, transparent 10px, transparent 20px)' }}></div>

        {/* Identity Card */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-soft border border-gray-100 text-center mb-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-bright to-transparent opacity-50"></div>
          <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-2">Người trả tiền</p>
          <h2 className="text-[32px] leading-tight font-black text-gray-900 break-words">{debtor.name}</h2>
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
            <span className="material-symbols-outlined text-sm">storefront</span>
            {debtor.category}
          </div>
        </div>

        {/* Current Debt Status */}
        <div className="w-full flex flex-col items-center justify-center py-4 mb-6">
          <p className="text-gray-500 font-bold text-lg mb-1">Tổng nợ hiện tại</p>
          <div className="relative">
            <h3 className="text-[48px] leading-none font-black text-red-600 tracking-tight">
              {debtor.totalDebt.toLocaleString('vi-VN')}
            </h3>
            <span className="absolute -top-1 -right-6 text-xl font-bold text-red-600">đ</span>
          </div>
          <div className="h-1 w-16 bg-red-100 rounded-full mt-4"></div>
        </div>

        {/* Payment Input */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-soft border border-primary-bright/20 flex flex-col gap-4">
          <label className="flex flex-col gap-3">
            <span className="text-gray-900 font-bold text-xl">Số tiền thực tế đã trả</span>
            <div className="relative w-full">
              <input 
                className="w-full h-20 pl-6 pr-14 text-right text-[36px] font-bold rounded-xl border-2 border-primary-bright bg-green-50/30 text-gray-900 focus:ring-4 focus:ring-primary-bright/20 focus:border-primary-bright focus:outline-none transition-all placeholder:text-gray-300" 
                inputMode="numeric" placeholder="0" type="text"
                value={amount}
                onChange={handleAmountChange}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-2xl font-bold pointer-events-none">đ</span>
            </div>
          </label>
          
          <div className="flex gap-3 justify-end flex-wrap">
            <button 
              onClick={() => handleQuickSelect(0.5)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-600 transition-colors"
            >
              50% ({(debtor.totalDebt * 0.5 / 1000).toLocaleString('vi-VN')}k)
            </button>
            <button 
              onClick={() => handleQuickSelect(1)}
              className="flex items-center gap-1 px-4 py-2 bg-primary-bright/10 hover:bg-primary-bright/20 border border-primary-bright/20 rounded-lg text-sm font-bold text-green-800 transition-colors"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              Trả hết
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-20 w-full bg-white border-t border-gray-100 p-4 pb-6 shadow-lg">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <button 
            onClick={() => onConfirm(currentNumericAmount)}
            className="w-full group relative overflow-hidden bg-primary-bright hover:brightness-95 text-green-950 text-xl font-black py-4 rounded-xl shadow-float active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-3xl font-bold">check</span>
            <span>XÁC NHẬN THANH TOÁN</span>
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 w-full bg-transparent border-2 border-dashed border-gray-300 text-gray-500 font-bold py-3 rounded-xl transition-colors">
              <span className="material-symbols-outlined text-xl">edit_note</span>
              Ghi chú
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-transparent text-red-500 font-bold py-3 rounded-xl transition-colors">
              <span className="material-symbols-outlined text-xl">delete</span>
              Xoá nợ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentView;
