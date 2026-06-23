import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

interface CandidateProfileProps {
  candidate: any;
}

export default function CandidateProfile({
  candidate,
}: CandidateProfileProps) {
  return (
    <Card className="mt-6">

      <CardHeader>

        <CardTitle>
          Candidate Profile
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div>

          <h4 className="font-semibold text-lg mb-3">
            Skills
          </h4>

          <div className="flex flex-wrap gap-2">

            {candidate.resume?.skills?.map(
              (
                skill: string,
                index: number
              ) => (

                <span
                  key={index}
                  className="px-3 py-1 rounded-full border text-sm"
                >
                  {skill}
                </span>

              )
            )}

          </div>

        </div>

        <Separator className="my-6" />

        <div>

          <h4 className="font-semibold text-lg mb-3">
            Projects
          </h4>

          <ul className="space-y-2">

            {candidate.resume?.projects?.map(
              (
                project: string,
                index: number
              ) => (

                <li
                  key={index}
                  className="border rounded-lg p-3"
                >
                  {project}
                </li>

              )
            )}

          </ul>

        </div>

      </CardContent>

    </Card>
  );
}