"use client";
import { analyzeCandidates } from "@/services/api";
import { useState } from "react";
import { useHiringStore } from "@/store/useHiringStore";

import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const setResults =
    useHiringStore(
      (state) => state.setResults
    );

  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const handleAnalyze = async () => {

  try {

    setLoading(true);

    const result =
    await analyzeCandidates(
      jd,
      files
    );

  setResults(result);

  router.push("/results");

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  return (
    <main className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Hiring Copilot
      </h1>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            Job Description
          </label>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="w-full border rounded p-3 h-48"
            placeholder="Paste Job Description Here..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Upload Resumes
          </label>

          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setFiles(Array.from(e.target.files));
              }
            }}
          />
        </div>

        {/* Selected Files */}

        <div>

          {files.map((file) => (
            <p key={file.name}>
              {file.name}
            </p>
          ))}

        </div>

        <button
            onClick={handleAnalyze}
            className="border px-4 py-2 rounded"
          >

            {
              loading
                ? "Analyzing..."
                : "Analyze Candidates"
            }

        </button>

      </div>

    </main>
  );
}