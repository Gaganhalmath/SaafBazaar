import React from "react";
import { MessageCircle } from "lucide-react";

// Default BotPress webchat URL. Change this to your own if needed.
const DEFAULT_BOTPRESS_URL = "https://cdn.botpress.cloud/webchat/v3.1/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/26/19/20250726193952-V4XR9FN2.json";

export const BotPressButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  // Only load the iframe when open for performance
  return (
    <>
      {/* Floating Message Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          background: "linear-gradient(90deg, #39FFA0 0%, #00C6FB 100%)",
          border: "none",
          borderRadius: "50%",
          width: 64,
          height: 64,
          boxShadow: "0 4px 24px 0 rgba(57,255,160,0.2)",
          display: open ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "box-shadow 0.2s",
        }}
        aria-label="Open BotPress Chatbot"
      >
        <MessageCircle size={32} color="#232631" />
      </button>

      {/* Popup Chatbot Interface */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 1100,
            width: 400,
            maxWidth: "95vw",
            height: 600,
            maxHeight: "90vh",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              fontSize: 28,
              color: "#232631",
              cursor: "pointer",
              margin: 8,
            }}
            aria-label="Close Chatbot"
          >
            ×
          </button>
          {/* BotPress Webchat Iframe */}
          <iframe
            src={DEFAULT_BOTPRESS_URL}
            title="BotPress Chatbot"
            style={{ flex: 1, border: "none", width: "100%" }}
            allow="microphone;"
          />
        </div>
      )}
    </>
  );
};

// Usage:
// <BotPressButton />
