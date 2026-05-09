# Match

## Objective

Match is a multi-agent app for matching customers' demand with suppliers' supply for goods and services, starting with Senior Living.

The first focus area is goods and services that help elderly people live safely, comfortably, and independently in the community. Match should support families, caregivers, seniors, community partners, and service providers who need trusted ways to find, compare, and coordinate senior care-related goods and services.

The app should help identify demand, identify supply, qualify both sides, find suitable matches, complete the match workflow, and manage follow-up actions such as onboarding, billing, subscriptions, fee-for-service work, and reminders.

## Product Direction

Match should serve both:

- Internal users who operate the matching workflow, manage agent outputs, approve messages, and oversee customers and suppliers.
- External users through a customer-facing marketplace where customers and suppliers can discover, submit, and manage relevant requests or offerings.

The initial product should be designed as an assisted marketplace rather than a fully autonomous marketplace. Agents prepare recommendations, follow-ups, outreach drafts, and billing drafts, but a human reviews and approves external communications and commercial actions before they are sent or executed.

## Initial Market Focus: Senior Living

Match will first focus on goods and services that support elderly care in the community.

Possible categories include:

- Home care and caregiving services
- Nursing and medical support at home
- Rehabilitation, physiotherapy, and mobility support
- Meal delivery and nutrition services
- Home safety modifications
- Medical equipment and mobility aids
- Transport and appointment escort services
- Companionship and social activities
- Housekeeping and daily living support
- Technology for remote monitoring, alerts, and family coordination

The first version of Match should help customers describe care needs clearly, help suppliers list their services accurately, and help the Matching Agent recommend suitable options based on need, location, urgency, price, availability, service quality, and trust factors.

## Business Model

Match will use a combination of subscription fees and fee-for-service revenue.

Revenue streams:

- Customer subscription fees.
- Supplier subscription fees.
- Fee-for-service charges to customers for selected services, transactions, coordination work, or premium support.

The Accounts Agent should support subscription tracking, fee-for-service billing, outstanding payment reminders, and escalation of unresolved payment issues.

## Agent Roles

### 1. Maestro Agent

The Maestro Agent acts as the conductor of the Match team.

Responsibilities:

- Assign tasks to the relevant agents.
- Coordinate agent handoffs.
- Track whether each task has been completed successfully.
- Serve as the main point of contact between the user and the agent team.
- Escalate unclear, risky, or blocked decisions to the user.
- Request human approval before external messages, billing actions, or commercial commitments are sent or executed.

### 2. Demand Agent

The Demand Agent manages customer demand and requests.

Responsibilities:

- Look after customers' demands and requests.
- For potential customers, pitch Match and discover their needs or requests.
- Once a prospect agrees to become a customer, onboard the prospect.
- For existing Match customers, follow up regularly to identify new or updated needs.
- Maintain structured demand records that can be used by the Matching Agent.
- Prepare outreach, follow-up, and onboarding drafts for human approval.

### 3. Supply Agent

The Supply Agent manages supplier offerings of goods and services.

Responsibilities:

- Look after suppliers' offerings of goods and services.
- For potential suppliers, pitch Match and discover their offerings.
- Once a prospect agrees to become a supplier, onboard the prospect.
- For existing Match suppliers, follow up regularly to update Match with their latest offerings.
- Maintain structured supply records that can be used by the Matching Agent.
- Prepare supplier outreach, follow-up, and onboarding drafts for human approval.

### 4. Matching Agent

The Matching Agent matches customer requests with supplier goods or services.

Responsibilities:

- Compare customer requests against available supplier offerings.
- Determine whether a good or service match exists.
- If no suitable supply exists, notify the Supply Agent to look for a supplier.
- If no suitable demand exists for a supplier offering, notify the Demand Agent to look for a customer.
- Once a match is found, follow through until the match is completed.
- Record match status, next actions, and outcome.
- Prepare match recommendation summaries for human review.

### 5. Research Agent

The Research Agent scans the market and environment for opportunities for Match.

Responsibilities:

- Research potential market opportunities.
- Identify new Senior Living customer segments, supplier categories, geographies, or service lines.
- Qualify each opportunity on a 1-10 scale, where 10 is the most promising.
- Explain the reasoning behind each opportunity score.
- Recommend next actions for the Maestro Agent.

### 6. Accounts Agent

