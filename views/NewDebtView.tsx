
import React, { useState } from 'react';
import { Debtor, DebtType } from '../types';

interface NewDebtViewProps {
  onBack: () => void;
  onSave: (debtor: Debtor) => void;
}

const NewDebtView: React.FC<NewDebtViewProps> = ({ onBack, onSave }) => {
  const [type, setType] = useState<DebtType>(DebtType.CUSTOMER_OWES_ME);
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [items, setItems] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (!name || !amount) {
      alert("Vui lòng nhập tên và số tiền");
      return;
    }

    const newDebtor: Debtor = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      category: type === DebtType.CUSTOMER_OWES_ME ? 'Khách lẻ' : 'Nhà cung cấp',
      totalDebt: parseInt(amount.replace(/\D/g, '')),
      type,
      lastUpdate: 'Vừa xong',
      history: [
        {
          id: 'h-' + Date.now(),
          date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
          item: items || 'Ghi nợ mới',
          amount: parseInt(amount.replace(/\D/g, ''))
        }
      ]
    };
    onSave(newDebtor);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      setAmount(parseInt(value).toLocaleString('vi-VN'));
    } else {
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light paper-texture relative">
      <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex flex-col pt-2 pb-3 px-4 max-w-lg mx-auto w-full">
          <div className="flex items-center h-14 justify-between -ml-2 mb-1">
            <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 rounded-xl text-black active:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-[36px] font-bold">arrow_back</span>
              <span className="text-xl font-bold">Quay lại</span>
            </button>
          </div>
          <h1 className="text-black text-[36px] font-black leading-none tracking-tight px-1 uppercase drop-shadow-sm">
            GHI NỢ MỚI
          </h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto p-5 pb-40 z-10">
        <div className="flex flex-col gap-8">
          {/* Debt Type Selector */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setType(DebtType.CUSTOMER_OWES_ME)}
              className={`relative flex flex-col items-center justify-center h-32 p-2 rounded-2xl transition-all active:scale-95 border-[3px] shadow-sm ${type === DebtType.CUSTOMER_OWES_ME ? 'bg-primary-bright border-primary-dark text-black' : 'bg-white border-gray-100 text-stone-400'}`}
              type="button"
            >
              {type === DebtType.CUSTOMER_OWES_ME && (
                <div className="absolute top-2 right-2 bg-white text-primary-dark rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xl font-bold">check</span>
                </div>
              )}
              <span className="material-symbols-outlined text-[44px] mb-1 font-bold">arrow_downward</span>
              <span className="text-sm font-black text-center leading-tight uppercase">Khách hàng<br/>nợ tôi</span>
            </button>
            <button 
              onClick={() => setType(DebtType.I_OWE_SUPPLIER)}
              className={`relative flex flex-col items-center justify-center h-32 p-2 rounded-2xl transition-all active:scale-95 border-[3px] shadow-sm ${type === DebtType.I_OWE_SUPPLIER ? 'bg-white border-orange-500 text-orange-600' : 'bg-white border-gray-100 text-stone-400'}`}
              type="button"
            >
              {type === DebtType.I_OWE_SUPPLIER && (
                <div className="absolute top-2 right-2 bg-white text-orange-500 rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xl font-bold">check</span>
                </div>
              )}
              <span className="material-symbols-outlined text-[44px] mb-1 font-bold">arrow_upward</span>
              <span className="text-sm font-bold text-center leading-tight uppercase">Tôi nợ<br/>Nhà cung cấp</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-bold uppercase tracking-wide">Số tiền nợ</label>
              <div className="flex items-center w-full bg-white border-4 border-primary-bright/40 rounded-2xl overflow-hidden shadow-sm h-[80px] relative">
                <input 
                  className="w-full h-full border-none bg-transparent pl-5 pr-14 text-[44px] font-black text-primary-bright tracking-tight placeholder:text-gray-200 focus:ring-0 leading-none" 
                  inputMode="numeric" placeholder="0" type="text"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 text-[24px] font-bold">đ</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-bold uppercase tracking-wide">Tên người nợ / Đối tác</label>
              <div className="flex items-center w-full bg-white border-2 border-gray-300 rounded-xl overflow-hidden h-[64px] shadow-sm">
                <div className="pl-4 text-gray-400">
                  <span className="material-symbols-outlined text-[28px]">person</span>
                </div>
                <input 
                  className="w-full h-full border-none bg-transparent px-3 text-lg font-bold text-black placeholder:text-gray-300 focus:ring-0" 
                  placeholder="Nhập tên..." type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="h-full px-4 bg-gray-50 border-l border-gray-200 flex flex-col items-center justify-center min-w-[70px]">
                  <span className="material-symbols-outlined text-primary-bright text-[24px]">contacts</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Danh bạ</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-bold uppercase tracking-wide">Số điện thoại</label>
              <div className="flex items-center w-full bg-white border-2 border-gray-300 rounded-xl overflow-hidden h-[64px] shadow-sm">
                <div className="pl-4 text-gray-400">
                  <span className="material-symbols-outlined text-[28px]">call</span>
                </div>
                <input 
                  className="w-full h-full border-none bg-transparent px-3 text-lg font-bold text-black placeholder:text-gray-300 focus:ring-0" 
                  inputMode="tel" placeholder="09..." type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-bold uppercase tracking-wide">Mặt hàng / Nội dung</label>
              <div className="w-full bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm">
                <textarea 
                  className="w-full min-h-[100px] border-none bg-transparent p-4 text-lg font-medium leading-relaxed text-black placeholder:text-gray-300 focus:ring-0 resize-none" 
                  placeholder="Ví dụ: Gạo ST25, Thùng bia, Nước mắm..."
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 py-6">
              <button 
                onClick={() => setShowModal(true)}
                className="group relative flex items-center justify-center w-32 h-32 rounded-full bg-yellow-400 hover:bg-yellow-500 active:scale-95 shadow-xl transition-all border-4 border-white" 
                type="button"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10">
                  <span className="material-symbols-outlined text-3xl text-black font-bold mb-1">fingerprint</span>
                  <span className="text-[12px] font-black text-black uppercase leading-tight text-center px-2">XÁC THỰC<br/>NỢ</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-lg mx-auto p-4 pb-8">
          <button 
            onClick={handleSubmit}
            className="w-full h-16 bg-primary-bright hover:brightness-95 active:scale-[0.98] rounded-2xl shadow-float flex items-center justify-center gap-3 transition-all border-2 border-transparent"
          >
            <span className="material-symbols-outlined text-black text-[32px]">save</span>
            <span className="text-xl font-black text-black uppercase tracking-wide">LƯU LẠI KHOẢN NỢ</span>
          </button>
        </div>
      </div>

      {/* Proof Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
          <div className="relative w-full max-w-[340px] bg-white rounded-3xl p-6 shadow-2xl border-4 border-white animate-in slide-in-from-bottom-5">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <span className="material-symbols-outlined text-xl font-bold">close</span>
            </button>
            <h3 className="text-center text-xl font-black text-black mb-6 uppercase tracking-wide">XÁC THỰC NỢ</h3>
            <div className="flex flex-col gap-4">
              <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl border-2 border-blue-200 gap-4 transition-all active:scale-[0.98]">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-2xl">mic</span>
                </div>
                <span className="text-lg font-black text-blue-900 uppercase">Ghi âm</span>
              </button>
              <button className="flex items-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border-2 border-emerald-200 gap-4 transition-all active:scale-[0.98]">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
                <span className="text-lg font-black text-emerald-900 uppercase">Chụp ảnh</span>
              </button>
              <button className="flex items-center p-4 bg-rose-50 hover:bg-rose-100 rounded-2xl border-2 border-rose-200 gap-4 transition-all active:scale-[0.98]">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-2xl">videocam</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-black text-rose-900 uppercase">Quay Video</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1 py-0.5 rounded mt-1 uppercase">Ngắn (4-5s)</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDebtView;
