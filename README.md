# Dance Central

A collaborative **React UI/UX app** for organizing dance-team rehearsals and creative planning. The project explores how a single interface can support choreography blocking, casting, and outfit coordination.

> **Project scope:** This repository contains the frontend prototype, not a production-ready application. It does **not** include the later experimental machine-learning choreography search work.

## Features

- **Choreography blocking:** Upload reference images, browse a carousel, play music, and create notes with timestamps for rehearsal planning.
- **Casting:** Upload and preview media; organize casting notes with editable, renamable, and pinnable tabs.
- **Outfit planning:** Review, select, approve, and decline outfit references; collect inspiration images and save Pinterest links.
- **Reusable interface components:** Navigation, buttons, text fields, dropdowns, media uploading, and other UI elements.

Some features are prototypes or demonstrations rather than fully integrated workflows. The previous third-party AI outfit-inspiration integration is disabled; image uploads and Pinterest linking remain available.

## Tech stack

**React 19 · JavaScript · CSS · Vite · React Router · react-color**

## Run locally

Requires Node.js and npm.

```bash
git clone https://github.com/elise-chang/Dance-Central.git
cd Dance-Central/Dance-Central-App
npm install
npm run dev
```

Open the local URL shown by Vite. The app's default route redirects to `/home`.

To create a production build locally, use:

```bash
npm run build
```

## My contributions — Elise Chang

I contributed to the collaborative prototype's frontend development, including:

- Building and iterating on the **outfits page**, including selection and approval interactions and inspiration layouts.
- Developing and refining **shared interface components**, particularly buttons and textboxes.
- Improving **homepage layout and UI styling**, and integrating changes with teammates.

These contributions are reflected in the original repository's [commit history](https://github.com/SyreneMLA11/Dance-Central/commits?author=elise-chang).

## Collaboration and attribution

Dance Central was created as a **team project**. This repository is a [fork of the original team's repository](https://github.com/SyreneMLA11/Dance-Central); the original contributors and commit history are preserved. The descriptions above distinguish my contributions from the team's broader work.

## Current limitations

- Frontend demonstration only; authentication, persistence, and some placeholder pages are not implemented as production features.
- Some images and media are third-party/test assets. Their redistribution rights should be reviewed before reuse or deployment.
- Screenshots, a deployment link, and a full end-to-end test run have not yet been added.
