"use client";

import { analyzeCandidates } from "@/services/api";
import { useState } from "react";
import { useHiringStore } from "@/store/useHiringStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [error, setError] = useState("");

  const setResults = useHiringStore(
    (state) => state.setResults
  );

  const [jd, setJd] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

const loadingSteps = [
  "Parsing resumes...",
  "Analyzing job description...",
  "Matching skills...",
  "Evaluating candidates...",
  "Ranking candidates...",
];

  const handleAnalyze = async () => {

  try {

    setError("");

    setLoading(true);

    const result =
      await analyzeCandidates(
        jd,
        files
      );

    setResults(result);

    router.push(
      "/results"
    );

  } catch (error: any) {

    console.error(error);

    setError(
      error.message ||
      "Something went wrong"
    );

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
        {
          error && (

            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>

          )
        }

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
{loading ? (

  <div className="border rounded-xl p-6 bg-white">

    <h3 className="text-lg font-semibold mb-4">
      Analyzing Candidates
    </h3>

    <div className="space-y-3">

      {loadingSteps.map(
        (step, index) => (

          <div
            key={index}
            className="flex items-center gap-3"
          >

            <div className="h-2 w-2 rounded-full bg-black animate-pulse" />

            <span>
              {step}
            </span>

          </div>

        )
      )}

    </div>

  </div>

) : (

  <button
    onClick={handleAnalyze}
    disabled={
      !jd.trim() ||
      files.length === 0
    }
    className="w-full py-4 rounded-xl font-semibold text-white bg-black hover:opacity-90 disabled:opacity-50"
  >
    Analyze Candidates
  </button>

)}

        </div>

      </section>

    </main>
  );
}