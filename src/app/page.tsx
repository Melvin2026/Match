"use client";

import Link from "next/link";
import {
  Activity,
  ClipboardCheck,
  HeartHandshake,
  RefreshCcw,
  Route,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import {
  clearMatchRequests,
  getRequestDisplayStatus,
  getStatusTone,
  readMatchRequests,
  type Assignment,
  type MatchRequest,
  type RequestStatus,
  type TaskStatus,
} from "@/lib/match-demo-workflow";

const pipelineStatuses: RequestStatus[] = [
  "customer_submitted",
  "matching_agent_reviewing",
  "careprovider_assigned",
  "careprovider_accepted",
  "complete",
  "careprovider_rejected",
];

export default function MaestroDashboard() {
  const [requests, setRequests] = useState<MatchRequest[]>([]);

  useEffect(() => {
    function refreshRequests() {
      setRequests(readMatchRequests());
    }

    refreshRequests();
    const intervalId = window.setInterval(refreshRequests, 1000);
    window.addEventListener("focus", refreshRequests);
    window.addEventListener("storage", refreshRequests);
    window.addEventListener("visibilitychange", refreshRequests);
    window.addEventListener("match-requests-updated", refreshRequests);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshRequests);
      window.removeEventListener("storage", refreshRequests);
      window.removeEventListener("visibilitychange", refreshRequests);
      window.removeEventListener("match-requests-updated", refreshRequests);
    };
  }, []);

  const metrics = useMemo(() => buildMetrics(requests), [requests]);
  const supplierRows = useMemo(() => buildSupplierRows(requests), [requests]);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--line)] bg-[var(--panel)] px-5 py-5 sm:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--accent)]">
              Maestro Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal">
              Request progress and assignment status
            </h1>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">
              Track customer requests, supplier assignment responses, agent
              task status, and service fulfilment from one operating view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
              href="/customer"
            >
              Customer page
            </Link>
            <Link
              className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
              href="/supplier"
            >
              Supplier page
            </Link>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
              onClick={() => {
                clearMatchRequests();
                setRequests([]);
              }}
              type="button"
            >
              <RefreshCcw aria-hidden="true" className="h-4 w-4" />
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

        <Panel
          icon={<HeartHandshake className="h-5 w-5 text-[var(--accent)]" />}
          title="Request Progress"
          subtitle="Customer, supplier, current status, and Maestro next action."
        >
          {requests.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-[var(--panel-soft)] text-xs uppercase text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Request</th>
                    <th className="px-4 py-3 font-semibold">Supplier</th>
                    <th className="px-4 py-3 font-semibold">Progress</th>
                    <th className="px-4 py-3 font-semibold">Next action</th>
                    <th className="px-4 py-3 font-semibold">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => {
                    const assignment = request.assignments[0];
                    return (
                      <tr className="border-b border-[var(--line)]" key={request.id}>
                        <td className="px-4 py-4">
                          <p className="font-medium">{request.customerName}</p>
                          <p className="mt-1 text-xs text-[var(--muted)]">
                            {request.phone}
                          </p>
                        </td>
                        <td className="max-w-sm px-4 py-4">
                          <p className="font-medium">{request.area}</p>
                          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
                            {request.careNeed}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium">
                            {assignment?.providerName ?? "Unassigned"}
                          </p>
                          <p className="mt-1 text-xs text-[var(--muted)]">
                            {getSupplierResponse(assignment)}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge tone={getStatusTone(request.status)}>
                            {getRequestDisplayStatus(request.status)}
                          </StatusBadge>
                        </td>
                        <td className="max-w-xs px-4 py-4 text-[var(--muted)]">
                          {getNextAction(request)}
                        </td>
                        <td className="px-4 py-4 text-[var(--muted)]">
                          {formatShortDateTime(request.updatedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState text="No requests yet. Customer requests will appear here after submission." />
          )}
        </Panel>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Panel
            icon={<Route className="h-5 w-5 text-[var(--accent)]" />}
            title="Pipeline"
            subtitle="Live request counts by workflow state."
          >
            <div className="space-y-3">
              {pipelineStatuses.map((status) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-md bg-[var(--panel-soft)] p-3"
                  key={status}
                >
                  <StatusBadge tone={getStatusTone(status)}>
                    {getPipelineStatusLabel(status)}
                  </StatusBadge>
                  <span className="text-lg font-semibold">
                    {requests.filter((request) => request.status === status).length}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            icon={<UserRoundCheck className="h-5 w-5 text-[var(--accent)]" />}
            title="Supplier Assignments"
            subtitle="Current and past supplier responses for each request."
          >
            {supplierRows.length ? (
              <div className="space-y-3">
                {supplierRows.map((row) => (
                  <article
                    className="rounded-md border border-[var(--line)] p-4"
                    key={`${row.requestId}-${row.providerName}-${row.assignedAt}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium">{row.providerName}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {row.customerName} · match score {row.score}
                        </p>
                      </div>
                      <StatusBadge tone={assignmentTone(row.status)}>
                        {row.status}
                      </StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-5 text-[var(--muted)]">
                      {row.rationale}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Supplier assignment records appear after Matching Agent assigns a supplier." />
            )}
          </Panel>
        </section>

        <Panel
          icon={<ClipboardCheck className="h-5 w-5 text-[var(--accent)]" />}
          title="Agent Task Status"
          subtitle="Maestro, Demand, Matching, and Supply task progress."
        >
          {requests.length ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {requests.flatMap((request) =>
                request.agentTasks.map((task) => (
                  <article
                    className="rounded-md bg-[var(--panel-soft)] p-3"
                    key={`${request.id}-${task.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{task.agent} Agent</p>
                        <p className="mt-1 text-xs uppercase text-[var(--muted)]">
                          {request.customerName}
                        </p>
                      </div>
                      <StatusBadge tone={taskTone(task.status)}>
                        {task.status.replace("_", " ")}
                      </StatusBadge>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                      {task.title}
                    </p>
                  </article>
                )),
              )}
            </div>
          ) : (
            <EmptyState text="Agent tasks appear after the first customer request is logged." />
          )}
        </Panel>
      </div>
    </main>
  );
}

function buildMetrics(requests: MatchRequest[]) {
  return [
    {
      label: "Open requests",
      value: String(requests.filter((request) => request.status !== "complete").length),
      note: "Not yet fulfilled.",
      icon: HeartHandshake,
    },
    {
      label: "Awaiting supplier",
      value: String(
        requests.filter((request) => request.status === "careprovider_assigned")
          .length,
      ),
      note: "Supplier needs to accept or reject.",
      icon: UserRoundCheck,
    },
    {
      label: "Assigned",
      value: String(
        requests.filter((request) => request.status === "careprovider_accepted")
          .length,
      ),
      note: "Supplier accepted; service not fulfilled.",
      icon: ClipboardCheck,
    },
    {
      label: "Complete",
      value: String(requests.filter((request) => request.status === "complete").length),
      note: "Actual care service fulfilled.",
      icon: Activity,
    },
  ];
}

function buildSupplierRows(requests: MatchRequest[]) {
  return requests.flatMap((request) =>
    request.assignments.map((assignment) => ({
      ...assignment,
      customerName: request.customerName,
      requestId: request.id,
    })),
  );
}

function getSupplierResponse(assignment?: Assignment) {
  if (!assignment) return "No supplier assigned";
  if (assignment.status === "pending") return "Awaiting response";
  if (assignment.status === "accepted") return "Accepted";
  if (assignment.status === "rejected") return "Rejected; auto-trying next supplier";
  return "Service fulfilled";
}

function getNextAction(request: MatchRequest) {
  switch (request.status) {
    case "customer_submitted":
    case "matching_agent_reviewing":
      return "Matching Agent selects the best available supplier.";
    case "careprovider_assigned":
      return "Supplier accepts or rejects the assignment.";
    case "careprovider_accepted":
      return "Supplier fulfils care service, then marks complete.";
    case "careprovider_rejected":
      return "Maestro reviews blocked supply or asks Supply Agent to source more suppliers.";
    case "complete":
      return "No action needed.";
  }
}

function getPipelineStatusLabel(status: RequestStatus) {
  switch (status) {
    case "customer_submitted":
      return "Submitted";
    case "matching_agent_reviewing":
      return "Matching";
    case "careprovider_assigned":
      return "Awaiting supplier";
    case "careprovider_accepted":
      return "Assigned";
    case "careprovider_rejected":
      return "No match yet";
    case "complete":
      return "Complete";
  }
}

function formatShortDateTime(value: string) {
  return new Intl.DateTimeFormat("en-SG", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function taskTone(status: TaskStatus) {
  if (status === "completed") return "success";
  if (status === "blocked") return "rose";
  if (status === "in_progress") return "warning";
  return "neutral";
}

function assignmentTone(status: Assignment["status"]) {
  if (status === "accepted" || status === "fulfilled") return "success";
  if (status === "rejected") return "rose";
  return "warning";
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-5 text-sm text-[var(--muted)]">
      {text}
    </div>
  );
}
