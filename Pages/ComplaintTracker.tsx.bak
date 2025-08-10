import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ComplaintTracker as ComplaintTrackerEntity } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Plus, Clock, CheckCircle, AlertTriangle, Loader2, Eye, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

export default function ComplaintTracker() {
    const [complaints, setComplaints] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const { toast } = useToast();

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {
        setIsLoading(true);
        try {
            const data = await ComplaintTrackerEntity.list("-date_filed");
            setComplaints(data);
        } catch (error) {
            console.error("Error loading complaints:", error);
            toast({ title: "Failed to load complaints", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await ComplaintTrackerEntity.create(data);
            toast({ title: "Complaint Logged Successfully", description: "Your complaint has been securely recorded." });
            setShowForm(false);
            reset();
            loadComplaints();
        } catch (error) {
            console.error("Error submitting complaint:", error);
            toast({ title: "Submission Failed", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'filed': return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: FileText };
            case 'acknowledged': return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: CheckCircle };
            case 'under_investigation': return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock };
            case 'sustained': return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle };
            case 'not_sustained':
            case 'unfounded':
            case 'closed': return { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle };
            default: return { color: 'bg-slate-100 text-slate-800 border-slate-200', icon: FileText };
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center">
                            <Eye className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Complaint Tracker</h1>
                            <p className="text-slate-600 mt-1">Document your good-faith efforts to seek redress and exhaust all administrative remedies.</p>
                        </div>
                    </div>
                     <Card className="bg-amber-50 border-amber-200 mt-4">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ShieldAlert className="w-6 h-6 text-amber-700"/>
                            <CardTitle className="text-amber-900 text-lg">Why This Is Critical</CardTitle>
                        </CardHeader>
                        <CardContent className="text-amber-800 text-sm space-y-2">
                           <p>Courts often require you to prove you've tried to resolve issues through official channels (like Internal Affairs) before they will hear your case. This is called "exhaustion of remedies."</p>
                           <p>Use this tracker to create a bulletproof record of every complaint you file. This log is your evidence that you have acted in good faith, which is essential to preserving your right to sue later.</p>
                        </CardContent>
                    </Card>
                </div>

                {showForm ? (
                    <Card className="border-0 shadow-lg bg-white">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardHeader>
                                <CardTitle>Log a New Complaint</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Complaint Title*</Label>
                                    <Input {...register("complaint_title", { required: true })} placeholder="e.g., Complaint against Officer Smith for unlawful search" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Target Agency*</Label>
                                        <Input {...register("target_agency", { required: true })} placeholder="e.g., Anytown Police Department" />
                                    </div>
                                    <div>
                                        <Label>Complaint Type*</Label>
                                        <Controller name="complaint_type" control={control} rules={{ required: true }} render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="internal_affairs">Internal Affairs</SelectItem>
                                                    <SelectItem value="civilian_review_board">Civilian Review Board</SelectItem>
                                                    <SelectItem value="federal_civil_rights">Federal Civil Rights</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Description*</Label>
                                    <Textarea {...register("description", { required: true })} placeholder="Detailed summary of the complaint filed." />
                                </div>
                                <div>
                                    <Label>Date Filed*</Label>
                                    <Input type="date" {...register("date_filed", { required: true })} />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Complaint/Tracking #</Label>
                                        <Input {...register("complaint_number")} placeholder="Official reference number" />
                                    </div>
                                    <div>
                                       <Label>Status*</Label>
                                        <Controller name="status" control={control} rules={{ required: true }} render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value || 'filed'}>
                                                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="filed">Filed</SelectItem>
                                                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                                                    <SelectItem value="under_investigation">Under Investigation</SelectItem>
                                                    <SelectItem value="closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Log Complaint
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                ) : (
                    <Card className="border-0 shadow-lg bg-white">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>Your Complaint Log</CardTitle>
                            <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" />Log New Complaint</Button>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <p>Loading complaints...</p>
                            ) : complaints.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Complaints Logged</h3>
                                    <p className="text-slate-600 mb-4">Start by logging your first official complaint to an agency.</p>
                                    <Button onClick={() => setShowForm(true)}>Log First Complaint</Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {complaints.map(c => {
                                        const status = getStatusInfo(c.status);
                                        const StatusIcon = status.icon;
                                        return (
                                            <div key={c.id} className="p-4 border border-slate-200 rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-slate-900">{c.complaint_title}</h3>
                                                    <Badge className={`${status.color} border gap-1 text-xs`}><StatusIcon className="w-3 h-3" />{c.status.replace(/_/g, ' ')}</Badge>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-2">To: {c.target_agency}</p>
                                                <div className="flex justify-between items-center text-xs text-slate-500">
                                                    <span>Filed: {format(new Date(c.date_filed), 'MMM d, yyyy')}</span>
                                                    {c.complaint_number && <span>Ref #: {c.complaint_number}</span>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
