import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";
import { Search, Loader2, FileText, Building, User, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const searchSchema = {
    type: "object",
    properties: {
        search_summary: {
            type: "string",
            description: "A comprehensive summary of findings"
        },
        court_records: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    case_name: { type: "string" },
                    court: { type: "string" },
                    case_number: { type: "string" },
                    date: { type: "string" },
                    status: { type: "string" },
                    summary: { type: "string" }
                }
            }
        },
        property_records: {
            type: "array",
