import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CriticCardProps {
  candidate: any;
}

export default function CriticCard({
  candidate,
}: CriticCardProps) {
  return (
    <Card className="border-red-200">

      <CardHeader>

        <CardTitle className="text-red-700">
          ❌ Critic Agent
        </CardTitle>

      </CardHeader>

      <CardContent>

        <ul className="space-y-3">

          {candidate.critique?.concerns?.map(
            (
              item: string,
              index: number
            ) => (

              <li
                key={index}
                className="border rounded-lg p-3 bg-red-50"
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