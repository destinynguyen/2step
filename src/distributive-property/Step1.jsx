import React, { useState } from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';
import { generateTwoStepEquation } from './utils';
import flexiConfident from '../assets/Fleximojis/Flexi_Confident.png';

export function Step1({ expression, onNext, onReset }) {
  // Generate a two-step equation if expression is not provided
  const equation = expression || generateTwoStepEquation();
  
  const [messageIndex, setMessageIndex] = useState(0);
  
  const flexiMessages = [
    "Let's work together to solve this two-step equation!",
    "Isolate x by dragging the highlighted terms to the other side of the equation.",
    "We'll do this step by step - are you ready?"
  ];
  
  const handleNextMessage = () => {
    if (messageIndex < flexiMessages.length - 1) {
      setMessageIndex(messageIndex + 1);
    }
  };

  return (
    <Container 
      text="Two Step Equation" 
      showResetButton={true}
      onReset={onReset}
      selectNone={false}
    >
      <div className="flex items-center justify-center w-full" style={{ minHeight: '420px' }}>
        <div className="text-3xl font-bold text-[#5750E3] flex items-center select-text">
          <span className="flex flex-col items-center">
            <span>x</span>
            <span className="border-t border-[#5750E3] w-full text-center">{equation.denominator}</span>
          </span>
                      <span 
              className={`ml-2 ${messageIndex === 1 ? 'glow-highlight' : ''}`}
              style={messageIndex === 1 ? {
                textShadow: '0 0 8px rgba(251,191,36,0.8), 0 0 12px rgba(251,191,36,0.6)'
              } : {}}
            >
              {equation.b >= 0 ? '+' : ''}{equation.b}
            </span>
          <span className="ml-2">=</span>
          <span className="ml-2">{equation.c}</span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-end space-x-2">
          <img 
            src={flexiConfident} 
            alt="Flexi confident" 
            className="w-20 h-20"
          />
          <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-lg max-w-48">
            <p className="text-sm text-gray-700 mb-1">
              {flexiMessages[messageIndex]}
            </p>
            {messageIndex < flexiMessages.length - 1 && (
              <button
                onClick={handleNextMessage}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
        

      </div>
    </Container>
  );
} 