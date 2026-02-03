import { Badge, Card, CardBody } from "@/components/ui";
import { User } from "@/types";
import Link from "next/link";

export default async function AutherInfoCard({ author }: { author: User }) {
  return (
      <Card>
        <CardBody className="p-6">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
            About the Author
          </h2>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shrink-0">
              {author.name.charAt(0)}
            </div>
            <div className="flex-1">
              <Link
                href={`/users/${author.id}`}
                className="font-semibold text-neutral-800 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {author.name}
              </Link>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                {author.company.name} • {author.email.toLowerCase()}
              </p>
              <p className="text-sm italic text-neutral-500 dark:text-neutral-400">
                &quot;{author.company.catchPhrase}&quot;
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="default">{author.website}</Badge>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
  );
}
