"use client";

import {
  useHiringStore
} from "@/store/useHiringStore";

export default function ResultsPage() {

  const results =
    useHiringStore(
      (state) => state.results
    );

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Candidate Rankings
      </h1>

      <pre>
        {
          JSON.stringify(
            results?.rankings,
            null,
            2
          )
        }
      </pre>

    </main>
  );
}