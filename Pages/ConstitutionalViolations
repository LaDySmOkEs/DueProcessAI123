import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Scale } from "lucide-react";

export default function ConstitutionalViolations() {
    return (
        <div className="p-6 space-y-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                            <Scale className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Document Violations</h1>
                            <p className="text-slate-600 mt-1">Log potential violations of your constitutional rights.</p>
                        </div>
                    </div>
                </div>

                <Card className="border-0 shadow-lg bg-white text-center">
                    <CardHeader>
                        <CardTitle>Your Record of Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-700 mb-4">This section is for documenting specific interactions and events where you believe your rights were violated. These records are crucial for building a case or filing a complaint.</p>
                        <Link to={createPageUrl("SubmitViolation")}>
                            <Button className="bg-green-600 hover:bg-green-700">Log a New Violation</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
