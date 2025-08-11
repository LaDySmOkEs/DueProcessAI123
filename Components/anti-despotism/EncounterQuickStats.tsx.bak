import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, AlertTriangle, Calendar, TrendingUp } from "lucide-react";

export default function EncounterQuickStats({ encounters, isLoading }) {
    const getStats = () => {
        const total = encounters.length;
        const withViolations = encounters.filter(e => 
            e.constitutional_violations && e.constitutional_violations.length > 0
        ).length;
        const lastMonth = encounters.filter(e => {
            const encounterDate = new Date(e.date_time);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return encounterDate >= thirtyDaysAgo;
        }).length;
        const violationRate = total > 0 ? Math.round((withViolations / total) * 100) : 0;

        return { total, withViolations, lastMonth, violationRate };
    };

    const stats = getStats();

    if (isLoading) {
        return (
            <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="text-center">
                                <div className="h-8 bg-slate-200 rounded mb-2 animate-pulse"></div>
                                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Encounter Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3">
                            <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                        <div className="text-sm text-slate-600">Total Encounters</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mx-auto mb-3">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.withViolations}</div>
                        <div className="text-sm text-slate-600">With Violations</div>
                    </div>
                    
 
