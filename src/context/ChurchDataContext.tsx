import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import {
  auth,
  db,
  isApprovedAdmin,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import {
  SiteSettings,
  AnnouncementItem,
  ContentItem,
  TeamMemberItem
} from '../types';
import { CHURCH_INFO, CHOIR_VIDEOS } from '../data/churchData';

// Default initial site settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  welcomeTitle: 'Walk in the Light at AIC NURU KITALE',
  welcomeSubtitle: 'AFRICA INLAND CHURCH • NURU KITALE, KENYA • “Let Your Light Shine”',
  welcomeMessage:
    'A premier Christ-centered sanctuary in Trans-Nzoia County illuminating hearts with biblical truth, anointed praise, and transformative community impact. Arise, shine, for your light has come!',
  bannerImageUrl:
    '/assets/aistudio/WhatsApp_Image_2026-10-29_at_7.24.32_PM_6a635d91.jpeg',
  phone: CHURCH_INFO.phone,
  whatsapp: CHURCH_INFO.whatsapp,
  email: CHURCH_INFO.email,
  address: CHURCH_INFO.location,
  sundayServices: 'Sunday 8:00 AM (English Service) • 10:30 AM (Kiswahili Service)'
};

// Default initial announcements
export const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Annual Harvest Thanksgiving & Dedication',
    date: 'Sunday, Nov 17, 2024 • 9:00 AM',
    category: 'Harvest Thanksgiving',
    content:
      'A combined celebratory service giving thanks to God for the Trans-Nzoia agricultural harvest, family breakthroughs, and pastoral blessings in the Main Sanctuary.',
    pinned: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBd4UOSZDBlhx45oftOYUdJxJb9n8Jf-EYQI_fb7TO-Ava3_W_ycHXiqjW0plZUZuauE-9pn5mBAODbMvNah_gkGf5wg2GXaWAQPu61sIByfeXr3ffvFj92B6XJ6aTszUUV-XFAQL_J_GXHdhyTm9uBfKILKCBJo4SBzDhYL0uWSswYXn3dkLMzz29-FDtgo5eyjzFn7lAPjb1XEGOZVHfxqFiTqtUaLlnhkyG6j70'
  },
  {
    id: 'ann-2',
    title: 'Nuru Youth Worship Encounter & Praise Night',
    date: 'Friday, Nov 22, 2024 • 6:00 PM',
    category: 'Youth & Young Adults',
    content:
      'An evening of acoustic deep worship, spoken word gospel poetry, candid youth Q&A on relationship purity, and intercessory prayer in the Youth Auditorium.',
    pinned: true
  },
  {
    id: 'ann-3',
    title: 'Kitale Community Medical & Food Outreach Camp',
    date: 'Sunday, Dec 01, 2024 • 8:00 AM',
    category: 'Community Compassion',
    content:
      'Providing free general doctor consultations, blood pressure & diabetes screening, pediatric care, and food distribution to needy families on Nuru Church Grounds.',
    pinned: false
  },
  {
    id: 'ann-4',
    title: 'Joint AIC Nuru Choir Christmas Cantata',
    date: 'Sunday, Dec 08, 2024 • 4:00 PM',
    category: 'Choir & Praise',
    content:
      'Celebrating the birth of our Savior Jesus Christ with glorious four-part choir harmony, orchestra performances, and candlelight carols in the Nuru Main Sanctuary.',
    pinned: false
  }
];

// Default initial content items
export const DEFAULT_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'cnt-sermon-featured',
    type: 'sermon',
    title: 'Walking in the Light Through Life\'s Dry Seasons',
    date: 'Last Sunday Service',
    description:
      'Rev. John Kibet explores Hebrews 11 and how the light of Christ illuminates every dark valley, sustaining believers when prayers seem delayed and the road appears uncertain.',
    mediaUrl: 'https://www.youtube.com/watch?v=uq-bPrSBWUQ',
    speakerOrArtist: 'Rev. John Kibet',
    category: 'Unshakeable Kingdom • Part 4'
  },
  {
    id: 'cnt-sermon-2',
    type: 'sermon',
    title: 'Clothed in Compassion & Humility',
    date: 'Nov 03, 2024',
    description:
      'Pastor Grace Chebet examines living out authentic Christlike character in modern marriage and workplace relationships (Colossians 3:12–17).',
    mediaUrl: 'https://www.youtube.com/watch?v=83S6rBA8B04',
    speakerOrArtist: 'Pastor Grace Chebet',
    category: 'Sunday Message'
  },
  {
    id: 'cnt-sermon-3',
    type: 'sermon',
    title: 'Set the Example: Shining in a Dark World',
    date: 'Oct 27, 2024',
    description:
      'Pastor David Wafula equips young people to navigate peer culture with godly conviction and academic purpose (1 Timothy 4:12).',
    mediaUrl: 'https://www.youtube.com/watch?v=q_U0awfjawg',
    speakerOrArtist: 'Pastor David Wafula',
    category: 'Youth Gathering'
  },
  {
    id: 'cnt-mashujaa',
    type: 'choir',
    title: 'Mashujaa wa Yesu — AIC Nuru Gospel Singers',
    date: 'Flagship Album Release',
    description: 'The triumphant flagship praise song celebrating our victory in Christ Jesus.',
    mediaUrl: 'https://www.youtube.com/watch?v=uq-bPrSBWUQ',
    speakerOrArtist: 'AIC Nuru Gospel Singers, Kitale',
    category: 'Choir Album Track'
  }
];

