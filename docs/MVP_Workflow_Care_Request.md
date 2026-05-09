# MVP Workflow: Care Request To Caregiver Match

## Purpose

This workflow covers the first Match MVP use case:

1. Log a senior care request.
2. Route the request through the agent team.
3. Match the request to a valid freelance caregiver.
4. Prepare customer and supplier email drafts for manual operator sending.
5. Update customer and supplier credit accounts when the match is approved.

## Current App Route

`/workflows/care-request`

The dashboard at `/` links to this workflow through the `New care workflow` and `Open workflow` actions.

## Workflow Steps

### 1. Log Care Request

The operator records the senior's caregiving need, including:

- Senior name
- Email
- Phone
- Area
- Care need
- Urgency
- Schedule
- Notes and constraints

The Demand Agent structures the request for matching.

### 2. Create Agent Tasks

The Maestro Agent coordinates the task flow:

- Demand Agent checks the customer request.
- Supply Agent confirms eligible freelance caregivers.
- Matching Agent scores caregivers.
- Accounts Agent prepares credit account updates.

### 3. Recommend Caregiver

The Matching Agent considers only freelance caregivers with valid phone numbers.

The current V1 matching logic scores fit using:

- Area
- Availability
- Caregiving service fit
- Language or preference fit
- Phone verification status

### 4. Approve Match

The operator approves the recommendation before:

- Sharing customer details with the caregiver.
- Sharing caregiver details with the customer.
- Copying email drafts into an external email client.
- Recording match-related credit usage.

### 5. Update Credit Accounts

Customer and supplier accounts track:

- Top-ups
- First-match free credits
- Usage when a match is approved

In the current demo workflow, approval applies:

- Customer usage: 1 matching credit
- Supplier usage: 1 qualified lead credit

## Database Direction

The Prisma schema now includes:

- `CreditAccount`
- `CreditTransaction`
- `CreditOwnerType`
- `CreditTransactionType`

These records will support customer and supplier account balances once the app is connected to PostgreSQL.

## Web Preview Test

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000/workflows/care-request`.
3. Click `Log request`.
4. Click `Run Matching Agent`.
5. Review the recommended freelance caregiver.
6. Click `Approve match and update credits`.
7. Confirm customer and supplier email drafts are visible.
8. Confirm customer and supplier credit ledgers each record a `usage` transaction.
