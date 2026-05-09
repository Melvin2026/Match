# Match MVP Plan

## MVP Goal

Build the first usable version of Match as a human-in-the-loop multi-agent marketplace for Senior Living goods and services.

The MVP should help an internal operator capture customer needs, capture supplier offerings, generate match recommendations, prepare drafts for follow-up, and track the progress of each match. External customer and supplier flows should be simple intake experiences at first, with internal review before any action is taken.

## Current MVP Implementation

The first working MVP slice is available in the app.

Working routes:

- `/`: Maestro Dashboard.
- `/customer`: Customer request and request history page.
- `/supplier`: Supplier assignment page.
- `/workflows/care-request`: Earlier care request workflow demo retained for reference.

The current three-page workflow demonstrates customer request intake, Maestro-coordinated agent tasks, automatic Matching Agent supplier selection, supplier accept/reject decisions, automatic retry after rejection, and dashboard status tracking through assignment and fulfilment.

## Recommended MVP Positioning

Match should start as an assisted Senior Living matching service, not a fully open marketplace.

Initial MVP focus:

- Geography: Singapore.
- First category: caregiving services.
- First customer persona: seniors themselves.
- First supplier persona: freelance caregivers.
- First external intake model: invite-only.
- First freelance caregiver verification requirement: valid phone number.
- First communication channel: email drafts for human approval.
- Email execution: operator manually copies approved drafts into email.
- Initial subscription offer: customers and suppliers receive the first matching service free.
- Initial stack: Next.js web app with a database-backed internal dashboard.
- Authentication: NextAuth.

Initial promise:

- Help families, caregivers, and seniors find suitable Senior Living goods and services.
- Help trusted suppliers receive better-qualified customer requests.
- Use agents to speed up research, matching, drafting, and follow-up.
- Keep humans responsible for approval, communication, and commercial decisions.

## MVP User Groups

### Internal Operator

The internal operator uses Maestro Dashboard as the operating view.

Needs:

- See new customer requests.
- See supplier assignments and responses.
- Track match status and next actions.
- Track Maestro, Demand, Matching, and Supply agent task status.
- Monitor subscriptions and fee-for-service charges.

### Customer

The customer may be a senior, family member, caregiver, or organization requesting support.

Needs:

- Submit a care-related request.
- Describe urgency, location, budget, and constraints.
- Track whether the request is pending, awaiting supplier, assigned, or complete.
- See the current assigned supplier once available.

### Supplier

The supplier provides Senior Living goods or services.

Needs:

- Submit offerings.
- Describe capacity, pricing, coverage, credentials, and availability.
- Receive qualified customer opportunities.
- Accept or reject assignments.
- Mark accepted care services fulfilled.
- Track current and past assignments.

## MVP Scope

### Must Have

- Maestro Dashboard showing request progress, supplier assignment status, and agent task status.
- Customer demand records.
- Supplier offering records.
- Match records.
- Simple match scoring logic.
- Agent task records.
- Agent-generated drafts for outreach, follow-up, onboarding, and billing reminders.
- Human approval queue.
- Basic subscription tracking for customers and suppliers.
- Basic fee-for-service tracking for customers.
- Customer and supplier credit ledger tracking.
- Audit trail of agent actions and approvals.

### Should Have

- Customer request intake form.
- Supplier offering intake form.
- Search and filters for demand, supply, and matches.
- Status tracking for each demand, supply, and match record.
- Supplier accept/reject workflow with automatic next-supplier retry.
- Basic research opportunity records.

### Not Yet

- Fully automated external outreach.
- Payment processing.
- Complex CRM automation.
- Mobile apps.
- Public SEO marketplace pages.
- Fully autonomous agent decisions.
- Real-time chat with customers or suppliers.

## Agent Approach

The MVP should implement agents as structured workflows first. Each agent can generate drafts, recommendations, and task outputs, but the app should store outputs and require human approval before external action.

### Maestro Agent

Coordinates tasks and decides which agent should act next.

MVP functions:

- Receive a goal or new record.
- Create agent tasks.
- Route records to Demand, Supply, Matching, Research, or Accounts workflows.
- Track customer request progress and supplier assignment response.
- Coordinate automatic retry when a supplier rejects an assignment.
- Send drafts, billing actions, and sensitive decisions to human approval when those features are active.
- Track unresolved blockers.

### Demand Agent

Handles customer needs.

MVP functions:

- Summarize customer requests.
- Identify missing information.
- Draft follow-up questions.
- Prepare onboarding drafts.
- Flag urgent or sensitive care needs for review.

### Supply Agent

Handles supplier offerings.

MVP functions:

- Summarize supplier offerings.
- Identify missing supplier information.
- Draft supplier outreach and onboarding messages.
- Flag missing trust, licensing, insurance, or qualification information.

### Matching Agent

Compares demand and supply.

MVP functions:

- Auto-select the best available phone-verified supplier for a customer request.
- Score potential matches.
- Explain match rationale.
- Try the next available supplier when a supplier rejects.
- Identify gaps when no available supplier exists.
- Recommend whether to ask Demand Agent or Supply Agent to source the missing side.

### Research Agent

Finds and scores market opportunities.

MVP functions:

