
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Bot } from 'lucide-react';
import ScenarioSelector from '../components/courtroomsimulator/ScenarioSelector';
import SubscriptionGate from '../components/subscription/SubscriptionGate';

export default function CourtroomSimulator() {
  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-slate-800 rounded-xl flex items-center justify-center">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI Courtroom Simulator</h1>
              <p className="text-slate-600 mt-1">Hone your skills against a challenging AI opponent.</p>
            </div>
          </div>
        </div>

        <SubscriptionGate feature="courtroom_simulator">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                  <ScenarioSelector />
              </div>
              <div className="lg:col-span-1">
                   <Card className="border-0 shadow-lg bg-white sticky top-6">
                      <CardHeader>
