"use client";

import { useState } from "react";

export default function HomepagePreview() {
  const [key, setKey] = useState(0);

  return (
    <div className="mb-16 border border-hairline p-5 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="eyebrow">Live preview — see changes on both screen sizes</div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="text-xs font-mono border border-hairline px-4 py-2 hover:border-bone transition-colors"
        >
          ↻ Refresh preview
        </button>
      </div>

      <p className="text-xs text-sand mb-6 max-w-2xl">
        This shows your actual live homepage. After saving a change below, click "Refresh
        preview" to see it reflected here — both how customers on a computer see it, and how
        customers on a phone see it, side by side.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono text-sand mb-2">Desktop</div>
          <div className="border border-hairline overflow-hidden" style={{ height: "480px" }}>
            <iframe
              key={`desktop-${key}`}
              src="/"
              className="w-full h-full"
              style={{ border: "none" }}
              title="Desktop preview"
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="text-xs font-mono text-sand mb-2">Mobile</div>
          <div
            className="border border-hairline overflow-hidden mx-auto"
            style={{ width: "375px", height: "480px" }}
          >
            <iframe
              key={`mobile-${key}`}
              src="/"
              style={{ width: "375px", height: "480px", border: "none" }}
              title="Mobile preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
