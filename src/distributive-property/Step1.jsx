import React, { useState } from 'react';
import { generateDistributiveExpression } from './utils';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';

export function Step1() {
  // Pre-generate the expression by default
  const [expression, setExpression] = useState(generateDistributiveExpression());

  const handleNext = () => {
    console.log('Moving to next step');
    // This will be handled by parent component
  };

  const handleReset = () => {
    // Generate a new random expression
    setExpression(generateDistributiveExpression());
  };

  return (
    <Container 
      text="Distributive Property - Step 1" 
      showResetButton={true}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5750E3] mb-4">
            Distributive Property
          </h2>
          <p className="text-gray-600 mb-6">
            Let's learn how to distribute a number across an expression!
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Our expression:</p>
            <div className="text-3xl font-bold text-blue-600">
              {expression.expression}
            </div>
          </div>
          
          <p className="text-gray-700 text-sm">
            We need to distribute <span className="font-bold text-blue-600">{expression.a}</span> 
            across <span className="font-bold text-blue-600">{expression.b}</span> and 
            <span className="font-bold text-blue-600"> {expression.c}</span>
          </p>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <GlowButton onClick={handleNext}>
            Next →
          </GlowButton>
        </div>
      </div>
    </Container>
  );
} 