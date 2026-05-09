# Match

Match is a multi-agent app for matching customer demand with supplier supply, starting with Senior Living goods and services.

The product is designed as a human-in-the-loop assisted marketplace. Agents prepare recommendations, outreach drafts, onboarding drafts, follow-ups, and billing drafts, while humans approve external communications and commercial actions.

## Current MVP Snapshot

The current build is a Next.js MVP for Singapore caregiving matches.

Current working routes:

- `/`: Maestro Dashboard for request progress, customer status, supplier assignment status, and agent task status.
- `/customer`: Customer page to log new care requests and view past requests.
- `/supplier`: Supplier page to accept or reject assignments and mark accepted care services fulfilled.
- `/workflows/care-request`: Earlier care request workflow demo retained for reference.

Confirmed MVP choices:

- Geography: Singapore.
- First category: caregiving.
- First customer persona: seniors themselves.
- First supplier persona: freelance caregivers.
- Intake model: invite-only.
- Supplier verification: valid phone number.
- Communication: app status updates first; email draft/human approval patterns remain planned for external communication.
- Auth foundation: NextAuth.
- Credit model: customer and supplier accounts track top-ups, first-match free credits, and usage.
- Dashboard update model: browser local storage stores demo requests; the Maestro Dashboard refreshes from this state as customers submit requests and suppliers respond.

## Current Three-Page Workflow

1. Customer logs a care request at `/customer`.
2. Maestro coordinates Demand, Matching, and Supply agent tasks.
3. Matching Agent auto-selects the best available phone-verified supplier.
4. Supplier views the assignment at `/supplier` and accepts or rejects.
5. If supplier rejects, Matching Agent automatically tries the next available supplier.
6. If supplier accepts, request status becomes `Assigned`.
7. When the actual care service is fulfilled, supplier marks it fulfilled and request status becomes `Complete`.
8. Maestro Dashboard reflects request progress, supplier assignment status, and agent task status throughout.

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
- `src/app/page.tsx`: Maestro Dashboard.
- `src/app/customer/page.tsx`: Customer request and request history page.
- `src/app/supplier/page.tsx`: Supplier assignment page.
- `src/app/workflows/care-request/`: Care request workflow UI.
- `src/lib/match-demo-workflow.ts`: Current three-page demo workflow logic and local storage state.
- `src/lib/care-workflow.ts`: Earlier demo workflow logic for matching and credits.
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
http://localhost:3000/customer
http://localhost:3000/supplier
```

Basic use-case test:

1. Open `/customer`.
2. Submit a care request.
3. Open `/` and confirm Maestro Dashboard shows the request as awaiting supplier response.
4. Open `/supplier`.
5. Accept the assignment and confirm the dashboard shows the request as `Assigned`.
6. Mark the service fulfilled and confirm the dashboard shows the request as `Complete`.

Break handoff:

- Start testing at `http://localhost:3000/customer`.
- The dashboard should update after the request is logged, assigned, accepted, and fulfilled.
- Use `Reset demo` on the dashboard before rerunning the flow.
