// src/components/AppLinkRedirect.tsx
import React, { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

const ANDROID_PACKAGE = "club.eira.app"; // replace with your real Android package name
const WEB_FALLBACK_BASE =
  (import.meta as any)?.env?.VITE_WEB_FALLBACK_BASE || window.location.origin;

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);
const isAndroid = () => /Android/i.test(navigator.userAgent);

export default function AppLinkRedirect() {
  const location = useLocation();
  const match = useMatch("/app/*");

  const deepPath = (match?.params?.["*"] || "").replace(/^\/+/, "");
  const search = location.search || "";
  const hash = location.hash || "";

  // scheme url: eira://<something>?...#...
  const schemeUrl = `eira://${deepPath}${search}${hash}`;

  // web fallback mirrors path after /app/
  const fallbackUrl = `${WEB_FALLBACK_BASE}/${deepPath}${search}${hash}`;

  useEffect(() => {
    let timeoutId: number | undefined;

    const cancelFallbackIfHidden = () => {
      if (document.hidden && timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
    document.addEventListener("visibilitychange", cancelFallbackIfHidden);

    if (isAndroid()) {
      // Better UX on Android with intent:
      const intentUrl = `intent://${deepPath}${search}${hash}#Intent;scheme=eira;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(
        fallbackUrl
      )};end;`;
      window.location.href = intentUrl;
    } else if (isIOS()) {
      // Try scheme, then fallback after delay
      window.location.href = schemeUrl;
      timeoutId = window.setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 1200);
    } else {
      // desktop: just fallback
      window.location.replace(fallbackUrl);
    }

    return () => {
      document.removeEventListener("visibilitychange", cancelFallbackIfHidden);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [deepPath, search, hash, schemeUrl, fallbackUrl]);

  return (
    <div style={{ padding: 16 }}>
      <p>
        Opening Eira… If the app doesn’t open,{" "}
        <a href={fallbackUrl}>continue on the web</a>.
      </p>
      <noscript>
        JavaScript is required for redirection. Open{" "}
        <a href={fallbackUrl}>this link</a>.
      </noscript>
    </div>
  );
}
