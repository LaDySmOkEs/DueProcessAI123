import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, FileText, Loader2, Link as LinkIcon, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AnalysisResult({ result, isAnalyzing, showError }) {
  if (isAnalyzing && !result) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Analyzing Document...</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-12">
          <Loader2 className="w-12 h-12 text-slate-500 mx-auto animate-spin mb-4" />
          <p className="text-slate-600">The AI is performing a deep analysis. This may take a moment for larger documents.</p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Awaiting Analysis</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-12">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload a document to begin</h3>
          <p className="text-slate-600 text-sm">
            Your AI-powered analysis report will appear here once you submit a document.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { document_name, ai_summary, ai_analysis, error, saved_document_id } = result;

  if (error) {
    return (
      <Card className={`border-2 shadow-lg bg-white ${showError ? 'border-red-300' : ''}`}>
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-6 h-6" />
            Analysis Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="font-semibold text-slate-900 mb-2">Document: {document_name}</p>
          <p className="text-red-700">{ai_summary}</p>
        </CardContent>
      </Card>
    );
  }

  const isVideoAnalysis = result.document_type === 'video_evidence';

  const renderDocumentAnalysis = () => (
    <>
      {/* Key Entities */}
      {ai_analysis?.key_entities && (
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">Key Entities</h4>
          <div className="space-y-2 text-sm">
            <p><strong>People:</strong> {ai_analysis.key_entities.people?.map(p => p.name).join(', ') || 'N/A'}</p>
            <p><strong>Dates:</strong> {ai_analysis.key_entities.dates?.map(d => d.date).join(', ') || 'N/A'}</p>
            <p><strong>Locations:</strong> {ai_analysis.key_entities.locations?.map(l => l.location).join(', ') || 'N/A'}</p>
          </div>
        </div>
      )}

      {/* Critical Analysis */}
      {ai_analysis?.critical_analysis && (
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">Critical Analysis</h4>
          <div className="space-y-2 text-sm">
            {ai_analysis.critical_analysis.procedural_violations?.length > 0 && (
              <div className="p-2 bg-red-50 rounded-md">
                <p className="font-bold text-red-700">Procedural Violations Found:</p>
                <ul className="list-disc list-inside">
                  {ai_analysis.critical_analysis.procedural_violations.map((v, i) => <li key={i}>{v.violation_type}: {v.evidence_of_violation}</li>)}
                </ul>
              </div>
 
