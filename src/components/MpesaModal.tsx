import React, { useState } from 'react';
import { Designation } from '../types';
import { GIVING_DESIGNATIONS, PRESET_AMOUNTS } from '../data/churchData';

interface MpesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDesignation?: string;
}

export const MpesaModal: React.FC<MpesaModalProps> = ({
  isOpen,
  onClose,
  initialDesignation = 'TITHE'
}) => {
  const [paybill, setPaybill] = useState<'522522' | '247247'>('522522');
  const [selectedDesignation, setSelectedDesignation] = useState(initialDesignation);
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('0718016491');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');

  // Flow states: 'form' | 'stk-prompt' | 'processing' | 'success'
  const [flowState, setFlowState] = useState<'form' | 'stk-prompt' | 'processing' | 'success'>('form');
  const [pin, setPin] = useState('');
  const [receiptCode, setReceiptCode] = useState('');

  if (!isOpen) return null;

  const currentAmount = customAmount ? Number(customAmount) : amount;
  const currentAccount = `NURU-${selectedDesignation} ${donorName ? donorName.toUpperCase().trim() : 'MEMBER'}`;

  const handleInitiateStk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount <= 0) {
      alert('Please select or enter a valid giving amount.');
      return;
    }
    setFlowState('stk-prompt');
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowState('processing');
    setTimeout(() => {
      // Generate random M-Pesa transaction ID
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = 'SHK';
      for (let i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setReceiptCode(code);
      setFlowState('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setFlowState('form');
    setPin('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#c59331]/30">
        {/* Header */}
        <div className="p-5 bg-[#00162c] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2b8c67] text-[#ffffff] flex items-center justify-center font-bold text-xs shadow">
              M-PESA
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#ffffff]">Lipa na M-Pesa Online</h3>
              <p className="text-xs text-[#98f5c9]">Safaricom Express Giving • AIC Nuru Kitale</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full text-[#b1c8e8] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content based on flowState */}
        <div className="p-6">
          {flowState === 'form' && (
            <form onSubmit={handleInitiateStk} className="space-y-5">
              {/* Paybill selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00162c] mb-2">
                  Select Paybill Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaybill('522522')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paybill === '522522'
                        ? 'border-[#2b8c67] bg-[#eaf5f0] ring-2 ring-[#2b8c67]/20'
                        : 'border-[#cadcf2] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-[#2b8c67] block uppercase">Primary (KCB)</span>
                    <span className="text-lg font-bold text-[#00162c] font-mono">522522</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaybill('247247')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paybill === '247247'
                        ? 'border-[#2b8c67] bg-[#eaf5f0] ring-2 ring-[#2b8c67]/20'
                        : 'border-[#cadcf2] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-[#2b8c67] block uppercase">Secondary (Equity)</span>
                    <span className="text-lg font-bold text-[#00162c] font-mono">247247</span>
                  </button>
                </div>
              </div>

              {/* Giving Purpose */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00162c] mb-2">
                  Designation / Fund Category
                </label>
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-sm text-[#00162c] font-semibold focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                >
                  {GIVING_DESIGNATIONS.map((des) => (
                    <option key={des.code} value={des.code}>
                      {des.name} ({des.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    Your Name (for Church Receipt)
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Jonah Tarus"
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    M-Pesa Safaricom Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    required
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm font-mono text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  />
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00162c] mb-2">
                  Giving Amount (KES)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        amount === amt && !customAmount
                          ? 'bg-[#00162c] text-[#ffffff] shadow-sm'
                          : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                      }`}
                    >
                      KES {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount in KES..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                />
              </div>

              {/* Dynamic Account Preview */}
              <div className="p-3.5 rounded-xl bg-[#eef4ff] border border-[#cadcf2] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#43474d] block font-medium">Account Format to be dispatched:</span>
                  <span className="font-mono font-bold text-[#00162c] text-sm">{currentAccount}</span>
                </div>
                <span className="material-symbols-outlined text-[#7d5800]">verified</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#2b8c67] hover:bg-[#003120] text-[#ffffff] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">send_to_mobile</span>
                <span>Send M-Pesa STK Prompt (KES {currentAmount.toLocaleString()})</span>
              </button>
            </form>
          )}

          {flowState === 'stk-prompt' && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#eaf5f0] text-[#2b8c67] flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-3xl animate-bounce">phone_android</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-[#00162c]">
                  SIMULATED M-PESA STK PUSH
                </h4>
                <p className="text-xs text-[#43474d] max-w-sm mx-auto">
                  A prompt has been sent to <strong>{phone}</strong> to authorize giving KES {currentAmount.toLocaleString()} to <strong>AIC Nuru Kitale</strong>.
                </p>
              </div>

              {/* Mobile STK Alert Simulation Box */}
              <div className="p-4 rounded-xl bg-[#0b1d2d] text-[#ffffff] text-left space-y-3 shadow-xl border border-[#2b8c67]/40">
                <div className="flex items-center justify-between border-b border-[#ffffff]/10 pb-2">
                  <span className="text-[11px] font-bold text-[#98f5c9] uppercase tracking-wider">
                    Safaricom SIM Prompt
                  </span>
                  <span className="text-[10px] text-[#cadcf2]">Paybill: {paybill}</span>
                </div>
                <p className="text-xs font-mono text-[#ffffff]">
                  Do you want to pay KES {currentAmount.toLocaleString()}.00 to AIC NURU KITALE Account: {currentAccount}?
                </p>
                <form onSubmit={handleConfirmPin} className="space-y-3 pt-1">
                  <label className="block text-[11px] text-[#cadcf2]">Enter 4-Digit M-Pesa PIN:</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    required
                    autoFocus
                    className="w-full text-center tracking-widest text-lg font-mono p-2 bg-[#ffffff] text-[#000000] rounded-lg focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setFlowState('form')}
                      className="py-2 rounded-lg bg-[#ffffff]/10 text-xs text-[#ffffff] hover:bg-[#ffffff]/20 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 rounded-lg bg-[#2b8c67] text-xs font-bold text-[#ffffff] hover:bg-[#44a17b] cursor-pointer"
                    >
                      Send OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {flowState === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#2b8c67] border-t-transparent animate-spin mx-auto"></div>
              <h4 className="font-serif text-lg font-bold text-[#00162c]">Connecting to Safaricom Daraja...</h4>
              <p className="text-xs text-[#43474d]">Securing payment ledger and generating official receipt.</p>
            </div>
          )}

          {flowState === 'success' && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#003120] text-[#98f5c9] flex items-center justify-center mx-auto shadow-lg">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-[#00162c]">
                  Barikiwa! Giving Received
                </h4>
                <p className="text-xs text-[#43474d]">
                  Thank you, <strong>{donorName || 'Beloved Member'}</strong>. Your harvest offering of <strong>KES {currentAmount.toLocaleString()}</strong> has been credited to AIC Nuru Kitale {selectedDesignation} fund.
                </p>
              </div>

              {/* M-PESA SMS Mockup Receipt */}
              <div className="p-4 rounded-xl bg-[#eaf5f0] border border-[#2b8c67]/30 text-left font-mono text-xs text-[#002114] space-y-2 shadow-sm">
                <div className="flex items-center justify-between pb-1 border-b border-[#2b8c67]/20">
                  <span className="font-bold text-[#2b8c67]">M-PESA CONFIRMATION</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <p className="leading-relaxed">
                  <strong>{receiptCode}</strong> Confirmed. Ksh {currentAmount.toLocaleString()}.00 sent to AIC NURU KITALE (Paybill {paybill}) Account <strong>{currentAccount}</strong> on {new Date().toLocaleDateString('en-GB')}.
                </p>
                <p className="text-[10px] text-[#005138]">
                  New M-PESA balance is Ksh 12,450.00. Transaction cost Ksh 0.00. God bless your generous heart!
                </p>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full py-3 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-[#ffffff] font-bold text-sm transition-all cursor-pointer"
              >
                Close & Return to Church Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
