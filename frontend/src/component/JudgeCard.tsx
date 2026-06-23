import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface JudgeCardProps {
  candidate: any;
}

export default function JudgeCard({
  candidate,
}: JudgeCardProps) {

  const getBadgeVariant = () => {

    switch (
      candidate.recommendation
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

    <Card className="mt-6">

      <CardHeader>

        <CardTitle>
          ⚖️ Judge Agent
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="flex items-center gap-4 mb-6">

          <span className="font-semibold">
            Final Recommendation:
          </span>

          <Badge
            variant={getBadgeVariant()}
          >
            {
              candidate.recommendation
            }
          </Badge>

        </div>

        <div className="border rounded-xl p-4 bg-slate-50">

          <h4 className="font-semibold mb-2">
            Decision Reasoning
          </h4>

          <p className="leading-7 text-muted-foreground">
            {
              candidate.judgment
                ?.reasoning
            }
          </p>

        </div>

      </CardContent>

    </Card>

  );
}