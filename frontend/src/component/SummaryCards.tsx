interface SummaryCardsProps {
  totalCandidates: number;
  topCandidate: any;
  rejectedCount: number;
}

export default function SummaryCards({
  totalCandidates,
  topCandidate,
  rejectedCount,
}: SummaryCardsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">

      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <p className="text-sm text-gray-500">
          Total Candidates
        </p>

        <p className="text-3xl font-bold">
          {totalCandidates}
        </p>
      </div>

      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <p className="text-sm text-gray-500">
          Top Candidate
        </p>

        <p className="font-semibold">
          {topCandidate?.candidate}
        </p>
      </div>

      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <p className="text-sm text-gray-500">
          Highest Score
        </p>

        <p className="text-3xl font-bold">
          {topCandidate?.score}
        </p>
      </div>

      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <p className="text-sm text-gray-500">
          Rejected
        </p>

        <p className="text-3xl font-bold">
          {rejectedCount}
        </p>
      </div>

    </div>
  );
}