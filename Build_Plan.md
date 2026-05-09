# Match Build Plan

## Build Objective

Build Match as a multi-agent, human-in-the-loop marketplace for Senior Living goods and services. The app should support internal operators first, then extend into customer-facing and supplier-facing marketplace experiences.

## Current Build Status

The initial Next.js MVP scaffold is complete. The app currently includes a three-page demo workflow:

- `/`: Maestro Dashboard.
- `/customer`: Customer request and request history page.
- `/supplier`: Supplier assignment page.
- `/workflows/care-request`: Earlier operator-led workflow retained for reference.

The current MVP use case demonstrates:

- Customer logging a senior care request.
- Maestro coordinating Demand, Matching, and Supply agent tasks.
- Matching Agent auto-selecting the best available phone-verified supplier.
- Supplier accepting or rejecting an assignment.
- Matching Agent automatically trying the next available supplier after rejection.
- Request status changing to `Assigned` when a supplier accepts.
- Request status changing to `Complete` when the actual care service is fulfilled.
- Maestro Dashboard tracking request progress, supplier assignment status, and agent task status.

Initial MVP decisions:

- Launch geography: Singapore.
- First Senior Living category: caregiving services.
- First customer persona: seniors themselves.
- First supplier persona: freelance caregivers.
- First external intake model: invite-only.
- First freelance caregiver verification requirement: valid phone number.
- First communication channel: email drafts for human approval.
- First email workflow: operator manually copies approved drafts into email.
- Current matching workflow: Matching Agent auto-selects the best available supplier and retries after rejection.
- Initial subscription offer: customers and suppliers receive the first matching service free.
- Initial credit model: customer and supplier accounts track top-ups and usage.
- Technical stack: Next.js web app with a database-backed internal dashboard.
- Authentication: NextAuth.

## Guiding Principles

- Start with a narrow Senior Living beachhead before expanding categories.
- Keep humans in control of outbound messages, billing actions, and commercial commitments.
- Capture structured demand and supply data from day one.
- Make every agent action auditable.
- Build the internal operating system first, then expose selected workflows externally.

## Recommended Build Phases

### Phase 1: Foundation And Product Definition

Goals:

- Finalize MVP scope.
- Define the first Senior Living category and launch geography.
- Define customer, supplier, match, subscription, and fee-for-service data models.
- Define human approval rules for agent-generated drafts.
- Decide the first communication and billing integrations.

Deliverables:

- MVP product requirements.
- Initial data model.
- Agent workflow map.
- Approval workflow.
- First version of match scoring logic.

### Phase 2: Internal Operator MVP

Goals:

- Build Maestro Dashboard for operating Match.
- Let operators create and manage customer demand records.
- Let operators create and manage supplier offering records.
- Let the Matching Agent recommend matches with rationale.
- Let agents draft outreach, onboarding, follow-up, and billing messages.
- Route all drafts to a human approval queue.

Core screens:

- Maestro Dashboard.
- Customer demand list and detail.
- Supplier supply list and detail.
- Match recommendation view.
- Human approval queue.
- Agent task board.

### Phase 3: Agent Orchestration

Goals:

- Implement the Maestro Agent as the coordinator.
- Implement Demand, Supply, Matching, Research, and Accounts agents as specialized workflows.
- Store agent actions, decisions, inputs, outputs, and approvals.
- Add guardrails for sensitive care, billing, and external messaging scenarios.

Agent workflow:

1. Maestro receives a goal, lead, request, supplier, or opportunity.
2. Maestro assigns the first task.
3. Specialist agent gathers or updates structured data.
4. Matching Agent recommends fit or gap.
5. Maestro sends drafts and decisions to human approval.
6. Approved actions are recorded and followed up.

### Phase 4: External Marketplace MVP

Goals:

- Add customer-facing request intake.
- Add supplier-facing offering intake.
- Let customers and suppliers view relevant status updates.
- Keep matching and outbound actions controlled by internal approval.

Core screens:

- Customer request and status page.
- Supplier assignment page.
- Supplier offering form.
- Customer account area.
- Supplier account area.
- Public category pages for Senior Living services.

### Phase 5: Commercial Layer

Goals:

- Support customer subscriptions.
- Support supplier subscriptions.
- Support customer fee-for-service charges.
- Track billing status and payment follow-ups.
- Let Accounts Agent prepare invoice and reminder drafts for approval.

Commercial workflows:

- Subscribe customer.
- Subscribe supplier.
- Add fee-for-service charge.
- Track outstanding payment.
- Draft payment reminder.
- Escalate unresolved payment issue.

### Phase 6: Research And Growth

Goals:

- Let the Research Agent scan new Senior Living opportunities.
- Score opportunities from 1-10.
- Recommend new categories, suppliers, partners, and customer segments.
- Convert approved opportunities into agent tasks.

## Suggested Technical Approach

### Application

- Next.js web app with an internal dashboard and external marketplace.
- Use TypeScript for application code.
- Use a database-backed architecture from the start.
- Start with a modular monolith for speed.
- Add background jobs for agent tasks, follow-ups, reminders, and research.
- Store all agent inputs, outputs, approvals, and final actions.

### Data

Core tables or collections:

- Users
- Customers
- Suppliers
- Demand records
- Supply records
- Match records
- Agent tasks
- Agent messages and drafts
- Approval records
- Subscriptions
- Fee-for-service charges
- Payment reminders
- Research opportunities

### Agent Layer

Start with workflow-based agents before making them too autonomous.

- Maestro Agent: routing, task assignment, approval escalation.
- Demand Agent: customer needs and follow-up.
- Supply Agent: supplier offerings and follow-up.
- Matching Agent: match scoring, auto-selection, and next-supplier retry after rejection.
- Research Agent: opportunity research and scoring.
- Accounts Agent: subscriptions, charges, and payment reminders.

### Approval And Safety

Require human approval before:

- Sending external emails or messages.
- Confirming a match.
- Issuing invoices or payment reminders.
- Making any promise about care, price, timing, or supplier quality.
- Rejecting or deprioritizing a sensitive care request.

## Proposed MVP Scope

The first working MVP should include:

- Maestro Dashboard.
- Customer request and status page.
- Supplier assignment page.
- Customer demand records.
- Supplier supply records.
- Match recommendations or auto-selected assignments.
- Agent task records.
- Draft generation for outreach and follow-up.
- Human approval queue.
- Basic subscription and fee-for-service tracking.
- Audit trail.

The first MVP should not need:

- Fully automated external outreach.
- Complex payments integration.
- Public marketplace SEO pages.
- Mobile apps.
- Fully autonomous agent decision-making.

## Immediate Next Steps

1. Persist the current three-page workflow to PostgreSQL.
2. Add seeded local data for customers, suppliers, assignments, and task history.
3. Add invite-only authentication and route protection for Maestro, customer, and supplier views.
4. Add a real approval queue for external communications, billing, and sensitive care decisions.
5. Reconnect credit account screens to the new assignment lifecycle.
6. Add supplier profile, availability, and offering management.
7. Add audit events for every agent and supplier status transition.

## Open Build Questions

1. What happens after the first free match: paid subscription, fee-for-service, or both?
2. Should valid phone numbers be checked manually first, or should OTP verification be added later?
3. What customer fee-for-service items should be supported first?
4. What sensitive caregiving details require extra approval before sharing?
5. Should invite-only intake start with customer request forms, supplier offering forms, or both?
