
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom'; // Added Link
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LegalCase, LegalDocument } from "@/entities/all";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Calendar, Users, FileText, Edit, Briefcase, BrainCircuit } from "lucide-react"; // Added BrainCircuit
import { format } from "date-fns";

export default function CaseDetails() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const caseId = searchParams.get('id');
    
    const [caseData, setCaseData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (caseId) {
            loadCaseDetails();
        }
    }, [caseId]);

    const loadCaseDetails = async () => {
        try {
            // Load case details
            const cases = await LegalCase.list();
            const foundCase = cases.find(c => c.id === caseId);
            setCaseData(foundCase);

            // Load related documents
            const allDocuments = await LegalDocument.list();
            const relatedDocs = allDocuments.filter(doc => doc.case_id === caseId);
            setDocuments(relatedDocs);
        } catch (error) {
            console.error("Error loading case details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'closed': return 'bg-slate-100 text-slate-800 border-slate-200';
            case 'archived': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 space-y-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="h-32 bg-slate-200 rounded"></div>
                            <div className="h-32 bg-slate-200 rounded"></div>
                            <div className="h-32 bg-slate-200 rounded"></div>
                        </div>
 
