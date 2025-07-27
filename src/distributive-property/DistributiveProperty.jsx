import React, { useState } from 'react';
import { generateTwoStepEquation } from './utils';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

export function DistributiveProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expression, setExpression] = useState(generateTwoStepEquation());

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setExpression(generateTwoStepEquation());
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 key={`step1-${expression.denominator}-${expression.b}-${expression.c}`} expression={expression} onNext={handleNext} onReset={handleReset} />;
      case 2:
        return <Step2 key={`step2-${expression.denominator}-${expression.b}-${expression.c}`} expression={expression} onNext={handleNext} onBack={handleBack} onReset={handleReset} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div>
      {renderCurrentStep()}
    </div>
  );
} 