/**
 * Firestore Operations Helper
 * Centralized CRUD operations for all collections
 */

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  FirestoreProject,
  FirestoreAchievement,
  FirestoreSettings,
  FirestoreContactMessage,
  FirestorePartnerInquiry,
  FirestoreVolunteerApplication,
  FirestoreMediaItem,
  FirestoreTask,
  FirestoreDocument,
  FirestoreDonationPriority,
  FIRESTORE_COLLECTIONS,
  DEFAULT_SETTINGS_ID,
} from "@shared/firestore-schemas";

// ============================================================================
// PROJECTS OPERATIONS
// ============================================================================

export async function addProject(project: Omit<FirestoreProject, "id">) {
  try {
    const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.PROJECTS), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...project };
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

export async function updateProject(id: string, updates: Partial<FirestoreProject>) {
  try {
    const projectRef = doc(db, FIRESTORE_COLLECTIONS.PROJECTS, id);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { id, ...updates };
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.PROJECTS, id));
    return id;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

export async function getAllProjects(): Promise<FirestoreProject[]> {
  try {
    const querySnapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.PROJECTS)));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as FirestoreProject));
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
}

export function subscribeToProjects(
  callback: (projects: FirestoreProject[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.PROJECTS),
    (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as FirestoreProject));
      callback(projects);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// ACHIEVEMENTS OPERATIONS
// ============================================================================

export async function addAchievement(achievement: Omit<FirestoreAchievement, "id">) {
  try {
    const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS), {
      ...achievement,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...achievement };
  } catch (error) {
    console.error("Error adding achievement:", error);
    throw error;
  }
}

export async function updateAchievement(id: string, updates: Partial<FirestoreAchievement>) {
  try {
    const achievementRef = doc(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS, id);
    await updateDoc(achievementRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { id, ...updates };
  } catch (error) {
    console.error("Error updating achievement:", error);
    throw error;
  }
}

export async function deleteAchievement(id: string) {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS, id));
    return id;
  } catch (error) {
    console.error("Error deleting achievement:", error);
    throw error;
  }
}

export async function getAllAchievements(): Promise<FirestoreAchievement[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS))
    );
    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as FirestoreAchievement))
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  } catch (error) {
    console.error("Error getting achievements:", error);
    throw error;
  }
}

export function subscribeToAchievements(
  callback: (achievements: FirestoreAchievement[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS),
    (snapshot) => {
      const achievements = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as FirestoreAchievement))
        .sort((a, b) => (b.year || 0) - (a.year || 0));
      callback(achievements);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// SETTINGS OPERATIONS
// ============================================================================

export async function getSettings(): Promise<FirestoreSettings> {
  try {
    const querySnapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.SETTINGS)));
    if (querySnapshot.empty) {
      return {
        orphans: 0,
        students: 0,
        patients: 0,
        families: 0,
      };
    }
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as FirestoreSettings;
  } catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }
}

export async function updateSettings(updates: Partial<FirestoreSettings>) {
  try {
    const querySnapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.SETTINGS)));
    if (querySnapshot.empty) {
      // Create new settings if doesn't exist
      const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.SETTINGS), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...updates };
    }
    const settingsDoc = querySnapshot.docs[0];
    const settingsRef = doc(db, FIRESTORE_COLLECTIONS.SETTINGS, settingsDoc.id);
    await updateDoc(settingsRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { id: settingsDoc.id, ...updates };
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}

export function subscribeToSettings(
  callback: (settings: FirestoreSettings) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.SETTINGS),
    (snapshot) => {
      if (snapshot.empty) {
        callback({
          orphans: 0,
          students: 0,
          patients: 0,
          families: 0,
        });
        return;
      }
      const doc = snapshot.docs[0];
      callback({
        id: doc.id,
        ...doc.data(),
      } as FirestoreSettings);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// CONTACT MESSAGES OPERATIONS
// ============================================================================

export async function addContactMessage(
  message: Omit<FirestoreContactMessage, "id" | "timestamp" | "read">
) {
  try {
    const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES), {
      ...message,
      timestamp: serverTimestamp(),
      read: false,
    });
    return { id: docRef.id, ...message };
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
  }
}

export async function getAllContactMessages() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
}

export function subscribeToContactMessages(
  callback: (messages: FirestoreContactMessage[]) => void
) {
  return onSnapshot(collection(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES), (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as FirestoreContactMessage));
    callback(messages);
  });
}

export async function deleteContactMessage(id: string) {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES, id));
    return id;
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
}

// ============================================================================
// PARTNERSHIP AND VOLUNTEER INQUIRIES
// ============================================================================

export async function addPartnerInquiry(
  inquiry: Omit<FirestorePartnerInquiry, "id" | "timestamp" | "status">
) {
  try {
    const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.PARTNER_INQUIRIES), {
      ...inquiry,
      status: "new",
      timestamp: serverTimestamp(),
    });
    return { id: docRef.id, ...inquiry, status: "new" as const };
  } catch (error) {
    console.error("Error adding partner inquiry:", error);
    throw error;
  }
}

export async function addVolunteerApplication(
  application: Omit<FirestoreVolunteerApplication, "id" | "timestamp" | "status">
) {
  try {
    const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.VOLUNTEER_APPLICATIONS), {
      ...application,
      status: "new",
      timestamp: serverTimestamp(),
    });
    return { id: docRef.id, ...application, status: "new" as const };
  } catch (error) {
    console.error("Error adding volunteer application:", error);
    throw error;
  }
}

