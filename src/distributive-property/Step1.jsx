import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';
import { generateTwoStepEquation } from './utils';
import flexiConfident from '../assets/Fleximojis/Flexi_Confident.png';

// Animation for striking through cancelled terms
import '../components/reused-animations/strike.css';

export function Step1({ expression, onNext, onReset }) {
  // Generate a two-step equation if expression is not provided
  const equation = expression || generateTwoStepEquation();
  
  const [messageIndex, setMessageIndex] = useState(0);
  const [dragState, setDragState] = useState({
    isDragging: false,
    position: { x: 0, y: 0 },
    showGhostLeft: false,
    hasCrossed: false,
    placedRight: false
  });
  const containerRef = useRef(null);
  const equalsRef = useRef(null);
  
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
  
  const handleDragStart = (e) => {
    if (messageIndex !== 1 || !containerRef.current) return;

    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setDragState({
      isDragging: true,
      position: { x: relX, y: relY },
      showGhostLeft: true,
      hasCrossed: false,
      placedRight: false
    });
  };
  
  const handleDragMove = (e) => {
    if (!dragState.isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    // crossing detection
    if (!dragState.hasCrossed && equalsRef.current){
      const eqRect = equalsRef.current.getBoundingClientRect();
      if(e.clientX > eqRect.left){
        setDragState(prev=>({...prev,hasCrossed:true}));
      }
    }

    setDragState(prev => ({
      ...prev,
      position: { x: relX, y: relY }
    }));
  };
  
  const handleDragEnd = () => {
    setDragState(prev=>({
      isDragging: false,
      position: { x: 0, y: 0 },
      showGhostLeft: true,            // keep grey +b
      hasCrossed: prev.hasCrossed,    // retain to keep grey -b under +b
      placedRight: prev.hasCrossed ? true : false
    }));
  };
  
  useEffect(() => {
    const handleDocumentMouseMove = (e) => {
      if (dragState.isDragging) {
        handleDragMove(e);
      }
    };
    
    const handleDocumentMouseUp = () => {
      if (dragState.isDragging) {
        handleDragEnd();
      }
    };
    
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleDocumentMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [dragState.isDragging]);

  return (
    <Container 
      text="Two Step Equation" 
      showResetButton={true}
      onReset={onReset}
      selectNone={false}
    >
      <div 
        ref={containerRef}
        className="flex items-center justify-center w-full relative" 
        style={{ minHeight: '420px' }}
      >
        <div 
          className={`text-3xl font-bold text-[#5750E3] flex items-center select-text ${messageIndex === 1 ? 'cursor-grab' : ''}`}
          onMouseDown={messageIndex === 1 ? handleDragStart : undefined}
        >
          <span className="flex flex-col items-center">
            <span>x</span>
            <span className="border-t border-[#5750E3] w-full text-center">{equation.denominator}</span>
          </span>
                      <span className="relative inline-block ml-2">
              {/* Original term */}
              <span
                className={`${messageIndex === 1 && !dragState.placedRight ? 'glow-highlight cursor-grab' : ''} ${dragState.isDragging ? 'cursor-grabbing opacity-0' : ''}`}
                style={messageIndex === 1 && !dragState.placedRight ? {
                  textShadow: '0 0 8px rgba(251,191,36,0.8), 0 0 12px rgba(251,191,36,0.6)'
                } : {}}
                onMouseDown={messageIndex === 1 ? handleDragStart : undefined}
              >
                {equation.b >= 0 ? '+' : ''}{equation.b}
              </span>

              {/* Ghost left (overlays original spot) */}
              {dragState.showGhostLeft && (
                <span className={`absolute inset-0 text-gray-400 pointer-events-none flex items-center justify-center ${dragState.placedRight ? 'strike-through' : ''}`}>                
                  {equation.b >= 0 ? '+' : ''}{equation.b}
                </span>
              )}
              {/* Cancellation pair on left once crossed */}
              {dragState.hasCrossed && (
                <span className={`absolute left-0 right-0 text-gray-400 pointer-events-none flex items-center justify-center ${dragState.placedRight ? 'strike-through' : ''}`} style={{ top: '100%' }}>
                  {equation.b >= 0 ? '-' : '+'}{Math.abs(equation.b)}
                </span>
              )}
            </span>
          <span className="ml-2" ref={equalsRef}>=</span>
          <span className="ml-2">{equation.c}</span>
             {/* Right side placeholder or placed term */}
             {dragState.placedRight ? (
               <span className="ml-2 text-[#5750E3]">{equation.b>=0?'-':'+'}{Math.abs(equation.b)}</span>
             ) : dragState.hasCrossed ? (
               <span className="ml-2 text-gray-400">{equation.b>=0?'-':'+'}{Math.abs(equation.b)}</span>
             ) : null}
          </div>
          
          {/* Dragged element */}
          {dragState.isDragging && !dragState.placedRight && (
            <div 
              className="absolute pointer-events-none text-3xl font-bold text-[#5750E3]"
              style={{
                left: dragState.position.x - 10,
                top: dragState.position.y - 20,
                zIndex: 1000
              }}
            >
              {dragState.hasCrossed ? (equation.b>=0?'-':'+')+Math.abs(equation.b) : (equation.b>=0?'+':'')+equation.b}
            </div>
          )}
        
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