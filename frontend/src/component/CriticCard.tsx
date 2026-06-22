interface CriticCardProps {
  candidate: any;
}

export default function CriticCard({
  candidate,
}: CriticCardProps) {
  return (
    <div className="border p-5 rounded">

      <h3 className="text-xl font-bold mb-4">
        Critic Agent
      </h3>

      <ul className="list-disc ml-6">

        {
          candidate.critique
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
  );
}