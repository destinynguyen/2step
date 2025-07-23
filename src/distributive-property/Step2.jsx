import React, { useState } from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';

export function Step2({ expression, onNext, onBack, onReset }) {
  const [distributionState, setDistributionState] = useState({
    firstComplete: false,
    secondComplete: false,
    isDragging: false
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
    setDistributionState({ firstComplete: false, secondComplete: false, isDragging: false });
    onReset();
  };

  const canProceed = distributionState.firstComplete && distributionState.secondComplete;

  return (
    <Container 
      text="Distributive Property - Step 2" 
      showResetButton={true}
      onReset={handleStepReset}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-6 pb-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5750E3] mb-4">
            Distribute the Number
          </h2>
          <p className="text-gray-600 mb-6">
            Click the arrows to distribute {expression.a} across the expression
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-6">
              {expression.expression}
            </div>
            
            {/* Visual arrows and distribution targets */}
            <div className="relative flex justify-center items-center space-x-12 mb-6">
              {/* First arrow and target */}
              <div className="text-center">
                <div className="relative">
                  {/* Arrow pointing down */}
                  <div className="w-0.5 h-8 bg-blue-400 mx-auto mb-2 relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-400"></div>
                  </div>
                  
                  {/* Distribution target */}
                  <div 
                    className={`w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                      distributionState.firstComplete 
                        ? 'border-green-500 bg-green-100' 
                        : 'border-blue-400'
                    }`}
                    onClick={handleDistributeToB}
                  >
                    {distributionState.firstComplete ? (
                      <span className="text-lg font-bold text-green-600">
                        {expression.a}×{expression.b}
                      </span>
                    ) : (
                      <span className="text-sm text-blue-600">Click here</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">First</p>
              </div>
              
              {/* Second arrow and target */}
              <div className="text-center">
                <div className="relative">
                  {/* Arrow pointing down */}
                  <div className="w-0.5 h-8 bg-blue-400 mx-auto mb-2 relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-400"></div>
                  </div>
                  
                  {/* Distribution target */}
                  <div 
                    className={`w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                      distributionState.secondComplete 
                        ? 'border-green-500 bg-green-100' 
                        : 'border-blue-400'
                    }`}
                    onClick={handleDistributeToC}
                  >
                    {distributionState.secondComplete ? (
                      <span className="text-lg font-bold text-green-600">
                        {expression.a}×{expression.c}
                      </span>
                    ) : (
                      <span className="text-sm text-blue-600">Click here</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Second</p>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="text-center text-sm text-gray-600">
              {!distributionState.firstComplete && "Click the first arrow to distribute to " + expression.b}
              {distributionState.firstComplete && !distributionState.secondComplete && "Now click the second arrow to distribute to " + expression.c}
              {distributionState.firstComplete && distributionState.secondComplete && "✓ Distribution complete!"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons positioned outside the main content */}
      <div className="absolute bottom-4 right-4 flex space-x-3">
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