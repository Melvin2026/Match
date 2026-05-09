import type {
  CareRequest,
  CreditAccount,
  MatchRecommendation,
  WorkflowPhase,
} from "@/lib/care-workflow";

export type StoredCareWorkflow = {
  id: string;
  phase: WorkflowPhase;
  request: CareRequest;
  recommendation: MatchRecommendation | null;
  creditAccounts: CreditAccount[];
  createdAt: string;
  updatedAt: string;
};

export const CARE_WORKFLOWS_STORAGE_KEY = "match.careWorkflows.v1";

export function readCareWorkflows() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(CARE_WORKFLOWS_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredCareWorkflow[];
  } catch {
    return [];
  }
}

export function upsertCareWorkflow(workflow: StoredCareWorkflow) {
  if (typeof window === "undefined") return [];

  const workflows = readCareWorkflows();
  const existingIndex = workflows.findIndex((item) => item.id === workflow.id);
  const next =
    existingIndex >= 0
      ? workflows.map((item) => (item.id === workflow.id ? workflow : item))
      : [workflow, ...workflows];

  window.localStorage.setItem(CARE_WORKFLOWS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("match-care-workflows-updated"));

  return next;
}

export function clearCareWorkflows() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(CARE_WORKFLOWS_STORAGE_KEY);
  window.dispatchEvent(new Event("match-care-workflows-updated"));
}

export function createWorkflowSnapshot({
  creditAccounts,
  id,
  phase,
  recommendation,
  request,
}: {
  creditAccounts: CreditAccount[];
  id: string;
  phase: WorkflowPhase;
  recommendation: MatchRecommendation | null;
  request: CareRequest;
}) {
  const now = new Date().toISOString();

  return {
    id,
    phase,
    request,
    recommendation,
    creditAccounts,
    createdAt: now,
    updatedAt: now,
  } satisfies StoredCareWorkflow;
}
