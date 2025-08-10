
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added import for Input component
import { InvokeLLM, UploadFile } from "@/integrations/Core";
import { Camera, Search, Loader2, FileUp, Eye, TextCursor, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const photoSchema = {
    type: "object",
    properties: {
        overall_summary: {
            type: "string",
            description: "A detailed, narrative summary of everything visible in the photo."
        },
        objects_identified: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    object: { type: "string" },
                    description: { type: "string" },
                    potential_relevance: { type: "string" }
                }
            }
        },
        people_identified: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    description: { type: "string" },
