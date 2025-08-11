"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/RouterCompat";
import { createPageUrl } from "@/functions/index";
import { Plus, BookOpen, AlertTriangle, Gavel } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Due Process Audit",
      description: "Review government procedures for constitutional compliance", 
      icon: Plus,
      href: createPageUrl("ReportIncident"),
      color: "bg-amber-600 hover:bg-amber-700",
      priority: "primary"
    },
    {
      title: "Constitutional Rights",
      description: "Learn procedural protections and due process guarantees",
      icon: BookOpen, 
      href: createPageUrl("KnowYourRights"),
      color: "bg-amber-700 hover:bg-amber-800",
      priority: "primary"
    },
    {
      title: "File Due Process Violation",
      description: "Document procedural failures and constitutional breaches",
      icon: AlertTriangle,
      href: createPageUrl("SubmitViolation"),
      color: "bg-red-600 hover:bg-red-700", 
      priority: "urgent"
    },
    {
      title: "Legal Process Review",
      description: "AI analysis of procedural compliance in your case",
      icon: Gavel,
      href: createPageUrl("DocumentAnalyzer"),
      color: "bg-slate-700 hover:bg-slate-800",
      priority: "secondary"
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Due Process Protection Center</h2>
        <p className="text-slate-600 mb-6 text-sm">Essential tools for defending your constitutional right to procedural fairness</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Button 
                className={`w-full h-auto p-4 ${action.color} text-white flex flex-col gap-3 relative`}
                variant="default"
              >
                {action.priority === "urgent" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                )}
                <action.icon className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
