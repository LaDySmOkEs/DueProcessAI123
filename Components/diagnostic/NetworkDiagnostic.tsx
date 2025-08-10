import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  Key,
  CreditCard,
  Brain,
  Server
} from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { User } from "@/entities/User";
import { createCheckoutSession } from "@/functions/createCheckoutSession";

export default function NetworkDiagnostic() {
  const [diagnostics, setDiagnostics] = useState({
    userAuth: { status: 'pending', message: '' },
    openaiConnection: { status: 'pending', message: '' },
    stripeConnection: { status: 'pending', message: '' },
    basicConnectivity: { status: 'pending', message: '' }
  });
  const [isRunning, setIsRunning] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);

  const logError = (source, error) => {
    const errorInfo = {
      source,
      message: error.message || 'Unknown error',
      code: error.code || 'NO_CODE',
      status: error.response?.status || 'NO_STATUS',
      timestamp: new Date().toLocaleTimeString()
    };
    setErrorDetails(prev => [...prev, errorInfo]);
  };
