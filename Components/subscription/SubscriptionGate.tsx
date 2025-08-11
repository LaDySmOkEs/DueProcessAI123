import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from "@/entities/User";
import { createCheckoutSession } from "@/functions/createCheckoutSession";
import { Lock, Crown, Zap, AlertTriangle, Loader2, RefreshCw } from "lucide-react";

const FEATURE_REQUIREMENTS = {
  document_analysis: 'trial',
  case_strategy: 'trial', 
  document_generation: 'basic',
  courtroom_simulator: 'basic',
  advanced_investigation: 'premium'
};

const FEATURE_NAMES = {
  document_analysis: 'AI Document Analysis',
  case_strategy: 'AI Case Strategy',
  document_generation: 'Document Generation', 
  courtroom_simulator: 'Courtroom Simulator',
  advanced_investigation: 'Advanced Investigation Tools'
};

const TIER_HIERARCHY = {
  free: 0,
  trial: 1, 
  basic: 2,
  premium: 3
};

export default function SubscriptionGate({ children, feature }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

