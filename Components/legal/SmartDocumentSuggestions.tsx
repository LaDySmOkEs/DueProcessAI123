import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb, FileSignature, AlertCircle, WifiOff, Settings } from 'lucide-react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from '@/components/ui/textarea';
import { InvokeLLM } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const suggestionSchema = {
    type: "object",
    properties: {
        suggestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    reasoning: { type: "string" },
                    priority: { type: "string", enum: ["High", "Medium", "Low"] },
                    document_type: { 
                        type: "string", 
                        enum: ["civil_rights_complaint", "motion_to_dismiss", "discovery_request", "affidavit", "cease_desist", "motion_compel", "custody_agreement", "breach_of_contract_notice"],
                        description: "The type of document to generate"
                    }
                },
                required: ["title", "reasoning", "priority", "document_type"]
            }
        }
    },
    required: ["suggestions"]
};

const priorityMap = {
  High: { class: "bg-red-100 text-red-800 border-red-200" },
  Medium: { class: "bg-orange-100 text-orange-800 border-orange-200" },
  Low: { class: "bg-yellow-100 text-yellow-800 border-yellow-200" }
};
