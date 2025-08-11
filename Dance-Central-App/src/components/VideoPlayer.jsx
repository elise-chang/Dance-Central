import React from "react";

export default function VideoPlayer({ item }) {
  if (!item) return null;
  return (
    <video
      src={item.src}
      controls
      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
    />
  );
}
