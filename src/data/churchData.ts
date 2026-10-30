import { Sermon, ChurchEvent, Ministry, Designation, CellGroup, ChoirVideo } from '../types';

export const CHURCH_INFO = {
  name: 'Africa Inland Church Nuru Kitale',
  shortName: 'AIC Nuru Kitale',
  tagline: 'A premier Christ-centered sanctuary in Trans-Nzoia County illuminating hearts with biblical truth, anointed praise, and transformative community impact.',
  motto: 'Let Your Light Shine • Arise, Shine, for Your Light Has Come (Matthew 5:14, 16)',
  location: 'AIC Nuru Cathedral Grounds, Kitale, Trans-Nzoia County, Kenya',
  locationDetails: '8 min from Kitale CBD along the main highway',
  phone: '+254 718 016 491',
  altPhone: '+254 718 016 491',
  whatsapp: '+254 718 016 491',
  whatsappRaw: '254718016491',
  email: 'jonahtarus20@gmail.com',
  financeEmail: 'jonahtarus20@gmail.com',
  pastoralEmail: 'jonahtarus20@gmail.com',
  youtubeChannel: 'https://www.youtube.com/@aicnurukitale-kenya68',
  services: [
    { name: '1st Service (English Service)', time: '8:00 AM – 10:00 AM' },
    { name: '2nd Service (Kiswahili Service)', time: '10:30 AM – 1:00 PM' },
    { name: 'Sunday School (KAYO) & Teens', time: 'Sundays 8:00 AM & 10:30 AM' },
    { name: 'Midweek Prayer Meeting', time: 'Wednesdays: 5:00 PM – 6:30 PM' },
    { name: 'Youth Saturday Rally', time: 'Saturdays: 3:00 PM – 5:30 PM' }
  ],
  paybill: {
    kcb: { number: '247247', bank: 'Equity / KCB Kitale', accountDefault: 'AIC NURU [TITHE]' },
    equity: { number: '247247', bank: 'M-PESA Paybill', accountDefault: 'AIC NURU [TITHE]' }
  },
  till: {
    number: '8901234',
    name: 'AIC Nuru Kitale Development',
    description: '100% Directed to Sanctuary Projects'
  },
  bankDetails: {
    bankName: 'Kenya Commercial Bank (KCB)',
    branch: 'Kitale Main Branch',
    accountName: 'AIC NURU KITALE PARISH',
    accountNumber: '1122334455',
    swiftCode: 'KCBLKENX'
  }
};

