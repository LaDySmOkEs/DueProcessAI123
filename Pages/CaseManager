import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LegalCase } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, Plus, Calendar, AlertCircle, CheckCircle, Clock, Scale } from "lucide-react";
import { format } from "date-fns";

export default function CaseManager() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        try {
            const casesData = await LegalCase.list("-created_date");
            setCases(casesData);
        } catch (error) {
            console.error("Error loading cases:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCases = cases.filter(case_ =>
        case_.case_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.case_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'closed': return 'bg-slate-100 text-slate-800 border-slate-200';
            case 'archived': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return CheckCircle;
            case 'pending': return Clock;
            case 'closed': return AlertCircle;
            default: return Clock;
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Case Manager</h1>
                            <p className="text-slate-600 mt-1">Organize and track your legal cases with AI-powered insights</p>
                        </div>
                    </div>
                </div>

                {/* Search and Add Case */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Search cases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link to={createPageUrl("CreateCase")}>
                        <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                            <Plus className="w-4 h-4" />
                            New Case
                        </Button>
                    </Link>
                </div>

                {/* Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array(6).fill(0).map((_, i) => (
                            <Card key={i} className="border-0 shadow-lg bg-white">
                                <CardContent className="p-6">
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 rounded"></div>
                                            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : filteredCases.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <Scale className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Cases Found</h3>
                            <p className="text-slate-600 mb-6">
                                {searchTerm ? "No cases match your search criteria." : "Start by creating your first legal case."}
                            </p>
                            <Link to={createPageUrl("CreateCase")}>
                                <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                                    <Plus className="w-4 h-4" />
                                    Create First Case
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        filteredCases.map((case_) => {
                            const StatusIcon = getStatusIcon(case_.status);
                            return (
 
