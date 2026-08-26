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
  imagePath?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface FirestoreSettings {
  id?: string;
  orphans: number;
  students: number;
  patients: number;
  families: number;
  heroTitle?: string;
  heroDescription?: string;
  partnershipTitle?: string;
  aboutHeadline?: string;
  aboutDescription?: string;
  aboutMission?: string;
  aboutCommitments?: string;
  transparencyHeadline?: string;
  transparencyDescription?: string;
  transparencyGovernance?: string;
  transparencyImpact?: string;
  transparencyDocumentsTitle?: string;
  transparencyDocuments?: string;
  partnershipsHeadline?: string;
  partnershipsDescription?: string;
  partnershipsWhy?: string;
  partnershipsPrograms?: string;
  partnershipsImpact?: string;
  partnershipsMedia?: string;
  partnershipsDueDiligence?: string;
  mediaHeadline?: string;
  mediaDescription?: string;
  homepage?: FirestoreHomepageContent;
  navigation?: FirestoreNavigationContent;
  about?: FirestoreAboutContent;
  updatedAt?: number;
}

export type HomepageSectionId = "impact" | "priorities" | "programs" | "partnerships" | "media" | "donate";

export interface FirestoreHeroContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  sideLabel?: string;
  sideTitle?: string;
  sideDescription?: string;
  sideCtaLabel?: string;
  trustPoints?: string[];
}

export interface FirestoreHomepageSectionContent {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
}

export interface FirestoreHomepageContent {
  hero?: FirestoreHeroContent;
  impact?: FirestoreHomepageSectionContent;
  priorities?: FirestoreHomepageSectionContent;
  programs?: FirestoreHomepageSectionContent;
  partnerships?: FirestoreHomepageSectionContent;
  media?: FirestoreHomepageSectionContent;
  donate?: FirestoreHomepageSectionContent;
  sectionOrder?: HomepageSectionId[];
}

export interface FirestoreNavigationItem {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  order: number;
}

export interface FirestoreNavigationContent {
  brandShortName?: string;
  donateLabel?: string;
  footerDescription?: string;
  items?: FirestoreNavigationItem[];
}

export interface FirestoreAboutWorkArea {
  mark: string;
  title: string;
  text: string;
}

export interface FirestoreAboutContent {
  tagline?: string;
  workAreasHeading?: string;
  workAreasDescription?: string;
  workAreas?: FirestoreAboutWorkArea[];
  governanceTitle?: string;
  governanceDescription?: string;
  boardIntro?: string;
  institutionalContactTitle?: string;
  institutionalContactDescription?: string;
  partnershipCtaLabel?: string;
  transparencyCtaLabel?: string;
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

export type InquiryStatus = "new" | "in_review" | "contacted" | "closed";

export interface FirestorePartnerInquiry {
  id?: string;
  organizationName: string;
  sector: string;
  contactName: string;
  email: string;
  phone?: string;
  cooperationType: string;
  programInterest?: string;
  estimatedValue?: string;
  timeline?: string;
  notes?: string;
  consent: boolean;
  status?: InquiryStatus;
  timestamp?: number;
}

export interface FirestoreVolunteerApplication {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  availability: string;
  areaOfInterest: string;
  skills?: string;
  message?: string;
  consent: boolean;
  status?: InquiryStatus;
  timestamp?: number;
}

export type MediaKind = "image" | "video";
export type PublishStatus = "draft" | "published" | "archived";

export interface FirestoreMediaItem {
  id?: string;
  title: string;
  description: string;
  kind: MediaKind;
  mediaUrl: string;
  thumbnailUrl?: string;
  category: string;
  projectId?: string;
  capturedAt?: string;
  location?: string;
  altText: string;
  rightsNote: string;
  consentConfirmed: boolean;
  status: PublishStatus;
  createdAt?: number;
  updatedAt?: number;
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface FirestoreTask {
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  owner?: string;
  projectId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface FirestoreDocument {
  id?: string;
  title: string;
  description: string;
  category: "registration" | "governance" | "financial" | "annual_report" | "policy" | "other";
  year?: number;
  documentUrl: string;
  status: PublishStatus;
  createdAt?: number;
  updatedAt?: number;
}

export type DonationPriorityKind = "urgent" | "seasonal" | "program";
export type DonationPriorityStatus = "draft" | "published" | "closed";

/**
 * A staff-approved, time-bound need that may be shown publicly and used by the donation assistant.
 * It must not be created with placeholder urgency or beneficiary claims.
 */
export interface FirestoreDonationPriority {
  id?: string;
  title: string;
  description: string;
  programId: string;
  programName: string;
  kind: DonationPriorityKind;
  status: DonationPriorityStatus;
  recommendationWeight: number;
  reason: string;
  sourceNote: string;
  targetAmount?: number;
  beneficiaryCount?: number;
  beneficiaryLabel?: string;
  publishedAt?: number;
  endsAt?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Collection names for Firestore
 */
export const FIRESTORE_COLLECTIONS = {
  PROJECTS: "projects",
  ACHIEVEMENTS: "achievements",
  SETTINGS: "settings",
  CONTACT_MESSAGES: "contactMessages",
  PARTNER_INQUIRIES: "partnerInquiries",
  VOLUNTEER_APPLICATIONS: "volunteerApplications",
  MEDIA: "media",
  TASKS: "tasks",
  DOCUMENTS: "documents",
  DONATION_PRIORITIES: "donationPriorities",
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
