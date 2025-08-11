// Entity definitions for Due Process AI
export interface PoliceInteraction {
  id: string;
  date: Date;
  location: string;
  description: string;
  officerBadge?: string;
  witnessCount: number;
  status: 'active' | 'resolved' | 'pending';
}

export interface KnowYourRightsModule {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
}

export interface LegalCase {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'pending';
  dateCreated: Date;
  lastUpdated: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface LegalDocument {
  id: string;
  title: string;
  type: string;
  content: string;
  dateCreated: Date;
}

export interface DueProcessViolation {
  id: string;
  type: string;
  description: string;
  date: Date;
  status: string;
}

export interface PoliceEncounter {
  id: string;
  date: Date;
  location: string;
  description: string;
  outcome: string;
}

export interface FOIARequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'denied';
  dateSubmitted: Date;
}

export interface ComplaintTracker {
  id: string;
  title: string;
  status: string;
  dateSubmitted: Date;
}

export interface AnalyzedDocument {
  id: string;
  title: string;
  analysis: string;
  confidence: number;
}

export interface ClassActionPotential {
  id: string;
  title: string;
  description: string;
  viability: number;
}

export interface DocumentCollection {
  id: string;
  name: string;
  documents: LegalDocument[];
}

export interface LitigationStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
}