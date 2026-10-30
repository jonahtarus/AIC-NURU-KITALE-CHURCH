import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchDataContext';

export const ContactPage: React.FC = () => {
  const { siteSettings } = useChurchData();
  const [formType, setFormType] = useState<'prayer' | 'counseling' | 'general'>('prayer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const typeLabel =
      formType === 'prayer'
        ? 'Prayer Request'
        : formType === 'counseling'
        ? 'Pastoral Counseling'
        : 'General Inquiry';

    const formattedMessage = `Greetings Pastoral Care, AIC Nuru Kitale.

${typeLabel.toUpperCase()}
Name: ${name.trim()}
Phone Number: ${phone.trim()}
Email: ${email.trim() ? email.trim() : 'Not provided'}
Request Type: ${typeLabel}${isConfidential ? ' (Confidential)' : ''}
Prayer Need / Message:
${message.trim()}`;

    const url = `https://wa.me/254718016491?text=${encodeURIComponent(formattedMessage)}`;
    setSubmittedWhatsAppUrl(url);
    setSubmitted(true);

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const faqs = [
    {
      q: 'How do I book child dedication or believer baptism?',
      a: 'Child dedications take place on the 1st Sunday of every month. Believer baptism classes are conducted over 4 Saturdays before our baptismal service at the sanctuary baptistery. Please speak with Pastor Grace Chebet or fill the form below.'
    },
    {
      q: 'Do you conduct premarital counseling and weddings?',
      a: 'Yes, AIC Nuru Kitale requires a 3-month premarital counseling mentorship course for intending couples. Contact the Senior Pastor’s desk at least 6 months prior to your intended wedding date.'
    },
    {
      q: 'How can I request home visitation or hospital prayer?',
      a: 'Our pastoral care and Dorcas benevolence teams visit homebound members and local hospitals every Tuesday and Thursday. Call +254 718 016 491 for emergency pastoral chaplaincy.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative bg-[#122b44] text-[#ffffff] py-16 lg:py-24 overflow-hidden border-b border-[#c59331]/20">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 text-[#ffdea9] text-xs font-bold">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Pastoral Care & Contact</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] font-bold tracking-tight">
            We Are Here For You
          </h1>
          <p className="text-base md:text-lg text-[#b1c8e8] max-w-2xl leading-relaxed">
            Whether you need spiritual counsel, prayer agreement for healing, or information regarding our church ministries, please connect with our pastoral team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div id="contact-prayer" className="lg:col-span-7 bg-[#ffffff] p-8 rounded-3xl shadow-xl border border-[#cadcf2] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#cadcf2]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#00162c]">Pastoral Desk Message</h3>
                <p className="text-xs text-[#43474d] mt-0.5">Submit your prayer request or inquiry</p>
              </div>
              <span className="material-symbols-outlined text-[#c59331] text-2xl">favorite</span>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormType('prayer')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  formType === 'prayer'
                    ? 'bg-[#00162c] text-[#ffffff] shadow'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                Prayer Request
              </button>
              <button
                type="button"
                onClick={() => setFormType('counseling')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  formType === 'counseling'
                    ? 'bg-[#00162c] text-[#ffffff] shadow'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                Pastoral Counseling
              </button>
              <button
                type="button"
                onClick={() => setFormType('general')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  formType === 'general'
                    ? 'bg-[#00162c] text-[#ffffff] shadow'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mary Jepkosgei"
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Phone Number (WhatsApp / Call) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00162c] mb-1">
                    {formType === 'prayer'
                      ? 'Your Prayer Need (Health, Family, Career, Deliverance, Thanksgiving) *'
                      : formType === 'counseling'
                      ? 'Reason for Pastoral Counseling Request *'
                      : 'Message or Question *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how our pastors and intercessors can uphold you in prayer..."
                    className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                  ></textarea>
                </div>

                {formType === 'prayer' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]">
                    <input
                      type="checkbox"
                      id="confidential-check"
                      checked={isConfidential}
                      onChange={(e) => setIsConfidential(e.target.checked)}
                      className="w-4 h-4 accent-[#c59331] rounded cursor-pointer"
                    />
                    <label htmlFor="confidential-check" className="text-xs text-[#00162c] cursor-pointer">
                      Keep this strictly confidential for the Senior Pastor only (do not forward to general intercessory team).
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00162c] to-[#0b1e36] text-white shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2.5 border border-amber-400/30"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                  </span>
                  <span>Submit to WhatsApp (+254 718 016 491)</span>
                </button>
              </form>
            ) : (
              <div className="p-8 text-center bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 rounded-2xl border border-emerald-300 shadow-md space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-md">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#00162c]">
                    Received in Faith, {name}!
                  </h4>
                  <p className="text-sm text-[#43474d] mt-2">
                    Your message has been formatted and opened directly in WhatsApp to our pastoral office (<strong className="text-emerald-700">+254 718 016 491</strong>).
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    <span>Send / Open in WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00162c] font-bold text-xs transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details */}
            <div className="bg-[#ffffff] p-6 rounded-3xl shadow-md border border-[#cadcf2] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#00162c]">Church Contacts</h3>
              <div className="space-y-3 text-xs text-[#43474d]">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]/50">
                  <span className="material-symbols-outlined text-[#c59331] text-xl mt-0.5">location_on</span>
                  <div>
                    <strong className="text-[#00162c] block text-sm">Physical Address:</strong>
                    <span>{siteSettings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]/50">
                  <span className="material-symbols-outlined text-[#d4af37] text-xl mt-0.5">call</span>
                  <div>
                    <strong className="text-[#061324] block text-sm">Phone Line:</strong>
                    <a href="tel:+254718016491" className="text-[#061324] hover:text-[#c59331] font-semibold transition-colors">
                      {siteSettings.phone || '+254 718 016 491'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                  </span>
                  <div className="flex-1">
                    <strong className="text-[#061324] block text-sm">WhatsApp Pastoral Helpline:</strong>
                    <p className="text-[11px] text-emerald-950/80 my-1">
                      Direct &amp; confidential spiritual counsel, prayer petitions, and pastoral care.
                    </p>
                    <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                      <span className="font-medium text-emerald-900 text-xs">
                        {siteSettings.whatsapp || '+254 718 016 491'}
                      </span>
                      <a
                        href={`https://wa.me/254718016491?text=${encodeURIComponent(
                          'Greetings in the name of our Lord. I am contacting AIC Nuru Kitale to connect with the pastoral office.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>Message Pastoral Care</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]/50">
                  <span className="material-symbols-outlined text-[#d4af37] text-xl mt-0.5">mail</span>
                  <div>
                    <strong className="text-[#061324] block text-sm">Official Email:</strong>
                    <a href={`mailto:${siteSettings.email || 'jonahtarus20@gmail.com'}`} className="text-[#061324] hover:text-[#c59331] font-semibold hover:underline">
                      {siteSettings.email || 'jonahtarus20@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]/50">
                  <span className="material-symbols-outlined text-[#c59331] text-xl mt-0.5">schedule</span>
                  <div>
                    <strong className="text-[#00162c] block text-sm">Sunday Services:</strong>
                    <span>{siteSettings.sundayServices}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Location Map */}
            <div className="bg-[#ffffff] p-6 rounded-3xl shadow-md border border-[#cadcf2] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#00162c]">Our Location in Kitale</h3>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#7d5800] text-[10px] font-bold">
                  Trans-Nzoia County
                </span>
              </div>
              <p className="text-xs text-[#43474d]">
                Located along the Eldoret-Kitale Highway near the Kitale Airstrip junction, easily accessible by public matatu or personal vehicle.
              </p>

              <div className="w-full h-60 rounded-2xl overflow-hidden border border-[#cadcf2] shadow-inner relative">
                <iframe
                  title="AIC Nuru Kitale Location Map"
                  src="https://maps.google.com/maps?q=Kitale,Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#43474d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#2b8c67]">local_parking</span>
                  <span>Ample parking available</span>
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteSettings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7d5800] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-[#ffffff] p-6 rounded-3xl shadow-md border border-[#cadcf2] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#00162c]">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#f7f9ff] border border-[#cadcf2]/50 space-y-1">
                    <h5 className="font-bold text-xs text-[#00162c]">{faq.q}</h5>
                    <p className="text-xs text-[#43474d] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
