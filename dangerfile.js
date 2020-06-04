import { danger, fail, warn } from 'danger';
import scopes from './commitlint.scopes';

const titlePattern = /^(\w+)\(([a-z-]+)\): (.+)$/;
const branchPattern = /(?:(feature|hotfix)\/([a-z]{1}[a-z\-0-9.]+)|(release|support|staging)\/[0-9]+\.[0-9]+\.[0-9]+)/;

const pr = danger.github.pr;
const isBotPr = pr.user.type === 'Bot';

/**
 * Rules
 */

if (!isBotPr) {
  // Check branch naming
  if (!branchPattern.test(pr.head.ref)) {
    fail(
      'The branch name needs to be in format: `type/TICKET-1234-description` for types `feature` or `hotfix`. For `release`, `support`, or `staging` the forward slash needs to be followed by a semver version number.'
    );
  }

  // Check PR title
  if (!titlePattern.test(pr.title)) {
    fail(
      'The PR title needs to be in format: `type(scope): TICKET-1234 Description`. You can replace ticket id with `=>` for releases.'
    );
  } else {
    const titleParts = pr.title.match(titlePattern);

    if (!titleParts || titleParts.length < 3) {
      fail('Unexpected PR title parsing error');
    } else {
      const scope = titleParts[2];

      if (!scopes.includes(scope)) {
        fail(
          'Scope in PR title must be one included in the wc.config.js file of the project.'
        );
      }
    }
  }
}

// Make sure someone is assigned to merge
if (pr.assignee === null) {
  warn(
    'Please assign someone to merge this PR, and optionally include people who should review.'
  );
}
