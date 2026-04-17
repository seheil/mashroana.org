import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Statistics router
  statistics: router({
    get: publicProcedure.query(async () => {
      const stats = await db.getStatistics();
      if (!stats) {
        await db.updateStatistics({
          studentCount: 51,
          studentTarget: 100,
          orphanCount: 0,
          orphanTarget: 500,
          familyCount: 0,
          familyTarget: 1000,
          totalBeneficiaries: 51,
          totalBeneficiariesTarget: 2000,
          totalDonations: 0,
        } as any);
        return await db.getStatistics();
      }
      return stats;
    }),
    update: protectedProcedure
      .input(z.object({
        studentCount: z.number().optional(),
        orphanCount: z.number().optional(),
        familyCount: z.number().optional(),
        totalBeneficiaries: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await db.updateStatistics(input as any);
      }),
  }),

  // Donations router
  donations: router({
    create: publicProcedure
      .input(z.object({
        donorName: z.string().optional(),
        donorEmail: z.string().email().optional(),
        donorPhone: z.string().optional(),
        amount: z.number().positive(),
        paymentMethod: z.enum(['instapay', 'vodafone_cash', 'etisalat_cash', 'orange_cash', 'bank_transfer', 'other']),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const donation = await db.createDonation({
          ...input,
          status: 'completed',
        } as any);
        await notifyOwner({
          title: 'تبرع جديد',
          content: `تم استقبال تبرع بقيمة ${input.amount} جنيه من ${input.donorName || 'متبرع مجهول'}`,
        });
        return donation;
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await db.getDonations();
    }),
  }),

  // Contact requests router
  contact: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        subject: z.string().min(5),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const request = await db.createContactRequest({
          ...input,
          status: 'new',
        } as any);
        await notifyOwner({
          title: 'طلب تواصل جديد',
          content: `تم استقبال طلب تواصل من ${input.name}\nالموضوع: ${input.subject}`,
        });
        return request;
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await db.getContactRequests();
    }),
  }),

  // Projects router
  projects: router({
    list: publicProcedure.query(async () => {
      return await db.getProjects();
    }),
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProjectById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
        category: z.enum(['international_relief', 'bride_preparation', 'holiday_clothing', 'orphan_sponsorship', 'charitable_complexes', 'palm_planting']),
        imageUrl: z.string().optional(),
        targetAmount: z.string().optional(),
        beneficiaryCount: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await db.createProject({
          ...input,
          status: 'active',
        } as any);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        targetAmount: z.string().optional(),
        collectedAmount: z.string().optional(),
        beneficiaryCount: z.number().optional(),
        status: z.enum(['active', 'completed', 'paused']).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        return await db.updateProject(id, data as any);
      }),
  }),
});

export type AppRouter = typeof appRouter;
