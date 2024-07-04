#!/usr/bin/env node
import { program } from "@commander-js/extra-typings";
import { findEmails } from "../lib/index.ts";

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
  .showHelpAfterError()
  .action(async (username, opts) => {
    const token = process.env["GITHUB_TOKEN"];
    const emailsMap = await findEmails(username, token, opts);
    console.log(JSON.stringify(emailsMap, null, 2));
  });

program.parse(process.argv);
