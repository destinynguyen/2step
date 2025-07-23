import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';

export function Step2({ expression, onNext, onBack, onReset }) {
  const [distributionState, setDistributionState] = useState({
    firstComplete: false,
    secondComplete: false
  });

  const [arrowPaths, setArrowPaths] = useState({
    path1: "M 0 0 Q 0 0 0 0",
    path2: "M 0 0 Q 0 0 0 0"
  });

  const coefficientRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  const calculateArrowPaths = () => {
    if (!coefficientRef.current || !box1Ref.current || !box2Ref.current) return;

    const coefficient = coefficientRef.current.getBoundingClientRect();
    const box1 = box1Ref.current.getBoundingClientRect();
    const box2 = box2Ref.current.getBoundingClientRect();
    const container = coefficientRef.current.parentElement.getBoundingClientRect();

    // Calculate relative positions
    const startX = coefficient.left - container.left + coefficient.width / 2;
    const startY = coefficient.top - container.top;
    
    const end1X = box1.left - container.left;
    const end1Y = box1.top - container.top;
    
    const end2X = box2.left - container.left;
    const end2Y = box2.top - container.top;

    // Create curved paths with projectile motion
    const control1X = startX + (end1X - startX) / 2;
    const control1Y = startY - 40; // Higher curve
    
    const control2X = startX + (end2X - startX) / 2;
    const control2Y = startY - 40; // Higher curve

    setArrowPaths({
      path1: `M ${startX} ${startY} Q ${control1X} ${control1Y} ${end1X} ${end1Y}`,
      path2: `M ${startX} ${startY} Q ${control2X} ${control2Y} ${end2X} ${end2Y}`
    });
  };

  useEffect(() => {
    calculateArrowPaths();
    window.addEventListener('resize', calculateArrowPaths);
    return () => window.removeEventListener('resize', calculateArrowPaths);
  }, [distributionState]);

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
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 md:p-6 mb-4 md:mb-6 relative overflow-visible">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 relative">
              <div className="relative inline-block">
                <span ref={coefficientRef} className="text-red-600" id="coefficient">{expression.a}</span>
                <span className="text-blue-600">(</span>
                <span 
                  ref={box1Ref}
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
                  ref={box2Ref}
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
                
                {/* Dynamic SVG arrows */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10, overflow: 'visible' }}>
                  <path
                    d={arrowPaths.path1}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  
                  <path
                    d={arrowPaths.path2}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#3B82F6"
                      />
                    </marker>
                  </defs>
                </svg>
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