
import React, { useState } from 'react';
import { Debtor, DebtType } from '../types';

interface HomeViewProps {
  debtors: Debtor[];
  onSelectDebtor: (id: string) => void;
  onAddDebt: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ debtors, onSelectDebtor, onAddDebt }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DebtType>(DebtType.CUSTOMER_OWES_ME);

  const totalCustomerDebt = debtors
    .filter(d => d.type === DebtType.CUSTOMER_OWES_ME)
    .reduce((sum, d) => sum + d.totalDebt, 0);

  const totalSupplierDebt = debtors
    .filter(d => d.type === DebtType.I_OWE_SUPPLIER)
    .reduce((sum, d) => sum + d.totalDebt, 0);

  const filteredDebtors = debtors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = d.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col bg-background-light overflow-hidden">
      {/* Header section */}
      <div className="flex-none bg-white z-20 shadow-sm">
        <header className="pt-6 px-4 pb-4 bg-white border-b border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-extrabold text-header-blue tracking-tight uppercase leading-none">SỔ NỢ</h1>
            <p className="text-lg font-bold text-black leading-tight text-right">
              T4, 31 tháng 12 <span className="text-stone-500 font-medium">(12 Th 11 ÂL)</span>
            </p>
          </div>
          <div className="flex gap-3 h-14 items-stretch">
            <button className="flex items-center justify-center bg-white text-black border-2 border-stone-200 rounded-xl px-6 shadow-sm active:scale-95 transition-all">
              <span className="text-sm font-bold uppercase whitespace-nowrap">HÔM NAY</span>
            </button>
            <button className="flex-1 bg-white border-2 border-stone-200 text-black rounded-xl shadow-sm hover:bg-stone-50 active:scale-95 transition-all text-sm font-bold flex items-center justify-center px-4 overflow-hidden">
              <span className="truncate uppercase">TỪ NGÀY - ĐẾN NGÀY</span>
            </button>
          </div>
        </header>

        {/* Debt Summary Card */}
        <section className="p-4 pb-2">
          <div className="bg-white rounded-2xl p-5 border-2 border-stone-100 shadow-sm flex flex-col items-center text-center gap-1">
            <span className="text-primary font-black text-xl uppercase tracking-tight">KHÁCH NỢ</span>
            <div className="text-4xl leading-tight font-black text-primary my-1 tracking-tight flex items-baseline gap-2 justify-center">
              {totalCustomerDebt.toLocaleString('vi-VN')} <span className="text-2xl font-bold">đ</span>
            </div>
            <div className="mt-2 pt-3 border-t border-stone-100 w-full flex items-center justify-center">
              <div className="flex items-center gap-2 text-debt-orange">
                <span className="font-bold text-sm">TÔI NỢ:</span>
                <span className="font-black text-lg tracking-widest">{totalSupplierDebt.toLocaleString('vi-VN')} đ</span>
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Tabs */}
        <section className="px-4 pb-2 pt-1">
          <div className="relative shadow-sm rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-stone-400 text-2xl">search</span>
            </div>
            <input 
              className="block w-full pl-12 pr-12 py-3 h-14 bg-white border-2 border-stone-300 rounded-xl text-lg font-bold placeholder-stone-400 focus:ring-4 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
              placeholder="Gõ tên (VD: Chị Hương)" 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className="px-4 py-2 mb-2">
          <div className="flex gap-3">
            <button 
              onClick={() => setFilterType(DebtType.CUSTOMER_OWES_ME)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap active:opacity-90 transition-all uppercase ${filterType === DebtType.CUSTOMER_OWES_ME ? 'bg-primary text-white' : 'bg-stone-200 text-stone-600'}`}
            >
              KHÁCH NỢ
            </button>
            <button 
              onClick={() => setFilterType(DebtType.I_OWE_SUPPLIER)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap active:opacity-90 transition-all uppercase ${filterType === DebtType.I_OWE_SUPPLIER ? 'bg-debt-bg text-white' : 'bg-stone-200 text-stone-600'}`}
            >
              TÔI NỢ
            </button>
          </div>
        </section>
      </div>

      {/* Debtor List section - scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <section className="flex flex-col gap-3 px-4 pt-2 pb-4">
          <div className="flex items-center justify-between px-2 pb-1">
            <h2 className="text-lg font-bold text-stone-800">Danh sách ({filteredDebtors.length} người)</h2>
          </div>
          
          {filteredDebtors.map((debtor) => (
            <div 
              key={debtor.id}
              onClick={() => onSelectDebtor(debtor.id)}
              className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 active:bg-stone-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`size-14 rounded-full flex items-center justify-center text-2xl font-black shrink-0 border ${debtor.type === DebtType.CUSTOMER_OWES_ME ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                  {debtor.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black text-stone-900 leading-tight">{debtor.name}</h3>
                      <p className="text-stone-600 font-bold text-sm mt-1">{debtor.category}</p>
                    </div>
                    <div className="text-right">
                      <span className={`block text-2xl font-black tracking-tight ${debtor.type === DebtType.CUSTOMER_OWES_ME ? 'text-primary' : 'text-debt-orange'}`}>
                        {(debtor.totalDebt / 1000).toLocaleString('vi-VN')}k
                      </span>
                      <span className="text-stone-500 text-sm font-bold">{debtor.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredDebtors.length === 0 && (
            <div className="text-center py-10">
              <p className="text-stone-400 font-bold italic">Không tìm thấy người nợ nào</p>
            </div>
          )}
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-5 z-40">
        <button 
          onClick={onAddDebt}
          className="flex items-center gap-3 pl-3 pr-8 py-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark active:scale-95 transition-all ring-4 ring-white"
        >
          <span className="flex items-center justify-center size-12 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-3xl font-bold">add</span>
          </span>
          <span className="text-lg font-black uppercase tracking-wide">THÊM MỚI</span>
        </button>
      </div>
    </div>
  );
};

export default HomeView;
