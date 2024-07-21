"use client";

import { Genres } from "@/src/app/instrumentalist-dashboard/settings/components/genres";
import { Interests } from "@/src/app/instrumentalist-dashboard/settings/components/interests";

export default function SettingsPage() {
  return (
    <>
      <Genres />

      <div className="my-8">
        <div aria-hidden="true" className="flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>

      <Interests />
    </>
  );
}
