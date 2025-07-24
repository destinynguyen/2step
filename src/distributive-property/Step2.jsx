import React from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';

export function Step2({ expression, onNext, onBack, onReset }) {
  return (
    <Container 
      text="Distributive Property - Step 2" 
      showResetButton={true}
      onReset={onReset}
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      </div>
      
      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex space-x-2 md:space-x-3">
        <GlowButton onClick={onBack}>
          ← Back
        </GlowButton>
        
        <GlowButton onClick={onNext}>
          Next →
        </GlowButton>
      </div>
    </Container>
  );
} 