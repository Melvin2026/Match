export type RequestStatus =
  | "customer_submitted"
  | "matching_agent_reviewing"
  | "careprovider_assigned"
  | "careprovider_accepted"
  | "careprovider_rejected"
  | "complete";

export type TaskStatus = "queued" | "in_progress" | "blocked" | "completed";

export type CareRequestInput = {
  customerName: string;
  email: string;
  phone: string;
  area: string;
  careNeed: string;
  urgency: string;
  schedule: string;
  notes: string;
};

export type CareProvider = {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  availability: string;
  offering: string;
  phoneVerified: boolean;
  scoreFactors: string[];
};

export type Assignment = {
  providerId: string;
  providerName: string;
  score: number;
  rationale: string;
  status: "pending" | "accepted" | "rejected" | "fulfilled";
  assignedAt: string;
  respondedAt?: string;
};

export type AgentTask = {
  id: string;
  agent: "Maestro" | "Demand" | "Supply" | "Matching";
  title: string;
  status: TaskStatus;
};

export type TimelineEvent = {
  id: string;
  label: string;
  detail: string;
  createdAt: string;
};

export type MatchRequest = CareRequestInput & {
  id: string;
  status: RequestStatus;
  assignments: Assignment[];
  triedProviderIds: string[];
  agentTasks: AgentTask[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
};

export const MATCH_REQUESTS_STORAGE_KEY = "match.requests.v2";

export const initialRequestInput: CareRequestInput = {
  customerName: "Ms Lim",
  email: "ms.lim@example.com",
  phone: "+65 9123 4567",
  area: "Toa Payoh",
  careNeed: "Morning personal care support and medication reminders",
  urgency: "This week",
  schedule: "Weekdays, 8am to 11am",
  notes: "Prefers a Mandarin-speaking caregiver. Mild mobility support needed.",
};

export const careProviders: CareProvider[] = [
  {
    id: "careprovider-grace",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    phone: "+65 9876 5432",
    area: "Central",
    availability: "Weekday mornings",
    offering: "Personal care, medication reminders, companionship",
    phoneVerified: true,
    scoreFactors: [
      "Central coverage",
      "Weekday morning availability",
      "Personal care experience",
      "Mandarin-speaking",
    ],
  },
  {
    id: "careprovider-aisha",
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    phone: "+65 9765 4321",
    area: "East",
    availability: "Weekdays",
    offering: "Companionship, meal reminders, light housekeeping",
    phoneVerified: true,
    scoreFactors: ["Valid phone", "Weekday availability", "Less exact location fit"],
  },
  {
    id: "careprovider-mei-fen",
    name: "Mei Fen",
    email: "mei.fen@example.com",
    phone: "+65 9234 5678",
    area: "West",
    availability: "Afternoons",
    offering: "Companionship and errands",
    phoneVerified: false,
    scoreFactors: ["Phone check pending", "Schedule mismatch"],
  },
];

export function readMatchRequests() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(MATCH_REQUESTS_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as MatchRequest[];
  } catch {
    return [];
  }
}

export function writeMatchRequests(requests: MatchRequest[]) {
  if (typeof window === "undefined") return requests;

  window.localStorage.setItem(MATCH_REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  window.dispatchEvent(new Event("match-requests-updated"));

  return requests;
}

export function clearMatchRequests() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(MATCH_REQUESTS_STORAGE_KEY);
  window.dispatchEvent(new Event("match-requests-updated"));
}

export function submitRequest(input: CareRequestInput) {
  const now = new Date().toISOString();
  const request: MatchRequest = {
    ...input,
    id: `request-${Date.now()}`,
    status: "customer_submitted",
    assignments: [],
    triedProviderIds: [],
    agentTasks: [
      {
        id: `task-maestro-${Date.now()}`,
        agent: "Maestro",
        title: "Coordinate request intake, matching, supplier response, and customer status.",
        status: "in_progress",
      },
      {
        id: `task-demand-${Date.now()}`,
        agent: "Demand",
        title: "Structure customer care request for matching.",
        status: "completed",
      },
      {
        id: `task-matching-${Date.now()}`,
        agent: "Matching",
        title: "Auto-select best available careprovider.",
        status: "in_progress",
      },
      {
        id: `task-supply-${Date.now()}`,
        agent: "Supply",
        title: "Wait for assigned careprovider response.",
        status: "queued",
      },
    ],
    timeline: [
      createTimelineEvent(
        "Customer request logged",
        `${input.customerName} submitted a caregiving request in ${input.area}.`,
      ),
      createTimelineEvent(
        "Maestro routed work",
        "Maestro assigned Demand, Matching, and Supply agent tasks.",
      ),
    ],
    createdAt: now,
    updatedAt: now,
  };

  const matchedRequest = assignNextCareProvider({
    ...request,
    status: "matching_agent_reviewing",
  });

  writeMatchRequests([matchedRequest, ...readMatchRequests()]);

  return matchedRequest;
}

export function acceptAssignment(requestId: string) {
  updateRequest(requestId, (request) => {
    const assignment = request.assignments[0];
    if (!assignment || assignment.status !== "pending") return request;

    return {
      ...request,
      status: "careprovider_accepted",
      assignments: [
        {
          ...assignment,
          status: "accepted",
          respondedAt: new Date().toISOString(),
        },
        ...request.assignments.slice(1),
      ],
      agentTasks: request.agentTasks.map((task) =>
        task.agent === "Supply" || task.agent === "Matching"
          ? { ...task, status: "completed" }
          : task,
      ),
      timeline: [
        createTimelineEvent(
          "Careprovider accepted",
          `${assignment.providerName} accepted the assignment. Customer status is now Assigned.`,
        ),
        ...request.timeline,
      ],
      updatedAt: new Date().toISOString(),
    };
  });
}