export const CHOIR_VIDEOS: ChoirVideo[] = [
  {
    id: 'choir-mashujaa',
    youtubeId: 'uq-bPrSBWUQ',
    title: 'Mashujaa wa Yesu',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'The flagship title song celebrating the victory and unshakeable courage of believers through the blood of Jesus Christ. Performed by the AIC Nuru Gospel Singers in Kitale.',
    duration: '5:24',
    featured: true
  },
  {
    id: 'choir-tutashinda',
    youtubeId: '83S6rBA8B04',
    title: '1. Tutashinda',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Track 1 from the album: A triumphant declaration of Christian endurance and overcoming every obstacle through faith.',
    duration: '5:10'
  },
  {
    id: 'choir-amani',
    youtubeId: 'iVhZhELDQJ4',
    title: '2. Amani',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Track 2 from the album: Meditating on the peace of God (Amani ya Kristo) that surpasses all human understanding in our families and nation.',
    duration: '4:45'
  },
  {
    id: 'choir-matoleo',
    youtubeId: 'DsTjBBbF3Io',
    title: '3. Matoleo',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Track 3 from the album: A joyful harvest giving and thanksgiving song praising God for His bountiful provisions and honoring Him with firstfruits.',
    duration: '5:02'
  },
  {
    id: 'choir-huwezi',
    youtubeId: 'q6mQT9zo9uM',
    title: '4. Huwezi',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Track 4 from the album: Proclaiming the sovereignty and matchless power of God—nothing is impossible with our Lord.',
    duration: '5:38'
  },
  {
    id: 'choir-simama',
    youtubeId: 'q_U0awfjawg',
    title: 'Simama',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'An exhortation to stand firm in the gospel armor of God without swaying, anchored in the truth of Scripture.',
    duration: '4:52'
  },
  {
    id: 'choir-usirudi',
    youtubeId: 'jHP7xIsy3bc',
    title: 'Usirudi Nyuma',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'A poignant spiritual challenge urging believers to keep pressing toward the high mark of our heavenly calling in Christ Jesus.',
    duration: '5:15'
  },
  {
    id: 'choir-amesadiki',
    youtubeId: 'ugGnCP73y4E',
    title: 'Ni Nani Amesadiki',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Isaiah 53 reflection: “Who has believed our message and to whom has the arm of the Lord been revealed?” Meditating on Christ’s redemptive love.',
    duration: '5:50'
  },
  {
    id: 'choir-ndege',
    youtubeId: 'Rn-hq939yek',
    title: 'Ndege Wanaofanana',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Birds of a feather fly together—a cultural and scriptural allegory on unity, brotherhood, and harmony among God’s chosen children.',
    duration: '4:58'
  },
  {
    id: 'choir-maombi',
    youtubeId: 'K-iGY1X8yXU',
    title: 'Maombi',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'A deeply moving prayer anthem on the power of intercession, seeking God’s presence, and finding refuge at the mercy seat.',
    duration: '5:32'
  },
  {
    id: 'choir-majira',
    youtubeId: 'uvbED4K-WC4',
    title: 'Majira',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Recognizing the prophetic seasons and times of God: staying spiritually awake and ready for the Lord’s work.',
    duration: '4:40'
  },
  {
    id: 'choir-tunaye',
    youtubeId: 'YzIOnTc_SPg',
    title: 'Tunaye Asiyeshindwa',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: '“We have One who cannot be defeated!” High-energy praise worship magnifying the unmatched strength and dominion of Jesus.',
    duration: '5:18'
  },
  {
    id: 'choir-kumwimbia',
    youtubeId: 'HcFlT4U7hHo',
    title: '10. Kumwimbia Bwana',
    album: 'Mashujaa wa Yesu Album',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Track 10 from the album: Coming before God with jubilant singing and gladness, giving Him all honor and adoration.',
    duration: '5:05'
  },
  {
    id: 'choir-launch',
    youtubeId: '0B1ELQptY1s',
    title: 'Album Launch Live Celebration',
    album: 'Special Event Recording',
    artist: 'AIC Nuru Gospel Singers, Kitale',
    description: 'Special celebration and live concert from the official album launch held at AIC Nuru Kitale Sanctuary on 3rd December 2023.',
    duration: '12:45'
  },
  {
    id: 'choir-msalaba',
    youtubeId: 'Zizzwv7E67I',
    title: 'Tazama Msalaba Wake Yesu',
    album: 'Sanctuary Hymns Vol. 1',
    artist: 'AIC Nuru Choir, Kitale',
    description: 'A reverent four-part choral arrangement of the beloved Cross of Christ hymn performed by the AIC Nuru mass choir.',
    duration: '6:12'
  }
];