export function subscribeToPartnerInquiries(
  callback: (inquiries: FirestorePartnerInquiry[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.PARTNER_INQUIRIES),
    (snapshot) => callback(snapshot.docs.map((inquiryDoc) => ({ id: inquiryDoc.id, ...inquiryDoc.data() } as FirestorePartnerInquiry))),
    (error) => onError?.(error)
  );
}

export function subscribeToVolunteerApplications(
  callback: (applications: FirestoreVolunteerApplication[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.VOLUNTEER_APPLICATIONS),
    (snapshot) => callback(snapshot.docs.map((applicationDoc) => ({ id: applicationDoc.id, ...applicationDoc.data() } as FirestoreVolunteerApplication))),
    (error) => onError?.(error)
  );
}

export async function updatePartnerInquiryStatus(
  id: string,
  status: FirestorePartnerInquiry["status"]
) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.PARTNER_INQUIRIES, id), { status });
  return { id, status };
}

export async function updateVolunteerApplicationStatus(
  id: string,
  status: FirestoreVolunteerApplication["status"]
) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.VOLUNTEER_APPLICATIONS, id), { status });
  return { id, status };
}

// ============================================================================
// MEDIA LIBRARY OPERATIONS
// ============================================================================

export async function addMediaItem(media: Omit<FirestoreMediaItem, "id">) {
  const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.MEDIA), {
    ...media,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...media };
}

export async function updateMediaItem(id: string, updates: Partial<FirestoreMediaItem>) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.MEDIA, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return { id, ...updates };
}

export async function deleteMediaItem(id: string) {
  await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.MEDIA, id));
  return id;
}

export function subscribeToMediaItems(
  callback: (items: FirestoreMediaItem[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.MEDIA),
    (snapshot) => {
      const items = snapshot.docs
        .map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() } as FirestoreMediaItem))
        .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
      callback(items);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// OPERATIONS TASKS
// ============================================================================

export async function addTask(task: Omit<FirestoreTask, "id">) {
  const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.TASKS), {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...task };
}

export async function updateTask(id: string, updates: Partial<FirestoreTask>) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.TASKS, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return { id, ...updates };
}

export async function deleteTask(id: string) {
  await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.TASKS, id));
  return id;
}

export function subscribeToTasks(
  callback: (tasks: FirestoreTask[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.TASKS),
    (snapshot) => {
      const tasks = snapshot.docs.map(
        (taskDoc) => ({ id: taskDoc.id, ...taskDoc.data() } as FirestoreTask)
      );
      callback(tasks);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// PUBLIC DOCUMENT OPERATIONS
// ============================================================================

export async function addDocument(documentItem: Omit<FirestoreDocument, "id">) {
  const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.DOCUMENTS), {
    ...documentItem,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...documentItem };
}

export async function updateDocument(id: string, updates: Partial<FirestoreDocument>) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.DOCUMENTS, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return { id, ...updates };
}

export async function deleteDocument(id: string) {
  await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.DOCUMENTS, id));
  return id;
}

export function subscribeToDocuments(
  callback: (documents: FirestoreDocument[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.DOCUMENTS),
    (snapshot) => {
      const documents = snapshot.docs.map(
        (documentDoc) => ({ id: documentDoc.id, ...documentDoc.data() } as FirestoreDocument)
      );
      callback(documents);
    },
    (error) => onError?.(error)
  );
}

// ============================================================================
// DONATION PRIORITIES AND VERIFIED NEED NOTICES
// ============================================================================

export async function addDonationPriority(
  priority: Omit<FirestoreDonationPriority, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.DONATION_PRIORITIES), {
    ...priority,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...priority };
}

export async function updateDonationPriority(id: string, updates: Partial<FirestoreDonationPriority>) {
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.DONATION_PRIORITIES, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return { id, ...updates };
}

export async function deleteDonationPriority(id: string) {
  await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.DONATION_PRIORITIES, id));
  return id;
}

function priorityTime(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof (value as { toMillis?: () => number }).toMillis === "function") {
    return (value as { toMillis: () => number }).toMillis();
  }
  if (typeof value === "string") return Date.parse(value) || 0;
  return 0;
}

export function subscribeToDonationPriorities(
  callback: (priorities: FirestoreDonationPriority[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    collection(db, FIRESTORE_COLLECTIONS.DONATION_PRIORITIES),
    (snapshot) => {
      const priorities = snapshot.docs
        .map((priorityDoc) => ({ id: priorityDoc.id, ...priorityDoc.data() } as FirestoreDonationPriority))
        .sort((first, second) => priorityTime(second.updatedAt || second.createdAt) - priorityTime(first.updatedAt || first.createdAt));
      callback(priorities);
    },
    (error) => onError?.(error)
  );
}

export function subscribeToPublishedDonationPriorities(
  callback: (priorities: FirestoreDonationPriority[]) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    query(collection(db, FIRESTORE_COLLECTIONS.DONATION_PRIORITIES), where("status", "==", "published")),
    (snapshot) => {
      const priorities = snapshot.docs
        .map((priorityDoc) => ({ id: priorityDoc.id, ...priorityDoc.data() } as FirestoreDonationPriority))
        .sort((first, second) => priorityTime(second.updatedAt || second.createdAt) - priorityTime(first.updatedAt || first.createdAt));
      callback(priorities);
    },
    (error) => onError?.(error)
  );
}
