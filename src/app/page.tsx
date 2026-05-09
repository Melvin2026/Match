"use client";

import {
  ClipboardCheck,
  Coins,
  HeartHandshake,
  MailCheck,
  SearchCheck,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { initialDashboard } from "@/lib/demo-data";
import Link from "next/link";
import {
  clearCareWorkflows,
  readCareWorkflows,
  type StoredCareWorkflow,
} from "@/lib/match-workflow-store";

export default function Home() {
  const [storedWorkflows, setStoredWorkflows] = useState<StoredCareWorkflow[]>([]);

  useEffect(() => {
    function refreshWorkflows() {
      setStoredWorkflows(readCareWorkflows());
    }

    refreshWorkflows();
    window.addEventListener("storage", refreshWorkflows);
    window.addEventListener("match-care-workflows-updated", refreshWorkflows);

    return () => {
      window.removeEventListener("storage", refreshWorkflows);
      window.removeEventListener("match-care-workflows-updated", refreshWorkflows);
    };
  }, []);

  const dashboard = useMemo(
    () => buildDashboardView(storedWorkflows),
    [storedWorkflows],
  );

  const { metrics, demands, caregivers, matches, approvals, agentTasks, credits } =
    dashboard;

  return (
    <main className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--line)] bg-[var(--panel)] px-5 py-6 lg:block">
        <div className="mb-9">
          <p className="text-sm font-semibold text-[var(--accent)]">Match</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight">
            Singapore caregiving desk
          </h1>
        </div>
        <nav className="space-y-1 text-sm font-medium text-[var(--muted)]">
          {[
            "Dashboard",
            "Customer demands",
            "Freelance caregivers",
            "Matches",
            "Approval queue",
            "Agent tasks",
            "Credit accounts",
          ].map((item, index) => (
            <a
              className={`block rounded-md px-3 py-2 ${
                index === 0
                  ? "bg-[var(--panel-soft)] text-[var(--foreground)]"
                  : "hover:bg-[var(--panel-soft)]"
              }`}
              href="#"
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <section className="lg:pl-64">
        <header className="border-b border-[var(--line)] bg-[var(--panel)] px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--accent)]">
                Invite-only MVP
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-normal">
                Caregiving match operations
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                Manage senior requests, freelance caregiver supply, match
                recommendations, and email drafts that operators copy manually
                after approval.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--accent-strong)]"
                href="/workflows/care-request"
              >
                New care workflow
              </Link>
              <button className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]">
                Invite caregiver
              </button>
              <button
                className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
                onClick={() => {
                  clearCareWorkflows();
                  setStoredWorkflows([]);
                }}
                type="button"
              >
                Reset demo
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6 sm:px-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article
                className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-4"
                key={metric.label}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-[var(--muted)]">{metric.label}</p>
                    <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                  </div>
                  <metric.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-[var(--accent)]"
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                  {metric.note}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-md border border-[var(--line)] bg-[var(--panel)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
                <div>
                  <h3 className="text-base font-semibold">Customer demands</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Seniors requesting Singapore caregiving support.
                  </p>
                </div>
                <SearchCheck
                  aria-hidden="true"
                  className="h-5 w-5 text-[var(--accent)]"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                  <thead className="bg-[var(--panel-soft)] text-xs uppercase text-[var(--muted)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Senior</th>
                      <th className="px-4 py-3 font-semibold">Need</th>
                      <th className="px-4 py-3 font-semibold">Area</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demands.map((demand) => (
                      <tr className="border-b border-[var(--line)]" key={demand.id}>
                        <td className="px-4 py-4 font-medium">{demand.name}</td>
                        <td className="px-4 py-4 text-[var(--muted)]">
                          {demand.need}
                        </td>
                        <td className="px-4 py-4 text-[var(--muted)]">
                          {demand.area}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge tone={demand.tone}>{demand.status}</StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-md border border-[var(--line)] bg-[var(--panel)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
                <div>
                  <h3 className="text-base font-semibold">Approval queue</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Drafts waiting for operator review.
                  </p>
                </div>
                <MailCheck
                  aria-hidden="true"
                  className="h-5 w-5 text-[var(--accent)]"
                />
              </div>
              <div className="divide-y divide-[var(--line)]">
                {approvals.map((approval) => (
                  <article className="px-4 py-4" key={approval.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{approval.title}</p>
                        <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
                          {approval.summary}
                        </p>
                      </div>
                      <StatusBadge tone="warning">{approval.type}</StatusBadge>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <Panel
              icon={<UserRoundCheck className="h-5 w-5 text-[var(--accent)]" />}
              subtitle="Invite-only supplier pool"
              title="Freelance caregivers"
            >
              <div className="space-y-3">
                {caregivers.map((caregiver) => (
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
                      <StatusBadge tone={caregiver.verified ? "success" : "warning"}>
                        {caregiver.verified ? "Phone valid" : "Check phone"}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              icon={<HeartHandshake className="h-5 w-5 text-[var(--accent)]" />}
              subtitle="Rules-based V1 scoring"
              title="Match recommendations"
            >
              <div className="space-y-3">
                {matches.map((match) => (
                  <div
                    className="rounded-md border border-[var(--line)] p-3"
                    key={match.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{match.title}</p>
                      <span className="text-lg font-semibold text-[var(--accent)]">
                        {match.score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                      {match.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              icon={<ClipboardCheck className="h-5 w-5 text-[var(--accent)]" />}
              subtitle="Maestro-led workflow"
              title="Agent tasks"
            >
              <div className="space-y-3">
                {agentTasks.map((task) => (
                  <div className="rounded-md bg-[var(--panel-soft)] p-3" key={task.id}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium">{task.agent}</p>
                      <StatusBadge tone={task.tone}>{task.status}</StatusBadge>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                      {task.task}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 text-[var(--accent)]"
                />
                <div>
                  <h3 className="font-semibold">Human approval guardrail</h3>
                  <p className="mt-1 max-w-4xl text-sm leading-6 text-[var(--muted)]">
                    No external email, match confirmation, billing reminder, or
                    sharing of senior or caregiver details happens until an
                    operator approves the draft.
                  </p>
                </div>
              </div>
              <StatusBadge tone="success">Active</StatusBadge>
            </div>
          </section>

          <section className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Coins
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 text-[var(--accent)]"
                />
                <div>
                  <h3 className="font-semibold">Credits ledger</h3>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-[var(--muted)]">
                    Customer and supplier accounts track top-ups, first-match
                    free credits, and usage when an operator approves a match.
                  </p>
                  {credits.length > 0 ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {credits.map((credit) => (
                        <div
                          className="rounded-md bg-[var(--panel-soft)] px-3 py-2"
                          key={credit.id}
                        >
                          <p className="text-xs uppercase text-[var(--muted)]">
                            {credit.ownerName}
                          </p>
                          <p className="text-lg font-semibold text-[var(--accent)]">
                            {credit.balance} credits
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <Link
                className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
                href="/workflows/care-request"
              >
                Open workflow
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function buildDashboardView(storedWorkflows: StoredCareWorkflow[]) {
  const workflowDemands = storedWorkflows.map((workflow) => ({
    id: workflow.id,
    name: workflow.request.seniorName,
    need: workflow.request.careNeed,
    area: workflow.request.area,
    status:
      workflow.phase === "approved"
        ? "Matched"
        : workflow.phase === "matched"
          ? "Match ready"
          : "Logged",
    tone:
      workflow.phase === "approved"
        ? ("success" as const)
        : workflow.phase === "matched"
          ? ("warning" as const)
          : ("neutral" as const),
  }));

  const workflowMatches = storedWorkflows
    .filter((workflow) => workflow.recommendation)
    .map((workflow) => ({
      id: `${workflow.id}-match`,
      title: `${workflow.request.seniorName} + ${workflow.recommendation?.caregiver.name}`,
      score: workflow.recommendation?.score ?? 0,
      rationale:
        workflow.phase === "approved"
          ? "Approved match. Customer and supplier credit accounts were updated."
          : (workflow.recommendation?.rationale ?? ""),
    }));

  const workflowApprovals = storedWorkflows
    .filter((workflow) => workflow.phase === "matched")
    .flatMap((workflow) => [
      {
        id: `${workflow.id}-match-approval`,
        type: "Match",
        title: `Approve ${workflow.request.seniorName} + ${workflow.recommendation?.caregiver.name}`,
        summary:
          "Operator approval is needed before account credits are used and email drafts are treated as final.",
      },
      {
        id: `${workflow.id}-email-approval`,
        type: "Email",
        title: `Review email drafts for ${workflow.request.seniorName}`,
        summary:
          "Customer and supplier emails are ready for manual copy after match approval.",
      },
    ]);

  const latestApproved = storedWorkflows.find(
    (workflow) => workflow.phase === "approved",
  );
  const credits = latestApproved?.creditAccounts ?? [];

  return {
    metrics: [
      {
        ...initialDashboard.metrics[0],
        value: String(initialDashboard.demands.length + workflowDemands.length),
        note: workflowDemands.length
          ? `${workflowDemands.length} new care workflow request added.`
          : initialDashboard.metrics[0].note,
      },
      initialDashboard.metrics[1],
      {
        ...initialDashboard.metrics[2],
        value: String(initialDashboard.approvals.length + workflowApprovals.length),
        note: workflowApprovals.length
          ? `${workflowApprovals.length} workflow approval items waiting.`
          : initialDashboard.metrics[2].note,
      },
      {
        ...initialDashboard.metrics[3],
        value: credits.length
          ? String(credits.reduce((total, account) => total + account.balance, 0))
          : initialDashboard.metrics[3].value,
        note: credits.length
          ? "Latest approved workflow updated customer and supplier credits."
          : initialDashboard.metrics[3].note,
      },
    ],
    demands: [...workflowDemands, ...initialDashboard.demands],
    caregivers: initialDashboard.caregivers,
    matches: [...workflowMatches, ...initialDashboard.matches],
    approvals: [...workflowApprovals, ...initialDashboard.approvals],
    agentTasks: [
      ...storedWorkflows.slice(0, 2).map((workflow) => ({
        id: `${workflow.id}-task`,
        agent: "Maestro Agent",
        task:
          workflow.phase === "approved"
            ? `Completed match workflow for ${workflow.request.seniorName}.`
            : `Care request workflow for ${workflow.request.seniorName} is ${workflow.phase}.`,
        status: workflow.phase === "approved" ? "Completed" : "In progress",
        tone: workflow.phase === "approved" ? ("success" as const) : ("warning" as const),
      })),
      ...initialDashboard.agentTasks,
    ],
    credits,
  };
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
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-[var(--muted)]">{subtitle}</p>
        </div>
        {icon}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