export const SERMONS_DATA: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'Living as Children of Light: Walking Wisely in a Dark World',
    speaker: 'Rev. Samuel Adebayo',
    speakerRole: 'Senior Pastor & Teacher',
    date: 'Last Sunday',
    scripture: 'Ephesians 5:8-14',
    duration: '48 mins',
    category: 'series',
    series: 'Living in the Light: 4-Part Exposition',
    seriesPart: 'Part 3 of 4',
    description: 'In this practical sermon, Pastor Samuel unfolds the call of the believer to reject hidden deeds of darkness and instead live with integrity, fruitful love, and radiant spiritual courage in workplace and family life.',
    keyPoints: [
      'From spiritual darkness to Christ’s radiant dawn: Understanding our true identity.',
      'The fruit of the Light consists in all goodness, righteousness, and truth.',
      'Awakening from spiritual slumber: Exposing cultural compromises with grace and truth.'
    ],
    excerpt: '“You were once darkness, but now you are light in the Lord. Live as children of light! When Christ shines into your heart, you cannot remain in hiding. God is calling AIC Nuru to be a city set on a hill that cannot be concealed.”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7M4nczm4EyO602MvFV7kJKr4_g2KPKaI8-Y2wzDicD6bZ7d64xiqbdmH6OxCZdOV_fd9K7l1IC0D_AOQ_rlrMA3WKoG7_1dijPrlW5Ko9O58MO7fBXjD94D5zSZWJq0mYIq-tnpFYPL0QoxxnVdspKQC2bzROldf23xbygw2DDguteND-RdIJtkSIHpgc1ruZKDE-pHQzfN2I_61DI_S3ZKBwO7j3KrSbQfB21L0',
    notesAvailable: true
  },
  {
    id: 'sermon-2',
    title: 'The Power of Persistent Prayer',
    speaker: 'Rev. Samuel Adebayo',
    speakerRole: 'Senior Pastor',
    date: 'Nov 12, 2023',
    scripture: 'Luke 18:1-8',
    duration: '48 mins',
    category: 'sunday',
    description: 'Jesus taught that men ought always to pray and not lose heart. Discover how persistent intercession transforms the believer’s posture and unleashes divine intervention.',
    keyPoints: [
      'The character of the Judge vs. the compassionate heart of our Heavenly Father.',
      'Overcoming spiritual fatigue when answers seem delayed.',
      'Faith that endures until the return of the Son of Man.'
    ],
    excerpt: '“God is not reluctant to hear His elect. Persistence in prayer does not overcome God’s reluctance; it lays hold of His divine willingness.”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM0XDDAsUFLlDqIXxWb1W2ys2onUNiJJ8xQiFo5DVtolQ44E7M1PCwN1u_zHChk6JgMKvlIf_yIEDcS5qpg7ybRqmzNziB1Kay06Y33tmO61WfRDpvEzc97_yP0-LazdakfYX4uRyMk2boR_yOl0aEJO2gHaDihhxOA90RvIbuNWQ2Ff5EcjQes-ciuFIJmNElPvhSbUazKC-X1iXjqSz8aNBEIB8eEcVWXplLA14',
    notesAvailable: true
  },
  {
    id: 'sermon-3',
    title: 'Anchored in Stormy Seasons',
    speaker: 'Pastor Grace Chebet',
    speakerRole: 'Associate Pastor • Family Ministry',
    date: 'Nov 5, 2023',
    scripture: 'Hebrews 6:19',
    duration: '42 mins',
    category: 'sunday',
    description: 'When economic headwinds, family trials, or illness shake our earthly securities, the soul has an immovable anchor that enters the inner sanctuary behind the curtain.',
    keyPoints: [
      'The difference between earthly optimism and Christ-centered hope.',
      'Holding fast to God’s unalterable covenant and oath.',
      'Finding stillness in the presence of Jesus our High Priest.'
    ],
    excerpt: '“We have this hope as an anchor for the soul, firm and secure. When the storms blow across Trans-Nzoia, your life is not drifting at the mercy of the wind—you are anchored in Jesus!”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjmaL1qZ0BtuBeQfTLNHADQOARHIKtuVPihQkJmrXvs_unGw1cpD2GXdc-WRwY_VEYd8zbXDPgFaaMKxxmvRtkNoy62dxiUGgAdoJyMo5Ve1KjC9KKDnSqm_2JTlt82OFqRJZcwHLl94KXsaKiV7wG2DzHWvElyoi4IsDPxPDkx7Kw9uOjDuYZjPvykB2M86Voou7IjT3UgociYXF85QwyRRp0-Pn3dSqw_UyHDPQ',
    notesAvailable: true
  },
  {
    id: 'sermon-4',
    title: 'Walking in Kingdom Integrity',
    speaker: 'Rev. Samuel Adebayo',
    speakerRole: 'Senior Pastor',
    date: 'Oct 29, 2023',
    scripture: 'Proverbs 11:1-3',
    duration: '51 mins',
    category: 'series',
    series: 'Kingdom Marketplace',
    seriesPart: 'Part 2 of 3',
    description: 'God detests dishonest scales but accurate weights find favor with Him. A convicting message for civil servants, entrepreneurs, farmers, and students in Kitale.',
    keyPoints: [
      'Honesty in business transactions and public service.',
      'Integrity guides the upright while duplicity destroys the unfaithful.',
      'The generational blessings of a blameless testimony.'
    ],
    excerpt: '“Your pulpit is not just this wooden lectern on Sunday morning; your pulpit is your farm produce market, your clinic, your classroom, and your shop along Kitale town streets.”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCehi7oM8eWTPrUDCLkiDuVml23FsWuFudfs0t-lnlqJxIMF1Ndf2tgrN4L1MPUihUeAPzA_-p9-VJx64eF-izNqI2OxCfJMAi_cNpETXZfdWYcLDarGtHSsJkjGurTLnCHH4mQVelWNrpl1-ya1VOO-t52_XK4fYSmsKFXSXa_qEBHqwC1ky3QQUKaqgA8ZedVJIlSe3DyumyTqTmadiHGwz_rH_DssUAxKeH2CHY',
    notesAvailable: true
  },
  {
    id: 'sermon-5',
    title: 'Misingi ya Imani ya Kikristo (Swahili Service)',
    speaker: 'Pastor Dennis Kiprop',
    speakerRole: 'Youth & Missions Pastor',
    date: 'Oct 22, 2023',
    scripture: 'Waebrania 11:1-6',
    duration: '45 mins',
    category: 'swahili',
    description: 'Imani ni kuwa na hakika ya mambo yatarajiwayo, ni bayana ya mambo yasiyoonekana. Fundisho zito kuhusu jinsi ya kusimama imara katika nyakati za majaribu.',
    keyPoints: [
      'Imani inayompendeza Mungu katika maisha ya kila siku.',
      'Kushinda mashaka na hofu kupitia Neno la Mungu.',
      'Mashujaa wa imani kama kielelezo chetu leo.'
    ],
    excerpt: '“Bila imani haiwezekani kumpendeza Mungu. Imani haitegemei kile macho ya mwili yanachokiona, bali huangazia ahadi za Mungu zisizoshindwa.”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaooPTaEKsFKcU4W7kBWMfm2xMKR1meDwpfCeNReyOjHlEbCX3IeQdw7BmaN9typX1NL7kXaVtceqUqtICB-wcCx64fNXRAv6_u7Q457YMoVPfdiD1MHh3KP_tOwuI7qdLEnYyosAu7P8HN-BKvilRtJYV4MYca3_053Apo827kQc7behMwZKmpHuH2Lg9qgTaG6KFdIxxsqBUcPc1EQeGv9eLBLykxNL864GfPvQ',
    notesAvailable: true
  },
  {
    id: 'sermon-6',
    title: 'Generational Discipleship & Family Altars',
    speaker: 'Mama Grace Adebayo',
    speakerRole: 'Director of Women & Family Ministry',
    date: 'Oct 15, 2023',
    scripture: 'Deuteronomy 6:4-9',
    duration: '39 mins',
    category: 'midweek',
    description: 'Rebuilding the family altar in an age of digital distraction. How parents and grandparents can faithfully impart faith to their children and grandchildren.',
    keyPoints: [
      'Love the Lord with all your heart, soul, and strength.',
      'Teaching God’s commands diligently when you sit, walk, lie down, and rise.',
      'Creating intentional moments of family prayer and blessing.'
    ],
    excerpt: '“If we do not teach our children to love Jesus, the world will teach them to love everything else. The spiritual atmosphere of your home is your greatest legacy.”',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0td1GoiIB3Oe9Pakm2tT-prarZHotVJzL0JmISMtxlNcOd5AtPUIr1EZjwRMygIq-qml9GRYNNVtxkKR4TPKOBRWey1sC4w0Nev-FKO8fhJeACbCkiOhP3-mqK-qJHOBMoz75SnAVVU5xICk5BTQMTEe4uC4ERLp2z4PPMsv5Ax9fRdCb7ngz_9vqutE8cwjHEZ5qOT28u3wASpKNovRbQ0CTeWpRsq65N0L4SoM',
    notesAvailable: true
  }
];

