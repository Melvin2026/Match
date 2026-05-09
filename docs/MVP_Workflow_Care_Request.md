# MVP Workflow: Customer Request To Supplier Assignment

## Purpose

This workflow covers the current Match MVP use case:

1. Customer logs a senior care request.
2. Maestro coordinates the relevant agent tasks.
3. Matching Agent auto-selects the best available phone-verified supplier.
4. Supplier accepts or rejects the assignment.
5. If supplier rejects, Matching Agent automatically tries the next available supplier.
6. If supplier accepts, the request becomes `Assigned`.
7. When the actual care service is fulfilled, the request becomes `Complete`.
8. Maestro Dashboard tracks request, customer, supplier, and agent task statuses throughout.

## Current App Routes

- `/`: Maestro Dashboard.
- `/customer`: Customer request and request history page.
- `/supplier`: Supplier assignment page.
- `/workflows/care-request`: Earlier operator-led workflow retained for reference.

## Workflow Steps

### 1. Customer Logs Request

The customer records the senior's caregiving need, including:

- Customer name
- Email
- Phone
- Area
- Care need
- Urgency
- Schedule
- Notes and constraints

The Demand Agent structures the request for matching.

### 2. Maestro Creates Agent Tasks

The Maestro Agent coordinates:

- Demand Agent: structures the customer request.
- Matching Agent: auto-selects the best available phone-verified supplier.
- Supply Agent: tracks supplier assignment response.

### 3. Matching Agent Assigns Supplier

The Matching Agent considers phone-verified suppliers and scores fit using:

- Area
- Availability
- Caregiving service fit
- Language or preference fit
- Phone verification status

The highest-ranked available supplier receives the assignment.

### 4. Supplier Accepts Or Rejects

The supplier reviews the assignment at `/supplier`.

- If supplier accepts, request status becomes `Assigned`.
- If supplier rejects, Matching Agent automatically tries the next available supplier.
- If no phone-verified supplier is available, the request becomes blocked as `No match yet`.

### 5. Supplier Marks Fulfilled

`Assigned` means the supplier accepted the assignment.

`Complete` means the actual care service was fulfilled. The supplier marks the assignment fulfilled from `/supplier`.

### 6. Maestro Dashboard Updates

The workflow writes request, assignment, timeline, and agent task state to browser local storage under:

`match.requests.v2`

The Maestro Dashboard refreshes this state and shows:

- Open request count.
- Awaiting supplier count.
- Assigned count.
- Complete count.
- Customer request progress table.
- Supplier assignment response history.
- Agent task status for Maestro, Demand, Matching, and Supply.

## Web Preview Test

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000/customer`.
3. Submit a care request.
4. Open `http://localhost:3000` and confirm the request appears as awaiting supplier response.
5. Open `http://localhost:3000/supplier`.
6. Reject the assignment and confirm the Matching Agent assigns the next available supplier.
7. Accept the current assignment.
8. Open `http://localhost:3000` and confirm request status is `Assigned`.
9. Return to `http://localhost:3000/supplier` and mark the service fulfilled.
10. Open `http://localhost:3000` and confirm request status is `Complete`.

## Handoff Note

Start testing from:

`http://localhost:3000/customer`

The most important behavior to confirm is that the Maestro Dashboard updates after the customer request is submitted, the supplier accepts or rejects, and the actual service is fulfilled.
