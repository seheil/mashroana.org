import { describe, expect, it, vi, beforeEach } from "vitest";

const firestore = vi.hoisted(() => ({
  collection: vi.fn((database: unknown, name: string) => ({ database, name })),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn((database: unknown, name: string, id: string) => ({ database, name, id })),
  getDocs: vi.fn(),
  query: vi.fn((value: unknown) => value),
  where: vi.fn((field: string, operator: string, value: unknown) => ({ field, operator, value })),
  onSnapshot: vi.fn(),
  serverTimestamp: vi.fn(() => "SERVER_TIMESTAMP"),
  Timestamp: class Timestamp {},
}));

vi.mock("firebase/firestore", () => firestore);
vi.mock("../client/src/lib/firebase", () => ({ db: { kind: "test-db" } }));

import {
  addProject,
  addMediaItem,
  updateMediaItem,
  deleteMediaItem,
  addTask,
  updateTask,
  deleteTask,
  addDocument,
  updateDocument,
  deleteDocument,
  updateSettings,
  subscribeToProjects,
  addDonationPriority,
  updateDonationPriority,
  deleteDonationPriority,
  subscribeToDonationPriorities,
  subscribeToPublishedDonationPriorities,
} from "../client/src/lib/firestore-ops";

describe("عمليات Firestore الإدارية", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    firestore.addDoc.mockResolvedValue({ id: "created-id" });
    firestore.updateDoc.mockResolvedValue(undefined);
    firestore.deleteDoc.mockResolvedValue(undefined);
  });

  it("ينشئ مشروعاً في مجموعة projects مع طوابع زمنية", async () => {
    const result = await addProject({ name: "برنامج اختبار", description: "وصف", icon: "✦" });
    expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), "projects");
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "projects" }),
      expect.objectContaining({ name: "برنامج اختبار", createdAt: "SERVER_TIMESTAMP", updatedAt: "SERVER_TIMESTAMP" })
    );
    expect(result).toEqual(expect.objectContaining({ id: "created-id", name: "برنامج اختبار" }));
  });

  it("يحفظ مادة مكتبة كاملة مع حالة النشر وبيان الحقوق", async () => {
    await addMediaItem({
      title: "توثيق برنامج",
      description: "مادة موثقة",
      kind: "image",
      mediaUrl: "/manus-storage/media.jpg",
      category: "تعليم",
      altText: "طلاب في نشاط تعليمي",
      rightsNote: "تمت الموافقة على النشر",
      consentConfirmed: true,
      status: "draft",
    });
    expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), "media");
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "media" }),
      expect.objectContaining({ consentConfirmed: true, status: "draft", createdAt: "SERVER_TIMESTAMP" })
    );
  });

  it("ينفذ CRUD كاملاً لمادة مكتبة الوسائط", async () => {
    await updateMediaItem("media-1", { status: "published", title: "مادة منشورة" });
    expect(firestore.doc).toHaveBeenCalledWith(expect.anything(), "media", "media-1");
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "media", id: "media-1" }),
      expect.objectContaining({ status: "published", title: "مادة منشورة", updatedAt: "SERVER_TIMESTAMP" })
    );

    await deleteMediaItem("media-1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ name: "media", id: "media-1" }));
  });

  it("ينفذ CRUD كاملاً للمهام", async () => {
    await addTask({ title: "متابعة تقرير", status: "todo", priority: "medium" });
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "tasks" }),
      expect.objectContaining({ title: "متابعة تقرير", status: "todo", createdAt: "SERVER_TIMESTAMP" })
    );

    await updateTask("task-1", { status: "done", priority: "high" });
    expect(firestore.doc).toHaveBeenCalledWith(expect.anything(), "tasks", "task-1");
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "tasks", id: "task-1" }),
      expect.objectContaining({ status: "done", priority: "high", updatedAt: "SERVER_TIMESTAMP" })
    );

    await deleteTask("task-1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ name: "tasks", id: "task-1" }));
  });

  it("ينفذ CRUD كاملاً للوثائق المنشورة", async () => {
    await addDocument({ title: "تقرير سنوي", description: "ملخص معتمد", category: "annual_report", documentUrl: "https://example.org/report.pdf", status: "draft" });
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "documents" }),
      expect.objectContaining({ title: "تقرير سنوي", category: "annual_report", status: "draft" })
    );

    await updateDocument("document-1", { status: "published" });
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "documents", id: "document-1" }),
      expect.objectContaining({ status: "published", updatedAt: "SERVER_TIMESTAMP" })
    );

    await deleteDocument("document-1");
    expect(firestore.doc).toHaveBeenCalledWith(expect.anything(), "documents", "document-1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ name: "documents", id: "document-1" }));
  });

  it("ينشئ ثم يحدث إعدادات ومحتوى المؤسسة في مستند الإعدادات", async () => {
    firestore.getDocs.mockResolvedValueOnce({ empty: true, docs: [] });
    await updateSettings({ heroTitle: "عنوان جديد", transparencyHeadline: "شفافية" });
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "settings" }),
      expect.objectContaining({ heroTitle: "عنوان جديد", transparencyHeadline: "شفافية" })
    );

    firestore.getDocs.mockResolvedValueOnce({ empty: false, docs: [{ id: "default" }] });
    await updateSettings({ partnershipsHeadline: "شراكات" });
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "settings", id: "default" }),
      expect.objectContaining({ partnershipsHeadline: "شراكات", updatedAt: "SERVER_TIMESTAMP" })
    );
  });

  it("يمرر بيانات وتوقف الأخطاء من الاشتراك الحي في المشاريع", () => {
    const unsubscribe = vi.fn();
    firestore.onSnapshot.mockImplementation((_reference: unknown, onNext: Function, onError: Function) => {
      onNext({ docs: [{ id: "project-1", data: () => ({ name: "برنامج حي", description: "", icon: "✦" }) }] });
      onError(new Error("permission-denied"));
      return unsubscribe;
    });
    const callback = vi.fn();
    const onError = vi.fn();
    const result = subscribeToProjects(callback, onError);
    expect(callback).toHaveBeenCalledWith([expect.objectContaining({ id: "project-1", name: "برنامج حي" })]);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "permission-denied" }));
    expect(result).toBe(unsubscribe);
  });

  it("ينشئ ويحدث ويحذف أولوية تبرع معتمدة دون اختلاق بيانات", async () => {
    const priority = {
      title: "أولوية مدرسية معتمدة",
      description: "وصف صادر من المؤسسة",
      programId: "education-support",
      programName: "الدعم التعليمي",
      kind: "seasonal" as const,
      status: "draft" as const,
      recommendationWeight: 50,
      reason: "احتياج راجعته الإدارة.",
      sourceNote: "سجل متابعة داخلي",
    };
    await addDonationPriority(priority);
    expect(firestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "donationPriorities" }),
      expect.objectContaining({ ...priority, createdAt: "SERVER_TIMESTAMP", updatedAt: "SERVER_TIMESTAMP" })
    );

    await updateDonationPriority("priority-1", { status: "published", recommendationWeight: 60 });
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ name: "donationPriorities", id: "priority-1" }),
      expect.objectContaining({ status: "published", recommendationWeight: 60, updatedAt: "SERVER_TIMESTAMP" })
    );

    await deleteDonationPriority("priority-1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ name: "donationPriorities", id: "priority-1" }));
  });

  it("يمرر الأولويات للمستمع الحي ويعيد خطأ Firestore للمستدعي", () => {
    const unsubscribe = vi.fn();
    firestore.onSnapshot.mockImplementation((_reference: unknown, onNext: Function, onError: Function) => {
      onNext({ docs: [{ id: "priority-1", data: () => ({ title: "أولوية", status: "published", recommendationWeight: 50 }) }] });
      onError(new Error("permission-denied"));
      return unsubscribe;
    });
    const callback = vi.fn();
    const onError = vi.fn();
    const result = subscribeToDonationPriorities(callback, onError);
    expect(callback).toHaveBeenCalledWith([expect.objectContaining({ id: "priority-1", status: "published" })]);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "permission-denied" }));
    expect(result).toBe(unsubscribe);
  });

  it("يطلب الموقع العام الأولويات المنشورة فقط ولا يستعلم عن المسودات", () => {
    const unsubscribe = vi.fn();
    firestore.onSnapshot.mockImplementation((_reference: unknown, onNext: Function) => {
      onNext({ docs: [] });
      return unsubscribe;
    });
    subscribeToPublishedDonationPriorities(vi.fn());
    expect(firestore.where).toHaveBeenCalledWith("status", "==", "published");
    expect(firestore.onSnapshot).toHaveBeenCalled();
  });
});
