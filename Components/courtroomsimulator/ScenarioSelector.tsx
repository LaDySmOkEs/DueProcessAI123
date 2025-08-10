import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, MessageSquare, UserCheck } from "lucide-react";

const scenarios = [
    { title: "Cross-Examine a Hostile Witness", description: "Practice controlling the narrative and extracting key admissions from a difficult witness.", icon: UserCheck, status: 'active'},
    { title: "Make & Defend Objections", description: "Train to quickly identify and argue common evidentiary objections.", icon: Gavel, status: 'active'},
    { title: "Deliver an Opening Statement", description: "Get AI coaching on the structure, clarity, and persuasiveness of your opening statement.", icon: MessageSquare, status: 'coming soon'},
    { title: "Closing Argument Practice", description: "Practice summarizing the evidence and arguing for your desired outcome.", icon: MessageSquare, status: 'coming soon'},
];

export default function ScenarioSelector() {
    return (
        <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
                <CardTitle>Select a Training Scenario</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenarios.map(scenario => (
                         <Card key={scenario.title} className="bg-slate-50 flex flex-col">
                             <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-base">
                                    <scenario.icon className="w-5 h-5 text-red-700" />
                                    {scenario.title}
                                </CardTitle>
                             </CardHeader>
                             <CardContent className="flex-grow">
                                 <p className="text-sm text-slate-600 mb-4">{scenario.description}</p>
                             </CardContent>
                             <CardContent>
                                 <Button variant="destructive" disabled={scenario.status !== 'active'} className="w-full">
                                     {scenario.status === 'active' ? 'Begin Simulation' : 'Coming Soon'}
                                 </Button>
                             </CardContent>
                         </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
