# Match

Match is a multi-agent app for matching customer demand with supplier supply, starting with Senior Living goods and services.

The product is designed as a human-in-the-loop assisted marketplace. Agents prepare recommendations, outreach drafts, onboarding drafts, follow-ups, and billing drafts, while humans approve external communications and commercial actions.

## Current MVP Snapshot

The current build is a Next.js MVP for Singapore caregiving matches.

Current working routes:

- `/`: Internal operator dashboard.
- `/workflows/care-request`: MVP use case to log a senior care request, match it to a freelance caregiver, generate manual-copy email drafts, and update customer and supplier credit ledgers.

Confirmed MVP choices:

- Geography: Singapore.
- First category: caregiving.
- First customer persona: seniors themselves.
- First supplier persona: freelance caregivers.
- Intake model: invite-only.
- Supplier verification: valid phone number.
- Communication: email drafts manually copied by the operator.
- Auth foundation: NextAuth.
- Credit model: customer and supplier accounts track top-ups, first-match free credits, and usage.

## Repository Purpose

This repository will hold the code for Match, plus working documentation for the product, agents, architecture, and implementation plan.

## Current Documentation

- [Match.md](Match.md): Product concept and agent roles.
- [Build_Plan.md](Build_Plan.md): Proposed approach to build the app.
- [docs/MVP_Plan.md](docs/MVP_Plan.md): Focused MVP build plan.
- [docs/MVP_Workflow_Care_Request.md](docs/MVP_Workflow_Care_Request.md): First working MVP care request workflow.
- [docs/Project_Status.md](docs/Project_Status.md): Current status, test notes, and next build steps.

## Project Structure

- `src/`: Application source code.
- `src/app/page.tsx`: Internal operator dashboard.
- `src/app/workflows/care-request/`: Care request workflow UI.
- `src/lib/care-workflow.ts`: Demo workflow logic for matching and credits.
- `prisma/schema.prisma`: Database schema direction.
- `docs/`: Supporting technical and product documentation.
- `Match.md`: Main product specification.
- `Build_Plan.md`: Build plan and roadmap.

## Run Locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/workflows/care-request
```
