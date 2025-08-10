import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvokeLLM } from "@/integrations/Core";
import { Users, Search, Loader2, Phone, MapPin, User, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const witnessSearchSchema = {
    type: "object",
    properties: {
        search_results: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    full_name: { type: "string" },
                    age_range: { type: "string" },
                    current_address: { type: "string" },
                    previous_addresses: { type: "array", items: { type: "string" } },
                    phone_numbers: { type: "array", items: { type: "string" } },
                    email_addresses: { type: "array", items: { type: "string" } },
                    employment: { type: "string" },
                    relatives: { type: "array", items: { type: "string" } },
                    social_media_profiles: { type: "array", items: { type: "string" } },
                    confidence_score: { type: "integer", minimum: 0, maximum: 100 }
                }
            }
        },
        alternative_spellings: {
            type: "array",
            items: { type: "string" },
            description: "Possible alternative spellings or variations of the name"
