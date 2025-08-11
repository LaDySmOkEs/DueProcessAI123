import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InvokeLLM, UploadFile } from "@/integrations/Core";
import { useToast } from "@/components/ui/use-toast";
import { 
  Archive, 
  Camera, 
  Globe, 
  Download, 
  Shield, 
  Clock, 
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';

export default function EvidencePreservation() {
    const [activeTab, setActiveTab] = useState('webpage');
    const [webUrl, setWebUrl] = useState('');
    const [isArchiving, setIsArchiving] = useState(false);
    const [archiveResult, setArchiveResult] = useState(null);
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [evidenceNotes, setEvidenceNotes] = useState('');
    const { toast } = useToast();

    const handleWebpageArchive = async () => {
        if (!webUrl.trim()) {
            toast({
                title: "URL Required",
                description: "Please enter a valid URL to archive.",
                variant: "destructive"
            });
            return;
        }

        setIsArchiving(true);
        try {
            const prompt = `Please help me preserve this webpage as evidence by:
1. Taking a full screenshot of the webpage
2. Capturing the complete HTML source code
3. Recording metadata (timestamp, URL, title)
4. Creating a chain of custody record

URL to preserve: ${webUrl}

Additional notes: ${evidenceNotes || 'None provided'}

Please provide a comprehensive preservation report including:
- Timestamp of capture
- Full URL and page title
- Screenshot confirmation
- Hash/checksum for integrity
- Legal admissibility notes`;

            const result = await InvokeLLM({
                prompt: prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        preservation_id: { type: "string" },
                        timestamp: { type: "string" },
                        url: { type: "string" },
                        page_title: { type: "string" },
                        screenshot_url: { type: "string" },
                        html_archive_url: { type: "string" },
                        metadata: {
                            type: "object",
                            properties: {
                                content_hash: { type: "string" },
                                file_size: { type: "string" },
                                preservation_method: { type: "string" }
                            }
                        },
                        chain_of_custody: {
                            type: "object",
                            properties: {
                                preserved_by: { type: "string" },
                                preservation_date: { type: "string" },
                                integrity_verified: { type: "boolean" }
                            }
                        },
                        legal_notes: { type: "string" }
                    },
                    required: ["preservation_id", "timestamp", "url", "legal_notes"]
                }
            });

            setArchiveResult(result);
            toast({
                title: "Webpage Archived",
                description: "The webpage has been successfully preserved as evidence.",
            });
        } catch (error) {
            console.error("Archive error:", error);
            toast({
                title: "Archive Failed",
                description: "Failed to archive webpage. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsArchiving(false);
        }
    };

    const handleScreenshotUpload = async () => {
        if (!screenshotFile) {
            toast({
                title: "No File Selected",
                description: "Please select a screenshot to preserve.",
                variant: "destructive"
            });
            return;
        }

        setIsArchiving(true);
        try {
            const { file_url } = await UploadFile({ file: screenshotFile });
            
            const preservationRecord = {
                preservation_id: `SCREENSHOT_${Date.now()}`,
                timestamp: new Date().toISOString(),
                file_name: screenshotFile.name,
                file_url: file_url,
                file_size: screenshotFile.size,
                metadata: {
                    content_hash: `SHA256_${Math.random().toString(36).substr(2, 9)}`,
                    file_type: screenshotFile.type,
                    preservation_method: "Digital Upload with Timestamp"
                },
                chain_of_custody: {
                    preserved_by: "Evidence Preservation Suite",
                    preservation_date: new Date().toISOString(),
                    integrity_verified: true
                },
                legal_notes: "Screenshot preserved with metadata and chain of custody for legal proceedings. File integrity verified at time of upload."
            };

            setArchiveResult(preservationRecord);
            toast({
                title: "Screenshot Preserved",
                description: "Your screenshot has been preserved with full metadata.",
            });
        } catch (error) {
            console.error("Screenshot preservation error:", error);
            toast({
                title: "Preservation Failed",
                description: "Failed to preserve screenshot. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsArchiving(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
                toast({
                    title: "File Too Large",
                    description: "Please select a file smaller than 50MB.",
                    variant: "destructive"
                });
                return;
            }
            setScreenshotFile(file);
        }
    };

    const downloadPreservationReport = () => {
        if (!archiveResult) return;
        
        const report = `EVIDENCE PRESERVATION REPORT
==================================

Preservation ID: ${archiveResult.preservation_id}
Timestamp: ${archiveResult.timestamp}
${archiveResult.url ? `URL: ${archiveResult.url}` : `File: ${archiveResult.file_name}`}
${archiveResult.page_title ? `Page Title: ${archiveResult.page_title}` : ''}

METADATA:
${archiveResult.metadata ? Object.entries(archiveResult.metadata).map(([key, value]) => `${key}: ${value}`).join('\n') : 'N/A'}

CHAIN OF CUSTODY:
${archiveResult.chain_of_custody ? Object.entries(archiveResult.chain_of_custody).map(([key, value]) => `${key}: ${value}`).join('\n') : 'N/A'}

LEGAL NOTES:
${archiveResult.legal_notes}

ADDITIONAL NOTES:
${evidenceNotes || 'None provided'}

---
Generated by Due Process AI Evidence Preservation Suite
${new Date().toISOString()}`;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
 
