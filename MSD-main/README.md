# MERN Project (MSD)

This repository contains a MERN stack application with separate `frontend/` (React + Vite) and `backend/` (Node + Express + Mongoose) folders.

Quick steps to push this project to GitHub and get CI running:

1. Initialize git (if not already):

```powershell
cd C:\Users\Dell\OneDrive\Desktop\MSD
git init
git add .
git commit -m "chore: initial commit"
```

2. Create a GitHub repository:
- Option A (recommended): use the GitHub CLI (install from https://cli.github.com/):

```powershell
gh repo create <owner>/<repo-name> --public --source=. --remote=origin --confirm
git push -u origin main
```

- Option B: create the repo on github.com, then add remote:

```powershell
git remote add origin https://github.com/<owner>/<repo-name>.git
git branch -M main
git push -u origin main
```

3. Secrets & envs
- Do NOT commit `.env` files. Add production secrets to GitHub repository Settings → Secrets & variables → Actions (for workflows) and Repository Secrets (for deployments).

4. CI (optional)
- A basic GitHub Actions workflow is included at `.github/workflows/ci.yml`. It installs dependencies and runs basic checks for both `backend/` and `frontend/` on pushes and PRs.

5. Common troubleshooting
- If push is rejected because the remote has history: run `git pull --rebase origin main` then `git push`.
- If files are large (>100MB), use Git LFS.

If you want, I can: initialize git, create the initial commit, and (if you authorize) create the remote with the GitHub CLI — or I can give exact commands you can run. Tell me which you prefer.
