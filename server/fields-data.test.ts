import { describe, it, expect } from 'vitest';
import { 
  ORGANIZATION_FIELDS, 
  calculateSmartAllocation, 
  generateImpactMessage,
  proactiveQuestions,
  FIELD_DETAILS
} from '@shared/fields-data';

describe('fields-data', () => {
  describe('ORGANIZATION_FIELDS', () => {
    it('should have exactly 14 fields', () => {
      expect(ORGANIZATION_FIELDS).toHaveLength(14);
    });

    it('each field should have required properties', () => {
      ORGANIZATION_FIELDS.forEach((field) => {
        expect(field).toHaveProperty('id');
        expect(field).toHaveProperty('name');
        expect(field).toHaveProperty('description');
        expect(field).toHaveProperty('icon');
        expect(field).toHaveProperty('color');
      });
    });

    it('field IDs should be unique and sequential', () => {
      const ids = ORGANIZATION_FIELDS.map(f => f.id);
      expect(new Set(ids).size).toBe(14);
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    });

    it('each field name should be in Arabic', () => {
      ORGANIZATION_FIELDS.forEach((field) => {
        expect(field.name).toBeTruthy();
        expect(field.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('calculateSmartAllocation', () => {
    it('should allocate amounts correctly', () => {
      const amount = 1000;
      const allocations = calculateSmartAllocation(amount);

      expect(allocations).toHaveLength(4);
      
      const totalAllocated = allocations.reduce((sum, alloc) => sum + alloc.amount, 0);
      expect(totalAllocated).toBe(amount);
    });

    it('should respect percentage allocations', () => {
      const amount = 1000;
      const allocations = calculateSmartAllocation(amount);

      expect(allocations[0].amount).toBe(300); // 30%
      expect(allocations[1].amount).toBe(250); // 25%
      expect(allocations[2].amount).toBe(250); // 25%
      expect(allocations[3].amount).toBe(200); // 20%
    });

    it('should generate impact messages for each allocation', () => {
      const allocations = calculateSmartAllocation(1000);

      allocations.forEach((alloc) => {
        expect(alloc.impact).toBeTruthy();
        expect(alloc.arabicField).toBeTruthy();
        expect(alloc.field).toBeTruthy();
      });
    });

    it('should handle zero amount', () => {
      const allocations = calculateSmartAllocation(0);
      
      allocations.forEach((alloc) => {
        expect(alloc.amount).toBe(0);
      });
    });

    it('should handle large amounts', () => {
      const amount = 1000000;
      const allocations = calculateSmartAllocation(amount);

      const totalAllocated = allocations.reduce((sum, alloc) => sum + alloc.amount, 0);
      expect(totalAllocated).toBe(amount);
    });
  });

  describe('generateImpactMessage', () => {
    it('should generate a message containing the donation amount', () => {
      const amount = 500;
      const message = generateImpactMessage(amount, 'غرس النخيل');

      expect(message).toContain('500');
      expect(message).toContain('جنيه');
    });

    it('should include allocation details in the message', () => {
      const message = generateImpactMessage(1000, 'غرس النخيل');

      expect(message).toContain('✅');
      expect(message).toContain('جنيه');
    });

    it('should include Arabic text', () => {
      const message = generateImpactMessage(1000, 'غرس النخيل');

      expect(message).toContain('شكراً');
      expect(message).toContain('تبرعك');
    });

    it('should end with motivational message', () => {
      const message = generateImpactMessage(1000, 'غرس النخيل');

      expect(message).toContain('شريك');
      expect(message).toContain('مستقبل');
    });
  });

  describe('proactiveQuestions', () => {
    it('should have at least 4 questions', () => {
      expect(proactiveQuestions.length).toBeGreaterThanOrEqual(4);
    });

    it('each question should be in Arabic', () => {
      proactiveQuestions.forEach((question) => {
        expect(question).toBeTruthy();
        expect(question.length).toBeGreaterThan(0);
      });
    });
  });

  describe('FIELD_DETAILS', () => {
    it('should have details for all 14 fields', () => {
      Object.keys(FIELD_DETAILS).forEach((key) => {
        const fieldId = parseInt(key);
        expect(fieldId).toBeGreaterThanOrEqual(1);
        expect(fieldId).toBeLessThanOrEqual(14);
      });
    });

    it('each field detail should have required properties', () => {
      Object.values(FIELD_DETAILS).forEach((detail) => {
        expect(detail).toHaveProperty('fullDescription');
        expect(detail).toHaveProperty('examples');
        expect(detail).toHaveProperty('suggestedDonations');
        
        expect(detail.fullDescription).toBeTruthy();
        expect(Array.isArray(detail.examples)).toBe(true);
        expect(Array.isArray(detail.suggestedDonations)).toBe(true);
      });
    });

    it('each field should have at least 3 examples', () => {
      Object.values(FIELD_DETAILS).forEach((detail) => {
        expect(detail.examples.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('suggested donations should be positive numbers', () => {
      Object.values(FIELD_DETAILS).forEach((detail) => {
        detail.suggestedDonations.forEach((donation) => {
          expect(donation).toBeGreaterThan(0);
        });
      });
    });
  });
});
