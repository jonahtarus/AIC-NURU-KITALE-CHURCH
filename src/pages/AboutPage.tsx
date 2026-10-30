import React from 'react';
import { NavigationTab } from '../types';
import { useChurchData } from '../context/ChurchDataContext';

interface AboutPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { teamMembers } = useChurchData();

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative bg-[#061324] text-[#ffffff] py-16 lg:py-24 overflow-hidden border-b border-[#d4af37]/20">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#e5c158] blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#d4af37] blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 border border-[#e5c158]/30 text-[#e5c158] text-xs font-bold">
            <span className="material-symbols-outlined text-sm">church</span>
            <span>Africa Inland Church Kenya Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] font-bold tracking-tight">
            Our Story, Faith & Calling
          </h1>
          <p className="text-base md:text-lg text-[#cadcf2] max-w-2xl leading-relaxed">
            Founded on the solid rock of God’s infallible Word, AIC Nuru Kitale is a spiritual home where seekers find grace, believers deepen their roots, and disciples are commissioned to impact society.
          </p>
        </div>
      </section>

      {/* History & Identity */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#735c00] font-bold">
              Rooted in Trans-Nzoia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#061324] font-bold tracking-tight">
              Shining the Light of Christ for Over 28 Years
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#43474d] leading-relaxed">
              <p>
                In 1995, a dedicated band of believers gathered under a modest canvas tent near the Kitale airstrip junction with a shared burden: to see a healthy, biblically faithful, English-and-Swahili speaking congregation established to serve Kitale town and the farming communities of Trans-Nzoia.
              </p>
              <p>
                God took that humble seed and caused it to flourish. Today, Africa Inland Church (AIC) Nuru Kitale gathers over 1,500 worshippers each Lord’s Day across our morning services, ministers to hundreds of children through our Awana club, and provides food and medical relief to marginalized communities.
              </p>
              <p>
                As an affiliated local church of the Africa Inland Church Kenya, we celebrate our rich evangelical heritage tracing back to the pioneer missionaries of the 19th century who brought the light of the gospel into eastern and central Africa.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('plan-visit')}
                className="px-6 py-3 rounded-xl bg-[#061324] text-[#ffffff] font-bold text-xs hover:bg-[#0b1e36] transition-all cursor-pointer shadow"
              >
                Plan a Visit This Sunday
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 rounded-xl bg-[#e5c158]/15 text-[#061324] font-bold text-xs hover:bg-[#e5c158]/25 transition-all cursor-pointer border border-[#e5c158]/30"
              >
                Contact Church Office
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#061324] border border-[#cadcf2]">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-29_at_7.24.32_PM_6a635d91.jpeg"
                alt="AIC Nuru Kitale Sanctuary"
                className="w-full h-[460px] object-cover object-[center_35%]"
              />
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#061324]/90 backdrop-blur-md text-[#ffffff] border border-[#e5c158]/30 shadow">
                <p className="font-serif text-base font-bold text-[#e5c158]">The Meaning of “Nuru”</p>
                <p className="text-xs text-[#cadcf2] mt-0.5">
                  “Nuru” is the Swahili word for Light. Just as dawn brings life across Mount Elgon, our calling is to manifest the radiant gospel light of Jesus Christ in word, fellowship, and sacrificial deed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="w-full bg-[#f4f7fc] py-20 border-y border-[#cadcf2]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#735c00] font-bold">
              What We Believe
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#061324] font-bold">
              Our Statement of Faith
            </h2>
            <p className="text-sm text-[#43474d]">
              Uncompromising truths revealed in the Holy Scriptures that anchor our doctrine, preaching, and congregational life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">menu_book</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">The Holy Scriptures</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe the 66 books of the Old and New Testaments are the inspired, inerrant, and fully authoritative Word of God, the supreme standard of all faith, doctrine, and conduct.
              </p>
            </div>

            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">flare</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">The Triune God</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe in one eternal God, Creator of all things, holy and loving, eternally existing in three distinct persons: Father, Son, and Holy Spirit.
              </p>
            </div>

            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">cross</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">Salvation by Grace Alone</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe all humanity is fallen and separated from God. Salvation is received solely by grace through faith in the atoning death and physical resurrection of Jesus Christ.
              </p>
            </div>

            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">favorite</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">The Holy Spirit</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe the Holy Spirit indwells every believer at conversion, comforting, sanctifying, producing fruit, and dispensing spiritual gifts for building up the Body of Christ.
              </p>
            </div>

            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">groups</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">The Church & Ordinances</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe the universal Church is the Bride of Christ. We observe Believer’s Baptism by immersion and the Lord’s Supper as sacred remembrances commanded by Jesus.
              </p>
            </div>

            <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-2xl text-[#d4af37]">public</span>
              <h3 className="font-serif text-lg font-bold text-[#061324]">The Great Commission</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                We believe the supreme calling of every believer is to proclaim the gospel, make disciples of all nations, demonstrate compassionate justice, and eagerly anticipate Christ’s return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastoral Team */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#735c00] font-bold">
            Servants of Christ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#061324] font-bold">
            Our Pastoral & Leadership Team
          </h2>
          <p className="text-sm text-[#43474d]">
            Meet the pastoral council, elders, and ministry directors who shepherd our church family with humility and prayer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((leader) => (
            <div
              key={leader.id}
              className="card-shadow-frame rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-64 bg-[#061324] overflow-hidden relative">
                <img
                  src={leader.photoUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/400x400/061324/ffffff?text=AIC+Leader';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061324]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#e5c158] text-[#061324] text-[10px] font-bold uppercase">
                    {leader.role}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#061324]">{leader.name}</h3>
                  <p className="text-xs text-[#735c00] font-semibold mt-0.5">{leader.role}</p>
                  <p className="text-xs text-[#43474d] mt-2.5 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
