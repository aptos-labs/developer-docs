// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import { auth } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setIsLoading(false);
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, [auth]);

  const handleGithubLogin = async () => {
    if (!auth) {
      return;
    }
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const handleGoogleLogin = useCallback(async () => {
    if (!auth) {
      return;
    }
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    if (!auth) {
      return;
    }
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsLoading(false);
  };

  return {
    error: !auth,
    user,
    isLoading,
    handleGoogleLogin,
    handleGithubLogin,
    handleLogout,
  };
}
