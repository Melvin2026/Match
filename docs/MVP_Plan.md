# Match MVP Plan

## MVP Goal

Build the first usable version of Match as a human-in-the-loop multi-agent marketplace for Senior Living goods and services.

The MVP should help an internal operator capture customer needs, capture supplier offerings, generate match recommendations, prepare drafts for follow-up, and track the progress of each match. External customer and supplier flows should be simple intake experiences at first, with internal review before any action is taken.

## Recommended MVP Positioning

Match should start as an assisted Senior Living matching service, not a fully open marketplace.

Initial MVP focus:

- Geography: Singapore.
- First category: caregiving services.
- First customer persona: seniors themselves.
- First supplier persona: freelance caregivers.
- First communication channel: email drafts for human approval.
- Email execution: operator manually copies approved drafts into email.
- Initial stack: Next.js web app with a database-backed internal dashboard.
- Authentication: NextAuth.

Initial promise:

- Help families, caregivers, and seniors find suitable Senior Living goods and services.
- Help trusted suppliers receive better-qualified customer requests.
- Use agents to speed up research, matching, drafting, and follow-up.
- Keep humans responsible for approval, communication, and commercial decisions.

## MVP User Groups

### Internal Operator

The internal operator is the first and most important MVP user.

Needs:

- See new customer requests.
- See supplier offerings.
- Review match recommendations.
- Approve or edit agent-generated drafts.
- Track match status and next actions.
- Monitor subscriptions and fee-for-service charges.

### Customer

The customer may be a senior, family member, caregiver, or organization requesting support.

Needs:

- Submit a care-related request.
- Describe urgency, location, budget, and constraints.
- Receive curated recommendations after internal review.
- Track basic request status.

### Supplier

The supplier provides Senior Living goods or services.

Needs:

- Submit offerings.
- Describe capacity, pricing, coverage, credentials, and availability.
- Receive qualified customer opportunities.
- Track basic match and subscription status.

## MVP Scope

### Must Have

- Internal operator dashboard.
- Customer demand records.
- Supplier offering records.
- Match records.
- Simple match scoring logic.
- Agent task records.
- Agent-generated drafts for outreach, follow-up, onboarding, and billing reminders.
- Human approval queue.
- Basic subscription tracking for customers and suppliers.
- Basic fee-for-service tracking for customers.
- Audit trail of agent actions and approvals.

### Should Have

- Customer request intake form.
- Supplier offering intake form.
- Search and filters for demand, supply, and matches.
- Status tracking for each demand, supply, and match record.
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
- Send drafts and recommendations to human approval.
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

- Generate match recommendations.
- Score potential matches.
- Explain match rationale.
- Identify gaps when no match exists.
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

- Dashboard
- Customer demands
- Demand detail
- Supplier offerings
- Supplier detail
- Match recommendations
- Match detail
- Agent task board
- Approval queue
- Subscriptions and charges
- Research opportunities

### External

- Customer request form
- Supplier offering form
- Simple customer status page
- Simple supplier status page

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
- First external communication channel: email.
- First email workflow: Match generates approved drafts for manual operator sending.
- Preferred technology stack: Next.js web app with a database-backed internal dashboard.
- Authentication: NextAuth.

Still to decide:

- Supplier verification requirements.
- Subscription and fee-for-service package details.

### Step 2: Build The Internal Data Backbone

Create:

- Customer records.
- Supplier records.
- Demand records.
- Supply records.
- Match records.
- Agent task records.
- Draft and approval records.

### Step 3: Build Internal Operator Dashboard

Create:

- Dashboard summary.
- Demand list and detail.
- Supply list and detail.
- Match list and detail.
- Approval queue.

### Step 4: Add Matching V1

Create:

- Rules-based match scoring.
- Match rationale.
- Gap detection.
- Next-action recommendation.

### Step 5: Add Agent Draft Workflows

Create:

- Demand follow-up drafts.
- Supplier follow-up drafts.
- Match recommendation summaries.
- Billing reminder drafts.
- Approval workflow.

### Step 6: Add External Intake

Create:

- Customer request form.
- Supplier offering form.
- Internal review status after submission.

### Step 7: Add Commercial Tracking

Create:

- Customer subscription status.
- Supplier subscription status.
- Customer fee-for-service charges.
- Payment reminder drafts.

## Success Criteria

The MVP is successful when an internal operator can:

- Receive a customer request.
- Record or find supplier offerings.
- Generate one or more match recommendations.
- Review the recommendation rationale.
- Approve or edit follow-up drafts.
- Track the match through completion.
- Track subscription and fee-for-service status.

## Key Open Questions

1. Should the first external intake be open to the public or invite-only?
2. Should supplier verification be required before freelance caregivers can be recommended?
3. What should the first customer subscription tier include?
4. What should the first supplier subscription tier include?
5. What fee-for-service items should customers pay for first?
6. What personal, medical, or caregiving information should be considered sensitive and require extra approval?

## Initial Technical Direction

The MVP should be implemented as a Next.js web app with a database-backed internal dashboard.

Recommended stack:

- Next.js for the web application.
- TypeScript for application code.
- PostgreSQL for the database.
- Prisma for database schema and queries.
- NextAuth for authentication.
- Tailwind CSS for UI styling.
- Email draft generation stored inside the app for manual operator copying after approval.

Initial app areas:

- Internal dashboard for operators.
- Customer demand management for Singapore caregiving requests.
- Supplier offering management for caregiving providers.
- Match recommendation workflow.
- Human approval queue for email drafts and match recommendations.
- Subscription and fee-for-service tracking.
