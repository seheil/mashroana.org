import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, statistics, donations, InsertDonation, contactRequests, InsertContactRequest, projects, InsertProject } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Statistics queries
export async function getStatistics() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(statistics).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateStatistics(data: Partial<typeof statistics.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(statistics).set(data);
  return result;
}

// Donations queries
export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(donations).values(donation);
  return result;
}

export async function getDonations(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(donations).orderBy(desc(donations.createdAt)).limit(limit);
}

export async function getDonationById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(donations).where(eq(donations.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Contact requests queries
export async function createContactRequest(request: InsertContactRequest) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(contactRequests).values(request);
}

export async function getContactRequests(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt)).limit(limit);
}

// Projects queries
export async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).orderBy(projects.createdAt);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(projects).values(project);
}

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(projects).set(data).where(eq(projects.id, id));
}
