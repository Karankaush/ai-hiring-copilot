import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const getBadgeVariant = (
    recommendation: string
  ) => {

    switch (
      recommendation
        ?.toLowerCase()
    ) {
      case "strong hire":
        return "default";

      case "hire":
        return "secondary";

      case "consider":
        return "outline";

      case "reject":
        return "destructive";

      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Rank
            </TableHead>

            <TableHead>
              Candidate
            </TableHead>

            <TableHead>
              Score
            </TableHead>

            <TableHead>
              Recommendation
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {rankings.map(
            (
              candidate: any
            ) => (

              <TableRow
                key={
                  candidate.rank
                }
                className="cursor-pointer"
                onClick={() => {

                  const judgment =
                    results.judgments.find(
                      (
                        j: any
                      ) =>
                        j.candidate ===
                        candidate.candidate
                    );

                  const evaluation =
                    results.evaluations.find(
                      (
                        e: any
                      ) =>
                        e.candidate ===
                        candidate.candidate
                    );

                  const critique =
                    results.critiques.find(
                      (
                        c: any
                      ) =>
                        c.candidate ===
                        candidate.candidate
                    );

                  const resume =
                    results.resumes.find(
                      (
                        r: any
                      ) =>
                        r.name ===
                        candidate.candidate
                    );

                  setSelectedCandidate(
                    {
                      ...candidate,
                      judgment,
                      evaluation,
                      critique,
                      resume,
                    }
                  );
                }}
              >

                <TableCell>
                  #{candidate.rank}
                </TableCell>

                <TableCell className="font-medium">
                  {
                    candidate.candidate
                  }
                </TableCell>

                <TableCell>
                  {
                    candidate.score
                  }
                </TableCell>

                <TableCell>

                  <Badge
                    variant={getBadgeVariant(
                      candidate.recommendation
                    )}
                  >
                    {
                      candidate.recommendation
                    }
                  </Badge>

                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </div>
  );
}