interface EvaluatorCardProps {
  candidate: any;
}

export default function EvaluatorCard({
  candidate,
}: EvaluatorCardProps) {
  return (
    <div className="border p-5 rounded">

      <h3 className="text-xl font-bold mb-4">
        Evaluator Agent
      </h3>

      <ul className="list-disc ml-6">

        {
          candidate.evaluation
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
  );
}