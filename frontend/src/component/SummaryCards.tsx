import { Card, CardContent } from "@/components/ui/card";

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
    <div className="grid gap-6 md:grid-cols-4 mb-10">

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Candidates
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalCandidates}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Top Candidate
          </p>

          <h2 className="text-lg font-semibold mt-2">
            {topCandidate?.candidate || "-"}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Highest Score
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {topCandidate?.score || 0}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Rejected
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {rejectedCount}
          </h2>
        </CardContent>
      </Card>

    </div>
  );
}