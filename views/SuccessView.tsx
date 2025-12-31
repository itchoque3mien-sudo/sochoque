
import React from 'react';
import { Debtor } from '../types';

interface SuccessViewProps {
  debtor: Debtor;
  amount: number;
  onHome: () => void;
  onRevisit: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ debtor, amount, onHome, onRevisit }) => {
  return (
    <div className="font-nunito bg-background-light text-green-950 min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#2bee6c 0.5px, transparent 0.5px), radial-gradient(#2bee6c 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }}></div>

      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-lg mx-auto p-5 md:p-6 justify-between">
        <div className="flex flex-col items-center justify-center pt-12 pb-4 gap-6">
          <h1 className="text-primary-bright text-4xl font-black text-center uppercase tracking-wide leading-tight drop-shadow-sm">
            THANH TOÁN<br/>THÀNH CÔNG!
          </h1>
          
          <div className="relative group my-2">
            <div className="absolute inset-0 bg-primary-bright/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white p-5 rounded-full border-[3px] border-primary-bright/40 shadow-sm">
              <span className="material-symbols-outlined text-primary-bright !text-[96px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                handshake
              </span>
            </div>
          </div>
          
          <p className="text-xl font-bold text-center mt-1">
            Đã ghi vào sổ nợ của {debtor.name}
          </p>
        </div>

        <div className="w-full flex-1 flex flex-col justify-center py-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border-2 border-gray-100 relative overflow-hidden">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-gray-500 text-lg font-bold uppercase tracking-wide">
                  SỐ TIỀN THỰC NHẬN
                </span>
                <span className="text-primary-bright text-[44px] font-black tracking-tight flex items-baseline gap-1">
                  {amount.toLocaleString('vi-VN')} <span className="text-2xl">đ</span>
                </span>
              </div>
              
              <div className="w-full border-t-[3px] border-dashed border-gray-100"></div>
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary-bright text-[32px]">person_outline</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm font-bold">Người trả</span>
                    <span className="text-black text-xl font-extrabold line-clamp-1">{debtor.name}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary-bright text-[32px]">calendar_today</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm font-bold">Ngày nhận</span>
                    <span className="text-black text-xl font-extrabold">
                      {new Date().toLocaleDateString('vi-VN', { 
                        day: '2-digit', month: '2-digit', year: 'numeric' 
                      })} - {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[160px] text-primary-bright/5 pointer-events-none rotate-[-15deg] select-none">
              verified
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-6 mb-2">
          <button 
            onClick={onRevisit}
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-[72px] px-6 bg-primary-bright hover:brightness-95 text-green-950 shadow-lg active:scale-[0.98] transition-transform"
          >
            <span className="text-xl font-extrabold tracking-wide uppercase">XEM LẠI CHI TIẾT NỢ</span>
          </button>
          <button 
            onClick={onHome}
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-[72px] px-6 bg-transparent border-[3px] border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-transform"
          >
            <span className="text-xl font-extrabold tracking-wide uppercase">VỀ SỔ NỢ CHÍNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
