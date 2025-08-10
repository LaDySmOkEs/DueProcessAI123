
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PoliceInteraction } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { AlertTriangle, Calendar, MapPin, Plus, Search, Filter } from "lucide-react";
import { format } from "date-fns";

const severityColors = {
    minor: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    serious: "bg-orange-100 text-orange-800 border-orange-200",
    severe: "bg-red-100 text-red-800 border-red-200"
};

const encounterTypeLabels = {
    traffic_stop: "Traffic Stop",
    pedestrian_stop: "Pedestrian Stop",
    home_visit: "Home Visit",
    arrest: "Arrest",
    questioning: "Questioning",
    other: "Other"
};

export default function MyIncidents() {
    const [interactions, setInteractions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    useEffect(() => {
        loadInteractions();
    }, []);

    const loadInteractions = async () => {
        try {
            const data = await PoliceInteraction.list("-date");
            setInteractions(data);
        } catch (error) {
            console.error("Error loading interactions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredInteractions = interactions.filter(interaction => {
        const matchesSearch = interaction.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             interaction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (interaction.agency && interaction.agency.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesSeverity = severityFilter === "all" || interaction.severity_level === severityFilter;
        const matchesType = typeFilter === "all" || interaction.encounter_type === typeFilter;
        
        return matchesSearch && matchesSeverity && matchesType;
    });

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">My Incidents</h1>
                                <p className="text-slate-600 mt-1">Your documented police interactions and due process audits</p>
                            </div>
                        </div>
                        <Link to={createPageUrl("ReportIncident")}>
                            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                                <Plus className="w-4 h-4" />
                                Report New Incident
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <Card className="border-0 shadow-sm bg-white mb-6">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-slate-500" />
                                <Input
                                    placeholder="Search incidents..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-500" />
                                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Severity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Severity</SelectItem>
                                        <SelectItem value="minor">Minor</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="serious">Serious</SelectItem>
                                        <SelectItem value="severe">Severe</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
 
