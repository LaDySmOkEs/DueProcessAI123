import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";
import { Gavel, Search, Loader2, AlertTriangle, ExternalLink, Scale, FileText, Eye } from "lucide-react";

const judicialSearchSchema = {
    type: "object",
    properties: {
        judge_found: {
            type: "boolean",
            description: "Whether any disciplinary or accountability information was found for this judge"
        },
        summary: {
            type: "string",
            description: "Overall summary of the judge's disciplinary record and accountability issues"
        },
        disciplinary_actions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    date: { type: "string", description: "Date of disciplinary action" },
                    issuing_body: { type: "string", description: "Which judicial conduct board or authority issued the discipline" },
                    violation_type: { type: "string", description: "Type of misconduct (bias, financial conflicts, inappropriate conduct, etc.)" },
                    penalty: { type: "string", description: "Penalty imposed (censure, suspension, fine, etc.)" },
                    details: { type: "string", description: "Detailed description of the misconduct" },
                    case_impact: { type: "string", description: "Whether this affected specific cases or rulings" }
                }
            },
