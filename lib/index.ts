import { Octokit } from "octokit";

interface Options {
  readonly includeCommitter?: boolean;
}

/**
 * Find emails for a GitHub user
 * @param username a GitHub username
 * @param token a GitHub token
 * @param opts additional options
 */
export async function findEmails(
  username: string,
  token?: string,
  opts?: Options,
) {
  const github = new Octokit({ auth: token });

  const commitData = await github.paginate("GET /search/commits", {
    q: `author:${username}`,
  });

  const emailMap = new Map<string, Set<string>>();

  for (const entry of commitData) {
    const repo = entry.repository.full_name;
    const emails = [entry.commit.author.email];

    if (opts?.includeCommitter && entry.commit.committer?.email) {
      emails.push(entry.commit.committer.email);
    }

    for (const email of emails) {
      let repos = emailMap.get(email);
      if (!repos) {
        repos = new Set();
        emailMap.set(email, repos);
      }
      repos.add(repo);
    }
  }

  const object: { [key: string]: string[] } = {};
  for (const [email, repos] of emailMap) {
    Object.assign(object, {
      [email]: Array.from(repos),
    });
  }
  return object;
}
