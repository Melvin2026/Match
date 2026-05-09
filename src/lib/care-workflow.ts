export type WorkflowStepStatus = "pending" | "active" | "done";

export type WorkflowPhase = "intake" | "logged" | "matched" | "approved";

export type CreditTransactionType = "top-up" | "usage" | "adjustment";

export type CareRequest = {
  seniorName: string;
  email: string;
  phone: string;
  area: string;
  careNeed: string;
  urgency: string;
  schedule: string;
  notes: string;
};

export type Caregiver = {
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

export type MatchRecommendation = {
  caregiver: Caregiver;
  score: number;
  rationale: string;
  risks: string[];
  nextAction: string;
};

export type CreditTransaction = {
  id: string;
  type: CreditTransactionType;
  amount: number;
  description: string;
  relatedMatch?: string;
};

export type CreditAccount = {
  id: string;
  owner: "customer" | "supplier";
  ownerName: string;
  label: string;
  balance: number;
  transactions: CreditTransaction[];
};

export const initialCareRequest: CareRequest = {
  seniorName: "Ms Lim",
  email: "ms.lim@example.com",
  phone: "+65 9123 4567",
  area: "Toa Payoh",
  careNeed: "Morning personal care support and medication reminders",
  urgency: "This week",
  schedule: "Weekdays, 8am to 11am",
  notes: "Prefers a Mandarin-speaking caregiver. Mild mobility support needed.",
};

export const freelanceCaregivers: Caregiver[] = [
  {
    id: "caregiver-grace",
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
    id: "caregiver-aisha",
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
    id: "caregiver-mei-fen",
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

export const initialCreditAccounts: CreditAccount[] = [
  {
    id: "customer-credits",
    owner: "customer",
    ownerName: "Ms Lim",
    label: "Customer matching credits",
    balance: 6,
    transactions: [
      {
        id: "customer-free-credit",
        type: "adjustment",
        amount: 1,
        description: "First matching service free credit",
      },
      {
        id: "customer-top-up",
        type: "top-up",
        amount: 5,
        description: "Operator-recorded customer top-up",
      },
    ],
  },
  {
    id: "supplier-credits",
    owner: "supplier",
    ownerName: "Grace Lee",
    label: "Supplier lead credits",
    balance: 4,
    transactions: [
      {
        id: "supplier-free-credit",
        type: "adjustment",
        amount: 1,
        description: "First qualified match free credit",
      },
      {
        id: "supplier-top-up",
        type: "top-up",
        amount: 3,
        description: "Operator-recorded supplier top-up",
      },
    ],
  },
];

export function getWorkflowSteps(phase: WorkflowPhase) {
  const order: WorkflowPhase[] = ["intake", "logged", "matched", "approved"];
  const current = order.indexOf(phase);

  return [
    {
      key: "intake",
      label: "Log care request",
      description: "Demand Agent structures the senior's request.",
    },
    {
      key: "logged",
      label: "Create agent tasks",
      description: "Maestro routes demand, supply, matching, and account work.",
    },
    {
      key: "matched",
      label: "Recommend caregiver",
      description: "Matching Agent scores valid freelance caregivers.",
    },
    {
      key: "approved",
      label: "Update accounts",
      description: "Operator approves match and credits are recorded.",
    },
  ].map((step, index) => ({
    ...step,
    status:
      index < current ? "done" : index === current ? "active" : "pending",
  })) as Array<{
    key: WorkflowPhase;
    label: string;
    description: string;
    status: WorkflowStepStatus;
  }>;
}

export function recommendCaregiver(
  request: CareRequest,
  caregivers: Caregiver[],
): MatchRecommendation {
  const eligible = caregivers.filter((caregiver) => caregiver.phoneVerified);
  const ranked = eligible
    .map((caregiver) => ({
      caregiver,
      score: scoreCaregiver(request, caregiver),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  return {
    caregiver: best.caregiver,
    score: best.score,
    rationale: `${best.caregiver.name} is the strongest fit because their availability, Central Singapore coverage, personal care experience, and language fit align with ${request.seniorName}'s request.`,
    risks: [
      "Operator should confirm comfort with medication reminders before introduction.",
      "Care details must be approved before sharing customer information externally.",
    ],
    nextAction:
      "Approve the match recommendation, then copy the prepared customer and caregiver email drafts manually.",
  };
}

export function approveMatchAndApplyCredits(
  accounts: CreditAccount[],
  recommendation: MatchRecommendation,
  request: CareRequest,
) {
  const matchLabel = `${request.seniorName} + ${recommendation.caregiver.name}`;

  return accounts.map((account) => {
    const isCustomer = account.owner === "customer";
    const amount = -1;
    const description = isCustomer
      ? `Used 1 customer matching credit for ${matchLabel}`
      : `Used 1 supplier lead credit for ${matchLabel}`;

    return {
      ...account,
      balance: account.balance + amount,
      transactions: [
        {
          id: `${account.id}-usage-${Date.now()}`,
          type: "usage" as const,
          amount,
          description,
          relatedMatch: matchLabel,
        },
        ...account.transactions,
      ],
    };
  });
}

export function createEmailDrafts(
  request: CareRequest,
  recommendation: MatchRecommendation,
) {
  return [
    {
      id: "customer-email",
      audience: "Customer",
      subject: `Caregiving match recommendation for ${request.seniorName}`,
      body: `Hi ${request.seniorName},\n\nWe found a potential caregiving match: ${recommendation.caregiver.name}. The match appears suitable for ${request.careNeed.toLowerCase()} in ${request.area}, especially for ${request.schedule}.\n\nBefore we share contact details, our operator will confirm the final care details and your approval.\n\nRegards,\nMatch`,
    },
    {
      id: "supplier-email",
      audience: "Supplier",
      subject: `New caregiving opportunity in ${request.area}`,
      body: `Hi ${recommendation.caregiver.name},\n\nWe have a potential caregiving request in ${request.area} for ${request.schedule}. The request involves ${request.careNeed.toLowerCase()}.\n\nPlease confirm your availability and comfort with the requested care scope before we proceed.\n\nRegards,\nMatch`,
    },
  ];
}

function scoreCaregiver(request: CareRequest, caregiver: Caregiver) {
  let score = 50;
  const requestText = `${request.area} ${request.schedule} ${request.careNeed} ${request.notes}`.toLowerCase();
  const caregiverText = `${caregiver.area} ${caregiver.availability} ${caregiver.offering} ${caregiver.scoreFactors.join(" ")}`.toLowerCase();

  if (caregiver.phoneVerified) score += 10;
  if (requestText.includes("toa payoh") && caregiverText.includes("central")) {
    score += 12;
  }
  if (requestText.includes("morning") && caregiverText.includes("morning")) {
    score += 10;
  }
  if (requestText.includes("personal care") && caregiverText.includes("personal care")) {
    score += 9;
  }
  if (requestText.includes("mandarin") && caregiverText.includes("mandarin")) {
    score += 5;
  }

  return Math.min(score, 100);
}
