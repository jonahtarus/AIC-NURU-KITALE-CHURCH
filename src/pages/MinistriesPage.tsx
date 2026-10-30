import React, { useState } from 'react';
import { MINISTRIES_DATA, CELL_GROUPS_DATA } from '../data/churchData';
import { Ministry } from '../types';

export const MinistriesPage: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [targetName, setTargetName] = useState('');
  const [personName, setPersonName] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  const [personNote, setPersonNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleOpenJoin = (name: string) => {
    setTargetName(name);
    setSubmitted(false);
    setJoinModalOpen(true);
  };

  const handleSubmitJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative bg-[#122b44] text-[#ffffff] py-16 lg:py-24 overflow-hidden border-b border-[#c59331]/20">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 text-[#ffdea9] text-xs font-bold">
            <span className="material-symbols-outlined text-sm">diversity_3</span>
            <span>Discipleship & Community Life</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] font-bold tracking-tight">
            Ministries & Fellowships
          </h1>
          <p className="text-base md:text-lg text-[#b1c8e8] max-w-2xl leading-relaxed">
            God has designed the Church as an interconnected family. Discover where your spiritual gifts, season of life, and passion intersect with kingdom mission at AIC Nuru Kitale.
          </p>
        </div>
      </section>

      {/* Main Ministries */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-20 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
            Parish Departments
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#00162c] font-bold">
            Active Ministry Fellowships
          </h2>
          <p className="text-sm text-[#43474d]">
            Join hands with fellow believers to serve, intercede, and grow together in discipleship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINISTRIES_DATA.map((min) => (
            <div
              key={min.id}
              className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-md border border-[#cadcf2] flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                <div className="h-52 bg-[#00162c] relative overflow-hidden group">
                  <img
                    src={min.image}
                    alt={min.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00162c]/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#c59331] text-[#00162c] text-xs font-bold shadow">
                      {min.targetGroup}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">{min.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#00162c]">{min.name}</h3>
                      <p className="text-xs text-[#7d5800] font-semibold">{min.leader}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#43474d] leading-relaxed">
                    {min.description}
                  </p>

                  {/* Key Activities */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00162c]">
                      Core Activities & Programs:
                    </span>
                    <ul className="text-xs text-[#43474d] space-y-1">
                      {min.keyActivities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c59331] shrink-0"></span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="p-3 rounded-xl bg-[#f7f9ff] text-xs text-[#0b1d2d] flex items-center justify-between border border-[#cadcf2]/50">
                  <span className="font-medium">{min.meetingTime}</span>
                  <span className="font-bold text-[#00162c]">{min.venue}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenJoin(min.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#00162c] text-[#ffffff] hover:bg-[#122b44] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Join this Ministry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jumuiya Neighborhood Home Cells Section */}
      <section className="w-full bg-[#eef4ff] py-20 border-y border-[#cadcf2]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
                Home Fellowships (Jumuiyas)
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#00162c] font-bold mt-1">
                Find Your Local Neighborhood Cell Group
              </h2>
              <p className="text-sm text-[#43474d]">
                Church happens in living rooms as much as in sanctuary pews. Our Thursday evening cells gather near where you reside in Kitale.
              </p>
            </div>
            <span className="px-4 py-2 rounded-xl bg-[#ffffff] text-[#00162c] text-xs font-bold border border-[#cadcf2] shrink-0 shadow-sm">
              Every Thursday 6:00 PM – 7:30 PM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CELL_GROUPS_DATA.map((cell, idx) => (
              <div
                key={idx}
                className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#cadcf2] space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">home</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#00162c]">{cell.name}</h3>
                    <p className="text-xs text-[#7d5800] font-bold mt-0.5">{cell.neighborhood}</p>
                  </div>
                  <p className="text-xs text-[#43474d] leading-relaxed">
                    Meeting weekly for Bible study, fellowship tea, and communal prayer under {cell.leader}.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#cadcf2]/60 space-y-2">
                  <div className="text-[11px] text-[#43474d]">
                    Leader Contact: <strong className="text-[#00162c]">{cell.contact}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenJoin(cell.name)}
                    className="w-full py-2 px-3 rounded-lg bg-[#e4efff] hover:bg-[#d2e4fb] text-[#00162c] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Join This Cell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Ministry / Cell Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#ffffff] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[#cadcf2]">
            <div className="p-5 bg-[#00162c] text-[#ffffff] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#fec65f] uppercase tracking-wider font-bold">
                  Community Discipleship
                </span>
                <h3 className="font-serif text-lg font-bold text-[#ffffff] truncate">
                  Join: {targetName}
                </h3>
              </div>
              <button
                onClick={() => setJoinModalOpen(false)}
                className="w-8 h-8 rounded-full text-[#b1c8e8] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmitJoin} className="space-y-4">
                  <p className="text-xs text-[#43474d]">
                    Fill in your details below. The ministry leadership team will get in touch with welcoming information and schedules.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Caleb Kipkoech"
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Phone Number (Safaricom/Airtel) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="07XX XXX XXX"
                      value={personPhone}
                      onChange={(e) => setPersonPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Area of Residence in Kitale / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Milimani, near Golf Club. Singing soprano / playing keyboard..."
                      value={personNote}
                      onChange={(e) => setPersonNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit Joining Interest
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#eaf5f0] text-[#2b8c67] flex items-center justify-center mx-auto shadow-inner">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#00162c]">Karibu Sana, {personName}!</h4>
                    <p className="text-xs text-[#43474d] mt-1">
                      Your interest to join <strong>{targetName}</strong> has been received by the fellowship coordinator. We will reach out to <strong>{personPhone}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => setJoinModalOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-[#00162c] text-[#ffffff] font-bold text-xs hover:bg-[#122b44] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
