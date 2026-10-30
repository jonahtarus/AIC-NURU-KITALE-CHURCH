export type NavigationTab = 
  | 'home' 
  | 'about-us' 
  | 'sermons' 
  | 'choir'
  | 'events' 
  | 'ministries' 
  | 'give' 
  | 'plan-visit' 
  | 'contact';

export interface ChoirVideo {
  id: string;
  youtubeId: string;
  title: string;
  album: string;
  artist: string;
  description: string;
  duration: string;
  featured?: boolean;
}


export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  scripture: string;
  duration: string;
  category: 'all' | 'series' | 'sunday' | 'midweek' | 'guest' | 'swahili';
  series?: string;
  seriesPart?: string;
  description: string;
  keyPoints: string[];
  excerpt: string;
  thumbnail: string;
  audioUrl?: string;
  videoUrl?: string;
  notesAvailable: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  dateBadge: {
    day: string;
    month: string;
    dayOfWeek: string;
    year: string;
  };
  time: string;
  venue: string;
  host: string;
  category: 'all' | 'sunday' | 'kesha' | 'youth' | 'women' | 'men' | 'outreach';
  badgeText: string;
  description: string;
  image: string;
  registrationOpen: boolean;
  registrationFee?: string;
  featured?: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  targetGroup: string;
  meetingTime: string;
  venue: string;
  description: string;
  icon: string;
  image: string;
  leader: string;
  keyActivities: string[];
}

export interface Designation {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
}

export interface CellGroup {
  name: string;
  neighborhood: string;
  meetingDay: string;
  leader: string;
  contact: string;
}

export interface SiteSettings {
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeMessage: string;
  bannerImageUrl: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  sundayServices: string;
  updatedAt?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  pinned?: boolean;
  imageUrl?: string;
  createdAt?: string;
}

export interface ContentItem {
  id: string;
  type: 'sermon' | 'choir' | 'event' | 'article';
  title: string;
  date: string;
  description: string;
  mediaUrl: string;
  speakerOrArtist?: string;
  category?: string;
  createdAt?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  phone?: string;
  order?: number;
}
