"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

export default function LoaderClip() {
  return (
    <div className="flex items-center justify-center py-6">
      <ClipLoader color="hsl(var(--primary))" />
    </div>
  );
}
