import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function isClientFirebaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_APP_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

const APP_NAME = "lurktheconstraints";

export function getClientAuth() {
  if (!isClientFirebaseConfigured()) throw new Error("Registration is not configured yet");
  const previewHost = typeof window !== "undefined" && /^lurktheconstraints--[a-z0-9-]+\.web\.app$/.test(window.location.hostname)
    ? window.location.hostname : null;
  const app = getApps().some((app) => app.name === APP_NAME) ? getApp(APP_NAME) : initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: previewHost ?? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "lurktheconstraints.web.app",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  }, APP_NAME);
  return getAuth(app);
}
