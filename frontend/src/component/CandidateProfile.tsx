interface CandidateProfileProps {
  candidate: any;
}

export default function CandidateProfile({
  candidate,
}: CandidateProfileProps) {
  return (
    <div className="border rounded p-5 mt-6">

      <h3 className="text-xl font-bold mb-4">
        Candidate Profile
      </h3>

      <div className="mb-6">

        <h4 className="font-semibold mb-2">
          Skills
        </h4>

        <ul className="list-disc ml-6">

          {
            candidate.resume?.skills?.map(
              (
                skill: string,
                index: number
              ) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )
          }

        </ul>

      </div>

      <div>

        <h4 className="font-semibold mb-2">
          Projects
        </h4>

        <ul className="list-disc ml-6">

          {
            candidate.resume?.projects?.map(
              (
                project: string,
                index: number
              ) => (
                <li key={index}>
                  {project}
                </li>
              )
            )
          }

        </ul>

      </div>

    </div>
  );
}