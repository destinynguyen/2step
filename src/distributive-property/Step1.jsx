import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/reused-ui/Container';
import { generateTwoStepEquation } from './utils';
import flexiWave from '../assets/All Flexi Poses/PNG/Flexi_Wave.png';
import flexiStars from '../assets/All Flexi Poses/PNG/Flexi_Stars.png';
import flexiThumbsUp from '../assets/All Flexi Poses/PNG/Flexi_ThumbsUp.png';

// Animation for striking through cancelled terms
import '../components/reused-animations/strike.css';
import '../components/reused-animations/scale.css'; // retain in case used elsewhere but fade animation will be used instead
import '../components/reused-animations/shift.css'; // for slide-right-fill
import '../components/reused-animations/simplify.css'; // right-side simplify animations

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

  // Additional animation flags
  const [vanishLeft, setVanishLeft] = useState(false); // start fading out left terms
  const [leftRemoved, setLeftRemoved] = useState(false); // actually remove the spans after animation
  const [shiftFill, setShiftFill] = useState(false);   // shift x fraction to the right
  // rightStage: 0 none, 1 glow, 2 fade out, 3 result shown
  const [rightStage, setRightStage] = useState(0);

  // State for dragging denominator
  const [denomDrag, setDenomDrag] = useState({
    isDragging:false,
    position:{x:0,y:0},
    hasCrossed:false,
    placedRight:false
  });

  // vanish grey left multiplication once denominator placed
  const [leftDenomVanished, setLeftDenomVanished] = useState(false);

  // multiplication simplify stage: 0 none, 1 glow, 2 fade, 3 final result
  const [multStage, setMultStage] = useState(0);
  const containerRef = useRef(null);
  const equalsRef = useRef(null);
  
  const flexiMessages = [
    "Let's work together to solve this two-step equation!",
    "Isolate x by dragging the highlighted term to the other side of the equation.",
    "To do this, you perform the inverse operations to both sides of the equation.",
    "Great! Now drag the denominator term so we can eliminate the fraction.",
    "Almost there – watch how we simplify the right side.",
    "All done! We've isolated x."
  ];

  const crossMessage = "To do this, you perform the inverse operations to both sides of the equation";
  const [showCrossMsg, setShowCrossMsg] = useState(false);
  
  // Existing helper (not used anymore)
  const handleNextMessage = () => {
    if (messageIndex < flexiMessages.length - 1) {
      setMessageIndex(prev => prev + 1);
    }
  };

  /* ------------ Local navigation (forward / back) ------------ */
  const canGoBack = messageIndex > 0;
  const canGoForward = messageIndex < flexiMessages.length - 1;

  const handleBackMessage = () => {
    if (!canGoBack) return;
    setMessageIndex(prev => {
      const newIdx = prev - 1;
      applyEquationState(newIdx);
      return newIdx;
    });
  };
 
   const handleForwardMessage = () => {
     if (!canGoForward) return;
     setMessageIndex(prev => {
       const newIdx = prev + 1;
       applyEquationState(newIdx);
       return newIdx;
     });
   };
  
  const handleDragStart = (e) => {
    if (messageIndex !== 1 || rightStage!==0 || !containerRef.current) return;

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

  // Auto message transitions
  useEffect(()=>{
    if(dragState.hasCrossed){
      setMessageIndex(2);
    }
  },[dragState.hasCrossed]);

  // when denominator ready to drag (highlight shown)
  useEffect(()=>{
    if(rightStage===3){
      setMessageIndex(3);
    }
  },[rightStage]);

  // when multiplication simplification starts glow
  useEffect(()=>{
     if(multStage===1){
       setMessageIndex(4);
     } else if(multStage===3){
       setMessageIndex(5);
     }
  },[multStage]);

  // initialise equation state for first message
  useEffect(()=>{
    applyEquationState(0);
  },[]);

  // Auto-advance first message after 3 s
  useEffect(() => {
    if (messageIndex === 0) {
      const t = setTimeout(() => {
        setMessageIndex(1);
        applyEquationState(1);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [messageIndex]);

  // Apply static equation snapshot for each message without animations
  const applyEquationState = (idx) => {
    // base defaults
    let newDrag = { isDragging: false, position: { x: 0, y: 0 }, showGhostLeft: false, hasCrossed: false, placedRight: false };
    let newDenom = { isDragging: false, position: { x: 0, y: 0 }, hasCrossed: false, placedRight: false };
    let _vanishLeft = false;
    let _leftRemoved = false;
    let _shiftFill = false;
    let _rightStage = 0;
    let _leftDenomVanished = false;
    let _multStage = 0;

    switch (idx) {
      case 0:
        // initial
        break;
      case 1:
        // highlight only
        break;
      case 2:
        newDrag = { ...newDrag, showGhostLeft: true, hasCrossed: true, placedRight: true };
        break;
      case 3:
        newDrag = { ...newDrag, showGhostLeft: true, hasCrossed: true, placedRight: true };
        _vanishLeft = false;
        _leftRemoved = true;
        _shiftFill = true;
        _rightStage = 3;
        break;
      case 4:
        newDrag = { ...newDrag, showGhostLeft: true, hasCrossed: true, placedRight: true };
        _vanishLeft = true;
        _leftRemoved = true;
        _shiftFill = true;
        _rightStage = 3;
        newDenom = { ...newDenom, hasCrossed: true, placedRight: true };
        _leftDenomVanished = true;
        _multStage = 1;
        break;
      case 5:
        newDrag = { ...newDrag, showGhostLeft: true, hasCrossed: true, placedRight: true };
        _vanishLeft = true;
        _leftRemoved = true;
        _shiftFill = true;
        _rightStage = 3;
        newDenom = { ...newDenom, hasCrossed: true, placedRight: true };
        _leftDenomVanished = true;
        _multStage = 3;
        break;
      default:
        break;
    }

    // apply in one batch per state var
    setDragState(newDrag);
    setDenomDrag(newDenom);
    setVanishLeft(_vanishLeft);
    setLeftRemoved(_leftRemoved);
    setShiftFill(_shiftFill);
    setRightStage(_rightStage);
    setLeftDenomVanished(_leftDenomVanished);
    setMultStage(_multStage);
  };

  /* ---------------- Denominator drag handlers ---------------- */

  const startDenomDrag=(e)=>{
    if(rightStage!==3 || denomDrag.placedRight) return;
    e.stopPropagation();
    e.preventDefault();
    const rect=containerRef.current.getBoundingClientRect();
    setDenomDrag({isDragging:true,position:{x:e.clientX-rect.left,y:e.clientY-rect.top},hasCrossed:false,placedRight:false});
  };

  const moveDenomDrag=(e)=>{
    if(!denomDrag.isDragging||!containerRef.current) return;
    const rect=containerRef.current.getBoundingClientRect();
    const relX=e.clientX-rect.left;
    const relY=e.clientY-rect.top;
    let crossed=denomDrag.hasCrossed;
    if(!crossed && equalsRef.current){
      const eqRect=equalsRef.current.getBoundingClientRect();
      if(e.clientX>eqRect.left) crossed=true;
    }
    setDenomDrag(prev=>({...prev,position:{x:relX,y:relY},hasCrossed:crossed}));
  };

  const endDenomDrag=()=>{
    if(!denomDrag.isDragging) return;
    setDenomDrag(prev=>({
      isDragging:false,
      position:{x:0,y:0},
      hasCrossed:prev.hasCrossed,
      placedRight:prev.hasCrossed
    }));
  };

  // when denominator placed, schedule left grey terms to vanish
  useEffect(()=>{
     if(denomDrag.placedRight){
        const t=setTimeout(()=>setLeftDenomVanished(true),900); // start fade after 0.9s

        // sequence for right-side multiplication simplification
        const start=900+900; // wait for vanish complete (fade takes 0.9s)
        const g=setTimeout(()=>setMultStage(1),start);           // glow both terms
        const f=setTimeout(()=>setMultStage(2),start+400);       // fade
        const r=setTimeout(()=>setMultStage(3),start+700);       // show product

        return ()=>{clearTimeout(t);clearTimeout(g);clearTimeout(f);clearTimeout(r);}  
     }else{
        setLeftDenomVanished(false);
        setMultStage(0);
     }
  },[denomDrag.placedRight]);

  useEffect(()=>{
    if(!denomDrag.isDragging) return;
    const move=(e)=>moveDenomDrag(e);
    const up=()=>endDenomDrag();
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
    return ()=>{document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);}  
  },[denomDrag.isDragging]);

  // Orchestrate post-placement animations: strike-through (already handled by CSS delay),
  // then vanish, then slide right.
  useEffect(() => {
    if (dragState.placedRight) {
      // 0.7 s strike-through delay – start vanishing as soon as line begins drawing
      const vanishTimer = setTimeout(() => {
        setVanishLeft(true);
        // schedule removal after shrink-out duration (0.5s)
        setTimeout(() => setLeftRemoved(true), 500);
      }, 700);

      // shift x fraction right after grey terms fully gone
      const slideTimer  = setTimeout(() => setShiftFill(true), 700 + 500);

      // Begin right-side simplification once x has shifted (add 400ms for shift animation)
      const simplifyStart = 700 + 500 + 400;
      const tGlow = setTimeout(() => setRightStage(1), simplifyStart);        // glow
      const tFade = setTimeout(() => setRightStage(2), simplifyStart + 400);  // fade out
      const tResult = setTimeout(() => setRightStage(3), simplifyStart + 700); // show result

      return () => {
        clearTimeout(vanishTimer);
        clearTimeout(slideTimer);
        clearTimeout(tGlow);clearTimeout(tFade);clearTimeout(tResult);
      };
    } else {
      // Reset flags when interaction resets
      setVanishLeft(false);
      /* Do NOT reset leftRemoved here – it causes the original b term to briefly re-render
         when navigating back and forth. Its value is handled explicitly in applyEquationState. */
      // setLeftRemoved(false);
      setShiftFill(false);
      setRightStage(0);

      setDenomDrag({isDragging:false,position:{x:0,y:0},hasCrossed:false,placedRight:false});
    }
  }, [dragState.placedRight]);
  
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

  const isAnimating = (messageIndex !== flexiMessages.length - 1) && (dragState.isDragging || denomDrag.isDragging || rightStage===1 || rightStage===2 || multStage===1 || multStage===2);

  return (
    <Container 
      text="Two Step Equation" 
      showResetButton={true}
      onReset={onReset}
      selectNone={false}
    >
      <div 
        ref={containerRef}
        className="flex items-start justify-center w-full pt-28 relative"
        style={{ minHeight: '420px' }}
      >
        <div 
          className={`text-3xl font-bold text-[#5750E3] flex items-center select-text ${messageIndex === 1 && rightStage===0 ? 'cursor-grab' : ''}`}
          onMouseDown={messageIndex === 1 && rightStage===0 ? handleDragStart : undefined}
        >
          <span className={`flex flex-col items-center relative ${shiftFill ? 'slide-right-fill' : ''}`}>  
            <span>x</span>
            {!leftDenomVanished && (
            <span 
              className={`border-t w-full text-center relative ${(denomDrag.isDragging || denomDrag.placedRight) ? 'border-gray-400 text-gray-400' : 'border-[#5750E3]'} ${rightStage===3 && !denomDrag.placedRight && !denomDrag.isDragging ? 'glow-highlight cursor-grab':''} ${leftDenomVanished? 'fade-out-left-slow':''}`}
              style={rightStage===3 && !denomDrag.placedRight && !denomDrag.isDragging ? {textShadow:'0 0 4px rgba(87,80,227,0.6), 0 0 6px rgba(87,80,227,0.4)'}:{}}
              onMouseDown={startDenomDrag}
            >{equation.denominator}</span>) }
          </span>
                      <span className="relative inline-block ml-2">
              {/* Original term (purple). Hide after placement */}
              {!leftRemoved && (
                <span
                  className={`${messageIndex === 1 && !dragState.placedRight ? 'glow-highlight cursor-grab' : ''} ${dragState.isDragging ? 'cursor-grabbing opacity-0' : ''} ${dragState.placedRight ? (vanishLeft ? 'fade-out-left-animation' : '') : ''}`}
                  style={messageIndex === 1 && !dragState.placedRight ? {
                    textShadow: '0 0 4px rgba(87,80,227,0.6), 0 0 6px rgba(87,80,227,0.4)'
                  } : {}}
                  onMouseDown={messageIndex === 1 ? handleDragStart : undefined}
                >
                  {equation.b >= 0 ? '+' : ''}{equation.b}
                </span>
              )}

              {/* Ghost left (overlays original spot) */}
              {dragState.showGhostLeft && !leftRemoved && (
                <span className={`absolute inset-0 text-gray-400 pointer-events-none flex items-center justify-center ${dragState.placedRight ? 'strike-through' : ''} ${vanishLeft ? 'fade-out-left-animation' : ''}`}>                
                  {equation.b >= 0 ? '+' : ''}{equation.b}
                </span>
              )}
              {/* Cancellation pair on left once crossed */}
              {dragState.hasCrossed && !leftRemoved && (
                <span className={`absolute left-0 right-0 text-gray-400 pointer-events-none flex items-center justify-center ${dragState.placedRight ? 'strike-through' : ''} ${vanishLeft ? 'fade-out-left-animation' : ''}`} style={{ top: '100%' }}>
                  {equation.b >= 0 ? '-' : '+'}{Math.abs(equation.b)}
                </span>
              )}
            </span>
          {/* Show ×a on left once denominator placed */}
          {denomDrag.placedRight && !leftDenomVanished && (
            <span className={`ml-2 text-gray-400 ${leftDenomVanished? 'fade-out-left-slow':''}`}>×{equation.denominator}</span>
          )}

          <span className="ml-2" ref={equalsRef}>=</span>

          {/* Right side dynamic container: consistent margin and gap */}
          <span className="relative inline-flex items-center gap-1 ml-3">
            {/* c term */}
            {(rightStage < 3) && (
              <span className={`inline-block ${rightStage===1? 'glow-scale':''} ${rightStage===2? 'quick-fade-out':''}`}>{equation.c}</span>
            )}

            {/* -b / +b term */}
            {dragState.placedRight ? (
              (rightStage < 3 && messageIndex < 3 ? (
                <span className={`inline-block text-[#5750E3] ${rightStage===1? 'glow-scale':''} ${rightStage===2? 'quick-fade-out':''}`}>
                  {equation.b>=0?'-':'+'}{Math.abs(equation.b)}
                </span>
              ): null)
            ) : dragState.hasCrossed ? (
              <span className="ml-2 text-gray-400">{equation.b>=0?'-':'+'}{Math.abs(equation.b)}</span>
            ) : null}

            {/* result of addition stage */}
            {rightStage===3 && multStage<2 && (
              <span className={`inline-block ${multStage===1?'glow-scale':''} ${multStage===2?'quick-fade-out':''}`}>{equation.c - equation.b}</span>
            )}

            {/* × denominator split for balanced spacing */}
            {denomDrag.placedRight && multStage < 2 && (
              <>
                <span className={`text-[#5750E3] ${multStage===1?'glow-scale':''}`}>×</span>
                <span className={`text-[#5750E3] ${multStage===1?'glow-scale':''}`}>{equation.denominator}</span>
              </>
            )}

            {/* product result */}
            {multStage===3 && (
              <span className="inline-block pop-in text-[#5750E3]">{(equation.c - equation.b)*equation.denominator}</span>
            )}
          </span>
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
        
          {/* Drag overlay for denominator */}
          {denomDrag.isDragging && (
            <div
              className="absolute pointer-events-none text-3xl font-bold text-[#5750E3]"
              style={{left:denomDrag.position.x-10, top:denomDrag.position.y-20, zIndex:1000}}
            >
              {denomDrag.hasCrossed? `×${equation.denominator}` : `÷${equation.denominator}`}
            </div>
          )}
        
        <div className="absolute bottom-4 left-4 flex items-end space-x-2">
          <img
            src={isAnimating ? flexiStars : (messageIndex === flexiMessages.length - 1 ? flexiThumbsUp : flexiWave)}
            alt="Flexi"
            className="w-20 h-20"
          />
          <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-lg max-w-48">
            <p className="text-sm text-gray-700 mb-1">
              {flexiMessages[messageIndex]}
            </p>
          </div>
        </div>
        
        {/* Forward / Back circular buttons */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-3">
          {/* Back */}
          <button
            onClick={handleBackMessage}
            disabled={!canGoBack}
            aria-label="Previous message"
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-colors ${canGoBack ? 'bg-[#008545] hover:bg-[#00783E]' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            &#60;
          </button>

          {/* Forward */}
          <button
            onClick={handleForwardMessage}
            disabled={!canGoForward}
            aria-label="Next message"
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-colors ${canGoForward ? 'bg-[#008545] hover:bg-[#00783E]' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            &#62;
          </button>
        </div>

      </div>
    </Container>
  );
} 