// Default initial leadership team members
export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'team-1',
    name: 'Rev. John Kibet',
    role: 'Senior Pastor • Ordained',
    bio: 'Shepherding God\'s flock with the radiant light of Christ, sound doctrine, and compassionate love. Leading pastoral ministry, theological training, and community leadership in Kitale.',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlkv5WbY37g-knPmVY4b07xIrqXzy1SlbVK2kpTR2IwVeeJOrMbZFkTQD8eQGT1CcwcYE7dCEqotSD0_-C17W9liX2D__ayJmmOuuapbPwvUky3rM-qwkHIbiMkgugXzZcnDR9MSQcms00SUuyiNq_w1bTi47pzkmw5FffIREtCInLGaL8-j-m6nKXUfUTTaX4DPLXEVv8WIBXS6xj6Tx6ShRTfsQgALRaGI5p8h0',
    order: 1
  },
  {
    id: 'team-2',
    name: 'Pastor Grace Chebet',
    role: 'Associate Pastor • Family & Counseling',
    bio: 'Passionate about women\'s empowerment, youth discipleship, marriage restoration, and family counseling in Christ across all Nuru families.',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCocb3X237TsAjyqLiOJPro-IvIqjkTyNgO-GSprH5KNV2Jpb3rNw2X9Ht7S6PNSFNPL2BkEnUiOh4Fezm-oB9mIrMPsCI5sKihvPegDWLWSWA8SVxZ3knHgll-_YW5yeH9O0Bl7_BP36MDf3zqNZGEaoIj4u_8aFtqYAvBoH9XenOUuV3i0o8Hjri9nUz8uMe6m63rmeDRSvUz4NjeqCV6nKPRb0zkWp1mhdD3KVM',
    order: 2
  },
  {
    id: 'team-3',
    name: 'Pastor David Wafula',
    role: 'Youth Pastor • Young Adults',
    bio: 'Equipping the next generation of Christian leaders to stand firm as lights in this generation through high school, campus, and career fellowship.',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaJPKfPXvAVoKFT25AdXJ9QODrzhO0NkzmXBqUPElMNNQAgNb_my86iGTibvk4BtBp0XMaqYjQiMBEQ-MnGjKxxQo91JSSnWBMFAS9393PVjEZixArPZUxhN4Zd2D43jx89zqs_EQpRmBvW3FmzttueKHTaAnRaeb29msQ6YA4aP1u-ppABstOoZBL7enKeBmOKwmGgyyiniIpT9HGWaQqCPPTI-Asy5kSxSVyD0w',
    order: 3
  },
  {
    id: 'team-4',
    name: 'Elder Samuel Omondi',
    role: 'Session Clerk • Church Administrator',
    bio: 'Ensuring faithful stewardship, order, and compassionate communal care across all Nuru ministries, accounts governance, and church administration.',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdzmV-M5pGCK1FiISOKzkcbc4pvBfmYsC2BcnQdpVr1T7ZKo2dSxaa3wFS_f6ob5HRlJ6lhkgkGXj0lmbaUW9hvZTGlJkfBFzuQ50HkVylJ1joR0wB6sbxiZMwpHaOP2dP433BuMNPw5Y3uDt8XbDQg5tUyoez2ebTcDd3lQa1Vz3gyjB_xHrnfN9euA01yjS6w6dIjrllNqlZ8dNm8mpDHHW60Xz9rTyaokPebF4',
    order: 4
  }
];

interface ChurchDataContextType {
  siteSettings: SiteSettings;
  announcements: AnnouncementItem[];
  contentItems: ContentItem[];
  teamMembers: TeamMemberItem[];
  isLoaded: boolean;
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  signOutAdmin: () => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  saveAnnouncement: (item: AnnouncementItem) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  saveContentItem: (item: ContentItem) => Promise<void>;
  deleteContentItem: (id: string) => Promise<void>;
  saveTeamMember: (member: TeamMemberItem) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  seedInitialDataToFirestore: () => Promise<void>;
}

const ChurchDataContext = createContext<ChurchDataContextType | null>(null);

