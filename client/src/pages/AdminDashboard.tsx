import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects,
  subscribeToProjects,
  updateSettings,
  getSettings,
  subscribeToSettings,
  getAllContactMessages,
  subscribeToContactMessages,
  subscribeToPartnerInquiries,
  subscribeToVolunteerApplications,
  updatePartnerInquiryStatus,
  updateVolunteerApplicationStatus,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  getAllAchievements,
  subscribeToAchievements,
  addMediaItem,
  updateMediaItem,
  deleteMediaItem,
  subscribeToMediaItems,
  addTask,
  updateTask,
  deleteTask,
  subscribeToTasks,
  addDocument,
  updateDocument,
  deleteDocument,
  subscribeToDocuments,
} from "@/lib/firestore-ops";
import { uploadMediaFile } from "@/lib/media-upload";
import DonationPriorityManager from "@/components/DonationPriorityManager";
import ContentStudioManager from "@/components/ContentStudioManager";
import {
  FirestoreProject,
  FirestoreAchievement,
  FirestoreSettings,
  FirestorePartnerInquiry,
  FirestoreVolunteerApplication,
  FirestoreMediaItem,
  FirestoreTask,
  FirestoreDocument,
} from "@shared/firestore-schemas";

const institutionalContentFields = [
  { key: "aboutMission", label: "رسالة قسم المؤسسة" },
  { key: "aboutCommitments", label: "التزام المؤسسة العلني" },
  { key: "transparencyGovernance", label: "وصف الحوكمة" },
  { key: "transparencyImpact", label: "وصف قياس الأثر" },
  { key: "transparencyDocuments", label: "وصف الوثائق والتقارير" },
  { key: "partnershipsWhy", label: "فقرة لماذا الشراكة معنا؟" },
  { key: "partnershipsPrograms", label: "وصف البرامج القابلة للتخصيص" },
  { key: "partnershipsImpact", label: "وصف مؤشرات الأثر للشراكات" },
  { key: "partnershipsMedia", label: "وصف الإعلام المسؤول" },
  { key: "partnershipsDueDiligence", label: "وصف حزمة العناية الواجبة" },
] as const;

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Settings/Counters state
  const [counters, setCounters] = useState<FirestoreSettings>({
    orphans: 0,
    students: 0,
    patients: 0,
    families: 0,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Messages state
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [partnerInquiries, setPartnerInquiries] = useState<FirestorePartnerInquiry[]>([]);
  const [volunteerApplications, setVolunteerApplications] = useState<FirestoreVolunteerApplication[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", icon: "" });
  const [addingProject, setAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editData, setEditData] = useState({ name: "", description: "", icon: "" });

  // Achievements state
  const [achievements, setAchievements] = useState<FirestoreAchievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<FirestoreAchievement>>({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    orphans: 0,
    students: 0,
    patients: 0,
    families: 0,
    icon: "🎯",
    imagePath: "",
  });
  const [addingAchievement, setAddingAchievement] = useState(false);
  const [editingAchievementId, setEditingAchievementId] = useState<string | null>(null);

  // Media library state
  const [mediaItems, setMediaItems] = useState<FirestoreMediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [savingMedia, setSavingMedia] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [selectedMediaFile, setSelectedMediaFile] = useState<File | null>(null);
  const [mediaDraft, setMediaDraft] = useState<Omit<FirestoreMediaItem, "id">>({
    title: "",
    description: "",
    kind: "image",
    mediaUrl: "",
    thumbnailUrl: "",
    category: "مشاريعنا",
    projectId: "",
    capturedAt: "",
    location: "",
    altText: "",
    rightsNote: "تملك المؤسسة أو لديها موافقة موثقة على نشر هذه المادة.",
    consentConfirmed: false,
    status: "draft",
  });

  // Operations tasks state
  const [tasks, setTasks] = useState<FirestoreTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [savingTask, setSavingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskDraft, setTaskDraft] = useState<Omit<FirestoreTask, "id">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    owner: "",
    projectId: "",
  });

  // Transparency documents state
  const [documents, setDocuments] = useState<FirestoreDocument[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [savingDocument, setSavingDocument] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [documentDraft, setDocumentDraft] = useState<Omit<FirestoreDocument, "id">>({
    title: "",
    description: "",
    category: "other",
    year: new Date().getFullYear(),
    documentUrl: "",
    status: "draft",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/admin-login");
    }
  }, [user, loading, setLocation]);

  // Load data from Firestore
  useEffect(() => {
    if (user) {
      // Subscribe to settings
      const unsubscribeSettings = subscribeToSettings((settings) => {
        setCounters(settings);
      });

      // Subscribe to messages
      setLoadingMessages(true);
      const unsubscribeMessages = subscribeToContactMessages((msgs) => {
        setMessages(msgs);
        setLoadingMessages(false);
      });

      setLoadingInquiries(true);
      const unsubscribePartnerInquiries = subscribeToPartnerInquiries(
        (items) => {
          setPartnerInquiries(items);
          setLoadingInquiries(false);
        },
        () => {
          setLoadingInquiries(false);
          setMessage("❌ تعذر تحميل طلبات الشراكة.");
        }
      );
      const unsubscribeVolunteerApplications = subscribeToVolunteerApplications(
        (items) => setVolunteerApplications(items),
        () => setMessage("❌ تعذر تحميل طلبات التطوع.")
      );

      // Subscribe to projects
      setLoadingProjects(true);
      const unsubscribeProjects = subscribeToProjects((proj) => {
        setProjects(proj);
        setLoadingProjects(false);
      });

      // Subscribe to achievements
      setLoadingAchievements(true);
      const unsubscribeAchievements = subscribeToAchievements((ach) => {
        setAchievements(ach);
        setLoadingAchievements(false);
      });

      setLoadingMedia(true);
      const unsubscribeMedia = subscribeToMediaItems(
        (items) => {
          setMediaItems(items);
          setLoadingMedia(false);
        },
        () => {
          setLoadingMedia(false);
          setMessage("❌ تعذر تحميل مكتبة الوسائط");
        }
      );

      setLoadingTasks(true);
      const unsubscribeTasks = subscribeToTasks(
        (items) => {
          setTasks(items);
          setLoadingTasks(false);
        },
        () => {
          setLoadingTasks(false);
          setMessage("❌ تعذر تحميل المهام");
        }
      );

      setLoadingDocuments(true);
      const unsubscribeDocuments = subscribeToDocuments(
        (items) => {
          setDocuments(items);
          setLoadingDocuments(false);
        },
        () => {
          setLoadingDocuments(false);
          setMessage("❌ تعذر تحميل الوثائق.");
        }
      );

      return () => {
        unsubscribeSettings();
        unsubscribeMessages();
        unsubscribePartnerInquiries();
        unsubscribeVolunteerApplications();
        unsubscribeProjects();
        unsubscribeAchievements();
        unsubscribeMedia();
        unsubscribeTasks();
        unsubscribeDocuments();
      };
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLocation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ============================================================================
  // SETTINGS/COUNTERS HANDLERS
  // ============================================================================

  const handleSaveCounters = async () => {
    try {
      setSaving(true);
      await updateSettings(counters);
      setMessage("✅ تم حفظ الإحصائيات بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حفظ الإحصائيات");
      console.error("Error saving counters:", error);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================================
  // PROJECTS HANDLERS
  // ============================================================================

  const handleAddProject = async () => {
    if (!newProject.name.trim()) {
      setMessage("❌ يرجى إدخال اسم المشروع");
      return;
    }

    try {
      setAddingProject(true);
      await addProject({
        name: newProject.name,
        description: newProject.description,
        icon: newProject.icon,
      });
      setNewProject({ name: "", description: "", icon: "" });
      setMessage("✅ تم إضافة المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في إضافة المشروع");
      console.error("Error adding project:", error);
    } finally {
      setAddingProject(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject?.id) return;

    try {
      setAddingProject(true);
      await updateProject(editingProject.id, {
        name: editData.name,
        description: editData.description,
        icon: editData.icon,
      });
      setEditingProject(null);
      setEditData({ name: "", description: "", icon: "" });
      setMessage("✅ تم تحديث المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في تحديث المشروع");
      console.error("Error updating project:", error);
    } finally {
      setAddingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;

    try {
      await deleteProject(id);
      setMessage("✅ تم حذف المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حذف المشروع");
      console.error("Error deleting project:", error);
    }
  };

  // ============================================================================
  // ACHIEVEMENTS HANDLERS
  // ============================================================================

  const resetAchievementDraft = () => {
    setEditingAchievementId(null);
    setNewAchievement({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      orphans: 0,
      students: 0,
      patients: 0,
      families: 0,
      icon: "🎯",
      imagePath: "",
    });
  };

  const handleSaveAchievement = async () => {
    if (!newAchievement.title?.trim()) {
      setMessage("❌ يرجى إدخال عنوان الإنجاز");
      return;
    }

    try {
      setAddingAchievement(true);
      const payload = {
        title: newAchievement.title || "",
        description: newAchievement.description || "",
        year: newAchievement.year || new Date().getFullYear(),
        orphans: newAchievement.orphans || 0,
        students: newAchievement.students || 0,
        patients: newAchievement.patients || 0,
        families: newAchievement.families || 0,
        icon: newAchievement.icon || "🎯",
        imagePath: newAchievement.imagePath || "",
      };
      if (editingAchievementId) {
        await updateAchievement(editingAchievementId, payload);
        setMessage("✅ تم تحديث الإنجاز بنجاح");
      } else {
        await addAchievement(payload);
        setMessage("✅ تم إضافة الإنجاز بنجاح");
      }
      resetAchievementDraft();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في إضافة الإنجاز");
      console.error("Error adding achievement:", error);
    } finally {
      setAddingAchievement(false);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) return;

    try {
      await deleteAchievement(id);
      if (editingAchievementId === id) resetAchievementDraft();
      setMessage("✅ تم حذف الإنجاز بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حذف الإنجاز");
      console.error("Error deleting achievement:", error);
    }
  };

  // ============================================================================
  // MEDIA LIBRARY HANDLERS
  // ============================================================================

  const resetMediaDraft = () => {
    setEditingMediaId(null);
    setSelectedMediaFile(null);
    setMediaDraft({
      title: "",
      description: "",
      kind: "image",
      mediaUrl: "",
      thumbnailUrl: "",
      category: "مشاريعنا",
      projectId: "",
      capturedAt: "",
      location: "",
      altText: "",
      rightsNote: "تملك المؤسسة أو لديها موافقة موثقة على نشر هذه المادة.",
      consentConfirmed: false,
      status: "draft",
    });
  };

  const handleSaveMedia = async () => {
    if (!mediaDraft.title.trim() || !mediaDraft.altText.trim()) {
      setMessage("❌ أضيفي عنواناً ووصفاً بديلاً واضحاً للمادة.");
      return;
    }
    if (!mediaDraft.consentConfirmed) {
      setMessage("❌ يجب تأكيد امتلاك حق النشر أو الحصول على الموافقات اللازمة.");
      return;
    }

    try {
      setSavingMedia(true);
      let mediaUrl = mediaDraft.mediaUrl.trim();
      let kind = mediaDraft.kind;
      if (selectedMediaFile) {
        const uploaded = await uploadMediaFile(selectedMediaFile);
        mediaUrl = uploaded.url;
        kind = selectedMediaFile.type.startsWith("video/") ? "video" : "image";
      }
      if (!mediaUrl) {
        setMessage("❌ اختاري ملفاً للرفع أو أضيفي رابط المادة.");
        return;
      }

      const payload = { ...mediaDraft, mediaUrl, kind };
      if (editingMediaId) {
        await updateMediaItem(editingMediaId, payload);
        setMessage("✅ تم تحديث المادة في المكتبة.");
      } else {
        await addMediaItem(payload);
        setMessage("✅ تم حفظ المادة في المكتبة.");
      }
      resetMediaDraft();
    } catch (error) {
      console.error("Media save error:", error);
      setMessage(error instanceof Error ? `❌ ${error.message}` : "❌ تعذر حفظ المادة.");
    } finally {
      setSavingMedia(false);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه المادة من المكتبة؟")) return;
    try {
      await deleteMediaItem(id);
      setMessage("✅ تم حذف المادة من المكتبة.");
    } catch (error) {
      console.error("Media delete error:", error);
      setMessage("❌ تعذر حذف المادة.");
    }
  };

  // ============================================================================
  // TASKS HANDLERS
  // ============================================================================

  const resetTaskDraft = () => {
    setEditingTaskId(null);
    setTaskDraft({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      owner: "",
      projectId: "",
    });
  };

  const handleSaveTask = async () => {
    if (!taskDraft.title.trim()) {
      setMessage("❌ يرجى كتابة عنوان المهمة.");
      return;
    }
    try {
      setSavingTask(true);
      if (editingTaskId) {
        await updateTask(editingTaskId, taskDraft);
        setMessage("✅ تم تحديث المهمة.");
      } else {
        await addTask(taskDraft);
        setMessage("✅ تم إنشاء المهمة.");
      }
      resetTaskDraft();
    } catch (error) {
      console.error("Task save error:", error);
      setMessage("❌ تعذر حفظ المهمة.");
    } finally {
      setSavingTask(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف المهمة؟")) return;
    try {
      await deleteTask(id);
      setMessage("✅ تم حذف المهمة.");
    } catch (error) {
      console.error("Task delete error:", error);
      setMessage("❌ تعذر حذف المهمة.");
    }
  };

  // ============================================================================
  // TRANSPARENCY DOCUMENTS HANDLERS
  // ============================================================================

  const resetDocumentDraft = () => {
    setEditingDocumentId(null);
    setDocumentDraft({
      title: "",
      description: "",
      category: "other",
      year: new Date().getFullYear(),
      documentUrl: "",
      status: "draft",
    });
  };

  const handleSaveDocument = async () => {
    if (!documentDraft.title.trim() || !documentDraft.documentUrl.trim()) {
      setMessage("❌ أضيفي عنواناً ورابطاً صالحاً للوثيقة.");
      return;
    }
    try {
      setSavingDocument(true);
      if (editingDocumentId) {
        await updateDocument(editingDocumentId, documentDraft);
        setMessage("✅ تم تحديث الوثيقة.");
      } else {
        await addDocument(documentDraft);
        setMessage("✅ تم إضافة الوثيقة.");
      }
      resetDocumentDraft();
    } catch (error) {
      console.error("Document save error:", error);
      setMessage("❌ تعذر حفظ الوثيقة.");
    } finally {
      setSavingDocument(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الوثيقة؟")) return;
    try {
      await deleteDocument(id);
      setMessage("✅ تم حذف الوثيقة.");
    } catch (error) {
      console.error("Document delete error:", error);
      setMessage("❌ تعذر حذف الوثيقة.");
    }
  };

  const handleUpdateInquiryStatus = async (
    kind: "partner" | "volunteer",
    id: string,
    status: NonNullable<FirestorePartnerInquiry["status"]>
  ) => {
    try {
      if (kind === "partner") {
        await updatePartnerInquiryStatus(id, status);
      } else {
        await updateVolunteerApplicationStatus(id, status);
      }
      setMessage("✅ تم تحديث حالة الطلب.");
    } catch (error) {
      console.error("Inquiry status update error:", error);
      setMessage("❌ تعذر تحديث حالة الطلب.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم الإدارية</h1>
            <p className="text-sm text-green-100">مرحباً: {user.email}</p>
          </div>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-4 flex-wrap">
          {[
            { id: "dashboard", label: "📊 لوحة التحكم" },
            { id: "content", label: "✍️ المحتوى المؤسسي" },
            { id: "studio", label: "🎛️ الواجهة والأقسام" },
            { id: "projects", label: "📋 المشاريع" },
            { id: "achievements", label: "🏆 الإنجازات" },
            { id: "media", label: "🖼️ مكتبة الوسائط" },
            { id: "tasks", label: "✓ المهام" },
            { id: "priorities", label: "📣 أولويات التبرع" },
            { id: "documents", label: "📄 الوثائق" },
            { id: "messages", label: "💬 الرسائل" },
            { id: "inquiries", label: "🤝 الشراكات والتطوع" },
            { id: "knowledge", label: "🧠 قاعدة المعرفة" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.includes("❌")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { label: "عدد الأيتام", key: "orphans" },
                { label: "عدد الطلاب", key: "students" },
                { label: "عدد المرضى", key: "patients" },
                { label: "عدد الأسر", key: "families" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-gray-700 font-semibold mb-2">{item.label}</label>
                  <input
                    type="number"
                  value={counters[item.key as keyof Pick<FirestoreSettings, "orphans" | "students" | "patients" | "families">] || 0}
                    onChange={(e) =>
                      setCounters({
                        ...counters,
                        [item.key]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={handleSaveCounters}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? "جاري الحفظ..." : "حفظ الإحصائيات"}
            </Button>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold text-slate-900">محتوى الصفحة الرئيسية</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">يمكنك تحديث الرسائل المؤسسية الظاهرة في الصفحة الرئيسية دون الحاجة لتعديل الكود.</p>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="عنوان الواجهة الرئيسية"
                  value={counters.heroTitle || ""}
                  onChange={(event) => setCounters({ ...counters, heroTitle: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <textarea
                  placeholder="وصف الواجهة الرئيسية"
                  value={counters.heroDescription || ""}
                  onChange={(event) => setCounters({ ...counters, heroDescription: event.target.value })}
                  className="min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="رسالة الشراكات في الصفحة الرئيسية"
                  value={counters.partnershipTitle || ""}
                  onChange={(event) => setCounters({ ...counters, partnershipTitle: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="عنوان صفحة عن المؤسسة"
                  value={counters.aboutHeadline || ""}
                  onChange={(event) => setCounters({ ...counters, aboutHeadline: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <textarea
                  placeholder="وصف صفحة عن المؤسسة"
                  value={counters.aboutDescription || ""}
                  onChange={(event) => setCounters({ ...counters, aboutDescription: event.target.value })}
                  className="min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="عنوان صفحة الشفافية"
                  value={counters.transparencyHeadline || ""}
                  onChange={(event) => setCounters({ ...counters, transparencyHeadline: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <textarea
                  placeholder="وصف صفحة الشفافية"
                  value={counters.transparencyDescription || ""}
                  onChange={(event) => setCounters({ ...counters, transparencyDescription: event.target.value })}
                  className="min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="عنوان صفحة الشراكات"
                  value={counters.partnershipsHeadline || ""}
                  onChange={(event) => setCounters({ ...counters, partnershipsHeadline: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <textarea
                  placeholder="وصف صفحة الشراكات"
                  value={counters.partnershipsDescription || ""}
                  onChange={(event) => setCounters({ ...counters, partnershipsDescription: event.target.value })}
                  className="min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Button onClick={handleSaveCounters} disabled={saving} className="w-full bg-slate-800 text-white hover:bg-slate-900">
                  {saving ? "جاري الحفظ..." : "حفظ الإحصائيات والمحتوى"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* INSTITUTIONAL CONTENT TAB */}
        {activeTab === "content" && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">المحتوى المؤسسي</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">حرري النصوص الأساسية في صفحات «عن المؤسسة» و«الشفافية» و«الشراكات». تحفظ هذه الحقول في Firestore وتظهر في الموقع العام مباشرة.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {institutionalContentFields.map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">{field.label}</span>
                  <textarea
                    value={counters[field.key] || ""}
                    onChange={(event) => setCounters({ ...counters, [field.key]: event.target.value })}
                    className="min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 outline-none ring-emerald-500 focus:bg-white focus:ring-2"
                  />
                </label>
              ))}
            </div>
            <Button onClick={handleSaveCounters} disabled={saving} className="mt-6 w-full bg-emerald-700 text-white hover:bg-emerald-800">{saving ? "جاري حفظ المحتوى..." : "حفظ المحتوى المؤسسي"}</Button>
          </div>
        )}

        {activeTab === "studio" && (
          <ContentStudioManager
            settings={counters}
            saving={saving}
            onSave={async (updates) => {
              try {
                setSaving(true);
                await updateSettings(updates);
                setCounters((current) => ({ ...current, ...updates }));
                setMessage("✅ تم حفظ إعدادات الواجهة والتنقل.");
              } catch (error) {
                console.error("Content studio save error:", error);
                setMessage("❌ تعذر حفظ إعدادات الواجهة. راجعي قواعد Firebase ثم حاولي مرة أخرى.");
                throw error;
              } finally {
                setSaving(false);
              }
            }}
          />
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة المشاريع</h2>

            {/* Add/Edit Project Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="اسم المشروع"
                  value={editingProject ? editData.name : newProject.name}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, name: e.target.value })
                      : setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الوصف"
                  value={editingProject ? editData.description : newProject.description}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, description: e.target.value })
                      : setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الرمز (emoji)"
                  value={editingProject ? editData.icon : newProject.icon}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, icon: e.target.value })
                      : setNewProject({ ...newProject, icon: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  disabled={addingProject}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {addingProject
                    ? "جاري المعالجة..."
                    : editingProject
                      ? "تحديث المشروع"
                      : "إضافة المشروع"}
                </Button>
                {editingProject && (
                  <Button
                    onClick={() => {
                      setEditingProject(null);
                      setEditData({ name: "", description: "", icon: "" });
                    }}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    إلغاء
                  </Button>
                )}
              </div>
            </div>

            {/* Projects List */}
            {loadingProjects && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل المشاريع...</p>
              </div>
            )}
            {!loadingProjects && projects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد مشاريع حالياً</p>
              </div>
            )}
            {!loadingProjects && projects.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي المشاريع: <strong>{projects.length}</strong>
                </p>
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {project.icon} {project.name}
                        </h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setEditData({
                              name: project.name,
                              description: project.description,
                              icon: project.icon,
                            });
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id!)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة الإنجازات</h2>

            {/* Add Achievement Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">{editingAchievementId ? "تعديل الإنجاز" : "إضافة إنجاز جديد"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="عنوان الإنجاز"
                  value={newAchievement.title || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="السنة"
                  value={newAchievement.year || new Date().getFullYear()}
                  onChange={(e) => setNewAchievement({ ...newAchievement, year: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الوصف"
                  value={newAchievement.description || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الرمز (emoji)"
                  value={newAchievement.icon || "🎯"}
                  onChange={(e) => setNewAchievement({ ...newAchievement, icon: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الأيتام"
                  value={newAchievement.orphans || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, orphans: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الطلاب"
                  value={newAchievement.students || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, students: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد المرضى"
                  value={newAchievement.patients || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, patients: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الأسر"
                  value={newAchievement.families || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, families: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="مسار الصورة (مثال: /images/achievements/2024.jpg)"
                  value={newAchievement.imagePath || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, imagePath: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveAchievement}
                  disabled={addingAchievement}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {addingAchievement ? "جاري الحفظ..." : editingAchievementId ? "حفظ التعديلات" : "إضافة الإنجاز"}
                </Button>
                {editingAchievementId && <Button onClick={resetAchievementDraft} variant="outline">إلغاء</Button>}
              </div>
            </div>

            {/* Achievements List */}
            {loadingAchievements && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل الإنجازات...</p>
              </div>
            )}
            {!loadingAchievements && achievements.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد إنجازات حالياً</p>
              </div>
            )}
            {!loadingAchievements && achievements.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي الإنجازات: <strong>{achievements.length}</strong>
                </p>
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {achievement.icon} {achievement.title} ({achievement.year})
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          {achievement.orphans ? `👨‍👩‍👧‍👦 ${achievement.orphans} أيتام | ` : ""}
                          {achievement.students ? `📚 ${achievement.students} طالب | ` : ""}
                          {achievement.patients ? `🏥 ${achievement.patients} مريض | ` : ""}
                          {achievement.families ? `👪 ${achievement.families} أسرة` : ""}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingAchievementId(achievement.id || null);
                            setNewAchievement({ ...achievement });
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(achievement.id!)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                    {achievement.imagePath && <img src={achievement.imagePath} alt={`توثيق ${achievement.title}`} className="mt-4 h-36 w-full rounded-lg object-cover" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MEDIA LIBRARY TAB */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-l from-emerald-50 to-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">مكتبة الصور والفيديوهات</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    ارفعي مواداً تملك المؤسسة حق نشرها، وأضيفي وصفاً وسياقاً واضحين قبل النشر العام.
                  </p>
                </div>
                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                  {mediaItems.filter((item) => item.status === "published").length} مادة منشورة
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="عنوان المادة"
                  value={mediaDraft.title}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, title: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                />
                <select
                  value={mediaDraft.kind}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, kind: event.target.value as "image" | "video" })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                >
                  <option value="image">صورة</option>
                  <option value="video">فيديو</option>
                </select>
                <textarea
                  placeholder="وصف مختصر: ماذا حدث؟ وما أثر هذا النشاط؟"
                  value={mediaDraft.description}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, description: event.target.value })}
                  className="min-h-24 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="وصف بديل للصورة/الفيديو لأغراض الوصول"
                  value={mediaDraft.altText}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, altText: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                />
                <input
                  type="text"
                  placeholder="الفئة: تعليم، صحة، إغاثة..."
                  value={mediaDraft.category}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, category: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                />
                <select
                  value={mediaDraft.projectId || "none"}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, projectId: event.target.value === "none" ? "" : event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                >
                  <option value="none">غير مرتبط بمشروع محدد</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={mediaDraft.capturedAt || ""}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, capturedAt: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                />
                <input
                  type="text"
                  placeholder="الموقع أو المحافظة (اختياري)"
                  value={mediaDraft.location || ""}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, location: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                  onChange={(event) => setSelectedMediaFile(event.target.files?.[0] || null)}
                  className="rounded-lg border border-dashed border-emerald-300 bg-white px-4 py-3 text-sm text-slate-600 md:col-span-2"
                />
                <p className="text-xs leading-5 text-slate-500 md:col-span-2">
                  يرفع النظام الصور حتى 12 ميغابايت والفيديوهات حتى 45 ميغابايت إلى مساحة تخزين دائمة. يمكن بدلاً من ذلك إدخال رابط لمادة منشورة ومصرح بها.
                </p>
                <input
                  type="url"
                  placeholder="رابط المادة عند عدم رفع ملف (اختياري)"
                  value={mediaDraft.mediaUrl}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, mediaUrl: event.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2 md:col-span-2"
                />
                <textarea
                  placeholder="بيان الحقوق أو مصدر المادة والموافقة"
                  value={mediaDraft.rightsNote}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, rightsNote: event.target.value })}
                  className="min-h-20 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2 md:col-span-2"
                />
                <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={mediaDraft.consentConfirmed}
                    onChange={(event) => setMediaDraft({ ...mediaDraft, consentConfirmed: event.target.checked })}
                    className="h-4 w-4 accent-emerald-600"
                  />
                  أؤكد حق المؤسسة في النشر واحترام خصوصية المستفيدين.
                </label>
                <select
                  value={mediaDraft.status}
                  onChange={(event) => setMediaDraft({ ...mediaDraft, status: event.target.value as "draft" | "published" | "archived" })}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
                >
                  <option value="draft">مسودة داخلية</option>
                  <option value="published">منشور للعامة</option>
                  <option value="archived">مؤرشف</option>
                </select>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleSaveMedia} disabled={savingMedia} className="flex-1 bg-emerald-700 text-white hover:bg-emerald-800">
                  {savingMedia ? "جاري الحفظ والرفع..." : editingMediaId ? "حفظ التعديلات" : "إضافة إلى المكتبة"}
                </Button>
                {editingMediaId && (
                  <Button onClick={resetMediaDraft} variant="outline" className="border-slate-300">إلغاء التعديل</Button>
                )}
              </div>
            </div>

            {loadingMedia ? (
              <div className="rounded-xl bg-white py-12 text-center text-slate-500">جاري تحميل المكتبة...</div>
            ) : mediaItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">لم تُضف مواد إعلامية بعد.</div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {mediaItems.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="aspect-video bg-slate-100">
                      {item.kind === "video" ? (
                        <video src={item.mediaUrl} controls className="h-full w-full object-cover" />
                      ) : (
                        <img src={item.mediaUrl} alt={item.altText} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div><h3 className="font-bold text-slate-900">{item.title}</h3><p className="mt-1 text-xs text-slate-500">{item.category} · {item.status === "published" ? "منشور" : item.status === "draft" ? "مسودة" : "مؤرشف"}</p></div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => { setEditingMediaId(item.id || null); setSelectedMediaFile(null); setMediaDraft({ ...item, projectId: item.projectId || "", thumbnailUrl: item.thumbnailUrl || "", capturedAt: item.capturedAt || "", location: item.location || "" }); }}>تعديل</Button>
                        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => item.id && handleDeleteMedia(item.id)}>حذف</Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div><h2 className="text-2xl font-bold text-slate-900">مهام المؤسسة</h2><p className="mt-1 text-sm text-slate-600">نظّمي الأعمال المرتبطة بالمشاريع والشراكات والتقارير في مكان واحد.</p></div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{tasks.filter((task) => task.status !== "done").length} مهمة مفتوحة</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input type="text" placeholder="عنوان المهمة" value={taskDraft.title} onChange={(event) => setTaskDraft({ ...taskDraft, title: event.target.value })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2" />
                <select value={taskDraft.projectId || "none"} onChange={(event) => setTaskDraft({ ...taskDraft, projectId: event.target.value === "none" ? "" : event.target.value })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"><option value="none">مهمة عامة</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
                <textarea placeholder="وصف أو خطوة تالية (اختياري)" value={taskDraft.description || ""} onChange={(event) => setTaskDraft({ ...taskDraft, description: event.target.value })} className="min-h-20 rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2 md:col-span-2" />
                <input type="date" value={taskDraft.dueDate || ""} onChange={(event) => setTaskDraft({ ...taskDraft, dueDate: event.target.value })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2" />
                <input type="text" placeholder="المسؤول عن المهمة" value={taskDraft.owner || ""} onChange={(event) => setTaskDraft({ ...taskDraft, owner: event.target.value })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2" />
                <select value={taskDraft.priority} onChange={(event) => setTaskDraft({ ...taskDraft, priority: event.target.value as "low" | "medium" | "high" })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"><option value="low">أولوية منخفضة</option><option value="medium">أولوية متوسطة</option><option value="high">أولوية عالية</option></select>
                <select value={taskDraft.status} onChange={(event) => setTaskDraft({ ...taskDraft, status: event.target.value as "todo" | "in_progress" | "done" })} className="rounded-lg border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"><option value="todo">قيد البدء</option><option value="in_progress">قيد التنفيذ</option><option value="done">مكتملة</option></select>
              </div>
              <div className="mt-5 flex gap-3"><Button onClick={handleSaveTask} disabled={savingTask} className="flex-1 bg-indigo-700 text-white hover:bg-indigo-800">{savingTask ? "جاري الحفظ..." : editingTaskId ? "حفظ التعديلات" : "إنشاء مهمة"}</Button>{editingTaskId && <Button variant="outline" onClick={resetTaskDraft}>إلغاء</Button>}</div>
            </div>
            {loadingTasks ? <div className="rounded-xl bg-white py-10 text-center text-slate-500">جاري تحميل المهام...</div> : tasks.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">لا توجد مهام مسجلة بعد.</div> : <div className="space-y-3">{tasks.map((task) => <article key={task.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-900">{task.title}</h3><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${task.status === "done" ? "bg-emerald-100 text-emerald-700" : task.status === "in_progress" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>{task.status === "done" ? "مكتملة" : task.status === "in_progress" ? "قيد التنفيذ" : "قيد البدء"}</span></div><p className="mt-1 text-sm text-slate-600">{task.description || "لا يوجد وصف إضافي."}</p><p className="mt-2 text-xs text-slate-500">{task.owner ? `المسؤول: ${task.owner}` : "غير مسندة"}{task.dueDate ? ` · الاستحقاق: ${task.dueDate}` : ""}</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => { setEditingTaskId(task.id || null); setTaskDraft({ ...task, description: task.description || "", dueDate: task.dueDate || "", owner: task.owner || "", projectId: task.projectId || "" }); }}>تعديل</Button><Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => task.id && handleDeleteTask(task.id)}>حذف</Button></div></article>)}</div>}
          </div>
        )}

        {activeTab === "priorities" && <DonationPriorityManager projects={projects} />}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-l from-amber-50 to-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">الوثائق والتقارير</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">أضيفي فقط الوثائق التي راجعتها المؤسسة ووافقت على مشاركتها. ستظهر الوثائق ذات الحالة «منشور» في مركز الشفافية العام.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input type="text" placeholder="عنوان الوثيقة أو التقرير" value={documentDraft.title} onChange={(event) => setDocumentDraft({ ...documentDraft, title: event.target.value })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2" />
                <select value={documentDraft.category} onChange={(event) => setDocumentDraft({ ...documentDraft, category: event.target.value as FirestoreDocument["category"] })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2"><option value="registration">التسجيل والترخيص</option><option value="governance">الحوكمة</option><option value="financial">البيانات المالية</option><option value="annual_report">التقارير السنوية</option><option value="policy">السياسات</option><option value="other">وثيقة أخرى</option></select>
                <textarea placeholder="وصف موجز يوضح محتوى الوثيقة وسياقها" value={documentDraft.description} onChange={(event) => setDocumentDraft({ ...documentDraft, description: event.target.value })} className="min-h-24 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2 md:col-span-2" />
                <input type="url" placeholder="رابط الملف المصرح بنشره" value={documentDraft.documentUrl} onChange={(event) => setDocumentDraft({ ...documentDraft, documentUrl: event.target.value })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2 md:col-span-2" />
                <input type="number" min="1900" max="2100" value={documentDraft.year || ""} onChange={(event) => setDocumentDraft({ ...documentDraft, year: Number(event.target.value) || undefined })} placeholder="السنة (اختياري)" className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2" />
                <select value={documentDraft.status} onChange={(event) => setDocumentDraft({ ...documentDraft, status: event.target.value as "draft" | "published" | "archived" })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-amber-500 focus:ring-2"><option value="draft">مسودة داخلية</option><option value="published">منشور للعامة</option><option value="archived">مؤرشف</option></select>
              </div>
              <div className="mt-5 flex gap-3"><Button onClick={handleSaveDocument} disabled={savingDocument} className="flex-1 bg-amber-700 text-white hover:bg-amber-800">{savingDocument ? "جاري الحفظ..." : editingDocumentId ? "حفظ التعديلات" : "إضافة الوثيقة"}</Button>{editingDocumentId && <Button variant="outline" onClick={resetDocumentDraft}>إلغاء</Button>}</div>
            </div>
            {loadingDocuments ? <div className="rounded-xl bg-white py-10 text-center text-slate-500">جاري تحميل الوثائق...</div> : documents.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">لا توجد وثائق مسجلة بعد.</div> : <div className="grid gap-4 md:grid-cols-2">{documents.map((documentItem) => <article key={documentItem.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-amber-700">{documentItem.category}</p><h3 className="mt-1 text-lg font-black text-slate-900">{documentItem.title}</h3></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{documentItem.status === "published" ? "منشور" : documentItem.status === "draft" ? "مسودة" : "مؤرشف"}</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{documentItem.description}</p><div className="mt-5 flex flex-wrap gap-2"><a href={documentItem.documentUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-amber-200 px-3 py-2 text-sm font-bold text-amber-800 hover:bg-amber-50">عرض</a><Button variant="outline" onClick={() => { setEditingDocumentId(documentItem.id || null); setDocumentDraft({ ...documentItem }); }}>تعديل</Button><Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => documentItem.id && handleDeleteDocument(documentItem.id)}>حذف</Button></div></article>)}</div>}
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الرسائل المستلمة</h2>
            {loadingMessages && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل الرسائل...</p>
              </div>
            )}
            {!loadingMessages && messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد رسائل حالياً</p>
              </div>
            )}
            {!loadingMessages && messages.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي الرسائل: <strong>{messages.length}</strong>
                </p>
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp ? new Date(msg.timestamp.toDate?.() || msg.timestamp).toLocaleDateString("ar-EG") : ""}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">☎️ {msg.phone}</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PARTNERSHIP AND VOLUNTEER INQUIRIES TAB */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">طلبات الشراكة والتطوع</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">هذه البيانات خاصة بالفريق. لا تظهر لزوار الموقع، وتُدار وفق قواعد Firebase بعد تطبيقها واختبارها. لطلبات التطوع: ابدئي بالمراجعة، ثم تواصلي فقط عند الملاءمة، ولا تؤكدي أي نشاط ميداني قبل إيضاح الدور والمشرف وقواعد حماية المستفيدين.</p>
            </div>
            {loadingInquiries ? <div className="rounded-xl bg-white py-10 text-center text-slate-500">جاري تحميل الطلبات...</div> : (
              <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900">طلبات الشراكة ({partnerInquiries.length})</h3>
                  {partnerInquiries.length === 0 ? <p className="mt-5 text-slate-500">لا توجد طلبات شراكة بعد.</p> : <div className="mt-5 space-y-4">{partnerInquiries.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><h4 className="font-bold text-slate-900">{item.organizationName}</h4><p className="mt-1 text-sm text-slate-600">{item.contactName} · {item.email}</p></div><select value={item.status || "new"} onChange={(event) => item.id && handleUpdateInquiryStatus("partner", item.id, event.target.value as NonNullable<FirestorePartnerInquiry["status"]>)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="new">جديد</option><option value="in_review">قيد المراجعة</option><option value="contacted">تم التواصل</option><option value="closed">مغلق</option></select></div><p className="mt-3 text-sm text-slate-700">{item.sector} · {item.cooperationType}</p>{item.programInterest && <p className="mt-2 text-sm text-slate-600">مجال الاهتمام: {item.programInterest}</p>}{item.timeline && <p className="mt-1 text-sm text-slate-600">الإطار الزمني: {item.timeline}</p>}{item.notes && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{item.notes}</p>}</article>)}</div>}
                </section>
                <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900">طلبات التطوع ({volunteerApplications.length})</h3>
                  {volunteerApplications.length === 0 ? <p className="mt-5 text-slate-500">لا توجد طلبات تطوع بعد.</p> : <div className="mt-5 space-y-4">{volunteerApplications.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><h4 className="font-bold text-slate-900">{item.name}</h4><p className="mt-1 text-sm text-slate-600">{item.email}</p></div><select value={item.status || "new"} onChange={(event) => item.id && handleUpdateInquiryStatus("volunteer", item.id, event.target.value as NonNullable<FirestoreVolunteerApplication["status"]>)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="new">جديد</option><option value="in_review">قيد المراجعة</option><option value="contacted">تم التواصل</option><option value="closed">مغلق</option></select></div><p className="mt-3 text-sm text-slate-700">{item.areaOfInterest} · {item.availability}</p>{item.skills && <p className="mt-2 text-sm text-slate-600">المهارات: {item.skills}</p>}{item.message && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{item.message}</p>}</article>)}</div>}
                </section>
              </div>
            )}
          </div>
        )}

        {/* KNOWLEDGE BASE TAB */}
        {activeTab === "knowledge" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">🧠 إدارة قاعدة المعرفة</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
              <p className="text-blue-800 font-semibold">معلومات المؤسسة</p>
              <p className="text-blue-700 text-sm mt-2">المؤسسة: مؤسسة مشروعنا إلى الجنة للأعمال الخيرية</p>
              <p className="text-blue-700 text-sm">العنوان: 39 شارع علي قاسم، حدائق المعادي، القاهرة</p>
              <p className="text-blue-700 text-sm">الهاتف/WhatsApp: 01013128453</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-6">
              <p className="text-green-800 font-semibold mb-3">المشاريع الخيرية ({projects.length})</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {projects.map((project) => (
                  <p key={project.id} className="text-green-700 text-sm">
                    {project.icon} {project.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 font-semibold">حالة قاعدة المعرفة</p>
              <p className="text-yellow-700 text-sm mt-2">✅ قاعدة المعرفة جاهزة وتعمل بكفاءة</p>
              <p className="text-yellow-700 text-sm">✅ المساعد الذكي يستخدم هذه المعلومات</p>
              <p className="text-yellow-700 text-sm">✅ البيانات مخزنة في Firestore</p>
              <p className="text-yellow-700 text-sm">✅ التحديثات فورية عبر Real-time Listeners</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
