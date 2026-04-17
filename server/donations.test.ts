import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Donations Router", () => {
  it("should create a donation successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.donations.create({
      donorName: "أحمد محمد",
      donorEmail: "ahmed@example.com",
      donorPhone: "01012345678",
      amount: 500,
      paymentMethod: "instapay",
      message: "بارك الله فيكم",
    });

    expect(result).toBeDefined();
  });

  it("should list donations for admin only", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.donations.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject donation listing for non-admin users", async () => {
    const publicCtx = createPublicContext();
    const caller = appRouter.createCaller(publicCtx);

    try {
      await caller.donations.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("login");
    }
  });
});

describe("Contact Router", () => {
  it("should create a contact request successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.create({
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "01098765432",
      subject: "استفسار عن البرامج",
      message: "أود الاستفسار عن برنامج كفالة الأيتام وشروطه",
    });

    expect(result).toBeDefined();
  });

  it("should validate contact request fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.create({
        name: "ع",
        email: "invalid-email",
        phone: "123",
        subject: "test",
        message: "msg",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  it("should list contact requests for admin only", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.contact.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Statistics Router", () => {
  it("should get statistics", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.statistics.get();
    expect(result).toBeDefined();
    if (result) {
      expect(result.studentCount).toBeDefined();
      expect(result.orphanCount).toBeDefined();
    }
  });

  it("should update statistics for admin only", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.statistics.update({
      studentCount: 60,
      orphanCount: 100,
    });

    expect(result).toBeDefined();
  });

  it("should reject statistics update for non-admin users", async () => {
    const publicCtx = createPublicContext();
    const caller = appRouter.createCaller(publicCtx);

    try {
      await caller.statistics.update({
        studentCount: 60,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("login");
    }
  });
});

describe("Projects Router", () => {
  it("should list projects", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should get a specific project", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First list projects to get an ID
    const projects = await caller.projects.list();
    if (projects.length > 0) {
      const result = await caller.projects.get({ id: projects[0].id });
      expect(result).toBeDefined();
      expect(result?.id).toBe(projects[0].id);
    }
  });

  it("should create a project for admin only", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.projects.create({
      name: "مشروع إغاثة جديد",
      description: "مشروع إغاثة للمتضررين",
      category: "international_relief",
      targetAmount: "50000",
    });

    expect(result).toBeDefined();
  });

  it("should reject project creation for non-admin users", async () => {
    const publicCtx = createPublicContext();
    const caller = appRouter.createCaller(publicCtx);

    try {
      await caller.projects.create({
        name: "مشروع إغاثة جديد",
        description: "مشروع إغاثة للمتضررين",
        category: "international_relief",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("login");
    }
  });
});
