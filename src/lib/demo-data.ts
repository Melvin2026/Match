import {
  ClipboardCheck,
  HeartHandshake,
  MailCheck,
  UserRoundCheck,
} from "lucide-react";

export const initialDashboard = {
  metrics: [
    {
      label: "Open senior requests",
      value: "12",
      note: "Invite-only caregiving requests in Singapore.",
      icon: HeartHandshake,
    },
    {
      label: "Freelance caregivers",
      value: "18",
      note: "13 have valid phone numbers on file.",
      icon: UserRoundCheck,
    },
    {
      label: "Pending approvals",
      value: "7",
      note: "Email drafts and match recommendations.",
      icon: MailCheck,
    },
    {
      label: "Agent tasks",
      value: "21",
      note: "Maestro-coordinated workflow items.",
      icon: ClipboardCheck,
    },
  ],
  demands: [
    {
      id: "demand-1",
      name: "Mr Tan",
      need: "Weekday companionship and meal reminders",
      area: "Tampines",
      status: "Needs match",
      tone: "warning" as const,
    },
    {
      id: "demand-2",
      name: "Ms Lim",
      need: "Morning personal care support",
      area: "Toa Payoh",
      status: "Draft ready",
      tone: "success" as const,
    },
    {
      id: "demand-3",
      name: "Mr Ong",
      need: "Post-discharge caregiving check-ins",
      area: "Queenstown",
      status: "Sensitive review",
      tone: "rose" as const,
    },
  ],
  caregivers: [
    {
      id: "caregiver-1",
      name: "Aisha Rahman",
      area: "East",
      availability: "Weekdays",
      verified: true,
    },
    {
      id: "caregiver-2",
      name: "Grace Lee",
      area: "Central",
      availability: "Mornings",
      verified: true,
    },
    {
      id: "caregiver-3",
      name: "Mei Fen",
      area: "West",
      availability: "Phone pending",
      verified: false,
    },
  ],
  matches: [
    {
      id: "match-1",
      title: "Ms Lim + Grace Lee",
      score: 86,
      rationale:
        "Strong fit on location, morning availability, and personal care experience.",
    },
    {
      id: "match-2",
      title: "Mr Tan + Aisha Rahman",
      score: 78,
      rationale:
        "Good weekday availability and East coverage. Operator should confirm meal reminder comfort.",
    },
  ],
  approvals: [
    {
      id: "approval-1",
      type: "Email",
      title: "Follow-up questions for Mr Tan",
      summary:
        "Clarifies preferred visit times, mobility constraints, and emergency contact.",
    },
    {
      id: "approval-2",
      type: "Match",
      title: "Recommend Grace Lee to Ms Lim",
      summary:
        "Operator must approve before caregiver details are shared with customer.",
    },
  ],
  agentTasks: [
    {
      id: "task-1",
      agent: "Demand Agent",
      task: "Collect missing emergency contact and visit schedule for Mr Tan.",
      status: "In progress",
      tone: "warning" as const,
    },
    {
      id: "task-2",
      agent: "Supply Agent",
      task: "Verify Mei Fen's phone number before matching.",
      status: "Queued",
      tone: "neutral" as const,
    },
    {
      id: "task-3",
      agent: "Matching Agent",
      task: "Score Central caregivers against Ms Lim's morning care request.",
      status: "Ready",
      tone: "success" as const,
    },
  ],
};