export const EVENTS_DATA: ChurchEvent[] = [
  {
    id: 'event-flagship',
    title: 'AIC Nuru Annual End-of-Year Thanksgiving & Commissioning Conference',
    dateBadge: { day: '28', month: 'DEC', dayOfWeek: 'Thu - Sun', year: '2023' },
    time: '8:30 AM – 8:30 PM Daily',
    venue: 'Main Sanctuary & Amphitheatre • AIC Nuru Kitale',
    host: 'Rev. Samuel Adebayo & Pastoral Council',
    category: 'all',
    badgeText: 'Flagship Annual Gathering',
    description: 'Four transformational days of profound biblical teaching, round-the-clock intercession, youth breakout symposiums, and celebratory praise as we dedicate the coming year to our Lord Jesus Christ. Theme: “Rooted & Built Up in Him” (Colossians 2:7). Featuring Bishop Silas Yego, Rev. Dr. Joyce Chege, and Nuru Mass Choir.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjU-iaAXUnezI3CbSnv0nIXwyDbG5acGMaluYp5hUR9fN_5_QgXKpZ34XQu5HvJ0rWaxyftDiqBDYXjQMtE64S8X2ycd3CGGaBLd4Hyn1lTPDF6t4lDGjOO-4hXgxQi8K1eRlHFv4KCzrvo1PngoceQH2TZ_krkBXsPR5FKYDo4wWMuKU8fp1vjCxxiSeIUx9N7fZIH_h3CJcAyHiXgo9qreOqQyT3gjK3bWr7qZk',
    registrationOpen: true,
    registrationFee: 'Free (Registration Required)',
    featured: true
  },
  {
    id: 'event-kesha',
    title: 'Annual Youth Kesha & Worship Night: “Unshakable Faith”',
    dateBadge: { day: '24', month: 'NOV', dayOfWeek: 'Friday', year: '2023' },
    time: '8:00 PM – Dawn (6:00 AM)',
    venue: 'Main Sanctuary • AIC Nuru Kitale',
    host: 'Youth Pastor Dennis Kiprop & Guest Worship Ministers',
    category: 'kesha',
    badgeText: 'High School & Campus',
    description: 'A powerful overnight vigil of prayer, prophetic worship, and dynamic preaching centered on living without compromise in campus and high school environments. Transport provided for school hostels.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWrENbyxtBcyb8oJKac7q-eAVW0DzaLA2_dCAMX1-u25M1Kumx2YVsZ8zeKiIh6zYBY7Jq-n8eQfI9A_qjm1DH8KqVtXCcxzguLBk25DUedYSU_2JvTn5uUlIClFf2Yu1LSL2V0QDmmIPxpAZJwVt1uur6u2pCCu0i_ikI2PcbvGSdWIJnUv87GsTkqrOkLRTW5FBpFpez7elkfl714Qk13f6doaeryfxXvMtzaY',
    registrationOpen: true,
    registrationFee: 'Free Admission'
  },
  {
    id: 'event-sports',
    title: 'Trans-Nzoia Youth Sports & Worship Gala',
    dateBadge: { day: '25', month: 'NOV', dayOfWeek: 'Saturday', year: '2023' },
    time: '10:00 AM – 4:00 PM',
    venue: 'Kitale Municipal Grounds (Near Showground)',
    host: 'Parish Sports & Evangelism Committee',
    category: 'youth',
    badgeText: 'Inter-Fellowship Sports',
    description: '7-a-side football tournaments, volleyball derbies, track games, spoken-word poetry showcase, followed by an open-air sunset gospel worship praise experience under the Kitale skies with 12 competing parish teams.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGw-X7i3lJNJJk2p6r7xV7hsoYR5h2dajksqiLs_fIbGLJV85XXRsqDSzEBbh8j6l8vr6JqsW5E9yXO2cwVcI3FH7-bwMuuD1acV_xJCcGDNvxr_D-rJOTJUk-2oQECO0lZw5SLAzFoffT25TrcocTILHRVmcu0uXz2M6GSDzAzfjqhnl59SH5EK9EOmpjolbjiMHsYc9cFQ4as7FYoSG6yy5AHvB7-H702wvzAcM',
    registrationOpen: true,
    registrationFee: 'Free'
  },
  {
    id: 'event-couples',
    title: 'Couples & Family Enrichment Breakfast',
    dateBadge: { day: '02', month: 'DEC', dayOfWeek: 'Saturday', year: '2023' },
    time: '8:30 AM – 12:00 PM',
    venue: 'Fellowship Hall • AIC Nuru Kitale',
    host: 'Elder & Mrs. David Rotich • Family Ministry',
    category: 'men',
    badgeText: 'Marriage & Family',
    description: 'Strengthening marital covenants through candid discussions on communication, family budgeting, managing in-law dynamics, and biblical parenting with catered hot Kenyan breakfast and mandazi.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0td1GoiIB3Oe9Pakm2tT-prarZHotVJzL0JmISMtxlNcOd5AtPUIr1EZjwRMygIq-qml9GRYNNVtxkKR4TPKOBRWey1sC4w0Nev-FKO8fhJeACbCkiOhP3-mqK-qJHOBMoz75SnAVVU5xICk5BTQMTEe4uC4ERLp2z4PPMsv5Ax9fRdCb7ngz_9vqutE8cwjHEZ5qOT28u3wASpKNovRbQ0CTeWpRsq65N0L4SoM',
    registrationOpen: true,
    registrationFee: 'KES 1,000 per Couple (Includes Catering)'
  },
  {
    id: 'event-outreach',
    title: 'Community Health & Medical Outreach Camp',
    dateBadge: { day: '09', month: 'DEC', dayOfWeek: 'Saturday', year: '2023' },
    time: '9:00 AM – 4:00 PM',
    venue: 'Kitale Municipal Grounds (Town Center)',
    host: 'Dorcas Medical Missionaries & Doctors Fellowship',
    category: 'outreach',
    badgeText: 'Community Care',
    description: 'Providing free medical checkups, blood sugar & pressure screenings, eye exams, medicine distribution, clothing donations, and sharing the good news of Jesus Christ with vulnerable families.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC17YGhfOE4MGqJ5ySST9Cgkd7yQyHLMUJcXlZVwNLSb3ouLU_WC5ZhZ2OFrq_Y_JIjT_hispKNYwloqqt7KUAVPbXjBcFlMHCMzb-W-mxGdHIBOXDO360VKh7vfeXePhIVt2uZ-vJ1FvlywnjbtRkyu0NaPvHwGN-8co_muYbsMaHYpaAmzxNu0PuEE-YnsXj1kzGMqZDxtTHplxIsn21vX59bXe49zX5dURIUJIY',
    registrationOpen: true,
    registrationFee: 'Free (Volunteers Welcome)'
  },
  {
    id: 'event-women',
    title: 'Women of Faith (Dorcas Fellowship) Year-End Banquet',
    dateBadge: { day: '16', month: 'DEC', dayOfWeek: 'Saturday', year: '2023' },
    time: '1:00 PM – 5:00 PM',
    venue: 'Fellowship Garden Canopy • AIC Nuru Kitale',
    host: 'Mama Grace Adebayo',
    category: 'women',
    badgeText: 'Mothers & Sisters',
    description: 'Celebrating a year of fruitful prayer, benevolence outreaches to widows, table banking savings milestones, and worship testimonies. Dress code: Elegant African print with a touch of gold.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_Oyo9s5Bqwf1O0DGBVRYjaRP4CklCH-G6RhRfVD-XXl_Pg2BdkHujJdA4NjWzRjjD6LTnWzA4ugn07znhrEHdwkAX4-rbU5F04sS_E4U1_FLC0XakAwZjz3dDdBQ3lcqdGjtKqw_jK3AI_TvIu6CZidW3HOVoUlmi5nME7uHCc8pcmJs3wQQvhmbsXgPEo3yIJ6rPLm4DJiBcpdApfpWWlyAdrHHpXYPTZ9VwiA',
    registrationOpen: true,
    registrationFee: 'KES 500'
  }
];

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'min-children',
    name: 'Children’s Ministry & Awana Club',
    targetGroup: 'Toddlers to Age 12',
    meetingTime: 'Sundays at 10:45 AM',
    venue: 'Tumaini Children’s Wing',
    description: 'Nurturing young hearts with scripture memorization, joyful praise, biblical puppetry, and weekly Awana clubs led by certified Sunday school teachers in safe, well-equipped classrooms.',
    icon: 'child_care',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCehi7oM8eWTPrUDCLkiDuVml23FsWuFudfs0t-lnlqJxIMF1Ndf2tgrN4L1MPUihUeAPzA_-p9-VJx64eF-izNqI2OxCfJMAi_cNpETXZfdWYcLDarGtHSsJkjGurTLnCHH4mQVelWNrpl1-ya1VOO-t52_XK4fYSmsKFXSXa_qEBHqwC1ky3QQUKaqgA8ZedVJIlSe3DyumyTqTmadiHGwz_rH_DssUAxKeH2CHY',
    leader: 'Teacher Mary Wekesa',
    keyActivities: ['Bible Story Puppetry', 'Awana Handbook Memorization', 'Annual Vacation Bible School', 'Children’s Choir Presentations']
  },
  {
    id: 'min-youth',
    name: 'Nuru Generation (Youth & Campus)',
    targetGroup: 'High School, University Students & Young Professionals',
    meetingTime: 'Saturdays at 4:00 PM & 1st Fridays Kesha',
    venue: 'Youth Hall & Amphitheatre',
    description: 'A vibrant, uncompromising generation living out kingdom values through dynamic praise, open discussions on mental health and career, retreats, sports, and creative arts.',
    icon: 'bolt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWrENbyxtBcyb8oJKac7q-eAVW0DzaLA2_dCAMX1-u25M1Kumx2YVsZ8zeKiIh6zYBY7Jq-n8eQfI9A_qjm1DH8KqVtXCcxzguLBk25DUedYSU_2JvTn5uUlIClFf2Yu1LSL2V0QDmmIPxpAZJwVt1uur6u2pCCu0i_ikI2PcbvGSdWIJnUv87GsTkqrOkLRTW5FBpFpez7elkfl714Qk13f6doaeryfxXvMtzaY',
    leader: 'Pastor Dennis Kiprop',
    keyActivities: ['Bi-weekly Campus Fellowships', 'Acoustic Worship Nights', 'Annual Mount Elgon Retreat', 'High School Mission Outreaches']
  },
  {
    id: 'min-women',
    name: 'Women of Faith (Dorcas Fellowship)',
    targetGroup: 'All Mothers, Single Ladies & Sisters',
    meetingTime: 'Tuesdays at 5:00 PM',
    venue: 'Sanctuary Chapel',
    description: 'Empowering godly women through intercessory prayer, widow visitation, hospital benevolence, micro-savings table banking, and warm hospitality for church ceremonies.',
    icon: 'volunteer_activism',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_Oyo9s5Bqwf1O0DGBVRYjaRP4CklCH-G6RhRfVD-XXl_Pg2BdkHujJdA4NjWzRjjD6LTnWzA4ugn07znhrEHdwkAX4-rbU5F04sS_E4U1_FLC0XakAwZjz3dDdBQ3lcqdGjtKqw_jK3AI_TvIu6CZidW3HOVoUlmi5nME7uHCc8pcmJs3wQQvhmbsXgPEo3yIJ6rPLm4DJiBcpdApfpWWlyAdrHHpXYPTZ9VwiA',
    leader: 'Mama Grace Adebayo',
    keyActivities: ['Weekly Intercession for Families', 'Hospital & Prison Visitations', 'Table Banking Financial Literacy', 'Annual Women’s Conference']
  },
  {
    id: 'min-men',
    name: 'Men of Honor Fellowship',
    targetGroup: 'Fathers, Husbands & Young Men',
    meetingTime: 'Monthly 2nd Saturday at 7:00 AM (Prayer Breakfast)',
    venue: 'Parish Boardroom & Fellowship Hall',
    description: 'Equipping men to lead their households in godliness, maintain uncompromised integrity in business and careers, and mentor young boys through the Rite of Passage Christian Program.',
    icon: 'shield',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3VAKaL97MOZ2z9p6lrKytpy8F2MKD8sQDllFHNiDsn-vUJb5rdV8gKxxXPR-7X5P1NrSHNU_53Pwj7ig9QmFwF6d6IUZ6SC1lxR4_16LZWssqL02XqRrXUuEKM-XScrFmxm9l-bo2jVphtkzDV7bh01PMmrHME8YAtg6anVUg7euEJe3x2PTd9yojWE5y6hS_zZFhSWHoeqJ8QpZratfX6Z4G1RibGUKJev4g2Ps',
    leader: 'Elder David Rotich',
    keyActivities: ['Monthly Men’s Prayer Breakfast', 'Boy-Child Mentorship (ROP)', 'Church Maintenance & Construction Days', 'Marketplace Leadership Seminars']
  },
  {
    id: 'min-worship',
    name: 'Worship & Creative Arts Ministry',
    targetGroup: 'Vocalists, Instrumentals & Technical Sound Engineers',
    meetingTime: 'Thursdays 5:30 PM & Saturdays 3:00 PM',
    venue: 'Main Choir Loft',
    description: 'Ushering the congregation into God’s reverent presence through authentic African choral harmonies, contemporary praise, band accompaniment, sound engineering, and livestream broadcasts.',
    icon: 'music_note',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9F6KqL5Ewkj1OHcYCaZeO6on1MNhqhObX-WCQ-1mrgoakvKM87ydR_YTgALRv-yDFGsWK1_ETzhU3g-qspP3KOModWbRa2V80q4gYx__vb4uDi4f69Vk04AYCoHQVfHfhfSWi-h6_cN7nWASEN8Sj0ph0yEs-M0_v_-43kaTWYEwJpeeT6v0enQxemyugKmz3H4sVUbIpJco1FaelThKaI5DhJTj9u2Vvr3JpDQw',
    leader: 'Music Director Caleb Wasike',
    keyActivities: ['Weekly Sunday Service Praise Leading', 'Easter & Christmas Cantatas', 'Audio/Visual Media Streaming', 'Instrument Training Workshops']
  }
];

