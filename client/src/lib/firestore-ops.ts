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
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  FirestoreProject,
  FirestoreAchievement,
  FirestoreSettings,
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

export function subscribeToProjects(callback: (projects: FirestoreProject[]) => void) {
  return onSnapshot(collection(db, FIRESTORE_COLLECTIONS.PROJECTS), (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as FirestoreProject));
    callback(projects);
  });
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

export function subscribeToAchievements(callback: (achievements: FirestoreAchievement[]) => void) {
  return onSnapshot(collection(db, FIRESTORE_COLLECTIONS.ACHIEVEMENTS), (snapshot) => {
    const achievements = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as FirestoreAchievement))
      .sort((a, b) => (b.year || 0) - (a.year || 0));
    callback(achievements);
  });
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

export function subscribeToSettings(callback: (settings: FirestoreSettings) => void) {
  return onSnapshot(collection(db, FIRESTORE_COLLECTIONS.SETTINGS), (snapshot) => {
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
  });
}

// ============================================================================
// CONTACT MESSAGES OPERATIONS
// ============================================================================

export async function addContactMessage(message: Omit<FirestoreAchievement, "id">) {
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

export function subscribeToContactMessages(callback: (messages: any[]) => void) {
  return onSnapshot(collection(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES), (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
