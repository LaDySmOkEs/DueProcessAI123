import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
    submitted: "bg-blue-100 text-blue-800 border-blue-200",
    acknowledged: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-orange-100 text-orange-800 border-orange-200",
    fulfilled: "bg-green-100 text-green-800 border-green-200",
    denied: "bg-red-100 text-red-800 border-red-200",
    overdue: "bg-purple-100 text-purple-800 border-purple-200"
};

const statusIcons = {
    submitted: Clock,
    acknowledged: Clock,
    processing: Clock,
    fulfilled: CheckCircle,
    denied: AlertCircle,
    overdue: AlertCircle
};

export default function FOIATracker({ requests, isLoading }) {
    if (isLoading) {
        return (
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">FOIA Request Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="p-3 border border-slate-200 rounded-lg">
                                <div className="animate-pulse space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                </div>
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
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-slate-900">FOIA Request Tracker</CardTitle>
                    <Link to={createPageUrl("PublicRecordsRequest")}>
                        <Button size="sm" className="gap-2">
                            <Plus className="w-4 h-4" />
                            New Request
                        </Button>
                    </Link>
                </div>
            </CardHeader>
 