- Record opportunities.
- Score opportunities from 1-10.
- Explain opportunity rationale.
- Recommend follow-up tasks.

### Accounts Agent

Tracks subscription and fee-for-service work.

MVP functions:

- Track customer subscriptions.
- Track supplier subscriptions.
- Track customer fee-for-service charges.
- Draft billing reminders for approval.
- Escalate unresolved payment issues.

## Suggested Data Model

Core entities:

- User
- Customer
- Supplier
- Demand
- Supply
- Match
- AgentTask
- Draft
- Approval
- Subscription
- FeeForServiceCharge
- PaymentReminder
- ResearchOpportunity
- AuditEvent

## MVP Screens

### Internal

- Maestro Dashboard

### External

- Customer request and status page
- Supplier assignment page

### Later Internal Screens

- Customer demand detail
- Supplier detail
- Match detail
- Approval queue
- Subscriptions and charges
- Research opportunities

## Match Scoring V1

Start with a transparent rules-based score, then add AI-generated reasoning.

Suggested score factors:

- Category fit
- Location or service coverage
- Availability and timing
- Budget or price fit
- Urgency fit
- Supplier capacity
- Trust and qualification indicators
- Care constraints or safety requirements
- Customer preference fit

Each match should include:

- Score from 0-100
- Fit summary
- Risks or gaps
- Recommended next action

## Human Approval Rules

Human approval is required before:

- Sending any external message.
- Confirming a customer-supplier match.
- Making claims about care quality, safety, timing, or price.
- Sending invoices or payment reminders.
- Rejecting a sensitive or urgent customer request.
- Sharing customer details with a supplier.
- Sharing supplier details with a customer.

## Build Sequence

### Step 1: Confirm MVP Decisions

Confirmed:

- First Senior Living category: caregiving services.
- First launch geography: Singapore.
- First customer type: seniors themselves.
- First supplier type: freelance caregivers.
- First external intake model: invite-only.
- First freelance caregiver verification requirement: valid phone number.
- First external communication channel: email.
- First email workflow: Match generates approved drafts for manual operator sending.
- Current request flow: customer submits request, Matching Agent auto-selects supplier, supplier accepts or rejects, and Maestro Dashboard tracks progress.
- First subscription offer: customers and suppliers receive the first matching service free.
- Preferred technology stack: Next.js web app with a database-backed Maestro Dashboard.
- Authentication: NextAuth.

Still to decide:

- Post-first-match subscription and fee-for-service package details.

### Step 2: Build The Internal Data Backbone

Create:

- Customer records.
- Supplier records.
- Demand records.
- Supply records.
- Match records.
- Agent task records.
- Draft and approval records.
- Credit account and credit transaction records.

### Step 3: Build Maestro Dashboard

Create:

- Dashboard summary.
- Customer request progress table.
- Supplier assignment status.
- Agent task status.
- Pipeline counts.
- Approval queue for later external communication and billing actions.

### Step 4: Add Matching V1

Create:

- Rules-based match scoring.
- Match rationale.
- Auto-selection of the best available phone-verified supplier.
- Automatic next-supplier retry after supplier rejection.
- Gap detection when no supplier is available.
- Maestro next-action recommendation.

### Step 5: Add Agent Draft Workflows

Create:

- Demand follow-up drafts.
- Supplier follow-up drafts.
- Match recommendation summaries.
- Billing reminder drafts.
- Approval workflow.

### Step 6: Add External Intake

Create:

- Customer request and status page.
- Supplier assignment page.
- Supplier offering form.
- Maestro status tracking after submission.

### Step 7: Add Commercial Tracking

Create:

- Customer subscription status.
- Supplier subscription status.
- Customer fee-for-service charges.
- Payment reminder drafts.

## Success Criteria

The MVP is successful when Match can:

- Receive a customer request.
- Auto-select an eligible phone-verified supplier.
- Let the supplier accept or reject.
- Automatically try the next supplier after rejection.
- Track `Assigned` when a supplier accepts.
- Track `Complete` only after actual care service fulfilment.
- Show request, customer, supplier, and agent task progress in Maestro Dashboard.

## Key Open Questions

1. What happens after the first free match: paid subscription, fee-for-service, or both?
2. How should Match validate phone numbers after MVP: manual operator check, OTP verification, or both?
3. What fee-for-service items should customers pay for first?
4. What personal, medical, or caregiving information should be considered sensitive and require extra approval?
5. When should the demo workflow be connected to a live PostgreSQL database?

## Initial Technical Direction

The MVP should be implemented as a Next.js web app with a database-backed Maestro Dashboard.

Recommended stack:

- Next.js for the web application.
- TypeScript for application code.
- PostgreSQL for the database.
- Prisma for database schema and queries.
- NextAuth for authentication.
- Tailwind CSS for UI styling.
- Email draft generation stored inside the app for manual operator copying after approval.

Initial app areas:

- Maestro Dashboard for operators.
- Customer demand management for Singapore caregiving requests.
- Customer request and status page.
- Supplier assignment page.
- Supplier offering management for caregiving providers.
- Invite-only customer and supplier intake.
- Freelance caregiver verification by valid phone number.
- Matching Agent auto-selection and next-supplier retry workflow.
- Human approval queue for email drafts and match recommendations.
- Subscription and fee-for-service tracking.
