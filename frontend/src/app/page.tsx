"use client";

import { analyzeCandidates } from "@/services/api";
import { useState } from "react";
import { useHiringStore } from "@/store/useHiringStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const setResults = useHiringStore(
    (state) => state.setResults
  );

  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const result = await analyzeCandidates(
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
    <main className="min-h-screen bg-slate-50">

      {/* Hero Section */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <h1 className="text-6xl font-bold mb-4">
            AI Hiring Copilot
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze resumes, rank candidates,
            evaluate strengths and weaknesses,
            and generate hiring recommendations
            using a multi-agent AI workflow.
          </p>

        </div>

        {/* Main Card */}

        <div className="bg-white rounded-2xl shadow-lg border p-8">

          {/* JD Section */}

          <div className="mb-8">

            <label className="block text-lg font-semibold mb-3">
              Job Description
            </label>

            <textarea
              value={jd}
              onChange={(e) =>
                setJd(e.target.value)
              }
              className="w-full h-64 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
              placeholder="Paste the complete job description here..."
            />

          </div>

          {/* Resume Upload */}

          <div className="mb-8">

            <label className="block text-lg font-semibold mb-3">
              Upload Candidate Resumes
            </label>

            <div className="border-2 border-dashed rounded-xl p-8">

              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(
                      Array.from(
                        e.target.files
                      )
                    );
                  }
                }}
              />

              <p className="text-sm text-gray-500 mt-3">
                Upload one or more PDF resumes
              </p>

            </div>

          </div>

          {/* Selected Files */}

          {files.length > 0 && (

            <div className="mb-8">

              <h3 className="font-semibold mb-3">
                Selected Resumes
              </h3>

              <div className="space-y-2">

                {files.map((file) => (

                  <div
                    key={file.name}
                    className="border rounded-lg p-3 bg-slate-50"
                  >
                    {file.name}
                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Analyze Button */}

          <button
            onClick={handleAnalyze}
            disabled={
              loading ||
              !jd.trim() ||
              files.length === 0
            }
            className="w-full py-4 rounded-xl font-semibold text-white bg-black hover:opacity-90 disabled:opacity-50"
          >

            {loading
              ? "Analyzing Candidates..."
              : "Analyze Candidates"}

          </button>

        </div>

      </section>

    </main>
  );
}