module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-push':
      'cross-env-shell sh scripts/ensure-git-clean.sh && npm test && cross-env-shell echo $HUSKY_GIT_STDIN | cross-env-shell sh scripts/hooks/pre-push-lfs.sh $HUSKY_GIT_PARAMS',
    'post-checkout':
      'cross-env-shell echo $HUSKY_GIT_STDIN | cross-env-shell sh scripts/hooks/post-checkout-lfs.sh $HUSKY_GIT_PARAMS',
    'post-commit':
      'cross-env-shell echo $HUSKY_GIT_STDIN | cross-env-shell sh scripts/hooks/post-commit-lfs.sh $HUSKY_GIT_PARAMS',
    'post-merge':
      'cross-env-shell echo $HUSKY_GIT_STDIN | cross-env-shell sh scripts/hooks/post-merge-lfs.sh $HUSKY_GIT_PARAMS',
  },
};
