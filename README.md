# find-gh-commit-emails

[![npm](https://img.shields.io/npm/v/find-gh-commit-emails/latest)](https://www.npmjs.com/package/find-gh-commit-emails)
[![license: MIT](https://img.shields.io/npm/l/find-gh-commit-emails)](https://github.com/reifiedbeans/find-gh-commit-emails/blob/main/LICENSE)

Utilities for finding emails used by a given GitHub user.

## Usage

This package provides an executable that can be invoked directly.

```shell
npx find-gh-commit-emails <username>
```

A utility function is also provided for use in Node.js applications.

```javascript
import { findEmails } from "find-gh-commit-emails";

const username = "<username>";
const token = "[token]";
const options = {
  includeCommitter: true,
};

const emailMap = await findEmails(username, token, options);
```

## License

Licensed under the [MIT License](https://github.com/reifiedbeans/find-gh-commit-emails/blob/main/LICENSE).