export const GIVING_DESIGNATIONS: Designation[] = [
  {
    id: 'des-1',
    code: 'TITHE',
    name: 'Tithes & Firstfruits (Fungu la Kumi)',
    description: 'Honoring God with the tenth of salaries, farm harvests, business profits, and seasonal firstfruits.',
    icon: 'payments'
  },
  {
    id: 'des-2',
    code: 'OFFERING',
    name: 'Sunday Offering & Thanksgiving (Sadaka)',
    description: 'Weekly worship service offerings supporting pastoral upkeep, sanctuary operations, and hospitality.',
    icon: 'church'
  },
  {
    id: 'des-3',
    code: 'BUILDING',
    name: 'Sanctuary Expansion & Capital Project',
    description: 'Funding the ongoing Phase 2 Multipurpose Hall, Sunday School classrooms, and acoustic paving.',
    icon: 'foundation'
  },
  {
    id: 'des-4',
    code: 'MISSIONS',
    name: 'Rural Missions & Evangelism Outreach',
    description: 'Supporting church planters in Turkana, Mount Elgon slopes, and secondary school gospel missions.',
    icon: 'public'
  },
  {
    id: 'des-5',
    code: 'NEEDY',
    name: 'Benevolence & Widow Care Fund',
    description: 'Providing food hampers, orphan school uniforms, and emergency medical relief for vulnerable families.',
    icon: 'handshake'
  }
];

