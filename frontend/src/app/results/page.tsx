"use client";

import { useState } from "react";

import { useHiringStore } from "@/store/useHiringStore";

import SummaryCards from "@/component/SummaryCards";
import RankingTable from "@/component/RankingTable";
import CandidateProfile from "@/component/CandidateProfile";
import EvaluatorCard from "@/component/EvaluatorCard";
import CriticCard from "@/component/CriticCard";
import JudgeCard from "@/component/JudgeCard";

export default function ResultsPage() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<any>(null);

  const results = useHiringStore(
    (state) => state.results
  );

  const rankings = results?.rankings || [];

  const totalCandidates =
    rankings.length;

  const topCandidate =
    rankings[0];

  const rejectedCount =
    rankings.filter(
      (candidate: any) =>
        candidate.recommendation
          .toLowerCase()
          .includes("reject")
    ).length;

  return (
    <main className="max-w-7xl mx-auto p-8 min-h-screen bg-slate-50">

      <SummaryCards
        totalCandidates={totalCandidates}
        topCandidate={topCandidate}
        rejectedCount={rejectedCount}
      />

      <h1 className="text-4xl font-bold mb-8">
        Candidate Rankings
      </h1>

      <RankingTable
        rankings={rankings}
        results={results}
        setSelectedCandidate={
          setSelectedCandidate
        }
      />

      {selectedCandidate && (

        <div className="mt-10">

          <div className="border rounded-xl bg-white shadow-sm p-6">

            <h2 className="text-3xl font-bold mb-4">
              {selectedCandidate.candidate}
            </h2>

            <div className="flex gap-8">

              <p>
                <strong>Score:</strong>{" "}
                {selectedCandidate.score}
              </p>

              <p>
                <strong>
                  Recommendation:
                </strong>{" "}
                {
                  selectedCandidate
                    .recommendation
                }
              </p>

            </div>

          </div>

          <CandidateProfile
            candidate={selectedCandidate}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <EvaluatorCard
              candidate={
                selectedCandidate
              }
            />

            <CriticCard
              candidate={
                selectedCandidate
              }
            />

          </div>

          <JudgeCard
            candidate={
              selectedCandidate
            }
          />

        </div>

      )}

    </main>
  );
}