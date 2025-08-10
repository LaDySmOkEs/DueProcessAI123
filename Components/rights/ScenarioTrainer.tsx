import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, RotateCcw } from "lucide-react";

const scenarios = [
  {
    id: 1,
    title: "Traffic Stop",
    situation: "You've been pulled over for speeding. The officer approaches your window and asks, 'Do you know why I stopped you?'",
    options: [
      { text: "No, officer, I don't know why you stopped me.", correct: true, explanation: "Correct! This avoids admitting guilt while being respectful." },
      { text: "I was probably going a little fast.", correct: false, explanation: "This admits guilt and can be used against you in court." },
      { text: "I wasn't doing anything wrong!", correct: false, explanation: "This can escalate the situation and appears confrontational." }
    ],
    rightToKnow: "You have the right to remain silent and not incriminate yourself (5th Amendment)."
  },
  {
    id: 2,
    title: "Consent to Search Vehicle",
    situation: "During a traffic stop, the officer asks, 'Do you mind if I search your car?'",
    options: [
      { text: "I do not consent to a search.", correct: true, explanation: "Correct! Clearly assert your 4th Amendment rights." },
      { text: "Sure, I have nothing to hide.", correct: false, explanation: "You're giving up your constitutional protection against unreasonable searches." },
      { text: "Go ahead, but be quick about it.", correct: false, explanation: "This is giving consent and waiving your rights." }
    ],
    rightToKnow: "You have the right to refuse consent to search your vehicle (4th Amendment)."
  },
  {
    id: 3,
    title: "Police at Your Door",
    situation: "Police officers come to your home and ask to come inside to 'ask a few questions.'",
    options: [
      { text: "I prefer to speak with you outside. May I see your warrant?", correct: true, explanation: "Correct! Protect your home and ask for proper legal authority." },
      { text: "Sure, come on in.", correct: false, explanation: "You're allowing entry without a warrant and giving up strong constitutional protections." },
      { text: "What's this about? Come in and we'll talk.", correct: false, explanation: "Again, you're allowing warrantless entry to your home." }
    ],
    rightToKnow: "Your home has the strongest 4th Amendment protections. Police generally need a warrant to enter."
  }
];

export default function ScenarioTrainer() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleOptionSelect = (optionIndex) => {
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    const isCorrect = scenarios[currentScenario].options[optionIndex].correct;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const resetTraining = () => {
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  const scenario = scenarios[currentScenario];
  const selectedAnswer = selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Scenario Training
            </CardTitle>
            <div className="flex items-center gap-4">
 
