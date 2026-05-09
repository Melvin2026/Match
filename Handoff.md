# Match Handoff

## Current Product Scope

Match is a multi-agent app for matching customer demand with supplier supply, starting with Singapore senior caregiving.

The current MVP is a three-page assisted marketplace workflow:

- Maestro Dashboard for operational status tracking.
- Customer page for request submission and request history.
- Supplier page for assignment response and fulfilment updates.

The MVP remains human-in-the-loop for external communications, billing, sensitive care decisions, and commercial commitments.

## Current Working Routes

- `/`: Maestro Dashboard.
- `/customer`: Customer request and request history page.
- `/supplier`: Supplier assignment page.
- `/workflows/care-request`: Earlier operator-led care request workflow retained for reference.
- `/api/auth/[...nextauth]`: NextAuth route foundation.

## Current Workflow

1. Customer submits a senior care request at `/customer`.
2. Maestro coordinates Demand, Matching, and Supply agent tasks.
3. Demand Agent structures the customer request.
4. Matching Agent auto-selects the best available phone-verified supplier.
5. Supplier views the assignment at `/supplier`.
6. Supplier accepts or rejects.
7. If supplier rejects, Matching Agent automatically tries the next available supplier.
8. If supplier accepts, request status becomes `Assigned`.
9. Supplier marks the care service fulfilled after actual service completion.
10. Request status becomes `Complete`.
11. Maestro Dashboard reflects request progress, supplier response, pipeline counts, and agent task status.

Status definitions:

- `Assigned`: supplier accepted the assignment.
- `Complete`: actual care service was fulfilled.
- `No match yet`: no further phone-verified supplier is available in the demo pool.

## Deliverables Completed

### App

- Rebuilt `/` into Maestro Dashboard.
- Added `/customer` for customer request intake and past request status.
- Added `/supplier` for supplier assignment accept/reject and fulfilment.
- Added shared local workflow state in `src/lib/match-demo-workflow.ts`.
- Added automatic Matching Agent next-supplier retry after rejection.
- Added dashboard refresh from browser local storage every second, plus focus, visibility, storage, and custom update events.
- Renamed remaining dashboard references from Match Dashboard to Maestro Dashboard.
- Kept older `/workflows/care-request` demo route intact for reference.

### Documentation

Updated:

- `README.md`
- `Match.md`
- `Build_Plan.md`
- `docs/MVP_Plan.md`
- `docs/MVP_Workflow_Care_Request.md`
- `docs/Project_Status.md`
- `docs/ADR-001-tech-stack.md`

The docs now describe the current three-page workflow, current statuses, current test flow, and recommended next build steps.

## Important Files

- `src/app/page.tsx`: Maestro Dashboard.
- `src/app/customer/page.tsx`: Customer page.
- `src/app/supplier/page.tsx`: Supplier page.
- `src/lib/match-demo-workflow.ts`: Current local demo workflow state and transitions.
- `src/app/workflows/care-request/workflow.tsx`: Earlier operator-led workflow.
- `prisma/schema.prisma`: Database schema direction.

## Validation

These checks passed:

```bash
npm run typecheck
npm run lint
npm run build
```

Note: `npm run build` may need to run outside the sandbox because Turbopack can bind a local process or port during CSS processing.

## GitHub Status

Latest pushed commit:

```text
d302f63 Add three-page match workflow
```

Branch:

```text
main
```

Remote:

```text
ssh://git@ssh.github.com:443/Melvin2026/Match.git
```

Local note:

- `Match.mov` is untracked locally and was intentionally left untouched.
- `Match.mov.zip` exists on GitHub and matched the local copy during the last rebase.

## Retest Flow

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/customer
```

Then:

1. Submit a customer request.
2. Open `http://localhost:3000/`.
3. Confirm Maestro Dashboard shows the request and supplier assignment.
4. Open `http://localhost:3000/supplier`.
5. Reject the first assignment.
6. Confirm the next supplier is auto-assigned.
7. Accept the current assignment.
8. Confirm Maestro Dashboard shows `Assigned`.
9. Mark the service fulfilled.
10. Confirm Maestro Dashboard shows `Complete`.

## Recommended Next Build Slice

Best next options:

1. Persist current workflow state to PostgreSQL.
2. Add seeded customer and supplier data.
3. Add role-separated auth and route protection for Maestro, customer, and supplier views.
4. Add supplier profile, availability, and offering management.
5. Add audit events for each request, agent, and supplier status transition.
6. Reconnect credit ledgers and Accounts Agent logic to the new assignment lifecycle.
7. Add human approval queue for external communications, billing, and sensitive care decisions.

Suggested next starting point:

Persist `match.requests.v2` state into Prisma/PostgreSQL models for requests, assignments, agent tasks, and timeline events.
