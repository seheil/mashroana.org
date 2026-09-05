# Deployment Notes

- GitHub main now points to commit `200f4257` in `seheil/mashroana.org`.
- Vercel project `mashrouana-app` was disconnected from the old repository `seheil/mashroana-app` after user confirmation.
- GitHub App installation `Vercel` currently has access to only `seheil/mashroana-app` and `seheil/basaaer-learning`.
- The next required action is to add `seheil/mashroana.org` to the selected repositories in GitHub App settings, save, then return to Vercel and connect the repository.
- The GitHub App has read/write deployment and repository permissions already granted.

## Latest verification

- Vercel project settings now use `Other`, build command `pnpm build`, and output directory `dist/public`.
- Vercel is connected to `seheil/mashroana.org` and a new deployment from commit `0b596a3` reached Ready.
- The production URL `https://mashrouana-fng0j1tp5-seheils-projects.vercel.app/` loaded the Arabic site successfully.
- The first production CMS check exposed a YAML syntax error at line 24 caused by Arabic commas inside YAML flow maps.
- Replaced all `، name:` separators with `, name:` in `client/public/cms/config.yml`; local PyYAML validation passed, and `pnpm check`, `pnpm test -- --run` (124 tests), and `pnpm build` passed.
- Fix commit `f45bf4d` was pushed to `seheil/mashroana.org/main`; Vercel deployment from that commit was still Building at the last check.
