
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InvokeLLM } from "@/integrations/Core";
import { Globe, Search, Loader2, Link as LinkIcon, User, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const socialSchema = {
    type: "object",
    properties: {
        search_summary: {
            type: "string",
            description: "A summary of the overall findings and assessment of the subject's online presence."
        },
        profiles_found: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    platform: { type: "string" },
                    url: { type: "string" },
                    username: { type: "string" },
                    bio: { type: "string" },
                    confidence: { type: "string", enum: ["High", "Medium", "Low"] }
                }
            }
        },
        key_posts: {
            type: "array",
