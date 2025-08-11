import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const threatLevelConfig = {
    low: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
        title: "Constitutional Protections Stable",
        description: "No significant patterns of violations detected in your area.",
        iconColor: "text-green-600"
    },
    medium: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: AlertTriangle,
        title: "Moderate Due Process Concerns",
        description: "Some procedural issues detected. Increased vigilance recommended.",
        iconColor: "text-yellow-600"
    },
    high: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Shield,
        title: "Constitutional Rights Under Threat",
        description: "Significant violations detected. Exercise extreme caution and document everything.",
        iconColor: "text-red-600"
    }
};

export default function ThreatLevelIndicator({ level }) {
    const config = threatLevelConfig[level] || threatLevelConfig.low;
    const Icon = config.icon;

    return (
        <Card className="border-0 shadow-lg bg-white mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    Constitutional Threat Assessment
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{config.title}</h3>
                        <p className="text-slate-600 text-sm">{config.description}</p>
                    </div>
                    <Badge className={`${config.color} border font-bold uppercase tracking-wider px-4 py-2`}>
                        {level} Risk
                    </Badge>
                </div>
                
                {level === "high" && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                            <strong>Recommended Actions:</strong> Document all interactions, travel with witnesses when possible, 
                            know your rights, and consider legal consultation for any government interactions.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
