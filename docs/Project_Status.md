# Match Project Status

## Current Status

Match now has a working Next.js MVP scaffold and a first interactive workflow for the initial Singapore caregiving use case.

The app currently supports:

- Internal operator dashboard.
- Stateful senior care request workflow using browser local storage for the MVP demo.
- Matching a senior care request to a phone-verified freelance caregiver.
- Manual-copy email drafts for customer and supplier communication.
- Customer and supplier credit ledgers that update after match approval.
- Credit top-ups, first-match free credits, and match usage entries.
- Prisma schema direction for persistent database implementation.
- NextAuth foundation for simple operator authentication.

## Current MVP Decisions

- Geography: Singapore.
- Senior Living category: caregiving.
- Customer persona: seniors themselves.
- Supplier persona: freelance caregivers.
- Intake model: invite-only.
- Supplier verification: valid phone number.
- Communication channel: email drafts copied manually by the operator.
- First commercial offer: first matching service is free for customers and suppliers.
- Tech stack: Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL direction, NextAuth.

## Working Routes

- `/`: Internal dashboard.
- `/workflows/care-request`: Care request to caregiver matching workflow.
- `/api/auth/[...nextauth]`: NextAuth route foundation.

## Care Request Workflow

The workflow demonstrates:

1. Log a senior care request.
2. Maestro routes work to Demand, Supply, Matching, and Accounts agents.
3. Matching Agent scores eligible freelance caregivers.
4. Operator approves the recommended match.
5. Customer and supplier email drafts appear for manual copying.
6. Customer and supplier credit accounts are updated with usage transactions.
7. Dashboard reads the saved workflow and updates request, match, approval, task, and credit sections.

## Dashboard Update Behavior

The current MVP stores workflow results in browser local storage under:

`match.careWorkflows.v1`

After the operator logs and matches a care request:

- The dashboard shows the new senior request in `Customer demands`.
- The dashboard shows the recommended caregiver in `Match recommendations`.
- The dashboard shows pending approval items while the workflow is matched but not approved.
- After approval, the dashboard shows updated customer and supplier credit balances.
- The `Reset demo` button clears locally stored workflow data.

## Credit Account Model

The MVP now models customer and supplier credit accounts.

Tracked concepts:

- Credit owner type: customer or supplier.
- Balance.
- Top-up transactions.
- First-match free credits.
- Usage transactions linked to a match.

The Prisma schema includes:

- `CreditAccount`
- `CreditTransaction`
- `CreditOwnerType`
- `CreditTransactionType`

## Web Preview Test

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/workflows/care-request
```

Use case test:

1. Open `/workflows/care-request`.
2. Review or edit the senior care request.
3. Click `Log request`.
4. Click `Run Matching Agent`.
5. Open `/` and confirm the dashboard now shows the logged request and match-ready status.
6. Return to `/workflows/care-request`.
7. Review the caregiver recommendation.
8. Click `Approve match and update credits`.
9. Confirm email drafts are visible.
10. Confirm customer and supplier credit ledger balances decrease by 1 usage credit.
11. Open `/` again and confirm the dashboard reflects the approved match and updated credit balances.

## Verification Commands

Run:

```bash
npx prisma validate
npm run typecheck
npm run lint
npm run build
```

Current status: these checks pass.

## Next Build Steps

Recommended next slice:

1. Persist browser-stored care requests, caregivers, matches, drafts, and credit ledger entries to PostgreSQL.
2. Add forms for invite-only customer and caregiver intake.
3. Add a real operator approval queue.
4. Add basic NextAuth sign-in UI.
5. Add manual-copy buttons for email drafts.
6. Add simple seeded data for local development.
