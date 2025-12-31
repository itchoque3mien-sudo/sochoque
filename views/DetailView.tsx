
import React from 'react';
import { Debtor, DebtType } from '../types';

interface DetailViewProps {
  debtor: Debtor;
  onBack: () => void;
  onPay: () => void;
  onAddDebt: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ debtor, onBack, onPay, onAddDebt }) => {
  const isSupplier = debtor.type === DebtType.I_OWE_SUPPLIER;
  const themeColor = isSupplier ? 'text-debt-orange' : 'text-primary';
  const themeBg = isSupplier ? 'bg-orange-50' : 'bg-green-50';
  const themeBorder = isSupplier ? 'border-orange-100' : 'border-green-100';
  const btnColor = isSupplier ? 'bg-debt-orange' : 'bg-primary';

  return (
    <div className="font-display bg-background-light text-slate-900 market-pattern min-h-screen flex flex-col antialiased relative">
      {/* Floating Action Buttons from the UI screenshot */}
      <div className="fixed right-4 bottom-32 z-[60] flex flex-col items-end gap-3 pointer-events-none">
        <a className="pointer-events-auto w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl border border-slate-100 overflow-hidden" href="#">
          <img alt="Zalo" className="w-full h-full object-cover" src="https://picsum.photos/64/64?random=zalo" />
        </a>
        <a className="pointer-events-auto w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-xl animate-subtle-pulse" href="#">
          <span className="material-symbols-outlined text-white text-[36px] font-bold">call</span>
        </a>
        <button className="pointer-events-auto w-auto h-14 rounded-full bg-orange-500 flex items-center justify-center gap-2 pl-4 pr-6 shadow-xl text-white mt-1">
          <span className="material-symbols-outlined text-[28px] font-bold">share</span>
          <span className="font-bold text-lg whitespace-nowrap uppercase">CHIA SẺ</span>
        </button>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 h-16">
          <button onClick={onBack} className="flex items-center gap-1 text-slate-700 hover:bg-slate-100 p-2 -ml-2 rounded-lg transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[32px] font-bold">arrow_back_ios_new</span>
            <span className="text-xl font-bold">Quay lại</span>
          </button>
        </div>
        <div className="px-4 pb-4 pt-1 bg-white border-b border-slate-100">
          <h1 className="text-[32px] font-black text-slate-900 leading-tight uppercase tracking-tight">{debtor.name}</h1>
          <p className="text-slate-800 text-2xl font-bold mt-2 tracking-wide">{debtor.phone}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-64 no-scrollbar">
        <div className="p-4">
          <div className={`relative overflow-hidden rounded-2xl bg-white shadow-md border-2 ${themeBorder}`}>
            <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full ${themeBg} z-0`}></div>
            <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${isSupplier ? 'bg-orange-100 text-debt-orange' : 'bg-green-100 text-green-800'} text-sm font-bold uppercase mb-4`}>
                <span className="material-symbols-outlined text-[20px]">{isSupplier ? 'warning' : 'arrow_downward'}</span>
                {isSupplier ? 'TỔNG SỐ TIỀN TÔI ĐANG NỢ' : 'Đang nợ tôi'}
              </span>
              <h2 className={`text-[44px] font-black tracking-tight ${themeColor} leading-none my-2 flex items-baseline justify-center gap-2`}>
                {debtor.totalDebt.toLocaleString('vi-VN')} <span className="text-3xl font-bold text-slate-500">đ</span>
              </h2>
            </div>
            <div className={`h-3 w-full ${isSupplier ? 'bg-orange-500/20' : 'bg-green-500/20'}`}>
              <div className={`h-full ${isSupplier ? 'bg-orange-500' : 'bg-green-500'} w-3/4`}></div>
            </div>
          </div>
        </div>

        <div className="px-5 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-500 text-[28px]">history</span>
          <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide">Lịch sử nợ</h3>
        </div>

        <div className="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 bg-slate-50 p-4 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
            <div className="col-span-3">Ngày</div>
            <div className="col-span-5">Mặt hàng</div>
            <div className="col-span-4 text-right">Số tiền</div>
          </div>
          
          {debtor.history.map((tx) => (
            <div key={tx.id} className="grid grid-cols-12 gap-2 p-4 border-b border-slate-100 items-center hover:bg-slate-50 transition-colors">
              <div className="col-span-3 flex flex-col">
                <span className="text-lg font-bold text-slate-900">{tx.date}</span>
              </div>
              <div className="col-span-5">
                <span className={`text-lg font-medium text-slate-800 block leading-tight ${tx.isPayment ? 'italic font-bold' : ''}`}>
                  {tx.item}
                </span>
                {tx.quantity && <span className="text-sm text-slate-500 mt-1">{tx.quantity}</span>}
              </div>
              <div className="col-span-4 text-right">
                <span className={`text-lg font-bold ${tx.isPayment ? 'text-slate-500 line-through decoration-2' : themeColor}`}>
                  {tx.isPayment ? '-' : '+'} {(tx.amount / 1000).toLocaleString('vi-VN')}k
                </span>
              </div>
            </div>
          ))}

          <div className="p-4 text-center">
            <button className="text-slate-500 font-bold text-sm flex items-center justify-center gap-1 w-full py-2 bg-slate-50 rounded-lg">
              Xem thêm lịch sử cũ
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-200 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] px-4 py-4 z-50 rounded-t-3xl">
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          <div className="flex gap-3">
            <button 
              onClick={onAddDebt}
              className={`flex-1 hover:brightness-95 active:scale-95 text-white rounded-xl py-4 px-2 flex items-center justify-center gap-2 shadow-lg transition-all ${isSupplier ? 'bg-orange-500' : 'bg-header-blue'}`}
            >
              <span className="material-symbols-outlined text-[28px] font-bold">{isSupplier ? 'add_circle' : 'edit_note'}</span>
              <span className="text-lg font-bold uppercase whitespace-nowrap">Nợ thêm</span>
            </button>
            <button 
              onClick={onPay}
              className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl py-4 px-2 flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-[28px] font-bold">check_circle</span>
              <span className="text-lg font-bold uppercase whitespace-nowrap">Trả tiền</span>
            </button>
          </div>
        </div>
        <div className="h-2"></div>
      </footer>
    </div>
  );
};

export default DetailView;
