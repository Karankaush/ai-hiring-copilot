import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EvaluatorCardProps {
  candidate: any;
}

export default function EvaluatorCard({
  candidate,
}: EvaluatorCardProps) {
  return (
    <Card className="border-green-200">

      <CardHeader>

        <CardTitle className="text-green-700">
          ✅ Evaluator Agent
        </CardTitle>

      </CardHeader>

      <CardContent>

        <ul className="space-y-3">

          {candidate.evaluation?.strengths?.map(
            (
              item: string,
              index: number
            ) => (

              <li
                key={index}
                className="border rounded-lg p-3 bg-green-50"
              >
                {item}
              </li>

            )
          )}

        </ul>

      </CardContent>

    </Card>
  );
}