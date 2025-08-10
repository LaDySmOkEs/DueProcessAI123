
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Scale, MailWarning, Loader2, Download, Shield } from "lucide-react"; // Added Shield icon
import { InvokeLLM } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";

// Helper function for page navigation, assuming a base path or direct routing
const createPageUrl = (path) => {
    // This is a placeholder. In a real application, you might use React Router's
    // useNavigate or Link component, or a global utility function for URL construction.
    // Given the outline's usage, this simple form ensures a valid relative path.
    return `/${path}`; 
};

const templates = [
    { 
        id: "civil_rights_complaint", 
        title: "Civil Rights Complaint (§ 1983)", 
        description: "Comprehensive federal civil rights complaint for constitutional violations.", 
        icon: Shield, 
        status: 'active',
        link: "/CivilRightsComplaintBuilder" // New link for navigation
    },
    { 
        id: "motion_compel", 
        title: "Motion to Compel Discovery", 
        description: "Force the opposing party to provide information they are withholding.", 
        icon: Scale, 
        status: 'active'
    },
    { 
        id: "affidavit", 
        title: "Affidavit of Facts", 
        description: "Create a sworn written statement of facts to support your case.", 
        icon: FileText, 
        status: 'active'
    },
    { 
        id: "cease_desist", 
        title: "Cease and Desist Letter", 
        description: "Demand that an individual or entity stop an unlawful activity.", 
        icon: MailWarning, 
        status: 'active'
    },
    { 
        id: "summary_judgment", 
        title: "Motion for Summary Judgment", 
        description: "Argue that there are no factual disputes and the judge should rule in your favor.", 
        icon: Scale, 
        status: 'active'
    },
    { 
        id: "discovery_request", 
        title: "Request for Production of Documents", 
        description: "Formally request specific documents from the opposing party.", 
        icon: FileText, 
        status: 'active'
    },
    { 
        id: "subpoena", 
        title: "Subpoena", 
        description: "Compel a witness to appear at trial or deposition.", 
        icon: Scale, 
        status: 'active'
    }
];

