import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
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
            <div className="text-3xl font-bold text-blue-600 mb-6 relative">
              {/* Expression with curved arrows pointing to numbers */}
              <div className="relative inline-block">
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
                
                {/* Curved arrows pointing to the actual numbers */}
                <Xarrow
                  start="coefficient"
                  end="number-b"
                  color="#3B82F6"
                  strokeWidth={2}
                  headSize={8}
                  path="smooth"
                  curveness={0.8}
                  showHead={true}
                  showTail={false}
                />
                
                <Xarrow
                  start="coefficient"
                  end="number-c"
                  color="#3B82F6"
                  strokeWidth={2}
                  headSize={8}
                  path="smooth"
                  curveness={0.8}
                  showHead={true}
                  showTail={false}
                />
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