The Accounts Agent manages billing and payment follow-up for completed or active matches.

Responsibilities:

- Close commercial matches by billing customers and suppliers where applicable.
- Track customer and supplier subscription fees.
- Track customer fee-for-service charges.
- Review outstanding bills.
- Prepare payment reminder drafts for customers and suppliers for overdue or outstanding payments.
- Track payment status and escalate unresolved accounts issues to the Maestro Agent.

## Initial Workflow

1. The user gives the Maestro Agent a goal, lead, request, supplier, or opportunity.
2. The Maestro Agent decides which agent should act first.
3. The selected agent gathers or updates the relevant information.
4. The Maestro Agent routes structured information to the next relevant agent.
5. The Matching Agent evaluates fit between demand and supply.
6. If a match exists, the Maestro Agent coordinates completion and the Accounts Agent handles billing follow-up.
7. If a match does not exist, the Maestro Agent assigns either the Demand Agent or Supply Agent to source the missing side.
8. Any external message, billing action, or commercial commitment is prepared as a draft and sent for human approval.
9. The Research Agent continuously looks for new opportunities and recommends high-potential areas to pursue.

## Core Data To Capture

### Customer Demand

- Customer or prospect name
- Contact person
- Contact details
- Goods or services requested
- Senior Living need category
- Care recipient profile, where relevant
- Caregiver or family contact, where relevant
- Quantity or scope
- Budget or price expectations
- Timeline
- Urgency
- Location or delivery requirements
- Quality, compliance, or certification requirements
- Safety, trust, or care constraints
- Status
- Notes

### Supplier Supply

- Supplier or prospect name
- Contact person
- Contact details
- Goods or services offered
- Senior Living service or product category
- Capacity or availability
- Pricing
- Subscription status
- Timeline
- Location or delivery coverage
- Quality, compliance, or certification details
- Insurance, licensing, background check, or trust indicators
- Status
- Notes

### Match Record

- Customer
- Supplier
- Requested goods or services
- Offered goods or services
- Match score
- Match rationale
- Current status
- Next action
- Owner agent
- Billing status
- Subscription status
- Fee-for-service status
- Completion notes

### Research Opportunity

- Opportunity name
- Market or segment
- Demand signal
- Supply signal
- Estimated value
- Risks
- Opportunity score from 1-10
- Reasoning
- Recommended next action

## Possible App Features

- Multi-agent chat interface led by the Maestro Agent.
- Internal operator dashboard.
- Customer-facing marketplace.
- Supplier-facing marketplace or portal.
- Customer demand database.
- Supplier offering database.
- Match scoring and recommendation view.
- Task board for agent assignments and handoffs.
- Follow-up reminders for customers, suppliers, and accounts.
- Research opportunity pipeline.
- Subscription, billing, and payment status tracker.
- Human approval queue for agent-prepared drafts.
- Audit trail of agent actions and decisions.

## MVP Direction

The first MVP should support the Senior Living market with a human-in-the-loop matching workflow.

Core MVP capabilities:

- Capture customer care needs and supplier offerings.
- Organize demand and supply by Senior Living category.
- Let the Matching Agent recommend possible matches with rationale.
- Let agents prepare outreach, follow-up, onboarding, and billing drafts.
- Require human approval before sending external messages or taking billing action.
- Track customer subscriptions, supplier subscriptions, and customer fee-for-service charges.
- Provide an internal dashboard for operations.
- Provide an external-facing marketplace experience for customers and suppliers.

## Open Questions

1. Which Senior Living category should be the first beachhead: caregiving, medical support, home safety, meals, transport, equipment, companionship, or another category?
2. Who is the first primary customer: seniors, adult children, caregivers, community organizations, insurers, employers, or care facilities?
3. What geography should Match launch in first?
4. What information is required before a customer or supplier can be considered onboarded?
5. Should match scoring be rules-based at first, AI-assisted, or both?
6. What systems should Match integrate with first, such as email, CRM, spreadsheets, accounting tools, or messaging apps?
7. What subscription tiers should customers and suppliers have?
8. Which fee-for-service activities should customers pay for?
9. What approval workflow is needed before drafts are sent externally?

## Next Draft Sections

- Product requirements
- Agent interaction design
- Data model
- Match scoring logic
- MVP scope
- Technical architecture
- Security and approval rules
- Example user journeys
