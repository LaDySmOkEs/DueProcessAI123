
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InvokeLLM } from "@/integrations/Core";
import { BrainCircuit, Loader2, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import ConfidenceGauge from './ConfidenceGauge';
import { useToast } from "@/components/ui/use-toast";

// Mock for LitigationStrategy if it's not a real import in the provided context
// In a real application, this would be an actual API client or ORM for your backend
const LitigationStrategy = {
    create: async (data) => {
        console.log("Mock LitigationStrategy.create called with:", data);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // Return a mock response or throw an error for testing failure
        return { success: true, id: Math.random().toString(36).substring(7) };
    }
};

const analysisSchema = {
    type: "object",
    properties: {
        case_assessment: {
            type: "object",
            properties: {
                case_type_analysis: { type: "string", description: "Detailed analysis of what type of legal case this is and its implications" },
                jurisdiction_considerations: { type: "string", description: "Analysis of jurisdictional issues and venue considerations" },
                statute_of_limitations: { type: "string", description: "Detailed analysis of timing constraints and deadlines" }
            }
        },
        key_strengths: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    strength_category: { type: "string", description: "Category of strength (factual, legal, procedural, etc.)" },
                    detailed_point: { type: "string", description: "The specific strength or argument to focus on" },
                    comprehensive_explanation: { type: "string", description: "Thorough explanation of why this is powerful and how to leverage it" },
                    supporting_evidence_needed: { type: "string", description: "What additional evidence would strengthen this point" },
                    legal_precedents: { type: "string", description: "Relevant case law or legal precedents that support this strength" },
                    strategic_implementation: { type: "string", description: "Specific tactical advice on how to present this strength" }
                },
                required: ["strength_category", "detailed_point", "comprehensive_explanation"]
            },
            description: "Comprehensive analysis of the most compelling points that form the core of a winning strategy"
        },
        red_flags: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    risk_category: { type: "string", description: "Category of risk (evidentiary, procedural, factual, legal)" },
                    detailed_risk: { type: "string", description: "The specific weakness, risk, or potential counter-argument" },
                    impact_analysis: { type: "string", description: "Detailed analysis of how this could damage the case" },
                    likelihood_assessment: { type: "string", description: "How likely is this risk to materialize" },
                    comprehensive_mitigation: { type: "string", description: "Detailed strategy to address, neutralize, or minimize this weakness" },
                    alternative_approaches: { type: "string", description: "Alternative legal theories or approaches if this risk proves fatal" },
                    evidence_gaps: { type: "string", description: "What evidence is missing and how to obtain it" }
                },
 
