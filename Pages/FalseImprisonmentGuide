import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gavel, 
  AlertTriangle, 
  Shield, 
  BookOpen, 
  Scale, 
  FileText, 
  Clock, 
  Users,
  CheckCircle,
  Info
} from 'lucide-react';
import { InvokeLLM } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';

const falseImprisonmentElements = [
  {
    element: "Intent to Confine",
    description: "The defendant must have acted with the purpose of confining the plaintiff or with knowledge that confinement was substantially certain to result.",
    examples: ["Officer deliberately blocking exit", "Threatening arrest without legal basis", "Creating false sense of legal obligation to stay"]
  },
  {
    element: "Actual Confinement",
    description: "The plaintiff must have been actually confined within boundaries set by the defendant.",
    examples: ["Physical restraint", "Locked in vehicle or room", "Under credible threat of force", "False arrest situation"]
  },
  {
    element: "Awareness of Confinement",
    description: "The plaintiff must have been aware of the confinement or have been harmed by it.",
    examples: ["Knowing you cannot leave", "Being told you're under arrest", "Feeling threatened if you try to leave"]
  },
  {
    element: "Lack of Legal Justification",
    description: "The confinement must be without legal privilege, consent, or other lawful authority.",
    examples: ["No probable cause for arrest", "Exceeding scope of lawful detention", "Continuing detention after legal basis ends"]
  }
];

const commonScenarios = [
  {
    title: "Unlawful Traffic Stop Extension",
    description: "Officer extends traffic stop beyond reasonable time without reasonable suspicion of additional crimes.",
    legalBasis: "Rodriguez v. United States (2015) - Traffic stops cannot be extended beyond time reasonably required for the mission of the stop."
  },
  {
    title: "False Arrest Without Probable Cause",
    description: "Arrest made without sufficient evidence or legal justification.",
    legalBasis: "4th Amendment protection against unreasonable seizures. Probable cause required for lawful arrest."
  },
  {
    title: "Coercive Police Interrogation",
    description: "Creating atmosphere where reasonable person would not feel free to leave during questioning.",
    legalBasis: "Miranda v. Arizona and Terry v. Ohio - Custodial interrogation requires warnings; investigative stops must be brief."
  },
  {
    title: "Detention Beyond Lawful Purpose",
    description: "Continuing to hold someone after the original lawful reason for detention has ended.",
    legalBasis: "Pennsylvania v. Mimms and Terry v. Ohio - Detention must be reasonably related in scope to circumstances justifying it."
  }
];

const legalRemedies = [
  {
    type: "Civil Rights Lawsuit (42 U.S.C. § 1983)",
    description: "Federal lawsuit against government officials for constitutional violations",
    damages: ["Compensatory damages", "Punitive damages", "Attorney's fees", "Injunctive relief"]
  },
  {
    type: "State Tort Claims",
    description: "State law claims for false imprisonment, intentional infliction of emotional distress",
    damages: ["Actual damages", "Pain and suffering", "Lost wages", "Punitive damages"]
  },
  {
    type: "Suppression of Evidence",
    description: "Criminal defense remedy to exclude illegally obtained evidence",
    damages: ["Evidence suppressed", "Charges potentially dismissed", "Plea leverage"]
  }
];

export default function FalseImprisonmentGuide() {
  const [userScenario, setUserScenario] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeScenario = async () => {
    if (!userScenario.trim()) {
      toast({
        title: "Please describe your situation",
        description: "Enter details about your potential false imprisonment case.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis('');

    try {
      const prompt = `
        Analyze this potential false imprisonment scenario for legal merit:

        "${userScenario}"

        Please provide:
        1. Whether the four elements of false imprisonment appear to be met
        2. Potential legal claims and remedies available
        3. Strength of the case and key evidence needed
        4. Recommended next steps
        5. Relevant case law or statutes

        Format your response in clear sections with legal analysis.
      `;

      const result = await InvokeLLM({ prompt });
      setAnalysis(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your scenario has been analyzed for false imprisonment elements."
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze scenario. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-slate-800 rounded-xl flex items-center justify-center">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">False Imprisonment: A Legal Guide</h1>
              <p className="text-slate-600 mt-1">Understanding your rights when unlawfully detained or confined</p>
            </div>
          </div>
          
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Constitutional Protection:</strong> The 4th Amendment protects against unreasonable seizures. 
              Any detention without legal justification may constitute false imprisonment and violate your constitutional rights.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="elements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200">
            <TabsTrigger value="elements" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Elements
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="gap-2">
              <Users className="w-4 h-4" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="remedies" className="gap-2">
              <Gavel className="w-4 h-4" />
              Remedies
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="gap-2">
              <FileText className="w-4 h-4" />
              Case Analyzer
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <Info className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Elements Tab */}
          <TabsContent value="elements" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Four Essential Elements of False Imprisonment
                </CardTitle>
                <p className="text-slate-600 text-sm">All four elements must be present to establish a false imprisonment claim</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {falseImprisonmentElements.map((element, index) => (
                    <Card key={index} className="border border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
 
