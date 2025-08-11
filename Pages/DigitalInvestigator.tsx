import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search, FileText, Users, Archive, Shield, MapPin, Phone, Globe, Camera } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const tools = [
  { 
    title: "FOIA Request Builder", 
    description: "Draft, manage, and track Freedom of Information Act (FOIA) requests to obtain government records.", 
    icon: FileText, 
    link: createPageUrl("PublicRecordsRequest"), 
    status: 'active' 
  },
  { 
    title: "Officer Background Check", 
    description: "Look up public records and complaint histories for law enforcement officers.", 
    icon: Shield, 
    link: createPageUrl("OfficerLookup"), 
    status: 'active' 
  },
  { 
    title: "Public Records Deep Dive", 
    description: "AI-powered search across court records, property records, business filings, and more.", 
    icon: Search, 
    link: createPageUrl("PublicRecordsSearch"), 
    status: 'active' 
  },
  { 
    title: "Witness & Contact Locator", 
    description: "Find current addresses, phone numbers, and background information on key individuals.", 
    icon: Users, 
    link: createPageUrl("WitnessLocator"), 
    status: 'active' 
  },
  { 
    title: "Location Intelligence", 
    description: "Analyze crime statistics, demographic data, and incident patterns for any location.", 
    icon: MapPin, 
    link: createPageUrl("LocationIntelligence"), 
    status: 'active' 
  },
  { 
    title: "Social Media Investigation", 
    description: "Ethically gather public social media evidence and track online activity.", 
    icon: Globe, 
    link: createPageUrl("SocialMediaInvestigation"), 
    status: 'active' 
  },
  { 
    title: "Evidence Preservation Suite", 
    description: "Securely archive webpages, documents, and digital evidence with timestamps.", 
    icon: Archive, 
    link: createPageUrl("EvidencePreservation"), 
    status: 'active' 
  },
  { 
    title: "Photo Analysis & Enhancement", 
    description: "Enhance photos, extract metadata, and analyze visual evidence using AI.", 
    icon: Camera, 
    link: createPageUrl("PhotoAnalysis"), 
    status: 'active' 
  }
];
