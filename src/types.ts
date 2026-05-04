export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type EffortLevel = 'quick' | 'moderate' | 'deep';
export type TeamStage = 'personal' | 'solo' | 'team' | 'growth' | 'enterprise';

export interface SafetyProfile {
  name: string;
  owner?: string;
  stage: TeamStage;
  description?: string;
  assets: string[];
  tools?: string[];
  concerns?: string[];
  priorityTags?: string[];
  completed?: string[];
  acceptedRisk?: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  why: string;
  action: string;
  evidence?: string;
  risk: RiskLevel;
  effort: EffortLevel;
  tags: string[];
  stages?: TeamStage[];
  references?: string[];
}

export interface ChecklistTemplate {
  id: string;
  title: string;
  version: string;
  description?: string;
  items: ChecklistItem[];
}

export interface PlanItem extends ChecklistItem {
  status: 'todo' | 'done' | 'accepted-risk';
  score: number;
  matchedTags: string[];
}

export interface SafetyPlan {
  profile: SafetyProfile;
  template: ChecklistTemplate;
  generatedAt: string;
  items: PlanItem[];
  summary: {
    total: number;
    todo: number;
    done: number;
    acceptedRisk: number;
    criticalOpen: number;
  };
}

export interface GenerateOptions {
  profilePath: string;
  templatePath: string;
  outputPath?: string;
  now?: Date;
}
