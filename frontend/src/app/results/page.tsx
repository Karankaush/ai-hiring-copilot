"use client";

import { useState } from "react";
import { useHiringStore } from "@/store/useHiringStore";

export default function ResultsPage() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<any>(null);

  const results = useHiringStore(
    (state) => state.results
  );

  const rankings = results?.rankings || [];
  const totalCandidates = rankings.length;

const topCandidate = rankings[0];

const rejectedCount =
  rankings.filter(
    (candidate: any) =>
      candidate.recommendation
        .toLowerCase()
        .includes("reject")
  ).length;
 

  return (
    <main className="max-w-6xl mx-auto p-8">

        <div className="grid grid-cols-4 gap-4 mb-8">

  <div className="border p-4 rounded">
    <p className="font-semibold">
      Total Candidates
    </p>

    <p className="text-2xl">
      {totalCandidates}
    </p>
  </div>

  <div className="border p-4 rounded">
    <p className="font-semibold">
      Top Candidate
    </p>

    <p>
      {
        topCandidate?.candidate
      }
    </p>
  </div>

  <div className="border p-4 rounded">
    <p className="font-semibold">
      Highest Score
    </p>

    <p className="text-2xl">
      {topCandidate?.score}
    </p>
  </div>

  <div className="border p-4 rounded">
    <p className="font-semibold">
      Rejected
    </p>

    <p className="text-2xl">
      {rejectedCount}
    </p>
  </div>

</div>


      <h1 className="text-4xl font-bold mb-8">
        Candidate Rankings
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-3">
              Rank
            </th>

            <th className="border p-3">
              Candidate
            </th>

            <th className="border p-3">
              Score
            </th>

            <th className="border p-3">
              Recommendation
            </th>
          </tr>
        </thead>

        <tbody>
          {rankings.map(
            (candidate: any) => (
              <tr
                key={candidate.rank}
                onClick={() => {
                  const judgment =
                    results.judgments.find(
                      (j: any) =>
                        j.candidate ===
                        candidate.candidate
                    );

                  const evaluation =
                    results.evaluations.find(
                      (e: any) =>
                        e.candidate ===
                        candidate.candidate
                    );

                  const critique =
                    results.critiques.find(
                      (c: any) =>
                        c.candidate ===
                        candidate.candidate
                    );

                  setSelectedCandidate({
                    ...candidate,
                    judgment,
                    evaluation,
                    critique,
                  });
                }}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border p-3">
                  {candidate.rank}
                </td>

                <td className="border p-3">
                  {candidate.candidate}
                </td>

                <td className="border p-3">
                  {candidate.score}
                </td>

                <td className="border p-3">
                  {
                    candidate.recommendation
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {selectedCandidate && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Candidate Details
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {
              selectedCandidate.candidate
            }
          </p>

          <p>
            <strong>Score:</strong>{" "}
            {selectedCandidate.score}
          </p>

          <p>
            <strong>
              Recommendation:
            </strong>{" "}
            {
              selectedCandidate.recommendation
            }
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

  {/* Evaluator */}

  <div className="border p-5 rounded">

    <h3 className="text-xl font-bold mb-4">
      Evaluator Agent
    </h3>

    <ul className="list-disc ml-6">

      {
        selectedCandidate
          .evaluation
          ?.strengths
          ?.map(
            (
              item: string,
              index: number
            ) => (

              <li key={index}>
                {item}
              </li>

                )
            )
        }

        </ul>

    </div>

    {/* Critic */}

    <div className="border p-5 rounded">

        <h3 className="text-xl font-bold mb-4">
        Critic Agent
        </h3>

        <ul className="list-disc ml-6">

        {
            selectedCandidate
            .critique
            ?.concerns
            ?.map(
                (
                item: string,
                index: number
                ) => (

                <li key={index}>
                    {item}
                </li>

                    )
                )
        }

        </ul>

    </div>

    </div>




        <div className="border rounded p-5 mt-6">

            <h3 className="text-xl font-bold mb-4">
                Judge Agent
            </h3>

            <p>

                <strong>
                Final Recommendation:
                </strong>

                {" "}

                {
                selectedCandidate
                    .recommendation
                }

            </p>

            <p className="mt-4">

                {
                selectedCandidate
                    .judgment
                    ?.reasoning
                }

            </p>

            </div>


        </div>
      )}
    </main>
  );
}