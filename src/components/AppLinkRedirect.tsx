// src/components/AppLinkRedirect.tsx
import React, { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

const ANDROID_PACKAGE = "com.anonymous.eiraapp"; // your actual package ID
const SCHEME = "eira"; // deeplink scheme
const WEB_FALLBACK_BASE =
  (import.meta as any)?.env?.VITE_WEB_FALLBACK_BASE || window.location.origin;

// Store URLs
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymous.eiraapp&hl=en_IN&pli=1";
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
  const location = useLocation();
  const match = useMatch("/app/*");
  const deepPath = match?.params?.["*"] || "";

  const deeplink = `${SCHEME}://${deepPath}`;
  const webFallback = `${WEB_FALLBACK_BASE}/${deepPath}`;

  useEffect(() => {
    if (isIOS()) {
      // Try app deeplink, fallback to App Store if not installed
      window.location.href = deeplink;
      setTimeout(() => {
        window.location.href = APP_STORE_URL || webFallback;
      }, 1500);
    } else if (isAndroid()) {
      // Use intent:// on Android
      const intentUrl = `intent://${deepPath}#Intent;scheme=${SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(
        PLAY_STORE_URL
      )};end`;
      window.location.href = intentUrl;
    } else {
      // Desktop → web fallback
      window.location.href = webFallback;
    }
  }, [deeplink, deepPath, webFallback]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">Redirecting you to the app...</p>
    </div>
  );
}
