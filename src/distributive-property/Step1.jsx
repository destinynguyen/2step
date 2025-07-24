import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/reused-ui/Container';
import { GlowButton } from '../components/reused-ui/GlowButton';
import { generateTwoStepEquation } from './utils';
import flexiConfident from '../assets/Fleximojis/Flexi_Confident.png';

export function Step1({ expression, onNext, onReset }) {
  // Generate a two-step equation if expression is not provided
  const equation = expression || generateTwoStepEquation();
  
  const [messageIndex, setMessageIndex] = useState(0);
  const [dragState, setDragState] = useState({
    isDragging: false,
    position: { x: 0, y: 0 },
    showGhostLeft: false
  });
  const containerRef = useRef(null);
  
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
      showGhostLeft: true
    });
  };
  
  const handleDragMove = (e) => {
    if (!dragState.isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setDragState(prev => ({
      ...prev,
      position: { x: relX, y: relY }
    }));
  };
  
  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      position: { x: 0, y: 0 },
      showGhostLeft: false
    });
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
                className={`${messageIndex === 1 ? 'glow-highlight cursor-grab' : ''} ${dragState.isDragging ? 'cursor-grabbing opacity-0' : ''}`}
                style={messageIndex === 1 ? {
                  textShadow: '0 0 8px rgba(251,191,36,0.8), 0 0 12px rgba(251,191,36,0.6)'
                } : {}}
                onMouseDown={messageIndex === 1 ? handleDragStart : undefined}
              >
                {equation.b >= 0 ? '+' : ''}{equation.b}
              </span>

              {/* Ghost left (overlays original spot) */}
              {dragState.showGhostLeft && (
                <span className="absolute inset-0 text-gray-400 pointer-events-none flex items-center justify-center">
                  {equation.b >= 0 ? '+' : ''}{equation.b}
                </span>
              )}
            </span>
          <span className="ml-2">=</span>
                      <span className="ml-2">{equation.c}</span>
          </div>
          
          {/* Dragged element */}
          {dragState.isDragging && (
            <div 
              className="absolute pointer-events-none text-3xl font-bold text-[#5750E3]"
              style={{
                left: dragState.position.x - 10,
                top: dragState.position.y - 20,
                zIndex: 1000
              }}
            >
              {equation.b >= 0 ? '+' : ''}{equation.b}
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