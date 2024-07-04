#!/usr/bin/env node
import { program } from "commander";
import { Octokit } from "octokit";

program
  .name("find-gh-commit-emails")
  .description(
    "Search for emails used by a given GitHub user. " +
      "Setting the GITHUB_TOKEN environment variable to a valid GitHub personal " +
      "access token will enable searching in non-public repositories.",
  )
  .argument("username", "GitHub username to find emails for")
  .option("--include-committer", "include committer email in results", false)
  .configureHelp({ helpWidth: 80 })
  .showHelpAfterError();
program.parse(process.argv);

const [username] = program.args;
const { includeCommitter } = program.opts();

const token = process.env["GITHUB_TOKEN"];

const github = new Octokit({ auth: token });

const commitData = await github.paginate("GET /search/commits", {
  q: `author:${username}`,
});

/** @type {Map<string, Set<string>>} */
const emailMap = new Map();

for (const entry of commitData) {
  const repo = entry.repository.full_name;
  const emails = [entry.commit.author.email];

  if (includeCommitter) {
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

const json = JSON.stringify(
  Object.fromEntries(emailMap),
  (key, value) => {
    if (value instanceof Set) return Array.from(value);
    else return value;
  },
  2,
);
console.log(json);
