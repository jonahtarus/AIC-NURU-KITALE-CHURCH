import React, { useState } from 'react';
import { ChurchEvent } from '../types';

interface RegistrationModalProps {
  event: ChurchEvent | null;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ event, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [department, setDepartment] = useState('Parish Member');
  const [specialNeed, setSpecialNeed] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `NURU-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#122b44]/10">
        {/* Header */}
        <div className="p-5 bg-[#00162c] text-[#ffffff] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#fec65f]">
              {event.badgeText || 'Parish Event'}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#ffffff] truncate max-w-sm">
              {event.title}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full text-[#b1c8e8] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Quick Info */}
              <div className="p-3.5 rounded-xl bg-[#eef4ff] border border-[#cadcf2] text-xs space-y-1">
                <p className="font-bold text-[#00162c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#7d5800]">event</span>
                  <span>{event.dateBadge.dayOfWeek}, {event.dateBadge.month} {event.dateBadge.day}, {event.dateBadge.year} • {event.time}</span>
                </p>
                <p className="text-[#43474d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#7d5800]">pin_drop</span>
                  <span>{event.venue}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00162c] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Wanjiku"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    Phone Number (SMS Reminder) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    Attendees / Family Count
                  </label>
                  <select
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People (Couple / Pair)</option>
                    <option value={3}>3 People (Family)</option>
                    <option value={4}>4 People (Family)</option>
                    <option value={5}>5+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    Ministry Affiliation
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  >
                    <option value="Parish Member">Parish Member</option>
                    <option value="First-Time Visitor">First-Time Visitor</option>
                    <option value="Youth & Campus">Youth & Campus</option>
                    <option value="Women of Faith">Women of Faith</option>
                    <option value="Men of Honor">Men of Honor</option>
                    <option value="Visiting from another church">Visiting from another church</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00162c] mb-1">
                  Special Notes or Prayer Request
                </label>
                <textarea
                  rows={2}
                  placeholder="Need transport or wheelchair assistance, dietary preference, prayer..."
                  value={specialNeed}
                  onChange={(e) => setSpecialNeed(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Confirm Free Registration</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#eaf5f0] text-[#2b8c67] flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-4xl">how_to_reg</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-[#00162c]">
                  Registration Confirmed!
                </h4>
                <p className="text-xs text-[#43474d]">
                  Welcome, <strong>{fullName}</strong>. Your place has been reserved for <strong>{event.title}</strong> ({attendeeCount} attendee{attendeeCount > 1 ? 's' : ''}).
                </p>
              </div>

              {/* Digital Delegate Pass Card */}
              <div className="p-5 rounded-2xl bg-[#00162c] text-[#ffffff] text-left space-y-3 relative overflow-hidden shadow-xl border border-[#c59331]/30">
                <div className="flex items-center justify-between border-b border-[#ffffff]/10 pb-2">
                  <span className="font-serif text-sm font-bold text-[#fec65f]">AIC NURU KITALE</span>
                  <span className="font-mono text-xs text-[#98f5c9] font-bold">{ticketId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#b1c8e8] uppercase tracking-wider block">Delegate Name</span>
                  <p className="font-bold text-base text-[#ffffff]">{fullName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#b1c8e8] uppercase tracking-wider block">Date</span>
                    <p className="font-semibold text-[#ffdea9]">{event.dateBadge.month} {event.dateBadge.day}, {event.dateBadge.year}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#b1c8e8] uppercase tracking-wider block">Pass Type</span>
                    <p className="font-semibold text-[#ffdea9]">{attendeeCount} Pass ({department})</p>
                  </div>
                </div>
                <div className="pt-1 text-[11px] text-[#b1c8e8] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-[#98f5c9]">sms</span>
                  <span>SMS confirmation sent to {phone}. Present this on arrival.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert(`Saved Pass ${ticketId} to your device.`)}
                  className="flex-1 py-2.5 rounded-xl border border-[#cadcf2] text-xs font-bold text-[#00162c] hover:bg-[#f7f9ff] transition-colors cursor-pointer"
                >
                  Save / Download Pass
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl bg-[#00162c] text-xs font-bold text-[#ffffff] hover:bg-[#122b44] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
