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
    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold tracking-tight">
            Hiring Results
          </h1>

          <p className="text-muted-foreground mt-2">
            AI-powered candidate evaluation dashboard
          </p>

        </div>

        {/* Summary */}

        <SummaryCards
          totalCandidates={totalCandidates}
          topCandidate={topCandidate}
          rejectedCount={rejectedCount}
        />

        {/* Rankings */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Candidate Rankings
          </h2>

          <RankingTable
            rankings={rankings}
            results={results}
            setSelectedCandidate={
              setSelectedCandidate
            }
          />

        </div>

        {/* Candidate Details */}

        {selectedCandidate && (

          <div className="mt-12 space-y-6">

            <div className="bg-white border rounded-xl shadow-sm p-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <h2 className="text-3xl font-bold">
                    {
                      selectedCandidate.candidate
                    }
                  </h2>

                  <p className="text-muted-foreground mt-1">
                    Selected Candidate Overview
                  </p>

                </div>

                <div className="flex gap-8">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Score
                    </p>

                    <p className="text-2xl font-bold">
                      {
                        selectedCandidate.score
                      }
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Recommendation
                    </p>

                    <p className="text-lg font-semibold">
                      {
                        selectedCandidate
                          .recommendation
                      }
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <CandidateProfile
              candidate={selectedCandidate}
            />

            <div className="grid lg:grid-cols-2 gap-6">

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

      </div>

    </main>
  );
}