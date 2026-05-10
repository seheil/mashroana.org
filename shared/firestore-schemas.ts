/**
 * Firestore Collection Schemas and Types
 */

export interface FirestoreProject {
  id?: string;
  name: string;
  description: string;
  icon: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface FirestoreAchievement {
  id?: string;
  title: string;
  description: string;
  year: number;
  orphans?: number;
  students?: number;
  patients?: number;
  families?: number;
  icon: string;
  imagePath?: string; // Local public folder path only
  createdAt?: number;
  updatedAt?: number;
}

export interface FirestoreSettings {
  id?: string;
  orphans: number;
  students: number;
  patients: number;
  families: number;
  updatedAt?: number;
}

export interface FirestoreContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp?: number;
  read?: boolean;
}

/**
 * Collection names for Firestore
 */
export const FIRESTORE_COLLECTIONS = {
  PROJECTS: "projects",
  ACHIEVEMENTS: "achievements",
  SETTINGS: "settings",
  CONTACT_MESSAGES: "contactMessages",
} as const;

/**
 * Default settings document ID
 */
export const DEFAULT_SETTINGS_ID = "default";

/**
 * Initialize Firestore collections with default data
 * Call this once during app initialization
 */
export async function initializeFirestoreCollections(
  db: any,
  setDoc: any,
  doc: any,
  getDocs: any,
  query: any,
  collection: any
) {
  try {
    // Check if settings exist
    const settingsRef = doc(db, FIRESTORE_COLLECTIONS.SETTINGS, DEFAULT_SETTINGS_ID);
    const settingsSnap = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.SETTINGS)));

    if (settingsSnap.empty) {
      // Initialize default settings
      await setDoc(settingsRef, {
        orphans: 0,
        students: 0,
        patients: 0,
        families: 0,
        updatedAt: Date.now(),
      });
    }

    // Check if projects exist
    const projectsSnap = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.PROJECTS)));
    if (projectsSnap.empty) {
      // Initialize with default projects
      const defaultProjects: FirestoreProject[] = [
        {
          name: "كفالة الأيتام",
          description: "توفير الرعاية والتعليم للأيتام",
          icon: "👨‍👩‍👧‍👦",
        },
        {
          name: "الدعم التعليمي",
          description: "دعم الطلاب المحتاجين وتوفير المستلزمات الدراسية",
          icon: "📚",
        },
        {
          name: "مشغل الخياطة",
          description: "مشروع تدريبي تحت التأسيس",
          icon: "🪡",
        },
        {
          name: "سقيا الماء وزراعة الأشجار",
          description: "مشاريع بيئية وتنموية",
          icon: "🌳",
        },
        {
          name: "المساعدات الموسمية والإغاثية",
          description: "مساعدات عاجلة في الأوقات الحرجة",
          icon: "📦",
        },
        {
          name: "صكوك الأضاحي",
          description: "توفير الأضاحي للأسر المحتاجة",
          icon: "🐑",
        },
        {
          name: "الصحة والأمومة والطفولة",
          description: "رعاية صحية للأمهات والأطفال",
          icon: "🏥",
        },
        {
          name: "ذوو الاحتياجات الخاصة",
          description: "دعم وتأهيل ذوي الاحتياجات الخاصة",
          icon: "♿",
        },
        {
          name: "التطوير المؤسسي",
          description: "تطوير قدرات المؤسسة والعاملين",
          icon: "🏢",
        },
      ];

      for (const project of defaultProjects) {
        const newDocRef = doc(collection(db, FIRESTORE_COLLECTIONS.PROJECTS));
        await setDoc(newDocRef, {
          ...project,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }
  } catch (error) {
    console.error("Error initializing Firestore collections:", error);
  }
}