export const CELL_GROUPS_DATA: CellGroup[] = [
  {
    name: 'Tumaini Cell Fellowship',
    neighborhood: 'Milimani, Section 6 & Laini Moja',
    meetingDay: 'Every Thursday, 6:00 PM – 7:30 PM',
    leader: 'Elder & Mrs. Barasa',
    contact: '+254 718 016 491'
  },
  {
    name: 'Baraka Cell Fellowship',
    neighborhood: 'Kibomet, Shimo la Tewa & Bondeni',
    meetingDay: 'Every Thursday, 6:00 PM – 7:30 PM',
    leader: 'Deacon John Wanjala',
    contact: '+254 718 016 491'
  },
  {
    name: 'Amani Cell Fellowship',
    neighborhood: 'Mitume, Lessos & Matisi',
    meetingDay: 'Every Thursday, 6:00 PM – 7:30 PM',
    leader: 'Mrs. Florence Simiyu',
    contact: '+254 718 016 491'
  },
  {
    name: 'Neema Cell Fellowship',
    neighborhood: 'Bidii, Airstrip Area & Endebess Rd',
    meetingDay: 'Every Thursday, 6:00 PM – 7:30 PM',
    leader: 'Mr. & Mrs. Kiprotich',
    contact: '+254 718 016 491'
  }
];

export const PRESET_AMOUNTS = [200, 500, 1000, 2500, 5000, 10000];
