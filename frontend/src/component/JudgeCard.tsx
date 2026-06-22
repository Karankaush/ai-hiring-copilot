interface JudgeCardProps {
  candidate: any;
}

export default function JudgeCard({
  candidate,
}: JudgeCardProps) {
  return (
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
          candidate.recommendation
        }

      </p>

      <p className="mt-4">

        {
          candidate.judgment
            ?.reasoning
        }

      </p>

    </div>
  );
}