export function rejectAssignment(requestId: string) {
  updateRequest(requestId, (request) => {
    const assignment = request.assignments[0];
    if (!assignment || assignment.status !== "pending") return request;

    const rejectedRequest: MatchRequest = {
      ...request,
      status: "careprovider_rejected",
      assignments: [
        {
          ...assignment,
          status: "rejected",
          respondedAt: new Date().toISOString(),
        },
        ...request.assignments.slice(1),
      ],
      timeline: [
        createTimelineEvent(
          "Careprovider rejected",
          `${assignment.providerName} rejected the assignment. Matching Agent will try the next available careprovider.`,
        ),
        ...request.timeline,
      ],
      updatedAt: new Date().toISOString(),
    };

    return assignNextCareProvider(rejectedRequest);
  });
}

export function fulfillAssignment(requestId: string) {
  updateRequest(requestId, (request) => {
    const assignment = request.assignments[0];
    if (!assignment || assignment.status !== "accepted") return request;

    return {
      ...request,
      status: "complete",
      assignments: [
        {
          ...assignment,
          status: "fulfilled",
          respondedAt: new Date().toISOString(),
        },
        ...request.assignments.slice(1),
      ],
      agentTasks: request.agentTasks.map((task) => ({
        ...task,
        status: "completed",
      })),
      timeline: [
        createTimelineEvent(
          "Care service fulfilled",
          `${assignment.providerName} marked the actual care service as fulfilled.`,
        ),
        ...request.timeline,
      ],
      updatedAt: new Date().toISOString(),
    };
  });
}

export function getRequestDisplayStatus(status: RequestStatus) {
  switch (status) {
    case "customer_submitted":
    case "matching_agent_reviewing":
      return "Pending";
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

export function getStatusTone(status: RequestStatus) {
  switch (status) {
    case "careprovider_accepted":
    case "complete":
      return "success" as const;
    case "careprovider_assigned":
    case "matching_agent_reviewing":
      return "warning" as const;
    case "careprovider_rejected":
      return "rose" as const;
    case "customer_submitted":
      return "neutral" as const;
  }
}

function assignNextCareProvider(request: MatchRequest): MatchRequest {
  const ranked = careProviders
    .filter(
      (provider) =>
        provider.phoneVerified && !request.triedProviderIds.includes(provider.id),
    )
    .map((provider) => ({
      provider,
      score: scoreCareProvider(request, provider),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const now = new Date().toISOString();

  if (!best) {
    return {
      ...request,
      status: "careprovider_rejected",
      agentTasks: request.agentTasks.map((task) =>
        task.agent === "Matching" || task.agent === "Supply"
          ? { ...task, status: "blocked" }
          : task,
      ),
      timeline: [
        createTimelineEvent(
          "No available careprovider",
          "Matching Agent could not find another phone-verified careprovider.",
        ),
        ...request.timeline,
      ],
      updatedAt: now,
    };
  }

  return {
    ...request,
    status: "careprovider_assigned",
    assignments: [
      {
        providerId: best.provider.id,
        providerName: best.provider.name,
        score: best.score,
        rationale: `${best.provider.name} is the strongest available fit based on coverage, schedule, care scope, and trust readiness.`,
        status: "pending",
        assignedAt: now,
      },
      ...request.assignments,
    ],
    triedProviderIds: [best.provider.id, ...request.triedProviderIds],
    agentTasks: request.agentTasks.map((task) => {
      if (task.agent === "Matching") return { ...task, status: "completed" };
      if (task.agent === "Supply") return { ...task, status: "in_progress" };
      return task;
    }),
    timeline: [
      createTimelineEvent(
        "Matching Agent assigned supplier",
        `${best.provider.name} was auto-selected with a score of ${best.score}.`,
      ),
      ...request.timeline,
    ],
    updatedAt: now,
  };
}

function updateRequest(
  requestId: string,
  updater: (request: MatchRequest) => MatchRequest,
) {
  const requests = readMatchRequests();
  writeMatchRequests(
    requests.map((request) =>
      request.id === requestId ? updater(request) : request,
    ),
  );
}

function createTimelineEvent(label: string, detail: string): TimelineEvent {
  return {
    id: `event-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label,
    detail,
    createdAt: new Date().toISOString(),
  };
}

function scoreCareProvider(request: CareRequestInput, provider: CareProvider) {
  let score = 50;
  const requestText =
    `${request.area} ${request.schedule} ${request.careNeed} ${request.notes}`.toLowerCase();
  const providerText =
    `${provider.area} ${provider.availability} ${provider.offering} ${provider.scoreFactors.join(" ")}`.toLowerCase();

  if (provider.phoneVerified) score += 10;
  if (requestText.includes("toa payoh") && providerText.includes("central")) {
    score += 12;
  }
  if (requestText.includes("morning") && providerText.includes("morning")) {
    score += 10;
  }
  if (requestText.includes("personal care") && providerText.includes("personal care")) {
    score += 9;
  }
  if (requestText.includes("mandarin") && providerText.includes("mandarin")) {
    score += 5;
  }

  return Math.min(score, 100);
}
