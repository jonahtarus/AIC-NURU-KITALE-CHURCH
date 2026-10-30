import React, { useState, useEffect } from 'react';
import { useChurchData } from '../../context/ChurchDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import {
  AnnouncementItem,
  ContentItem,
  TeamMemberItem,
  SiteSettings
} from '../../types';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

type AdminTab = 'banner' | 'announcements' | 'content' | 'team' | 'contact';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const {
    siteSettings,
    announcements,
    contentItems,
    teamMembers,
    currentUser,
    signOutAdmin,
    updateSiteSettings,
    saveAnnouncement,
    deleteAnnouncement,
    saveContentItem,
    deleteContentItem,
    saveTeamMember,
    deleteTeamMember,
    seedInitialDataToFirestore
  } = useChurchData();

  const [activeTab, setActiveTab] = useState<AdminTab>('banner');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states for Welcome / Banner
  const [bannerForm, setBannerForm] = useState<SiteSettings>(siteSettings);

  useEffect(() => {
    setBannerForm(siteSettings);
  }, [siteSettings]);

  // Modal / Form state for Announcement
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  // Modal / Form state for Content Item
  const [editingContentItem, setEditingContentItem] = useState<ContentItem | null>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  // Modal / Form state for Team Member
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMemberItem | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // 1. Handle Banner & Welcome Save
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSettings(bannerForm);
      showToast('Welcome message and banner updated successfully!');
    } catch (err: any) {
      showToast(`Error: ${err.message || 'Failed to save settings'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Handle Announcement Save
  const handleSaveAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    setIsSaving(true);
    try {
      await saveAnnouncement(editingAnnouncement);
      setIsAnnouncementModalOpen(false);
      setEditingAnnouncement(null);
      showToast('Announcement saved and published!');
    } catch (err: any) {
      showToast(`Error: ${err.message || 'Failed to save announcement'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the announcement "${title}"?`)) {
      try {
        await deleteAnnouncement(id);
        showToast('Announcement removed.');
      } catch (err: any) {
        showToast(`Error: ${err.message || 'Failed to delete'}`);
      }
    }
  };

  // 3. Handle Content Item Save
  const handleSaveContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContentItem) return;
    setIsSaving(true);
    try {
      await saveContentItem(editingContentItem);
      setIsContentModalOpen(false);
      setEditingContentItem(null);
      showToast('Content item updated and live!');
    } catch (err: any) {
      showToast(`Error: ${err.message || 'Failed to save content item'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContent = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteContentItem(id);
        showToast('Item deleted.');
      } catch (err: any) {
        showToast(`Error: ${err.message || 'Failed to delete'}`);
      }
    }
  };

  // 4. Handle Team Member Save
  const handleSaveTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamMember) return;
    setIsSaving(true);
    try {
      await saveTeamMember(editingTeamMember);
      setIsTeamModalOpen(false);
      setEditingTeamMember(null);
      showToast('Team member bio saved!');
    } catch (err: any) {
      showToast(`Error: ${err.message || 'Failed to save team member'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeam = async (id: string, name: string) => {
    if (window.confirm(`Delete leader profile for "${name}"?`)) {
      try {
        await deleteTeamMember(id);
        showToast('Team member removed.');
      } catch (err: any) {
        showToast(`Error: ${err.message || 'Failed to delete'}`);
      }
    }
  };

  const handleSeedDefaults = async () => {
    if (
      window.confirm(
        'This will populate Firestore with all standard church data (banner, announcements, sermons, choir videos, and team bios). Continue?'
      )
    ) {
      setIsSaving(true);
      try {
        await seedInitialDataToFirestore();
        showToast('Standard church database initialized to Firestore!');
      } catch (err: any) {
        showToast(`Seed error: ${err.message}`);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#1a202c] flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#00162c] text-[#ffffff] px-4 py-3 rounded-xl shadow-2xl border border-[#c59331]/40 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#ffdea9] text-base">
            check_circle
          </span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-[#00162c] text-[#ffffff] border-b border-[#ffffff]/10 px-4 md:px-8 py-3.5 sticky top-0 z-40">
        <div className="max-w-[1300px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c59331] text-[#00162c] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold text-[#ffffff]">
                  AIC Nuru Kitale
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2b8c67]/30 text-[#85e5ba] text-[10px] font-bold uppercase tracking-wider">
                  Admin Active
                </span>
              </div>
              <p className="text-[11px] text-[#b1c8e8]">
                Signed in as: <span className="font-medium text-[#ffffff]">{currentUser?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-[#ffffff] text-xs font-semibold transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>View Live Website</span>
            </button>

            <button
              onClick={async () => {
                await signOutAdmin();
                onExitAdmin();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-500/30 text-xs font-semibold transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Ribbon */}
      <nav className="bg-[#ffffff] border-b border-gray-200 px-4 md:px-8 shadow-sm">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 py-1">
            <button
              onClick={() => setActiveTab('banner')}
              className={`px-4 py-3 rounded-lg text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'banner'
                  ? 'border-[#c59331] text-[#00162c] bg-[#fff9ed]'
                  : 'border-transparent text-gray-600 hover:text-[#00162c] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">web</span>
              <span>Welcome & Banner</span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-3 rounded-lg text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'announcements'
                  ? 'border-[#c59331] text-[#00162c] bg-[#fff9ed]'
                  : 'border-transparent text-gray-600 hover:text-[#00162c] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">campaign</span>
              <span>Announcements ({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 rounded-lg text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'content'
                  ? 'border-[#c59331] text-[#00162c] bg-[#fff9ed]'
                  : 'border-transparent text-gray-600 hover:text-[#00162c] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">perm_media</span>
              <span>Content & Media ({contentItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-3 rounded-lg text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'team'
                  ? 'border-[#c59331] text-[#00162c] bg-[#fff9ed]'
                  : 'border-transparent text-gray-600 hover:text-[#00162c] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">groups</span>
              <span>Team & Bios ({teamMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-3 rounded-lg text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'contact'
                  ? 'border-[#c59331] text-[#00162c] bg-[#fff9ed]'
                  : 'border-transparent text-gray-600 hover:text-[#00162c] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">contact_mail</span>
              <span>Contact & Hours</span>
            </button>
          </div>

          <button
            onClick={handleSeedDefaults}
            disabled={isSaving}
            className="text-[11px] font-semibold text-gray-500 hover:text-[#7d5800] py-2 px-3 rounded-lg hover:bg-gray-100 transition whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
            title="Populate or restore full initial church content into Firestore"
          >
            <span className="material-symbols-outlined text-sm">cloud_sync</span>
            <span>Sync Default Church Data</span>
          </button>
        </div>
      </nav>

      {/* Main Content Workspace */}
      <main className="max-w-[1300px] w-full mx-auto p-4 md:p-8 flex-1">
        {/* ============================================================ */}
        {/* TAB 1: WELCOME & PHOTO BANNER                                */}
        {/* ============================================================ */}
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#00162c]">
                    Homepage Welcome & Photo Banner
                  </h2>
                  <p className="text-xs text-gray-500">
                    Customize the hero text, welcome headline, and high-resolution photo banner displayed to all visitors.
                  </p>
                </div>
                <div className="text-xs text-[#2b8c67] font-semibold flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-[#2b8c67]"></span>
                  <span>Changes appear immediately on public pages</span>
                </div>
              </div>

              <form onSubmit={handleSaveBanner} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Text Content */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                        Welcome Headline
                      </label>
                      <input
                        type="text"
                        value={bannerForm.welcomeTitle}
                        onChange={(e) =>
                          setBannerForm({ ...bannerForm, welcomeTitle: e.target.value })
                        }
                        required
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white font-medium text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                        Church Subtitle / Motto
                      </label>
                      <input
                        type="text"
                        value={bannerForm.welcomeSubtitle}
                        onChange={(e) =>
                          setBannerForm({ ...bannerForm, welcomeSubtitle: e.target.value })
                        }
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                        Welcome Message & Invitation
                      </label>
                      <textarea
                        rows={4}
                        value={bannerForm.welcomeMessage}
                        onChange={(e) =>
                          setBannerForm({ ...bannerForm, welcomeMessage: e.target.value })
                        }
                        required
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                        Sunday Services Schedule Summary
                      </label>
                      <input
                        type="text"
                        value={bannerForm.sundayServices}
                        onChange={(e) =>
                          setBannerForm({ ...bannerForm, sundayServices: e.target.value })
                        }
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Right Column: Photo Banner with Direct Image Upload */}
                  <div className="space-y-4">
                    <ImageUploadInput
                      label="Homepage Photo Banner"
                      value={bannerForm.bannerImageUrl}
                      onChange={(url) =>
                        setBannerForm({ ...bannerForm, bannerImageUrl: url })
                      }
                      recommendedAspect="Landscape (e.g. 1200x800px)"
                    />

                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                        <span>Photo Upload Guidance</span>
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        Photos uploaded directly from your computer or phone are automatically resized and optimized for blazing-fast mobile viewing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-[#ffffff] font-bold text-xs uppercase tracking-wider shadow transition disabled:opacity-60 cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">save</span>
                    <span>{isSaving ? 'Saving to Database...' : 'Save Welcome & Banner'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ANNOUNCEMENTS & NEWS                                  */}
        {/* ============================================================ */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#00162c]">
                  Parish Announcements & News
                </h2>
                <p className="text-xs text-gray-500">
                  Publish updates, Kesha notifications, meeting reminders, and parish news seen on public pages.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingAnnouncement({
                    id: `ann-${Date.now()}`,
                    title: '',
                    date: 'This Sunday',
                    category: 'General Notice',
                    content: '',
                    pinned: false,
                    imageUrl: ''
                  });
                  setIsAnnouncementModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] font-bold text-xs uppercase tracking-wider shadow transition flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Post New Announcement</span>
              </button>
            </div>

            {/* Announcements List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    {ann.imageUrl && (
                      <img
                        src={ann.imageUrl}
                        alt=""
                        className="w-full h-36 object-cover rounded-xl"
                      />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#f4f7fb] text-[#00162c] text-[10px] font-bold uppercase tracking-wider border border-gray-200">
                        {ann.category}
                      </span>
                      {ann.pinned && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#7d5800] text-[10px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">push_pin</span>
                          <span>Pinned</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#00162c] leading-snug">
                      {ann.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">
                      📅 {ann.date}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingAnnouncement(ann);
                        setIsAnnouncementModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: CONTENT & MEDIA (Sermons, Choir, News)                */}
        {/* ============================================================ */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#00162c]">
                  Content Items & Media Library
                </h2>
                <p className="text-xs text-gray-500">
                  Manage Sermons, Choir video tracks, and articles shown with title, date, description, and video/image links.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingContentItem({
                    id: `cnt-${Date.now()}`,
                    type: 'sermon',
                    title: '',
                    date: 'This Sunday',
                    description: '',
                    mediaUrl: 'https://www.youtube.com/watch?v=uq-bPrSBWUQ',
                    speakerOrArtist: 'Rev. Samuel Adebayo',
                    category: 'Sunday Message'
                  });
                  setIsContentModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] font-bold text-xs uppercase tracking-wider shadow transition flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Add Content Item</span>
              </button>
            </div>

            {/* Content Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#00162c] text-[#ffdea9] text-[10px] font-bold uppercase tracking-wider">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#00162c] leading-snug">
                      {item.title}
                    </h3>

                    {item.speakerOrArtist && (
                      <p className="text-xs text-[#7d5800] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">person</span>
                        <span>{item.speakerOrArtist}</span>
                      </p>
                    )}

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 text-[11px] text-blue-600 truncate flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">link</span>
                      <span className="truncate">{item.mediaUrl}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingContentItem(item);
                        setIsContentModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteContent(item.id, item.title)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: TEAM BIOS & PHOTOS                                    */}
        {/* ============================================================ */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#00162c]">
                  Church Leadership Team Bios & Photos
                </h2>
                <p className="text-xs text-gray-500">
                  Update pastor bios, eldership council, women ministry leaders, and choir directors shown on the About page.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTeamMember({
                    id: `team-${Date.now()}`,
                    name: '',
                    role: '',
                    bio: '',
                    photoUrl: '',
                    order: teamMembers.length + 1
                  });
                  setIsTeamModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] font-bold text-xs uppercase tracking-wider shadow transition flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>Add Team Leader</span>
              </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.photoUrl || 'https://placehold.co/150x150/00162c/ffffff?text=Photo'}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-[#c59331]/30 flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#00162c]">
                          {member.name}
                        </h3>
                        <p className="text-xs text-[#7d5800] font-semibold">
                          {member.role}
                        </p>
                        <span className="text-[10px] text-gray-400">
                          Display order #{member.order ?? 1}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-4 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingTeamMember(member);
                        setIsTeamModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit Bio</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(member.id, member.name)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: CONTACT & SERVICE TIMES                               */}
        {/* ============================================================ */}
        {activeTab === 'contact' && (
          <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#00162c]">
                  Church Contact Details & Physical Location
                </h2>
                <p className="text-xs text-gray-500">
                  Manage phone numbers, email addresses, and address displayed on the Contact page and footer.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                  Church Physical Address
                </label>
                <input
                  type="text"
                  value={bannerForm.address}
                  onChange={(e) =>
                    setBannerForm({ ...bannerForm, address: e.target.value })
                  }
                  required
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={bannerForm.phone}
                    onChange={(e) =>
                      setBannerForm({ ...bannerForm, phone: e.target.value })
                    }
                    required
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                    Official WhatsApp Line
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0718016491"
                    value={bannerForm.whatsapp || ''}
                    onChange={(e) =>
                      setBannerForm({ ...bannerForm, whatsapp: e.target.value })
                    }
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                    Official Church Email
                  </label>
                  <input
                    type="email"
                    value={bannerForm.email}
                    onChange={(e) =>
                      setBannerForm({ ...bannerForm, email: e.target.value })
                    }
                    required
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                  Sunday Services Hours
                </label>
                <input
                  type="text"
                  value={bannerForm.sundayServices}
                  onChange={(e) =>
                    setBannerForm({ ...bannerForm, sundayServices: e.target.value })
                  }
                  required
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-white text-gray-900"
                />
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-[#ffffff] font-bold text-xs uppercase tracking-wider shadow transition disabled:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  <span>{isSaving ? 'Saving...' : 'Save Contact Details'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* MODAL 1: ADD / EDIT ANNOUNCEMENT                             */}
      {/* ============================================================ */}
      {isAnnouncementModalOpen && editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-[#00162c]">
                {editingAnnouncement.id.startsWith('ann-') && !announcements.some(a => a.id === editingAnnouncement.id)
                  ? 'Create New Announcement'
                  : 'Edit Announcement'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAnnouncementModalOpen(false);
                  setEditingAnnouncement(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncementSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })
                  }
                  required
                  placeholder="e.g. Thanksgiving Sunday Harvest"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Date / Timeframe
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.date}
                    onChange={(e) =>
                      setEditingAnnouncement({ ...editingAnnouncement, date: e.target.value })
                    }
                    required
                    placeholder="e.g. Sunday, Nov 15, 2026"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.category}
                    onChange={(e) =>
                      setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })
                    }
                    placeholder="e.g. Night of Worship"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Detailed Announcement Text
                </label>
                <textarea
                  rows={4}
                  value={editingAnnouncement.content}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })
                  }
                  required
                  placeholder="Enter full announcement details for parishioners..."
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              {/* Photo Upload */}
              <ImageUploadInput
                label="Announcement Flyer / Image (Optional)"
                value={editingAnnouncement.imageUrl || ''}
                onChange={(url) =>
                  setEditingAnnouncement({ ...editingAnnouncement, imageUrl: url })
                }
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinnedToggle"
                  checked={editingAnnouncement.pinned || false}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, pinned: e.target.checked })
                  }
                  className="rounded text-[#c59331] focus:ring-[#c59331]"
                />
                <label htmlFor="pinnedToggle" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Pin to top of public homepage and bulletins
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-white text-xs font-bold uppercase tracking-wider shadow"
                >
                  {isSaving ? 'Saving...' : 'Publish Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ADD / EDIT CONTENT ITEM                             */}
      {/* ============================================================ */}
      {isContentModalOpen && editingContentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-[#00162c]">
                {editingContentItem.id.startsWith('cnt-') && !contentItems.some(c => c.id === editingContentItem.id)
                  ? 'Add Content Item'
                  : 'Edit Content Item'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsContentModalOpen(false);
                  setEditingContentItem(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveContentSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Content Type
                  </label>
                  <select
                    value={editingContentItem.type}
                    onChange={(e) =>
                      setEditingContentItem({
                        ...editingContentItem,
                        type: e.target.value as 'sermon' | 'choir' | 'event' | 'article'
                      })
                    }
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900 bg-white"
                  >
                    <option value="sermon">Sermon</option>
                    <option value="choir">Choir Music Track</option>
                    <option value="event">Parish Event</option>
                    <option value="article">Church News Article</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingContentItem.date}
                    onChange={(e) =>
                      setEditingContentItem({ ...editingContentItem, date: e.target.value })
                    }
                    required
                    placeholder="e.g. Oct 2026 or Last Sunday"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingContentItem.title}
                  onChange={(e) =>
                    setEditingContentItem({ ...editingContentItem, title: e.target.value })
                  }
                  required
                  placeholder="e.g. Walking in the Divine Light"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Speaker, Preacher or Artist
                </label>
                <input
                  type="text"
                  value={editingContentItem.speakerOrArtist || ''}
                  onChange={(e) =>
                    setEditingContentItem({ ...editingContentItem, speakerOrArtist: e.target.value })
                  }
                  placeholder="e.g. Rev. Samuel Adebayo or AIC Nuru Gospel Singers"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Video or Media Web Link (YouTube or Image URL)
                </label>
                <input
                  type="text"
                  value={editingContentItem.mediaUrl}
                  onChange={(e) =>
                    setEditingContentItem({ ...editingContentItem, mediaUrl: e.target.value })
                  }
                  required
                  placeholder="e.g. https://www.youtube.com/watch?v=uq-bPrSBWUQ"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Description / Synopsis
                </label>
                <textarea
                  rows={3}
                  value={editingContentItem.description}
                  onChange={(e) =>
                    setEditingContentItem({ ...editingContentItem, description: e.target.value })
                  }
                  required
                  placeholder="Brief synopsis and scripture reference..."
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsContentModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-white text-xs font-bold uppercase tracking-wider shadow"
                >
                  {isSaving ? 'Saving...' : 'Save Content Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: ADD / EDIT TEAM MEMBER                              */}
      {/* ============================================================ */}
      {isTeamModalOpen && editingTeamMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-[#00162c]">
                {editingTeamMember.id.startsWith('team-') && !teamMembers.some(t => t.id === editingTeamMember.id)
                  ? 'Add Leadership Team Member'
                  : 'Edit Team Member Bio'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsTeamModalOpen(false);
                  setEditingTeamMember(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeamSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingTeamMember.name}
                  onChange={(e) =>
                    setEditingTeamMember({ ...editingTeamMember, name: e.target.value })
                  }
                  required
                  placeholder="e.g. Rev. Samuel Adebayo"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editingTeamMember.role}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, role: e.target.value })
                    }
                    required
                    placeholder="e.g. Senior Pastor & Teacher"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                    Display Order (1, 2, 3...)
                  </label>
                  <input
                    type="number"
                    value={editingTeamMember.order || 1}
                    onChange={(e) =>
                      setEditingTeamMember({
                        ...editingTeamMember,
                        order: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1">
                  Biography & Ministry Background
                </label>
                <textarea
                  rows={4}
                  value={editingTeamMember.bio}
                  onChange={(e) =>
                    setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })
                  }
                  required
                  placeholder="Ministry calling, experience, family, and passion for Kitale..."
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] text-gray-900"
                />
              </div>

              {/* Photo Upload with direct device file chooser */}
              <ImageUploadInput
                label="Leader Profile Photo"
                value={editingTeamMember.photoUrl || ''}
                onChange={(url) =>
                  setEditingTeamMember({ ...editingTeamMember, photoUrl: url })
                }
                recommendedAspect="Square portrait (e.g. 400x400px)"
              />

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#00162c] hover:bg-[#122b44] text-white text-xs font-bold uppercase tracking-wider shadow"
                >
                  {isSaving ? 'Saving...' : 'Save Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
