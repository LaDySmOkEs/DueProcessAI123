import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { InvokeLLM } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  Gavel, 
  FileText, 
  BrainCircuit, 
  Scale,
  Search,
  Eye,
  AlertCircle,
  Loader2
} from 'lucide-react';

const EvidenceChecklistItem = ({ text }) => (
    <li className="flex items-start">
        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
        <span>{text}</span>
    </li>
);

export default function MaliciousProsecutionDefense() {
    const [caseSummary, setCaseSummary] = useState('');
    const [strategy, setStrategy] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const handleGenerateStrategy = async () => {
        if (!caseSummary.trim()) {
            toast({
                title: "Case Summary Required",
                description: "Please describe your situation to generate a strategy.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        setStrategy(null);
        try {
            const prompt = `You are a top-tier civil rights attorney specializing in §1983 malicious prosecution cases against law enforcement. Analyze the following case summary from a user who believes they were framed. 
            
            Case Summary: "${caseSummary}"

            Based on this summary, generate a preliminary defense and counter-suit strategy. Your response must be structured in JSON format with the following keys:
            - "initial_assessment": A brief assessment of the viability of a malicious prosecution claim.
            - "key_defense_angles": An array of strings outlining potential defense angles for the criminal case.
            - "evidence_to_prioritize": An array of strings listing the most critical pieces of evidence to gather to prove the framing.
            - "potential_motions": An array of objects, each with "motion_name" and "purpose" keys (e.g., Motion to Suppress, Brady Motion).
            - "civil_suit_viability": An analysis of the strengths and weaknesses for a future §1983 lawsuit.
            - "next_steps": A numbered list of immediate, actionable next steps for the user.`;

            const result = await InvokeLLM({
                prompt: prompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        initial_assessment: { type: "string" },
                        key_defense_angles: { type: "array", items: { type: "string" } },
                        evidence_to_prioritize: { type: "array", items: { type: "string" } },
                        potential_motions: { 
                            type: "array", 
                            items: {
                                type: "object",
                                properties: {
                                    motion_name: { type: "string" },
                                    purpose: { type: "string" }
                                }
                            } 
                        },
                        civil_suit_viability: { type: "string" },
                        next_steps: { type: "array", items: { type: "string" } }
                    },
                    required: ["initial_assessment", "key_defense_angles", "evidence_to_prioritize", "potential_motions", "civil_suit_viability", "next_steps"]
                }
            });

            setStrategy(result);
            toast({
                title: "Strategy Generated",
                description: "AI analysis complete. Review your preliminary strategy below.",
            });
        } catch (error) {
            console.error("Strategy generation error:", error);
            toast({
                title: "Generation Failed",
                description: "The AI failed to generate a strategy. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-slate-800 rounded-xl flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Malicious Prosecution Defense Center</h1>
                            <p className="text-slate-600 mt-1">Tools and strategies for fighting back when you've been framed.</p>
                        </div>
                    </div>
                </div>

                <Alert className="bg-amber-50 border-amber-200 mb-8">
                    <Scale className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-900">Legal Disclaimer</AlertTitle>
                    <AlertDescription className="text-amber-800">
                        This tool provides informational support and AI-generated strategies. It is not a substitute for legal advice from a qualified attorney.
                    </AlertDescription>
                </Alert>

                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">Phase 1: Understanding Malicious Prosecution</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <p className="mb-4 text-slate-700">Malicious prosecution occurs when someone initiates a meritless legal proceeding against you with malicious intent. To win a civil lawsuit for malicious prosecution against the police, you generally must prove four key elements:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card><CardContent className="p-4"><strong className="text-red-700">1. Favorable Termination:</strong> The criminal case against you was dismissed, you were acquitted, or it otherwise ended in your favor.</CardContent></Card>
                                <Card><CardContent className="p-4"><strong className="text-red-700">2. Lack of Probable Cause:</strong> The police did not have sufficient credible evidence to justify the arrest or charges.</CardContent></Card>
                                <Card><CardContent className="p-4"><strong className="text-red-700">3. Malice:</strong> The officers acted with an improper motive, such as to cover up their own misconduct, retaliate, or due to personal animosity. Proving lack of probable cause can often imply malice.</CardContent></Card>
                                <Card><CardContent className="p-4"><strong className="text-red-700">4. Damages:</strong> You suffered damages, such as legal fees, lost wages, emotional distress, or damage to your reputation.</CardContent></Card>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-semibold">Phase 2: Building Your Defense - Evidence of a Frame-Up</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <p className="mb-4 text-slate-700">Your primary goal is to gather evidence that proves not just your innocence, but that the police *knew* you were innocent and proceeded anyway. Prioritize collecting:</p>
                            <Card className="bg-slate-50">
                                <CardContent className="p-6">
                                    <ul className="space-y-3 text-slate-800">
                                        <EvidenceChecklistItem text="All police reports, supplemental reports, and charging documents to identify contradictions and falsehoods." />
                                        <EvidenceChecklistItem text="All bodycam and dashcam footage. Look for edited footage, conversations that contradict the report, or conveniently 'missing' recordings." />
                                        <EvidenceChecklistItem text="Dispatch logs and radio calls, which can provide a real-time, unfiltered account of the incident." />
                                        <EvidenceChecklistItem text="Disciplinary histories (Brady Lists) of the officers involved, which may reveal past misconduct." />
                                        <EvidenceChecklistItem text="Forensic evidence (or lack thereof) that contradicts the police narrative (e.g., fingerprints, DNA)." />
                                        <EvidenceChecklistItem text="Statements from your own witnesses who can discredit the official story." />
                                    </ul>
                                    <div className="flex gap-2 mt-6">
                                        <Link to={createPageUrl("DocumentAnalyzer")}><Button><FileText className="w-4 h-4 mr-2" />Analyze Your Documents</Button></Link>
                                        <Link to={createPageUrl("DigitalInvestigator")}><Button variant="outline"><Search className="w-4 h-4 mr-2" />Digital Investigator</Button></Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-semibold">Phase 3: AI-Powered Defense Strategy</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-purple-600"/>AI Case Strategist</CardTitle>
                                    <p className="text-sm text-slate-600">Describe the facts of your case (what you were charged with, why you believe you were framed, what evidence you have). The AI will generate a preliminary defense strategy.</p>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Example: I was charged with drug possession after a traffic stop. I believe the officer planted the drugs because his bodycam was off during the search and his report contradicts the initial reason he gave for the stop..."
                                        value={caseSummary}
                                        onChange={(e) => setCaseSummary(e.target.value)}
                                        className="h-32 mb-4"
                                    />
                                    <Button onClick={handleGenerateStrategy} disabled={isGenerating}>
                                        {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Generating...</> : 'Generate Strategy'}
                                    </Button>
                                </CardContent>
                            </Card>

                            {strategy && (
                                <div className="mt-6 space-y-4">
                                    <h3 className="text-xl font-bold">Your AI-Generated Strategy</h3>
                                    <Card><CardHeader><CardTitle>Initial Assessment</CardTitle></CardHeader><CardContent>{strategy.initial_assessment}</CardContent></Card>
                                    <Card><CardHeader><CardTitle>Key Defense Angles</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-1">{strategy.key_defense_angles.map((angle, i) => <li key={i}>{angle}</li>)}</ul></CardContent></Card>
                                    <Card><CardHeader><CardTitle>Evidence to Prioritize</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-1">{strategy.evidence_to_prioritize.map((item, i) => <li key={i}>{item}</li>)}</ul></CardContent></Card>
                                    <Card><CardHeader><CardTitle>Potential Pre-Trial Motions</CardTitle></CardHeader><CardContent><ul className="space-y-2">{strategy.potential_motions.map((motion, i) => <li key={i}><strong>{motion.motion_name}:</strong> {motion.purpose}</li>)}</ul></CardContent></Card>
                                    <Card><CardHeader><CardTitle>Civil Suit Viability (§1983 Claim)</CardTitle></CardHeader><CardContent>{strategy.civil_suit_viability}</CardContent></Card>
                                    <Card><CardHeader><CardTitle>Immediate Next Steps</CardTitle></CardHeader><CardContent><ol className="list-decimal pl-5 space-y-1">{strategy.next_steps.map((step, i) => <li key={i}>{step}</li>)}</ol></CardContent></Card>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-semibold">Phase 4: The Counter-Offensive - Filing a Civil Suit</AccordionTrigger>
                        <AccordionContent className="pt-4">
                             <p className="mb-4 text-slate-700">Once your criminal case has been terminated in your favor, you can pursue a §1983 civil rights lawsuit against the officers and their department for malicious prosecution. This is how you hold them accountable.</p>
                             <Card className="text-center p-6 bg-red-50">
                                 <Gavel className="w-10 h-10 mx-auto text-red-600 mb-4"/>
                                 <h3 className="text-lg font-semibold text-red-900">Ready to Build Your Complaint?</h3>
                                 <p className="text-red-800 my-2">Use the evidence and strategy you've developed to construct a powerful federal civil rights complaint.</p>
                                 <Link to={createPageUrl("CivilRightsComplaintBuilder")}>
                                    <Button className="bg-red-600 hover:bg-red-700">Go to Complaint Builder</Button>
                                 </Link>
                             </Card>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
