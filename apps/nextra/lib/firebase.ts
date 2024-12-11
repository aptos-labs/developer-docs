import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export let auth: Auth | null = null;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (e) {
  console.error(
    "Could not instantiate firebase. Ensure that env variables are set!",
  );
}
