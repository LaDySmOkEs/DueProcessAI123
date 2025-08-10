import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LegalCase } from "@/entities/all";
import { FileUp, FileCheck, Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DocumentUpload({ onFileSelect, onAnalyze, isAnalyzing }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [cases, setCases] = useState([]);
    const [fileError, setFileError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const caseList = await LegalCase.list();
                setCases(caseList);
            } catch (err) {
                console.error("Failed to fetch cases:", err);
            }
        };
        fetchCases();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError(null);
        
        if (file) {
            setSelectedFile(file);
            if (onFileSelect) {
                onFileSelect(file);
            }
        } else {
            setSelectedFile(null);
            if (onFileSelect) {
                onFileSelect(null);
            }
        }
    };
    
    const onSubmit = (data) => {
        if (!selectedFile) {
            setFileError('Please select a file to analyze.');
            return;
        }
        setFileError(null); // Clear previous errors
        if (onAnalyze) {
            onAnalyze(data);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">1. Upload Document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* File Input */}
                    <div
                        className="p-6 border-2 border-dashed border-slate-300 rounded-lg text-center cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={triggerFileSelect}
                    >
                        <Input
                            id="file-upload"
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {selectedFile ? (
                            <div className="space-y-2">
                                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                                    <FileCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="font-semibold text-slate-700">{selectedFile.name}</p>
                                <p className="text-xs text-slate-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
 
