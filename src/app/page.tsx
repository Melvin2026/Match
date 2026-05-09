import {
  ClipboardCheck,
  HeartHandshake,
  MailCheck,
  SearchCheck,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { initialDashboard } from "@/lib/demo-data";

export default function Home() {
  const {
    metrics,
    demands,
    caregivers,
    matches,
    approvals,
    agentTasks,
  } = initialDashboard;

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
            "Subscriptions",
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
              <button className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--accent-strong)]">
                New demand
              </button>
              <button className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]">
                Invite caregiver
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
        </div>
      </section>
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
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-[var(--muted)]">{subtitle}</p>
        </div>
        {icon}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
