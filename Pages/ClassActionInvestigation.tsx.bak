
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClassActionPotential, DueProcessViolation } from "@/entities/all";
import { Scale, Users, FileText, Globe, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function ClassActionInvestigation() {
    const [searchParams] = useSearchParams();
    const potentialId = searchParams.get('id');
    const [potential, setPotential] = useState(null);
    const [violations, setViolations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!potentialId) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const potentialData = await ClassActionPotential.get(potentialId);
                setPotential(potentialData);
                
                if (potentialData && potentialData.linked_violation_ids) {
                    const violationPromises = potentialData.linked_violation_ids.map(id => DueProcessViolation.get(id));
                    const violationData = await Promise.all(violationPromises);
                    setViolations(violationData.filter(v => v)); // Filter out any nulls if a get fails
                }
            } catch (err) {
                console.error("Error fetching investigation data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [potentialId]);

    if (isLoading) {
        return <div className="p-6">Loading investigation details...</div>;
    }

    if (!potential) {
        return <div className="p-6">Investigation not found.</div>;
    }

    return (
        <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Badge variant={potential.status === 'emerging' ? 'destructive' : 'secondary'} className="mb-2">{potential.status}</Badge>
                    <h1 className="text-3xl font-bold text-slate-900">{potential.title}</h1>
                    <p className="text-slate-600 mt-2 text-lg">{potential.summary}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-900">AI Analysis of Pattern</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-slate-700">
                                <p><strong>Targeted Agency:</strong> {potential.target_agency}</p>
                                <p><strong>Common Violation Identified:</strong> {potential.common_violation.replace(/_/g, ' ')}</p>
                                <p><strong>Geographic Scope:</strong> {potential.geographic_scope}</p>
                                <p><strong>Potential Class Size:</strong> Approximately {potential.estimated_class_size} individuals affected based on reports.</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-900">Supporting Case Reports ({violations.length})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                                {violations.map(v => (
                                    <div key={v.id} className="p-3 border border-slate-200 rounded-lg">
                                        <p className="text-sm text-slate-700 line-clamp-2">{v.incident_description}</p>
                                        <p className="text-xs text-slate-500 mt-1">{new Date(v.incident_date).toLocaleDateString()} - {v.location_city}, {v.location_state}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card className="border-0 shadow-lg bg-red-50 border-red-200">
                            <CardHeader>
                                <CardTitle className="text-red-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Are You Affected?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-800 mb-4 text-sm">If you have experienced a similar violation by this agency, your story is critical. Add your report to strengthen this case.</p>
                                <Link to={createPageUrl("SubmitViolation")}>
                                    <Button className="w-full bg-red-600 hover:bg-red-700">I Was Affected Too</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-lg bg-white">
                             <CardHeader>
                                <CardTitle className="text-slate-900 flex items-center gap-2"><Scale className="w-5 h-5"/> Seek Legal Counsel</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-slate-600">Connect with organizations that specialize in constitutional law and civil rights litigation.</p>
                                <Button variant="outline" className="w-full justify-between" asChild>
                                    <a href="https://www.aclu.org/about/affiliates" target="_blank" rel="noopener noreferrer">ACLU Affiliate Finder <ExternalLink className="w-4 h-4" /></a>
                                </Button>
                                 <Button variant="outline" className="w-full justify-between" asChild>
                                    <a href="https://www.findjustice.com/" target="_blank" rel="noopener noreferrer">National Police Accountability Project <ExternalLink className="w-4 h-4" /></a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
