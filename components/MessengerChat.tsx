"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB?: {
      init: (options: { xfbml: boolean; version: string; appId: string }) => void;
      XFBML: { parse: (node?: Document | HTMLElement) => void };
    };
    fbAsyncInit?: () => void;
  }
}

/**
 * Facebook Messenger Customer Chat plugin.
 * Loads the SDK and plugin only on the client to avoid SSR issues.
 *
 * Required env (client-visible):
 * - NEXT_PUBLIC_MESSENGER_PAGE_ID — Your Facebook Page ID (required for fb-customerchat)
 * - NEXT_PUBLIC_MESSENGER_APP_ID  — Your Facebook App ID (required for SDK init)
 */
export function MessengerChat() {
  useEffect(() => {
    const pageId = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID;
    const appId = process.env.NEXT_PUBLIC_MESSENGER_APP_ID;

    if (!pageId || !appId) {
      return;
    }

    // fb-root: container required by the Facebook SDK for plugins (Meta docs)
    let root = document.getElementById("fb-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "fb-root";
      document.body.appendChild(root);
    }

    // fb-customerchat div: required by Customer Chat plugin (Meta Web Plugins reference)
    let chatEl = document.querySelector(".fb-customerchat");
    if (!chatEl) {
      chatEl = document.createElement("div");
      chatEl.className = "fb-customerchat";
      chatEl.setAttribute("page_id", pageId);
      chatEl.setAttribute("minimized", "true");
      chatEl.setAttribute("theme_color", "#C5A059");
      chatEl.setAttribute("logged_in_greeting", "Hello! How can we help you today?");
      chatEl.setAttribute("logged_out_greeting", "Hello! How can we help you today?");
      document.body.appendChild(chatEl);
    }

    // Avoid loading the script more than once
    if (document.getElementById("facebook-messenger-sdk")) {
      if (typeof window.FB !== "undefined") {
        window.FB.XFBML.parse();
      }
      return;
    }

    // SDK calls this when loaded (Meta quickstart pattern)
    window.fbAsyncInit = function () {
      if (typeof window.FB === "undefined") return;
      window.FB.init({
        xfbml: true,
        version: "v24.0",
        appId: appId,
      });
      window.FB.XFBML.parse();
    };

    const script = document.createElement("script");
    script.id = "facebook-messenger-sdk";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    // Customer Chat SDK: xfbml.customerchat.js includes XFBML support for fb-customerchat
    script.src = `https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v24.0&appId=${appId}`;
    document.body.appendChild(script);
  }, []);

  return null;
}
