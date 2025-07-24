import React from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';
import { generateTwoStepEquation } from './utils';

export function Step1({ expression, onNext, onReset }) {
  // Generate a two-step equation if expression is not provided
  const equation = expression || generateTwoStepEquation();

  return (
    <Container 
      text="Two Step Equation" 
      showResetButton={true}
      onReset={onReset}
    >
      <div className="flex items-center justify-center w-full" style={{ minHeight: '420px' }}>
        <div className="text-3xl font-bold text-blue-600 flex items-center">
          {equation.aType === 'integer' ? (
            equation.a === 1 ? (
              <span>x</span>
            ) : equation.a === -1 ? (
              <span>-x</span>
            ) : (
              <span>{equation.a}x</span>
            )
          ) : (
            <span className="flex flex-col items-center">
              <span>x</span>
              <span className="border-t border-blue-600 w-full text-center">{equation.denominator}</span>
            </span>
          )}
          <span className="ml-2">{equation.b >= 0 ? '+' : ''}{equation.b}</span>
          <span className="ml-2">=</span>
          <span className="ml-2">{equation.c}</span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <GlowButton onClick={onNext}>
            Next →
          </GlowButton>
        </div>
      </div>
    </Container>
  );
} 