
import React, { useState, useEffect } from "react";
import { PoliceEncounter, FOIARequest } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  FileText, 
  Users, 
  Clock,
  Camera,
  Scale,
  ExternalLink
} from "lucide-react";

import ThreatLevelIndicator from "../components/anti-despotism/ThreatLevelIndicator";
import EncounterQuickStats from "../components/anti-despotism/EncounterQuickStats";  
import FOIATracker from "../components/anti-despotism/FOIATracker";
import EmergencyTools from "../components/anti-despotism/EmergencyTools";

export default function AntiDespotismDashboard() {
  const [encounters, setEncounters] = useState([]);
  const [foiaRequests, setFOIARequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [encountersData, foiaData] = await Promise.all([
        PoliceEncounter.list("-date_time", 10),
        FOIARequest.list("-date_submitted", 5)
      ]);
      setEncounters(encountersData);
      setFOIARequests(foiaData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getThreatLevel = () => {
    const recentEncounters = encounters.filter(e => {
      const encounterDate = new Date(e.date_time);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return encounterDate >= thirtyDaysAgo;
    });

    const violationsCount = recentEncounters.reduce((count, encounter) => {
      return count + (encounter.constitutional_violations?.length || 0);
    }, 0);

    if (violationsCount >= 5) return "high";
    if (violationsCount >= 2) return "medium";
    return "low";
  };

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Anti-Despotism Command Center</h1>
              <p className="text-slate-600 mt-1">Defending constitutional rights and government accountability</p>
            </div>
          </div>
        </div>

        {/* Emergency Tools - Always Visible */}
        <EmergencyTools />

        {/* Threat Level Assessment */}
        <ThreatLevelIndicator level={getThreatLevel()} />

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <EncounterQuickStats encounters={encounters} isLoading={isLoading} />
            
            {/* Recent Encounters */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-slate-900">Recent Police Encounters</CardTitle>
                  <Link to={createPageUrl("PoliceEncounters")}>
                    <Button variant="outline" size="sm" className="gap-2">
                      View All <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {encounters.length === 0 ? (
                  <div className="text-center py-8">
                    <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Encounters Logged</h3>
                    <p className="text-slate-600 mb-4">Document police interactions to build accountability</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {encounters.slice(0, 3).map((encounter) => (
                      <div key={encounter.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-900 capitalize">
                              {encounter.encounter_type.replace(/_/g, ' ')}
                            </h4>
                            <p className="text-sm text-slate-600">{encounter.location}</p>
                          </div>
                          <Badge variant={encounter.constitutional_violations?.length > 0 ? "destructive" : "secondary"}>
                            {new Date(encounter.date_time).toLocaleDateString()}
                          </Badge>
                        </div>
                        
                        {encounter.constitutional_violations?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {encounter.constitutional_violations.map((violation, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                {violation.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tools & Tracking */}
          <div className="space-y-8">
            <FOIATracker requests={foiaRequests} isLoading={isLoading} />
            
            {/* Quick Action Tools */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Accountability Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={createPageUrl("PublicRecordsRequest")}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    File FOIA Request
                  </Button>
                </Link>
                
                <Link to={createPageUrl("OfficerLookup")}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Eye className="w-5 h-5 text-purple-600" />
                    Officer Background Check
                  </Button>
                </Link>
                
                <Link to={createPageUrl("ConstitutionalViolations")}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Scale className="w-5 h-5 text-green-600" />
                    Document Violations
                  </Button>
                </Link>
                
                <Link to={createPageUrl("CommunityAlerts")}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Users className="w-5 h-5 text-orange-600" />
                    Community Network
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Encounters Documented</span>
                    <span className="font-bold text-slate-900">{encounters.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">FOIA Requests Filed</span>
                    <span className="font-bold text-slate-900">{foiaRequests.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Violations Flagged</span>
                    <span className="font-bold text-red-600">
                      {encounters.reduce((count, e) => count + (e.constitutional_violations?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