export default function DocumentTemplateSelector() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({});
    const [generatedDocument, setGeneratedDocument] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const getTemplateForm = (templateId) => {
        switch (templateId) {
            case "motion_compel":
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Court Name</Label>
                            <Input 
                                value={formData.court_name || ""} 
                                onChange={(e) => setFormData({...formData, court_name: e.target.value})}
                                placeholder="e.g., Superior Court of California, County of Los Angeles"
                            />
                        </div>
                        <div>
                            <Label>Case Number</Label>
                            <Input 
                                value={formData.case_number || ""} 
                                onChange={(e) => setFormData({...formData, case_number: e.target.value})}
                                placeholder="e.g., CV-2024-001234"
                            />
                        </div>
                        <div>
                            <Label>Your Name (Plaintiff/Petitioner)</Label>
                            <Input 
                                value={formData.plaintiff_name || ""} 
                                onChange={(e) => setFormData({...formData, plaintiff_name: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>Opposing Party Name</Label>
                            <Input 
                                value={formData.defendant_name || ""} 
                                onChange={(e) => setFormData({...formData, defendant_name: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>What Discovery Are You Seeking?</Label>
                            <Textarea 
                                value={formData.discovery_sought || ""} 
                                onChange={(e) => setFormData({...formData, discovery_sought: e.target.value})}
                                placeholder="Describe the specific documents, interrogatories, or other discovery you requested"
                                className="h-24"
                            />
                        </div>
                        <div>
                            <Label>Why Is This Discovery Important?</Label>
                            <Textarea 
                                value={formData.importance || ""} 
                                onChange={(e) => setFormData({...formData, importance: e.target.value})}
                                placeholder="Explain why this information is crucial to your case"
                                className="h-24"
                            />
                        </div>
                    </div>
                );
            case "affidavit":
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Your Full Name</Label>
                            <Input 
                                value={formData.affiant_name || ""} 
                                onChange={(e) => setFormData({...formData, affiant_name: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>Your Address</Label>
                            <Input 
                                value={formData.affiant_address || ""} 
                                onChange={(e) => setFormData({...formData, affiant_address: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>Your Age</Label>
                            <Input 
                                type="number"
                                value={formData.affiant_age || ""} 
                                onChange={(e) => setFormData({...formData, affiant_age: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>Facts You Want to Swear To</Label>
                            <Textarea 
                                value={formData.facts || ""} 
                                onChange={(e) => setFormData({...formData, facts: e.target.value})}
                                placeholder="List the specific facts you have personal knowledge of, numbered if multiple facts"
                                className="h-32"
                            />
                        </div>
                        <div>
                            <Label>State Where You Will Sign</Label>
                            <Input 
                                value={formData.state || ""} 
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                                placeholder="e.g., California"
                            />
                        </div>
                    </div>
                );
            case "cease_desist":
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Recipient Name</Label>
                            <Input 
                                value={formData.recipient_name || ""} 
                                onChange={(e) => setFormData({...formData, recipient_name: e.target.value})}
                                placeholder="Name of person/entity to send letter to"
                            />
                        </div>
                        <div>
                            <Label>Recipient Address</Label>
                            <Textarea 
                                value={formData.recipient_address || ""} 
                                onChange={(e) => setFormData({...formData, recipient_address: e.target.value})}
                                placeholder="Full mailing address"
                                className="h-20"
                            />
                        </div>
                        <div>
                            <Label>Unlawful Activity</Label>
                            <Textarea 
                                value={formData.unlawful_activity || ""} 
                                onChange={(e) => setFormData({...formData, unlawful_activity: e.target.value})}
                                placeholder="Describe the specific activity you want them to stop"
                                className="h-24"
                            />
                        </div>
                        <div>
                            <Label>Legal Basis</Label>
                            <Textarea 
                                value={formData.legal_basis || ""} 
                                onChange={(e) => setFormData({...formData, legal_basis: e.target.value})}
                                placeholder="Explain why this activity is unlawful (cite laws if known)"
                                className="h-24"
                            />
                        </div>
                        <div>
                            <Label>Consequences if They Don't Stop</Label>
                            <Textarea 
                                value={formData.consequences || ""} 
                                onChange={(e) => setFormData({...formData, consequences: e.target.value})}
                                placeholder="What legal action will you take if they continue?"
                                className="h-20"
                            />
                        </div>
                    </div>
                );
            default: // This default case also covers new template types that don't have custom forms (e.g., civil_rights_complaint would navigate away)
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Case Details</Label>
                            <Textarea 
                                value={formData.case_details || ""} 
                                onChange={(e) => setFormData({...formData, case_details: e.target.value})}
                                placeholder="Provide key facts and details for your document"
                                className="h-32"
                            />
                        </div>
                    </div>
                );
        }
    };

    const generateDocument = async () => {
        if (!selectedTemplate) return;

        setIsGenerating(true);
        try {
            const template = templates.find(t => t.id === selectedTemplate);
            
            const prompt = `Generate a professional, court-ready ${template.title} based on the following information:

Template Type: ${template.title}
Form Data: ${JSON.stringify(formData, null, 2)}

Requirements:
1. Use proper legal formatting and language
2. Include all necessary legal citations where appropriate
3. Follow standard court document structure
4. Include proper headers, signature lines, and verification/notarization sections
5. Make it ready for filing in court
6. Use formal legal tone throughout
7. Include all required elements for this type of document

Please generate a complete, professional document that a self-represented litigant could file in court.`;

            const result = await InvokeLLM({
                prompt: prompt,
                add_context_from_internet: true
            });

            setGeneratedDocument(result);
            toast({
                title: "Document Generated",
                description: `Your ${template.title} has been generated successfully.`,
            });
        } catch (error) {
            console.error("Generation error:", error);
            toast({
                title: "Generation Failed",
                description: "Failed to generate document. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadDocument = () => {
        const template = templates.find(t => t.id === selectedTemplate);
        const blob = new Blob([generatedDocument], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.title.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    };

    if (selectedTemplate && generatedDocument) {
        return (
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle>Generated Document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-slate-900 font-mono">
                            {generatedDocument}
                        </pre>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={downloadDocument} className="bg-green-600 hover:bg-green-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download Document
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setSelectedTemplate(null);
                                setGeneratedDocument("");
                                setFormData({});
                            }}
                        >
                            Create New Document
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (selectedTemplate) {
        const template = templates.find(t => t.id === selectedTemplate);
        return (
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <template.icon className="w-6 h-6 text-blue-600" />
                        {template.title}
                    </CardTitle>
                    <p className="text-slate-600">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {getTemplateForm(selectedTemplate)}
                    
                    <div className="flex gap-3 pt-4 border-t">
                        <Button 
                            onClick={generateDocument}
                            disabled={isGenerating}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                            ) : (
                                `Generate ${template.title}`
                            )}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => setSelectedTemplate(null)}
                        >
                            Back to Templates
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
                <CardTitle>Select a Document Template</CardTitle>
                <p className="text-slate-600">Choose the type of legal document you need to create.</p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map(template => (
                        <Card 
                            key={template.id} 
                            className="bg-slate-50 flex flex-col cursor-pointer hover:bg-slate-100 transition-colors"
                            onClick={() => {
                                if (template.link) {
                                    // Navigate to a different page/route if 'link' is defined
                                    window.location.href = createPageUrl(template.link.replace('/', ''));
                                } else {
                                    // Otherwise, select the template within the current component
                                    setSelectedTemplate(template.id);
                                }
                            }}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-base">
                                    <template.icon className="w-5 h-5 text-blue-700" />
                                    {template.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent Card's onClick from firing again
                                        if (template.link) {
                                            window.location.href = createPageUrl(template.link.replace('/', ''));
                                        } else {
                                            setSelectedTemplate(template.id);
                                        }
                                    }}
                                >
                                    {template.id === 'civil_rights_complaint' ? 'Launch Builder' : 'Select Template'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
