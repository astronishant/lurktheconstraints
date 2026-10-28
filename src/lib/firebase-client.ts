import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function isClientFirebaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_APP_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

const APP_NAME = "lurktheconstraints";

export function getClientAuth() {
  if (!isClientFirebaseConfigured()) throw new Error("Registration is not configured yet");
  // authDomain stays on the Firebase project domain so the Google OAuth popup can
  // redirect back to any host. Add your Vercel domain(s) under
  // Firebase Console → Authentication → Settings → Authorized domains.
  const app = getApps().some((app) => app.name === APP_NAME) ? getApp(APP_NAME) : initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "lurktheconstraints.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  }, APP_NAME);
  return getAuth(app);
}
