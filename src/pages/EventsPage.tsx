import React, { useState } from 'react';
import { ChurchEvent } from '../types';
import { EVENTS_DATA } from '../data/churchData';

interface EventsPageProps {
  onRegisterEvent: (event: ChurchEvent) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onRegisterEvent }) => {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [calendarMonth, setCalendarMonth] = useState<'NOV' | 'DEC'>('NOV');
  const [selectedDayNumber, setSelectedDayNumber] = useState<string>('24');

  const categories = [
    { id: 'all', label: 'All Events (6)' },
    { id: 'sunday', label: 'Sunday Services' },
    { id: 'kesha', label: 'Kesha & Prayer' },
    { id: 'youth', label: 'Youth & Young Adults' },
    { id: 'women', label: "Women's Fellowship" },
    { id: 'men', label: "Men's Ministry" },
    { id: 'outreach', label: 'Community Outreach' }
  ];

  const flagshipEvent = EVENTS_DATA.find((e) => e.featured) || EVENTS_DATA[0];

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (selectedCategory === 'all') return true;
    return e.category === selectedCategory;
  });

  // Calendar dates matrix for November & December
  const novDays = Array.from({ length: 30 }, (_, i) => String(i + 1));
  const decDays = Array.from({ length: 31 }, (_, i) => String(i + 1));

  const activeDays = calendarMonth === 'NOV' ? ['24', '25'] : ['02', '09', '16', '28', '29', '30', '31'];

  const selectedDayEvent = EVENTS_DATA.find(
    (e) => e.dateBadge.month === calendarMonth && (e.dateBadge.day === selectedDayNumber || e.dateBadge.day === selectedDayNumber.padStart(2, '0'))
  );

  const createGoogleCalendarUrl = (evt: ChurchEvent) => {
    const title = encodeURIComponent(evt.title);
    const details = encodeURIComponent(`${evt.description}\n\nVenue: ${evt.venue}\nHost: ${evt.host}`);
    const location = encodeURIComponent(evt.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Bar */}
      <section className="relative w-full overflow-hidden bg-[#eef4ff] py-14 border-b border-[#cadcf2]">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#fec65f] opacity-30 blur-3xl pointer-events-none"></div>
        <div className="relative w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdea9] text-[#271900] text-xs font-bold mb-3">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <span>Season of Grace & Fellowship • Trans-Nzoia</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#00162c] tracking-tight font-bold">
                Church Events & Fellowship Calendar
              </h1>
              <p className="text-sm md:text-base text-[#43474d] mt-2">
                Connect, worship, and grow in community. Discover what's happening at AIC Nuru Kitale this season.
              </p>
            </div>

            {/* View Switcher Toggle */}
            <div className="flex items-center self-start md:self-end bg-[#ffffff] p-1.5 rounded-2xl shadow-sm border border-[#cadcf2]">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#00162c] text-[#ffffff] shadow-sm'
                    : 'text-[#43474d] hover:text-[#00162c]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">view_agenda</span>
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'month'
                    ? 'bg-[#00162c] text-[#ffffff] shadow-sm'
                    : 'text-[#43474d] hover:text-[#00162c]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">calendar_view_month</span>
                <span>Month Calendar</span>
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00162c] text-[#ffffff] shadow-sm'
                      : 'bg-[#ffffff] text-[#00162c] hover:bg-[#d9eaff] border border-[#cadcf2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flagship Annual Conference Spotlight Banner */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 -mt-6 z-10 mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#00162c] text-[#ffffff] shadow-2xl border border-[#c59331]/30">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjU-iaAXUnezI3CbSnv0nIXwyDbG5acGMaluYp5hUR9fN_5_QgXKpZ34XQu5HvJ0rWaxyftDiqBDYXjQMtE64S8X2ycd3CGGaBLd4Hyn1lTPDF6t4lDGjOO-4hXgxQi8K1eRlHFv4KCzrvo1PngoceQH2TZ_krkBXsPR5FKYDo4wWMuKU8fp1vjCxxiSeIUx9N7fZIH_h3CJcAyHiXgo9qreOqQyT3gjK3bWr7qZk')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00162c] via-[#00162c]/95 to-[#122b44]/80"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 lg:p-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c59331] text-[#00162c] text-xs font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#00162c] animate-ping"></span>
                  Flagship Annual Gathering
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffffff]/15 text-[#98f5c9] text-xs font-bold backdrop-blur-sm">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Open • Free Admission
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#ffffff] tracking-tight font-bold">
                  AIC Nuru Annual End-of-Year Thanksgiving & Commissioning Conference
                </h2>
                <div className="inline-block bg-[#ffdea9]/15 text-[#ffdea9] px-3.5 py-1 rounded-lg text-sm font-serif italic border border-[#ffdea9]/20">
                  Theme: “Rooted & Built Up in Him” • Colossians 2:7
                </div>
              </div>

              <p className="text-sm text-[#b1c8e8] leading-relaxed max-w-2xl">
                Four transformational days of profound biblical teaching, round-the-clock intercession, youth breakout symposiums, and celebratory praise as we dedicate the coming year to our Lord Jesus Christ.
              </p>

              {/* Quick Details Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-[#ffffff]/10 p-3 rounded-xl backdrop-blur-sm border border-[#ffffff]/10">
                  <span className="material-symbols-outlined text-[#ffdea9] text-2xl">event</span>
                  <div>
                    <p className="text-[10px] text-[#ffffff] uppercase tracking-wider font-semibold">Conference Dates</p>
                    <p className="text-xs font-bold text-[#f5bd58]">Dec 28 – 31, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#ffffff]/10 p-3 rounded-xl backdrop-blur-sm border border-[#ffffff]/10">
                  <span className="material-symbols-outlined text-[#ffdea9] text-2xl">pin_drop</span>
                  <div>
                    <p className="text-[10px] text-[#ffffff] uppercase tracking-wider font-semibold">Venue Location</p>
                    <p className="text-xs font-bold text-[#f5bd58]">Main Sanctuary & Hall</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#ffffff]/10 p-3 rounded-xl backdrop-blur-sm border border-[#ffffff]/10">
                  <span className="material-symbols-outlined text-[#ffdea9] text-2xl">groups</span>
                  <div>
                    <p className="text-[10px] text-[#ffffff] uppercase tracking-wider font-semibold">Expected Guests</p>
                    <p className="text-xs font-bold text-[#f5bd58]">1,800+ Congregants</p>
                  </div>
                </div>
              </div>

              {/* Speakers list */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-xs text-[#b1c8e8]">
                  Guest Ministers: <strong>Bishop Silas Yego</strong>, <strong>Rev. Dr. Joyce Chege</strong> & Mass Choir
                </span>
              </div>
            </div>

            {/* Right Pass Details Card */}
            <div className="lg:col-span-4 flex flex-col gap-4 bg-[#ffffff] p-6 rounded-2xl text-[#0b1d2d] shadow-2xl border border-[#cadcf2]">
              <div className="flex items-center justify-between pb-3 bg-[#eef4ff] p-3.5 rounded-xl border border-[#cadcf2]">
                <div>
                  <span className="text-xs text-[#7d5800] uppercase font-bold tracking-wider">Delegate Pass</span>
                  <p className="font-serif text-lg text-[#00162c] font-bold">All Sessions Inclusive</p>
                </div>
                <span className="material-symbols-outlined text-[#c59331] text-3xl">confirmation_number</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#43474d]">
                <div className="flex items-center justify-between pb-1 border-b border-[#cadcf2]/50">
                  <span>Morning Plenary</span>
                  <span className="font-bold text-[#00162c]">8:30 AM – 12:30 PM</span>
                </div>
                <div className="flex items-center justify-between pb-1 border-b border-[#cadcf2]/50">
                  <span>Breakout Fellowships</span>
                  <span className="font-bold text-[#00162c]">2:00 PM – 4:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Evening Revival Rally</span>
                  <span className="font-bold text-[#00162c]">5:30 PM – 8:30 PM</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => onRegisterEvent(flagshipEvent)}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#c59331] text-[#00162c] hover:bg-[#fec65f] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>Register Your Family</span>
                </button>
                <button
                  onClick={() => alert('Downloading End-of-Year Conference Program PDF (1.1 MB)...')}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#e4efff] hover:bg-[#d2e4fb] text-[#00162c] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download Conference Program (PDF)</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#43474d]">
                Childcare and Sunday School provisions provided for ages 2–12.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Events Display (List or Calendar Mode) */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 pb-24">
        {viewMode === 'list' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#cadcf2]">
              <div>
                <h2 className="font-serif text-2xl text-[#00162c] font-bold">Upcoming Calendar Schedule</h2>
                <p className="text-xs text-[#43474d]">November – December 2023 Parish Gatherings</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#43474d]">
                <span className="material-symbols-outlined text-sm text-[#7d5800]">notifications_active</span>
                <span>Automatic SMS reminders sent 24h prior to registered events</span>
              </div>
            </div>

            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group rounded-2xl bg-[#ffffff] p-6 shadow-sm hover:shadow-md transition-all border border-[#cadcf2]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Date Badge Column */}
                  <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center p-4 bg-[#00162c] text-[#ffffff] rounded-2xl text-center gap-3 lg:gap-0 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5bd58]">
                      {evt.dateBadge.dayOfWeek} • {evt.dateBadge.month}
                    </span>
                    <span className="font-serif text-3xl md:text-4xl text-[#ffffff] font-bold leading-none my-1">
                      {evt.dateBadge.day}
                    </span>
                    <span className="text-[10px] text-[#b1c8e8]">{evt.dateBadge.year}</span>
                  </div>

                  {/* Event Info Column */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#e4efff] text-[#00162c] text-[11px] font-bold">
                        {evt.badgeText}
                      </span>
                      {evt.registrationFee && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea9] text-[#271900] text-[11px] font-bold">
                          {evt.registrationFee}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg md:text-xl text-[#00162c] font-bold group-hover:text-[#7d5800] transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-[#43474d] leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#43474d] pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-sm text-[#7d5800]">schedule</span>
                        <span>{evt.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-sm text-[#7d5800]">pin_drop</span>
                        <span>{evt.venue}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-sm text-[#7d5800]">person</span>
                        <span>{evt.host}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="lg:col-span-3 flex flex-col gap-2.5">
                    <button
                      onClick={() => onRegisterEvent(evt)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#c59331] text-[#00162c] hover:bg-[#fec65f] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">bookmark_add</span>
                      <span>Register Attendance</span>
                    </button>

                    <a
                      href={createGoogleCalendarUrl(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#e4efff] hover:bg-[#d2e4fb] text-[#00162c] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">event</span>
                      <span>Add to Google Calendar</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Month Calendar Grid View */
          <div className="space-y-6">
            {/* Month Header Switcher */}
            <div className="flex items-center justify-between bg-[#ffffff] p-4 rounded-2xl border border-[#cadcf2]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#c59331]">calendar_today</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#00162c]">
                    {calendarMonth === 'NOV' ? 'November 2023' : 'December 2023'}
                  </h3>
                  <p className="text-xs text-[#43474d]">Click any date to inspect scheduled church programs</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCalendarMonth('NOV')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    calendarMonth === 'NOV'
                      ? 'bg-[#00162c] text-[#ffffff]'
                      : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                  }`}
                >
                  November
                </button>
                <button
                  onClick={() => setCalendarMonth('DEC')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    calendarMonth === 'DEC'
                      ? 'bg-[#00162c] text-[#ffffff]'
                      : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                  }`}
                >
                  December
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Calendar Matrix */}
              <div className="lg:col-span-8 bg-[#ffffff] p-6 rounded-2xl shadow-md border border-[#cadcf2]">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#43474d] pb-4 border-b border-[#cadcf2]">
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>

                <div className="grid grid-cols-7 gap-2 pt-4">
                  {(calendarMonth === 'NOV' ? novDays : decDays).map((day) => {
                    const isEventDay = activeDays.includes(day) || activeDays.includes(day.padStart(2, '0'));
                    const isSelected = selectedDayNumber === day || selectedDayNumber === day.padStart(2, '0');

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDayNumber(day)}
                        className={`h-14 sm:h-20 p-2 rounded-xl flex flex-col items-center justify-between transition-all cursor-pointer border ${
                          isSelected
                            ? 'border-[#00162c] bg-[#eef4ff] ring-2 ring-[#00162c]/20 font-bold'
                            : isEventDay
                            ? 'border-[#c59331] bg-[#fdfbf7] hover:bg-[#ffdea9]/30 font-semibold'
                            : 'border-[#cadcf2]/50 hover:bg-[#f7f9ff] text-[#43474d]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{day}</span>
                        {isEventDay && (
                          <span className="w-2 h-2 rounded-full bg-[#c59331] animate-pulse"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Day Inspector Panel */}
              <div className="lg:col-span-4 bg-[#ffffff] p-6 rounded-2xl shadow-md border border-[#cadcf2] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#cadcf2]">
                  <div>
                    <span className="text-xs text-[#7d5800] uppercase font-bold tracking-wider">Selected Date</span>
                    <h4 className="font-serif text-lg font-bold text-[#00162c]">
                      {calendarMonth} {selectedDayNumber}, 2023
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-[#c59331] text-2xl">event_available</span>
                </div>

                {selectedDayEvent ? (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-[#eef4ff] border border-[#cadcf2] space-y-2">
                      <span className="px-2 py-0.5 rounded bg-[#c59331] text-[#00162c] text-[10px] font-bold">
                        {selectedDayEvent.badgeText}
                      </span>
                      <h5 className="font-serif text-base font-bold text-[#00162c]">
                        {selectedDayEvent.title}
                      </h5>
                      <p className="text-xs text-[#43474d]">
                        {selectedDayEvent.time} • {selectedDayEvent.venue}
                      </p>
                      <p className="text-xs text-[#43474d] leading-relaxed pt-1">
                        {selectedDayEvent.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onRegisterEvent(selectedDayEvent)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#c59331] text-[#00162c] hover:bg-[#fec65f] shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">bookmark_add</span>
                      <span>Register for this Event</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#f7f9ff] rounded-xl border border-dashed border-[#cadcf2] space-y-2">
                    <span className="material-symbols-outlined text-3xl text-[#cadcf2]">event_busy</span>
                    <p className="text-xs font-bold text-[#00162c]">No special parish event on this date</p>
                    <p className="text-[11px] text-[#43474d]">
                      Regular services, morning intercession, and youth prayer run according to the weekly schedule.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
