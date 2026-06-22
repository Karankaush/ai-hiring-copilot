interface RankingTableProps {
  rankings: any[];
  results: any;
  setSelectedCandidate: any;
}

export default function RankingTable({
  rankings,
  results,
  setSelectedCandidate,
}: RankingTableProps) {
  return (
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

                const resume =
                  results.resumes.find(
                    (r: any) =>
                      r.name ===
                      candidate.candidate
                  );

                setSelectedCandidate({
                  ...candidate,
                  judgment,
                  evaluation,
                  critique,
                  resume,
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
  );
}