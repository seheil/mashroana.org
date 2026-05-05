import { describe, it, expect } from 'vitest';

describe('Firebase Configuration', () => {
  it('should have all required environment variables set', () => {
    const requiredEnvs = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID',
    ];

    requiredEnvs.forEach((env) => {
      expect(process.env[env]).toBeDefined();
      expect(process.env[env]).not.toBe('');
    });
  });

  it('should have valid Firebase API Key format', () => {
    const apiKey = process.env.VITE_FIREBASE_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toMatch(/^AIzaSy/);
  });

  it('should have valid Firebase Project ID', () => {
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    expect(projectId).toBeDefined();
    expect(projectId).toBe('mashroana-site');
  });

  it('should have valid Firebase Auth Domain', () => {
    const authDomain = process.env.VITE_FIREBASE_AUTH_DOMAIN;
    expect(authDomain).toBeDefined();
    expect(authDomain).toContain('firebaseapp.com');
  });

  it('should have valid Firebase Storage Bucket', () => {
    const storageBucket = process.env.VITE_FIREBASE_STORAGE_BUCKET;
    expect(storageBucket).toBeDefined();
    expect(storageBucket).toContain('firebasestorage.app');
  });
});
