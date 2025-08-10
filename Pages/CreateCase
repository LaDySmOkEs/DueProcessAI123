import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createPageUrl } from '@/utils';
import { LegalCase } from '@/entities/all';
import { Briefcase, Loader2, ArrowLeft } from 'lucide-react';

export default function CreateCase() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Handle key_parties string to array conversion
            if (data.key_parties && typeof data.key_parties === 'string') {
                data.key_parties = data.key_parties.split(',').map(item => item.trim()).filter(item => item);
            } else {
                data.key_parties = [];
            }

            await LegalCase.create(data);
            toast({
                title: "Case Created Successfully",
                description: `The case "${data.case_name}" has been added to your manager.`,
                variant: "success",
            });
            navigate(createPageUrl("CaseManager"));
        } catch (error) {
            console.error("Failed to create case:", error);
            toast({
                title: "Creation Failed",
                description: "There was an error creating the case. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-2xl border-0 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <Briefcase className="w-7 h-7 text-amber-600" />
                            Create New Legal Case
                        </CardTitle>
                        <CardDescription>Enter the details below to start managing a new case.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="case_name">Case Name / Title</Label>
                                <Input id="case_name" {...register("case_name", { required: "Case name is required" })} placeholder="e.g., State v. John Doe" />
                                {errors.case_name && <p className="text-red-500 text-xs mt-1">{errors.case_name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="case_number">Case Number (Optional)</Label>
                                <Input id="case_number" {...register("case_number")} placeholder="e.g., 2024-CV-00123" />
                            </div>
                            <div>
                                <Label htmlFor="case_type">Case Type</Label>
                                <Controller
                                    name="case_type"
                                    control={control}
                                    rules={{ required: "You must select a case type" }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger><SelectValue placeholder="Select case type" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="civil_rights">Civil Rights</SelectItem>
                                                <SelectItem value="criminal_defense">Criminal Defense</SelectItem>
                                                <SelectItem value="family_law">Family Law</SelectItem>
                                                <SelectItem value="personal_injury">Personal Injury</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.case_type && <p className="text-red-500 text-xs mt-1">{errors.case_type.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="next_deadline">Next Important Deadline (Optional)</Label>
                                <Input id="next_deadline" type="date" {...register("next_deadline")} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Case Description</Label>
                            <Textarea id="description" {...register("description")} placeholder="Provide a brief summary of the case..." />
                        </div>

                        <div>
                            <Label htmlFor="key_parties">Key Parties Involved (comma-separated)</Label>
                            <Input id="key_parties" {...register("key_parties")} placeholder="e.g., Jane Smith, Anytown PD, Dr. Evans" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => navigate(createPageUrl("CaseManager"))}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Manager
                        </Button>
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Case...</> : 'Create Case'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
