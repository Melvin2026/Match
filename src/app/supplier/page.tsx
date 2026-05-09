"use client";

import Link from "next/link";
import { Check, ClipboardList, History, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import {
  acceptAssignment,
  fulfillAssignment,
  getRequestDisplayStatus,
  getStatusTone,
  readMatchRequests,
  rejectAssignment,
  type MatchRequest,
} from "@/lib/match-demo-workflow";

export default function SupplierPage() {
  const [requests, setRequests] = useState<MatchRequest[]>([]);

  useEffect(() => {
    function refreshRequests() {
      setRequests(readMatchRequests());
    }

    refreshRequests();
    window.addEventListener("storage", refreshRequests);
    window.addEventListener("match-requests-updated", refreshRequests);

    return () => {
      window.removeEventListener("storage", refreshRequests);
      window.removeEventListener("match-requests-updated", refreshRequests);
    };
  }, []);

  const pendingAssignments = useMemo(
    () => requests.filter((request) => request.assignments[0]?.status === "pending"),
    [requests],
  );
  const activeAssignments = useMemo(
    () => requests.filter((request) => request.assignments[0]?.status === "accepted"),
    [requests],
  );
  const pastAssignments = useMemo(
    () =>
      requests.filter((request) =>
        ["rejected", "fulfilled"].includes(request.assignments[0]?.status ?? ""),
      ),
    [requests],
  );

  function refreshAfter(action: () => void) {
    action();
    setRequests(readMatchRequests());
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
              Maestro Dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">Supplier assignments</h1>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">
              Review assigned care requests, accept or reject them, and mark
              the actual care service fulfilled once completed.
            </p>
          </div>
          <Link
            className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
            href="/customer"
          >
            Customer page
          </Link>
        </div>
      </header>

      <div className="space-y-6 px-5 py-6 sm:px-8">
        <Panel
          icon={<ClipboardList className="h-5 w-5 text-[var(--accent)]" />}
          title="New assignments"
          subtitle="Rejecting automatically asks the Matching Agent to try the next available supplier."
        >
          {pendingAssignments.length ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {pendingAssignments.map((request) => (
                <AssignmentCard key={request.id} request={request}>
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
                    onClick={() =>
                      refreshAfter(() => acceptAssignment(request.id))
                    }
                    type="button"
                  >
                    <Check aria-hidden="true" className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
                    onClick={() =>
                      refreshAfter(() => rejectAssignment(request.id))
                    }
                    type="button"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                    Reject
                  </button>
                </AssignmentCard>
              ))}
            </div>
          ) : (
            <EmptyState text="No pending assignments. Submit a customer request to trigger matching." />
          )}
        </Panel>

        <section className="grid gap-6 xl:grid-cols-2">
          <Panel
            icon={<Check className="h-5 w-5 text-[var(--accent)]" />}
            title="Accepted assignments"
            subtitle="Accepted means Assigned. Complete only after service fulfilment."
          >
            {activeAssignments.length ? (
              <div className="space-y-4">
                {activeAssignments.map((request) => (
                  <AssignmentCard key={request.id} request={request}>
                    <button
                      className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
                      onClick={() =>
                        refreshAfter(() => fulfillAssignment(request.id))
                      }
                      type="button"
                    >
                      Mark fulfilled
                    </button>
                  </AssignmentCard>
                ))}
              </div>
            ) : (
              <EmptyState text="Accepted assignments will appear here." />
            )}
          </Panel>

          <Panel
            icon={<History className="h-5 w-5 text-[var(--accent)]" />}
            title="Past assignments"
            subtitle="Rejected and fulfilled assignment history."
          >
            {pastAssignments.length ? (
              <div className="space-y-4">
                {pastAssignments.map((request) => (
                  <AssignmentCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <EmptyState text="Past supplier responses will appear here." />
            )}
          </Panel>
        </section>
      </div>
    </main>
  );
}

function AssignmentCard({
  children,
  request,
}: {
  children?: React.ReactNode;
  request: MatchRequest;
}) {
  const assignment = request.assignments[0];

  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {request.customerName} · {request.area} · {request.schedule}
          </p>
          <h2 className="mt-1 text-lg font-semibold">{request.careNeed}</h2>
        </div>
        <StatusBadge tone={getStatusTone(request.status)}>
          {getRequestDisplayStatus(request.status)}
        </StatusBadge>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-[var(--panel-soft)] p-3">
          <p className="text-xs uppercase text-[var(--muted)]">Assigned supplier</p>
          <p className="mt-1 font-semibold">{assignment?.providerName}</p>
        </div>
        <div className="rounded-md bg-[var(--panel-soft)] p-3">
          <p className="text-xs uppercase text-[var(--muted)]">Match score</p>
          <p className="mt-1 font-semibold">{assignment?.score ?? "Pending"}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {assignment?.rationale}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Notes: {request.notes}
      </p>
      {children ? <div className="mt-4 flex flex-wrap gap-2">{children}</div> : null}
    </article>
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-5 text-sm text-[var(--muted)]">
      {text}
    </div>
  );
}
