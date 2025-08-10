import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/entities/User";
import { createStripePortalSession } from "@/functions/createStripePortalSession";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Loader2, CreditCard, CheckCircle } from "lucide-react";
import { useLocation } from 'react-router-dom';

export default function Billing() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [portalLoading, setPortalLoading] = useState(false);
    const { toast } = useToast();
    const location = useLocation();

    useEffect(() => {
        // Load Stripe pricing table script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://js.stripe.com/v3/pricing-table.js';
        document.head.appendChild(script);

        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                const userData = await User.me();
                setUser(userData);
                
                // Check for success message from Stripe
