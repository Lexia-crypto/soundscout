# SoundScout — iTunes Music Explorer

A client-side Single-Page Application (SPA) built with React. SoundScout lets users discover songs using Apple's public iTunes Search API, filter and sort results, view track details, listen to available promotional previews, and save favorite tracks in the browser.

## Live features

- **Search:** Search songs and artists by keyword.
- **Genre filter:** Filter the current result set by genre.
- **Sorting:** Sort by relevance, song title, artist, or newest release date.
- **Pagination:** Browse results 12 tracks at a time.
- **Favorites:** Save/remove tracks; favorites persist using `localStorage` after refresh.
- **Track details:** Open `/track/:id` for details and an available preview.
- **Loading and error states:** Skeleton loading UI, readable errors, and retry action.
- **Responsive layout:** Desktop and mobile layouts.

## Tech stack

- React 18 + Vite
- React Router DOM
- JavaScript, CSS
- iTunes Search API (no API key required)

## API used

Apple iTunes Search API documentation: https://performance-partners.apple.com/search-api

Search endpoint used by the app:

```text
https://itunes.apple.com/search?term=taylor+swift&media=music&entity=song&country=ph&limit=200
```

Track lookup endpoint:

```text
https://itunes.apple.com/lookup?id=TRACK_ID&country=ph
```

The app uses the Philippines storefront (`country=ph`). Change this in `src/services/itunes.js` if your project needs another storefront. This public endpoint does not require an API key, so no `.env` file is needed for the current implementation.

## Requirements

- Node.js 18 or later (recommended)
- npm
- Git
- GitHub account

## Installation and run locally

```bash
git clone https://github.com/YOUR-USERNAME/itunes-music-explorer.git
cd itunes-music-explorer
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build:

```bash
npm run build
npm run preview
```

## Project routes

| Route | Description |
|---|---|
| `/` | Search/discover music, genre filter, sorting, pagination |
| `/track/:id` | Track details and preview |
| `/favorites` | Locally saved favorite tracks |

## Folder structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── TrackCard.jsx
│   └── TrackGrid.jsx
├── context/
│   └── FavoritesContext.jsx
├── pages/
│   ├── Favorites.jsx
│   ├── Home.jsx
│   └── TrackDetails.jsx
├── services/
│   └── itunes.js
├── App.jsx
├── main.jsx
└── styles.css
```

## GitHub collaboration workflow (required by the project)

**Important:** Do not commit directly to `main`. Each member should work on a feature branch and open a Pull Request (PR). One member can create the repository and invite the partner as a collaborator in GitHub → Settings → Collaborators.

### 1. Create the public GitHub repository

On GitHub, click **New repository**. Name it `itunes-music-explorer`, choose **Public**, and create it. Do not initialize it with a README if you already have this project folder with a README.

### 2. First member: push the starter project on a feature branch

Run these commands inside the project folder:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initialize React iTunes music explorer"
git remote add origin https://github.com/YOUR-USERNAME/itunes-music-explorer.git
git checkout -b feature/project-setup
git push -u origin feature/project-setup
```

Then open GitHub. Select **Compare & pull request**, set the base branch to `main`, review the changes, and create the PR. After review, merge the PR into `main`.

If GitHub rejects the push because the repository already has commits, follow the GitHub instructions to reconcile the histories rather than force-pushing over your partner's work.

### 3. Both members: clone and create separate feature branches

Partner/member 2:

```bash
git clone https://github.com/YOUR-USERNAME/itunes-music-explorer.git
cd itunes-music-explorer
git checkout main
git pull origin main
git checkout -b feature/favorites-ui
```

Member 1 (or any other contributor):

```bash
git checkout main
git pull origin main
git checkout -b feature/search-and-filters
```

Suggested task split (edit names to match your actual pair):

- **Member 1:** API integration, search, genre filtering, sorting, and pagination (`src/services/itunes.js`, `src/pages/Home.jsx`).
- **Member 2:** Favorites UI/persistence, track details, responsive styling, and testing (`src/context/`, `src/pages/Favorites.jsx`, `src/pages/TrackDetails.jsx`, CSS).
- **Both:** Review each other's PRs, test the app, and update documentation. Only claim work each person actually completed.

### 4. Save work and push your feature branch

Use these commands on your own branch:

```bash
git status
git add .
git commit -m "feat: add music search and genre filters"
git push -u origin feature/search-and-filters
```

For the other member, use their branch name and a commit message that accurately describes their work, for example:

```bash
git add .
git commit -m "feat: add persistent favorites collection"
git push -u origin feature/favorites-ui
```

### 5. Open a Pull Request

On GitHub, click **Compare & pull request** for your branch. Confirm:

- Base: `main`
- Compare: your feature branch
- Title explains the feature
- Description lists what changed and how it was tested

Ask your partner to review the PR. Resolve comments, then merge it. Do not merge unrelated unfinished work.

### 6. Update your local main branch after a PR is merged

```bash
git checkout main
git pull origin main
git checkout -b feature/your-next-task
```

If you need to continue an existing feature branch after the latest main changes:

```bash
git checkout your-feature-branch
git merge main
```

### Useful Git commands

```bash
git status                 # see changed files and current branch
git branch                 # list local branches
git branch -a              # list local and remote branches
git switch main             # switch to main
git switch -c feature/name  # create and switch to a new branch
git add .                   # stage changes
git commit -m "fix: correct track detail loading" 
git push                    # push current branch (after upstream is set)
git pull origin main        # get latest main branch
```

Use conventional commit prefixes such as `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, and `chore:`.

## Deployment (optional)

You can deploy the Vite app to GitHub Pages, Netlify, or Vercel. For a first project presentation, Vercel or Netlify is usually the simplest: import the GitHub repository, use `npm run build` as the build command, and `dist` as the output directory. For GitHub Pages with React Router, configure SPA fallback/rewrite behavior so nested routes such as `/favorites` and `/track/:id` work on refresh.

## Apple content note

The API's song previews and artwork are promotional store assets. Keep the relevant iTunes Store link close to the preview/artwork and use these assets to promote the store content, not as standalone entertainment media. Review Apple's current terms before public deployment: https://performance-partners.apple.com/search-api

## Team contributions

Replace this section with your real names and actual contributions before submission:

- **Member 1 — [Full Name]:** [List the features and files personally implemented.]
- **Member 2 — [Full Name]:** [List the features and files personally implemented.]

## Academic submission checklist

- [ ] Public GitHub repository
- [ ] Work completed through feature branches and Pull Requests (no direct commits to `main`)
- [ ] Descriptive conventional commit messages
- [ ] README updated with actual team names and contributions
- [ ] Search, filters/sorting, pagination, and localStorage favorites tested
- [ ] Loading and error states tested
- [ ] All three routes tested
- [ ] `npm run build` completes successfully
- [ ] Submit the repository URL and any required screenshots/demo according to your instructor's instructions
