import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';

export function Step2({ expression, onNext, onBack, onReset }) {
  const [distributionState, setDistributionState] = useState({
    firstComplete: false,
    secondComplete: false
  });

  const handleDistributeToB = () => {
    if (!distributionState.firstComplete) {
      setDistributionState(prev => ({
        ...prev,
        firstComplete: true
      }));
    }
  };

  const handleDistributeToC = () => {
    if (!distributionState.secondComplete && distributionState.firstComplete) {
      setDistributionState(prev => ({
        ...prev,
        secondComplete: true
      }));
    }
  };

  const handleStepReset = () => {
    setDistributionState({ firstComplete: false, secondComplete: false });
    onReset();
  };

  const canProceed = distributionState.firstComplete && distributionState.secondComplete;

  return (
    <Container 
      text="Distributive Property - Step 2" 
      showResetButton={true}
      onReset={handleStepReset}
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 space-y-4">
        <div className="text-center w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-[#5750E3] mb-3 md:mb-4">
            Distribute the Number
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 px-2">
            Click the arrows to distribute {expression.a} across the expression
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 md:p-6 mb-4 md:mb-6">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 relative">
              <div className="relative inline-block">
                {/* Invisible elements above the coefficient for arrow start points */}
                <div id="arrow-start-1" className="absolute -top-8 left-0 w-1 h-1"></div>
                <div id="arrow-start-2" className="absolute -top-8 left-0 w-1 h-1"></div>
                
                <span className="text-red-600" id="coefficient">{expression.a}</span>
                <span className="text-blue-600">(</span>
                <span 
                  id="number-b"
                  className={`inline-block px-2 py-1 border-2 border-dashed rounded cursor-pointer transition-all ${
                    distributionState.firstComplete 
                      ? 'border-green-500 bg-green-100' 
                      : 'border-blue-400'
                  }`}
                  onClick={handleDistributeToB}
                >
                  {distributionState.firstComplete ? `${expression.a}×${expression.b}` : expression.b}
                </span>
                <span className="text-blue-600"> + </span>
                <span 
                  id="number-c"
                  className={`inline-block px-2 py-1 border-2 border-dashed rounded cursor-pointer transition-all ${
                    distributionState.secondComplete 
                      ? 'border-green-500 bg-green-100' 
                      : 'border-blue-400'
                  }`}
                  onClick={handleDistributeToC}
                >
                  {distributionState.secondComplete ? `${expression.a}×${expression.c}` : expression.c}
                </span>
                <span className="text-blue-600">)</span>
                
                <Xarrow
                  start="arrow-start-1"
                  end="number-b"
                  color="#3B82F6"
                  strokeWidth={2}
                  headSize={8}
                  path="smooth"
                  curveness={0.8}
                  endAnchor="top"
                  _cpx1Offset={30}
                  _cpy1Offset={-40}
                />
                
                <Xarrow
                  start="arrow-start-2"
                  end="number-c"
                  color="#3B82F6"
                  strokeWidth={2}
                  headSize={8}
                  path="smooth"
                  curveness={0.8}
                  endAnchor="top"
                  _cpx1Offset={-30}
                  _cpy1Offset={-40}
                />
              </div>
            </div>
            
            <div className="text-center text-xs md:text-sm text-gray-600 px-2">
              {!distributionState.firstComplete && "Click the first arrow to distribute to " + expression.b}
              {distributionState.firstComplete && !distributionState.secondComplete && "Now click the second arrow to distribute to " + expression.c}
              {distributionState.firstComplete && distributionState.secondComplete && "✓ Distribution complete!"}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex space-x-2 md:space-x-3">
        <GlowButton onClick={onBack}>
          ← Back
        </GlowButton>
        
        <GlowButton 
          onClick={onNext}
          disabled={!canProceed}
          className={!canProceed ? 'opacity-50' : ''}
        >
          Next →
        </GlowButton>
      </div>
    </Container>
  );
} 