export const ChurchDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(DEFAULT_ANNOUNCEMENTS);
  const [contentItems, setContentItems] = useState<ContentItem[]>(DEFAULT_CONTENT_ITEMS);
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>(DEFAULT_TEAM_MEMBERS);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && isApprovedAdmin(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Subscriptions
  useEffect(() => {
    // 1. Site Settings
    const unsubSettings = onSnapshot(
      doc(db, 'site_settings', 'general'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as SiteSettings;
          if (
            !data.bannerImageUrl ||
            data.bannerImageUrl.includes('lh3.googleusercontent.com/aida-public/AB6AXuAXo') ||
            data.bannerImageUrl.includes('WhatsApp_Image_2026-10-29_at_5.19.12')
          ) {
            data.bannerImageUrl =
              '/assets/aistudio/WhatsApp_Image_2026-10-29_at_7.24.32_PM_6a635d91.jpeg';
          }
          if (
            !data.phone ||
            data.phone.includes('700 000 000') ||
            data.phone.includes('712 345 678')
          ) {
            data.phone = '+254 718 016 491';
          }
          if (
            !data.email ||
            data.email.includes('aicnurukitale.or.ke')
          ) {
            data.email = 'jonahtarus20@gmail.com';
          }
          data.whatsapp = '+254 718 016 491';
          setSiteSettings((prev) => ({
            ...prev,
            ...data
          }));
        }
        setIsLoaded(true);
      },
      (error) => {
        console.warn('Site settings snapshot notice:', error.message);
        setIsLoaded(true);
      }
    );

    // 2. Announcements
    const unsubAnnouncements = onSnapshot(
      collection(db, 'announcements'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items: AnnouncementItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as AnnouncementItem);
          });
          setAnnouncements(items);
        }
      },
      (error) => {
        console.warn('Announcements snapshot notice:', error.message);
      }
    );

    // 3. Content Items
    const unsubContent = onSnapshot(
      collection(db, 'content_items'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items: ContentItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as ContentItem);
          });
          setContentItems(items);
        }
      },
      (error) => {
        console.warn('Content items snapshot notice:', error.message);
      }
    );

    // 4. Team Members
    const unsubTeam = onSnapshot(
      collection(db, 'team_members'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items: TeamMemberItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as TeamMemberItem);
          });
          items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
          setTeamMembers(items);
        }
      },
      (error) => {
        console.warn('Team members snapshot notice:', error.message);
      }
    );

    return () => {
      unsubSettings();
      unsubAnnouncements();
      unsubContent();
      unsubTeam();
    };
  }, []);

  // Admin Actions
  const updateSiteSettings = async (partial: Partial<SiteSettings>) => {
    const updated = {
      ...siteSettings,
      ...partial,
      updatedAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'site_settings', 'general'), updated);
      setSiteSettings(updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'site_settings/general');
    }
  };

  const saveAnnouncement = async (item: AnnouncementItem) => {
    const toSave: AnnouncementItem = {
      ...item,
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'announcements', toSave.id), toSave);
      setAnnouncements((prev) => {
        const filtered = prev.filter((i) => i.id !== toSave.id);
        return [toSave, ...filtered];
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `announcements/${toSave.id}`);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'announcements', id));
      setAnnouncements((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `announcements/${id}`);
    }
  };

  const saveContentItem = async (item: ContentItem) => {
    const toSave: ContentItem = {
      ...item,
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'content_items', toSave.id), toSave);
      setContentItems((prev) => {
        const filtered = prev.filter((i) => i.id !== toSave.id);
        return [toSave, ...filtered];
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `content_items/${toSave.id}`);
    }
  };

  const deleteContentItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'content_items', id));
      setContentItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `content_items/${id}`);
    }
  };

  const saveTeamMember = async (member: TeamMemberItem) => {
    try {
      await setDoc(doc(db, 'team_members', member.id), member);
      setTeamMembers((prev) => {
        const filtered = prev.filter((m) => m.id !== member.id);
        const next = [...filtered, member];
        return next.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `team_members/${member.id}`);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'team_members', id));
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `team_members/${id}`);
    }
  };

  // Seed default items into Firestore so the database is populated for editing
  const seedInitialDataToFirestore = async () => {
    try {
      // 1. Site Settings
      await setDoc(doc(db, 'site_settings', 'general'), DEFAULT_SITE_SETTINGS);

      // 2. Announcements
      for (const ann of DEFAULT_ANNOUNCEMENTS) {
        await setDoc(doc(db, 'announcements', ann.id), ann);
      }

      // 3. Content Items
      for (const item of DEFAULT_CONTENT_ITEMS) {
        await setDoc(doc(db, 'content_items', item.id), item);
      }

      // 4. Team Members
      for (const mem of DEFAULT_TEAM_MEMBERS) {
        await setDoc(doc(db, 'team_members', mem.id), mem);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed');
    }
  };

  const signOutAdmin = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  return (
    <ChurchDataContext.Provider
      value={{
        siteSettings,
        announcements,
        contentItems,
        teamMembers,
        isLoaded,
        currentUser,
        isAdmin,
        authLoading,
        signOutAdmin,
        updateSiteSettings,
        saveAnnouncement,
        deleteAnnouncement,
        saveContentItem,
        deleteContentItem,
        saveTeamMember,
        deleteTeamMember,
        seedInitialDataToFirestore
      }}
    >
      {children}
    </ChurchDataContext.Provider>
  );
};

export const useChurchData = (): ChurchDataContextType => {
  const context = useContext(ChurchDataContext);
  if (!context) {
    throw new Error('useChurchData must be used within a ChurchDataProvider');
  }
  return context;
};
