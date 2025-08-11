
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileSignature, Shield, MailWarning, FileText, Scale, BrainCircuit, Search, Gavel, Users, Info } from 'lucide-react'; // Kept original icons and added new ones
import { Link } from "react-router-dom"; // Still needed for createPageUrl, even if not directly used in new flow
import { createPageUrl } from "@/utils"; // Still needed for createPageUrl
import SmartDocumentSuggestions from '../components/legal/SmartDocumentSuggestions';
import DocumentGenerator from '../components/legal/DocumentGenerator';
import SubscriptionGate from '../components/subscription/SubscriptionGate';
import { AnalyzedDocument, PoliceInteraction } from "@/entities/all"; // Import entities
import { useToast } from "@/components/ui/use-toast"; // Import useToast

const documentTypes = [
  {
    id: "civil_rights_complaint",
    title: "Civil Rights Complaint (§ 1983)",
    description: "Federal civil rights complaint for constitutional violations by government officials",
    icon: Shield,
    color: "bg-blue-600 hover:bg-blue-700",
    link: "CivilRightsComplaintBuilder",
    featured: true
  },
  {
    id: "breach_of_contract_notice",
    title: "Breach of Contract Notice",
    description: "Formally notify a party that they have violated a contract",
    icon: MailWarning,
    color: "bg-red-600 hover:bg-red-700",
