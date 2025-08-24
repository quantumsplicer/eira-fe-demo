// src/components/AppLinkRedirect.tsx
import React, { useEffect } from "react";
import { useMatch } from "react-router-dom";

const SCHEME = "eira";
const ANDROID_PACKAGE = "com.anonymous.eiraapp";
const WEB_FALLBACK_BASE =
  (import.meta as any)?.env?.VITE_WEB_FALLBACK_BASE || window.location.origin;

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymous.eiraapp";
const APP_STORE_URL = "https://apps.apple.com/in/app/YOUR-IOS-APP-ID"; // replace with real

function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1)
  );
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export default function AppLinkRedirect() {
  const match = useMatch("/app/*");
  const deepPath = match?.params?.["*"] || "";

  const deeplink = `${SCHEME}://${deepPath}`;
  const webFallback = `${WEB_FALLBACK_BASE}/${deepPath}`;

  useEffect(() => {
    // Try opening the app
    const start = Date.now();
    window.location.href = deeplink;

    // If app not installed → after 1.5s, redirect
    const timer = setTimeout(() => {
      if (isIOS()) {
        window.location.href = APP_STORE_URL || webFallback;
      } else if (isAndroid()) {
        window.location.href = PLAY_STORE_URL || webFallback;
      } else {
        window.location.href = webFallback;
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [deeplink, deepPath, webFallback]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">Redirecting you to the app...</p>
    </div>
  );
}
