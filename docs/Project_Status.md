# Match Project Status

## Current Status

Match now has a working Next.js MVP scaffold with a three-page Singapore caregiving workflow.

Current handoff:

- Customer page logs senior care requests.
- Matching Agent auto-selects the best available phone-verified supplier.
- Supplier page lets suppliers accept, reject, or mark accepted work fulfilled.
- If a supplier rejects, Matching Agent automatically tries the next available supplier.
- Maestro Dashboard tracks request progress, supplier assignment status, and agent task status.
- Maestro Dashboard refreshes browser-stored workflow state continuously and on focus/storage changes.

The app currently supports:

- Maestro Dashboard for operational status tracking.
- Customer request and request history page.
- Supplier assignment page.
- Stateful local demo workflow using browser local storage.
- Rules-based supplier scoring.
- Automatic next-supplier retry after rejection.
- Request statuses where `Assigned` means supplier accepted and `Complete` means actual care service fulfilled.
- Prisma schema direction for persistent database implementation.
- NextAuth foundation for simple operator authentication.
- Earlier operator-led care request workflow retained at `/workflows/care-request`.

## Current MVP Decisions

- Geography: Singapore.
- Senior Living category: caregiving.
- Customer persona: seniors themselves.
- Supplier persona: freelance caregivers.
- Intake model: invite-only.
- Supplier verification: valid phone number.
- Matching behavior: Matching Agent auto-selects the best available supplier.
- Rejection behavior: Matching Agent auto-tries the next available supplier.
- Assignment status: `Assigned` means supplier accepted.
- Completion status: `Complete` means actual care service fulfilled.
- Tech stack: Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL direction, NextAuth.

## Working Routes

- `/`: Maestro Dashboard.
- `/customer`: Customer request and request history page.
- `/supplier`: Supplier assignment page.
- `/workflows/care-request`: Earlier care request workflow demo.
- `/api/auth/[...nextauth]`: NextAuth route foundation.

## Current Three-Page Workflow

1. Customer logs a care request at `/customer`.
2. Maestro coordinates Demand, Matching, and Supply agent tasks.
3. Matching Agent auto-selects a phone-verified supplier.
4. Supplier responds at `/supplier`.
5. If supplier rejects, Matching Agent assigns the next available supplier.
6. If supplier accepts, request status becomes `Assigned`.
7. Supplier marks the care service fulfilled after actual completion.
8. Request status becomes `Complete`.
9. Maestro Dashboard shows request progress, supplier response, next action, pipeline counts, and agent task status.

## Dashboard Update Behavior

The current MVP stores the three-page workflow under:

`match.requests.v2`

The Maestro Dashboard shows:

- Open requests.
- Requests awaiting supplier response.
- Assigned requests.
- Complete requests.
- Customer, request, supplier, progress, next action, and updated timestamp.
- Supplier assignment response history.
- Maestro, Demand, Matching, and Supply task status.

The dashboard refreshes from local storage every second, and also on focus, visibility, storage, and custom workflow update events.

The `Reset demo` button clears locally stored request state.

## Web Preview Test

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/customer
http://localhost:3000/supplier
```

Use case test:

1. Open `/customer`.
2. Submit a care request.
3. Open `/` and confirm the request appears with a supplier assignment.
4. Open `/supplier`.
5. Reject the assignment and confirm the next available supplier is assigned.
6. Accept the assignment and confirm `/` shows `Assigned`.
7. Mark the service fulfilled and confirm `/` shows `Complete`.

Expected successful result:

- Maestro Dashboard updates after request submission.
- Supplier assignment records appear.
- Supplier rejection creates a new assignment for the next available supplier.
- Supplier acceptance changes the request to `Assigned`.
- Fulfilment changes the request to `Complete`.
- Agent task status reflects Maestro, Demand, Matching, and Supply progress.

## Verification Commands

Run:

```bash
npx prisma validate
npm run typecheck
npm run lint
npm run build
```

Current status: `npm run typecheck`, `npm run lint`, and `npm run build` pass. `npm run build` may require running outside the sandbox because Turbopack can bind a local process/port during CSS processing.

## Next Build Steps

Recommended next slice:

1. Persist browser-stored requests, supplier assignments, task statuses, and timeline events to PostgreSQL.
2. Add seeded local data for customers and suppliers.
3. Add invite-only sign-in and route-specific experiences for customers, suppliers, and operators.
4. Add a real human approval queue for external communications, billing, and sensitive care decisions.
5. Reconnect credit ledgers and Accounts Agent logic to the new assignment lifecycle.
6. Add supplier profile and availability management.
