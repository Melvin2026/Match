# ADR 001: Initial MVP Technology Stack

## Status

Accepted

## Context

Match needs an MVP that can support an internal operator dashboard, structured demand and supply records, match recommendations, human approval workflows, and later external customer and supplier intake.

The first MVP focus is Singapore caregiving services for seniors, with freelance caregivers as the first supplier persona. MVP intake is invite-only. Freelance caregivers must provide a valid phone number before being recommended. Email is the first communication channel. Agents should prepare drafts and recommendations for human approval rather than taking external action automatically. Approved email drafts will be manually copied and sent by an operator in the MVP.

## Decision

Build the MVP as a Next.js web app with a database-backed internal dashboard.

Initial stack:

- Next.js for the web application.
- TypeScript for application code.
- PostgreSQL for the database.
- Prisma for schema management and database queries.
- Tailwind CSS for UI styling.
- NextAuth for authentication.

## Rationale

Next.js gives Match a practical path to build both internal dashboard screens and external marketplace/intake screens in one app. A database-backed architecture is needed from the start because Match depends on structured records, approvals, agent tasks, subscriptions, and audit history.

Prisma and PostgreSQL provide a clear foundation for the data model while keeping the MVP fast to build and easy to evolve.

## Consequences

- The first build should scaffold the Next.js app inside this repository.
- The initial database schema should cover customers, suppliers, invite status, phone verification status, demand, supply, matches, agent tasks, drafts, approvals, subscriptions, fee-for-service charges, and audit events.
- The MVP should start with email draft generation stored in the app for manual operator copying. Direct email sending can be added after the approval workflow is stable.
