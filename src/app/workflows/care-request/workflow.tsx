"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Coins,
  Copy,
  FilePlus2,
  MailCheck,
  Route,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import {
  approveMatchAndApplyCredits,
  createEmailDrafts,
  freelanceCaregivers,
  getWorkflowSteps,
  initialCareRequest,
  initialCreditAccounts,
  recommendCaregiver,
  type CareRequest,
  type CreditAccount,
  type MatchRecommendation,
  type WorkflowPhase,
} from "@/lib/care-workflow";

export function CareRequestWorkflow() {
  const [phase, setPhase] = useState<WorkflowPhase>("intake");
  const [request, setRequest] = useState<CareRequest>(initialCareRequest);
  const [recommendation, setRecommendation] =
    useState<MatchRecommendation | null>(null);
  const [creditAccounts, setCreditAccounts] =
    useState<CreditAccount[]>(initialCreditAccounts);

  const steps = getWorkflowSteps(phase);
  const emailDrafts = useMemo(
    () => (recommendation ? createEmailDrafts(request, recommendation) : []),
    [recommendation, request],
  );

  function logCareRequest() {
    setPhase("logged");
  }

  function runMatchingAgent() {
    setRecommendation(recommendCaregiver(request, freelanceCaregivers));
    setPhase("matched");
  }

  function approveMatch() {
    if (!recommendation) return;
    setCreditAccounts(approveMatchAndApplyCredits(creditAccounts, recommendation));
    setPhase("approved");
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--line)] bg-[var(--panel)] px-5 py-5 sm:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <Link
              className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
              href="/"
            >
              Match dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">
              Care request workflow
            </h1>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">
              MVP flow for logging a senior care request, matching it to a
              verified freelance caregiver, preparing manual-copy email drafts,
              and updating customer and supplier credit accounts.
            </p>
          </div>
          <StatusBadge tone="success">Demo workflow</StatusBadge>
        </div>
      </header>

      <div className="space-y-6 px-5 py-6 sm:px-8">
        <section className="grid gap-3 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              className={`rounded-md border p-4 ${
                step.status === "active"
                  ? "border-[var(--accent)] bg-white"
                  : "border-[var(--line)] bg-[var(--panel)]"
              }`}
              key={step.key}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{step.label}</p>
                <StatusBadge
                  tone={step.status === "done" ? "success" : step.status === "active" ? "warning" : "neutral"}
                >
                  {step.status}
                </StatusBadge>
              </div>
              <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel
            icon={<FilePlus2 className="h-5 w-5 text-[var(--accent)]" />}
            title="1. Log senior care request"
            subtitle="Demand Agent structures the request for matching."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Senior name"
                value={request.seniorName}
                onChange={(seniorName) => setRequest({ ...request, seniorName })}
              />
              <Field
                label="Area"
                value={request.area}
                onChange={(area) => setRequest({ ...request, area })}
              />
              <Field
                label="Email"
                value={request.email}
                onChange={(email) => setRequest({ ...request, email })}
              />
              <Field
                label="Phone"
                value={request.phone}
                onChange={(phone) => setRequest({ ...request, phone })}
              />
              <Field
                label="Urgency"
                value={request.urgency}
                onChange={(urgency) => setRequest({ ...request, urgency })}
              />
              <Field
                label="Schedule"
                value={request.schedule}
                onChange={(schedule) => setRequest({ ...request, schedule })}
              />
              <Textarea
                label="Care need"
                value={request.careNeed}
                onChange={(careNeed) => setRequest({ ...request, careNeed })}
              />
              <Textarea
                label="Notes and constraints"
                value={request.notes}
                onChange={(notes) => setRequest({ ...request, notes })}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
                onClick={logCareRequest}
                type="button"
              >
                Log request
              </button>
              <button
                className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
                disabled={phase === "intake"}
                onClick={runMatchingAgent}
                type="button"
              >
                Run Matching Agent
              </button>
            </div>
          </Panel>

          <Panel
            icon={<Route className="h-5 w-5 text-[var(--accent)]" />}
            title="Agent handoff"
            subtitle="Maestro coordinates the task sequence."
          >
            <div className="space-y-3">
              {[
                ["Demand Agent", "Request structured and checked for missing care details."],
                ["Supply Agent", "Only freelance caregivers with valid phone numbers are eligible."],
                ["Matching Agent", "Scores eligible caregivers against request needs."],
                ["Accounts Agent", "Records first-match credit usage after approval."],
              ].map(([agent, task]) => (
                <div
                  className="flex items-start gap-3 rounded-md bg-[var(--panel-soft)] p-3"
                  key={agent}
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-[var(--accent)]"
                  />
                  <div>
                    <p className="font-medium">{agent}</p>
                    <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
                      {task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Panel
            icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
            title="2. Match care request to caregiver"
            subtitle="Rules-based recommendation with operator review."
          >
            {recommendation ? (
              <div className="space-y-4">
                <div className="rounded-md border border-[var(--line)] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-[var(--muted)]">
                        Recommended caregiver
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold">
                        {recommendation.caregiver.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {recommendation.caregiver.offering}
                      </p>
                    </div>
                    <div className="rounded-md bg-[var(--panel-soft)] px-4 py-3 text-center">
                      <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                        Match score
                      </p>
                      <p className="text-3xl font-semibold text-[var(--accent)]">
                        {recommendation.score}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Rationale</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {recommendation.rationale}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Risks to review</h3>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--muted)]">
                    {recommendation.risks.map((risk) => (
                      <li key={risk}>- {risk}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
                  disabled={phase === "approved"}
                  onClick={approveMatch}
                  type="button"
                >
                  Approve match and update credits
                </button>
              </div>
            ) : (
              <EmptyState text="Run the Matching Agent after logging the request." />
            )}
          </Panel>

          <Panel
            icon={<BadgeCheck className="h-5 w-5 text-[var(--accent)]" />}
            title="Eligible freelance caregivers"
            subtitle="Phone number validation gates recommendations."
          >
            <div className="space-y-3">
              {freelanceCaregivers.map((caregiver) => (
                <div
                  className="rounded-md border border-[var(--line)] p-3"
                  key={caregiver.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{caregiver.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {caregiver.area} · {caregiver.availability}
                      </p>
                    </div>
                    <StatusBadge tone={caregiver.phoneVerified ? "success" : "warning"}>
                      {caregiver.phoneVerified ? "Phone valid" : "Blocked"}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Panel
            icon={<MailCheck className="h-5 w-5 text-[var(--accent)]" />}
            title="3. Manual-copy email drafts"
            subtitle="Approved drafts are copied by the operator into email."
          >
            {emailDrafts.length ? (
              <div className="space-y-4">
                {emailDrafts.map((draft) => (
                  <article
                    className="rounded-md border border-[var(--line)] p-4"
                    key={draft.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <StatusBadge tone="warning">{draft.audience}</StatusBadge>
                        <h3 className="mt-3 font-semibold">{draft.subject}</h3>
                      </div>
                      <Copy
                        aria-hidden="true"
                        className="h-5 w-5 text-[var(--muted)]"
                      />
                    </div>
                    <pre className="mt-3 whitespace-pre-wrap rounded-md bg-[var(--panel-soft)] p-3 text-sm leading-6 text-[var(--muted)]">
                      {draft.body}
                    </pre>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Email drafts appear after a caregiver is recommended." />
            )}
          </Panel>

          <Panel
            icon={<Coins className="h-5 w-5 text-[var(--accent)]" />}
            title="4. Customer and supplier credit accounts"
            subtitle="Top-ups and usage are tracked in ledgers."
          >
            <div className="space-y-4">
              {creditAccounts.map((account) => (
                <CreditLedger account={account} key={account.id} />
              ))}
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}

function Panel({
  children,
  icon,
  subtitle,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <section className="rounded-md border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-sm text-[var(--muted)]">{subtitle}</p>
        </div>
        {icon}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        className="mt-1 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function Textarea({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <textarea
        className="mt-1 min-h-24 w-full resize-y rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-[var(--accent)]"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-5 text-sm text-[var(--muted)]">
      {text}
    </div>
  );
}

function CreditLedger({ account }: { account: CreditAccount }) {
  return (
    <article className="rounded-md border border-[var(--line)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">{account.ownerName}</p>
          <h3 className="font-semibold">{account.label}</h3>
        </div>
        <div className="rounded-md bg-[var(--panel-soft)] px-3 py-2 text-center">
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">
            Balance
          </p>
          <p className="text-2xl font-semibold text-[var(--accent)]">
            {account.balance}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {account.transactions.map((transaction) => (
          <div
            className="flex items-start justify-between gap-3 rounded-md bg-[var(--panel-soft)] p-3 text-sm"
            key={transaction.id}
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="mt-1 text-xs uppercase text-[var(--muted)]">
                {transaction.type}
              </p>
            </div>
            <span
              className={`font-semibold ${
                transaction.amount < 0 ? "text-[var(--rose)]" : "text-[var(--accent)]"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
