"use client";

import Link from "next/link";
import { FilePlus2, History, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import {
  getRequestDisplayStatus,
  getStatusTone,
  initialRequestInput,
  readMatchRequests,
  submitRequest,
  type CareRequestInput,
  type MatchRequest,
} from "@/lib/match-demo-workflow";

export default function CustomerPage() {
  const [form, setForm] = useState<CareRequestInput>(initialRequestInput);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitRequest(form);
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
            <h1 className="mt-2 text-3xl font-semibold">Customer requests</h1>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">
              Log a senior care request and track whether Match is pending,
              assigned, or complete after the actual care service is fulfilled.
            </p>
          </div>
          <Link
            className="rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--panel-soft)]"
            href="/supplier"
          >
            Supplier page
          </Link>
        </div>
      </header>

      <div className="grid gap-6 px-5 py-6 sm:px-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel
          icon={<FilePlus2 className="h-5 w-5 text-[var(--accent)]" />}
          title="New request"
          subtitle="Submitted requests are routed to Maestro and the Matching Agent."
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Customer name"
                value={form.customerName}
                onChange={(customerName) => setForm({ ...form, customerName })}
              />
              <Field
                label="Area"
                value={form.area}
                onChange={(area) => setForm({ ...form, area })}
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(email) => setForm({ ...form, email })}
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(phone) => setForm({ ...form, phone })}
              />
              <Field
                label="Urgency"
                value={form.urgency}
                onChange={(urgency) => setForm({ ...form, urgency })}
              />
              <Field
                label="Schedule"
                value={form.schedule}
                onChange={(schedule) => setForm({ ...form, schedule })}
              />
            </div>
            <Textarea
              label="Care need"
              value={form.careNeed}
              onChange={(careNeed) => setForm({ ...form, careNeed })}
            />
            <Textarea
              label="Notes"
              value={form.notes}
              onChange={(notes) => setForm({ ...form, notes })}
            />
            <button
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
              type="submit"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
              Submit request
            </button>
          </form>
        </Panel>

        <Panel
          icon={<History className="h-5 w-5 text-[var(--accent)]" />}
          title="Past requests"
          subtitle="Customer-visible request history and status."
        >
          {requests.length ? (
            <div className="space-y-3">
              {requests.map((request) => {
                const assignment = request.assignments[0];
                return (
                  <article
                    className="rounded-md border border-[var(--line)] p-4"
                    key={request.id}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm text-[var(--muted)]">
                          {request.customerName} · {request.area}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold">
                          {request.careNeed}
                        </h2>
                      </div>
                      <StatusBadge tone={getStatusTone(request.status)}>
                        {getRequestDisplayStatus(request.status)}
                      </StatusBadge>
                    </div>
                    <div className="mt-4 rounded-md bg-[var(--panel-soft)] p-3 text-sm leading-6 text-[var(--muted)]">
                      {assignment ? (
                        <p>
                          Current supplier:{" "}
                          <span className="font-semibold text-[var(--foreground)]">
                            {assignment.providerName}
                          </span>
                          . Assignment status: {assignment.status}.
                        </p>
                      ) : (
                        <p>Matching Agent is looking for an available supplier.</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState text="Submitted requests will appear here." />
          )}
        </Panel>
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
