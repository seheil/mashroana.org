import source from "./site-content.json";
import type {
  FirestoreAchievement,
  FirestoreDocument,
  FirestoreDonationPriority,
  FirestoreMediaItem,
  FirestoreProject,
  FirestoreSettings,
} from "@shared/firestore-schemas";

type StaticSiteContent = {
  settings: FirestoreSettings;
  projects: FirestoreProject[];
  achievements: FirestoreAchievement[];
  media: FirestoreMediaItem[];
  documents: FirestoreDocument[];
  donationPriorities: FirestoreDonationPriority[];
};

/**
 * This is the public site's single, version-controlled source of content.
 * GitHub commits change these values; Vercel rebuilds the static site.
 */
export const staticSiteContent = source as StaticSiteContent;
