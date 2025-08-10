import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InvokeLLM } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download, Loader2, Shield } from 'lucide-react';

export default function LegalDefenseMemorandum() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedMemo, setGeneratedMemo] = useState("");
    const [formData, setFormData] = useState({
        case_title: "",
        charges: "",
        key_facts: "",
        legal_issues: "",
        defense_strategy: ""
    });
    const { toast } = useToast();

    const generateMemorandum = async () => {
        if (!formData.case_title || !formData.charges || !formData.key_facts) {
            toast({
                title: "Missing Information",
                description: "Please fill in at least the case title, charges, and key facts.",
                variant: "destructive",
            });
            return;
        }

        setIsGenerating(true);
        try {
            const prompt = `Generate a comprehensive legal defense memorandum based on the following information:

Case Title: ${formData.case_title}
Charges: ${formData.charges}
Key Facts: ${formData.key_facts}
Legal Issues: ${formData.legal_issues}
Defense Strategy Notes: ${formData.defense_strategy}

The memorandum should include:
1. Case Summary
2. Legal Issues Analysis
3. Defense Strategy
4. Evidence Requirements
5. Potential Motions to File
6. Risk Assessment
7. Recommendations

Format this as a professional legal memorandum that could be used by defense counsel.`;

            const result = await InvokeLLM({ prompt });
            setGeneratedMemo(result);
            toast({
                title: "Memorandum Generated",
                description: "Your defense memorandum is ready for review.",
            });
        } catch (error) {
            toast({
                title: "Generation Failed",
                description: "Failed to generate memorandum. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadMemo = () => {
        const blob = new Blob([generatedMemo], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Defense_Memorandum_${formData.case_title?.replace(/\s+/g, '_') || 'Case'}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        toast({
            title: "Memorandum Downloaded",
            description: "Your defense memorandum has been saved as a text file.",
        });
    };

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-slate-800 rounded-xl flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Legal Defense Memorandum</h1>
                            <p className="text-slate-600 mt-1">Generate a comprehensive defense strategy memorandum</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle>Case Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="case_title">Case Title *</Label>
                                    <Input
                                        id="case_title"
                                        placeholder="e.g., State v. Smith"
                                        value={formData.case_title}
                                        onChange={(e) => setFormData({...formData, case_title: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="charges">Charges *</Label>
                                    <Textarea
                                        id="charges"
                                        placeholder="List all charges and statutes"
                                        value={formData.charges}
                                        onChange={(e) => setFormData({...formData, charges: e.target.value})}
                                        className="h-20"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="key_facts">Key Facts *</Label>
                                    <Textarea
                                        id="key_facts"
                                        placeholder="Summarize the key facts of the case"
                                        value={formData.key_facts}
                                        onChange={(e) => setFormData({...formData, key_facts: e.target.value})}
                                        className="h-32"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="legal_issues">Legal Issues</Label>
                                    <Textarea
                                        id="legal_issues"
                                        placeholder="Identify key legal issues (optional)"
                                        value={formData.legal_issues}
                                        onChange={(e) => setFormData({...formData, legal_issues: e.target.value})}
                                        className="h-24"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="defense_strategy">Defense Strategy Notes</Label>
                                    <Textarea
                                        id="defense_strategy"
                                        placeholder="Any initial thoughts on defense strategy (optional)"
                                        value={formData.defense_strategy}
                                        onChange={(e) => setFormData({...formData, defense_strategy: e.target.value})}
                                        className="h-24"
                                    />
                                </div>

                                <Button onClick={generateMemorandum} disabled={isGenerating} className="w-full">
                                    {isGenerating ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                                    ) : (
                                        "Generate Defense Memorandum"
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Generated Memorandum</CardTitle>
                                    {generatedMemo && (
                                        <Button onClick={downloadMemo} size="sm" className="gap-2">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-4 rounded-lg border min-h-[400px] max-h-[600px] overflow-y-auto">
                                    {generatedMemo ? (
                                        <pre className="whitespace-pre-wrap text-sm text-slate-900 font-mono leading-relaxed">
                                            {generatedMemo}
                                        </pre>
                                    ) : (
                                        <div className="text-center py-12 text-slate-500">
                                            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                            <p>Fill out the case information and click "Generate" to create your defense memorandum.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
