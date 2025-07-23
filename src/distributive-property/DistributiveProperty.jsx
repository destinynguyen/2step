import React, { useState } from 'react';
import { generateDistributiveExpression } from './utils';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

export function DistributiveProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expression, setExpression] = useState(generateDistributiveExpression());

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setExpression(generateDistributiveExpression());
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 expression={expression} onNext={handleNext} onReset={handleReset} />;
      case 2:
        return <Step2 expression={expression} onNext={handleNext} onBack={handleBack} onReset={handleReset} />;
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