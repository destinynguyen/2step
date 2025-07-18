import React, { useState, useEffect, useRef } from 'react';
// Import components from Components folder
import { Container } from './reused-ui/Container';
import { GlowButton } from './reused-ui/GlowButton';
import { FlexiText } from './reused-ui/FlexiText';
import { Input } from './reused-ui/Input';
import { NavButtons } from './reused-ui/NavButtons';
// Import Flexi sprites from Assets folder
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
// Import animations from Animations folder
import './reused-animations/fade.css';
import './reused-animations/scale.css';

// Render
const ComponentsMaker = () => {
        const [currentStep, setCurrentStep] = useState(1);
        const [currentStepIndex, setCurrentStepIndex] = useState(0);
        const [showNavigationExample, setShowNavigationExample] = useState(false);
        const [showFlexiCharacter, setShowFlexiCharacter] = useState(false);
        
        // Consolidated animation states
        const [isAnimating, setIsAnimating] = useState(false);
        const [isFadingOut, setIsFadingOut] = useState(false);

        // Timeout refs for cleanup
        const timeoutRefs = useRef([]);

        // Cleanup function for timeouts
        const clearAllTimeouts = () => {
                timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
                timeoutRefs.current = [];
        };

        // Cleanup on unmount
        useEffect(() => {
                return () => clearAllTimeouts();
        }, []);

        // Helper function to add timeout with cleanup
        const addTimeout = (callback, delay) => {
                const timeoutId = setTimeout(callback, delay);
                timeoutRefs.current.push(timeoutId);
                return timeoutId;
        };

        // Functions
        // Handle reset button click
        const handleResetButtonClick = () => {
                clearAllTimeouts();
                setCurrentStep(1);
                setCurrentStepIndex(0);
                setShowNavigationExample(false);
                setShowFlexiCharacter(false);
                setIsAnimating(false);
                setIsFadingOut(false);
        };

        // Handle first button click - optimized timing approach
        const handleExploreButtonClick = () => {
                if (isAnimating) return; // Prevent multiple clicks
                
                setIsAnimating(true);
                setIsFadingOut(true);

                // Wait for fade-out animation to complete
                addTimeout(() => {
                        setCurrentStep(2);
                        setIsFadingOut(false);
                        
                        // Show navigation area after step 2 container appears
                        addTimeout(() => {
                                setShowNavigationExample(true);
                                
                                // Show Flexi character after navigation appears
                                addTimeout(() => {
                                        setShowFlexiCharacter(true);
                                        setIsAnimating(false);
                                }, 400);
                        }, 400);
                }, 600);
        };

        const handleContinue1ButtonClick = () => {
                // Reset the component when continue is clicked
                handleResetButtonClick();
        };

        // Handle navigation
        const handleNavigate = (direction, newStepIndex) => {
                setCurrentStepIndex(newStepIndex);
        };

        return (
                <Container text="Components Maker" showResetButton={true} onReset={handleResetButtonClick}>
                        {/* Step 1: Intro text */}
                        {currentStep === 1 && (
                                <>
                                        <FlexiText 
                                                className={isFadingOut ? 'fade-out-up-animation' : ''}
                                                flexiImage={FlexiWave}>
                                                Welcome to the Components Maker!
                                        </FlexiText>
                                        <GlowButton 
                                                onClick={handleExploreButtonClick}
                                                disabled={isAnimating}
                                        >
                                                <p>Click to Explore!</p>
                                        </GlowButton>
                                </>
                        )}

                        {/* Step 2: Test area */}
                        {currentStep === 2 && (
                                <>
                                        {/* Navigation area */}
                                        {showNavigationExample && (
                                                <div className="flex justify-center items-center min-h-[100px] w-50 bg-gray-200 rounded m-4 fade-in-down-animation">
                                                        <NavButtons 
                                                                currentStepIndex={currentStepIndex}
                                                                totalSteps={5}
                                                                onNavigate={handleNavigate}
                                                        />
                                                </div>
                                        )}
                                        
                                        {/* Input example - always shows with navigation */}
                                        {showNavigationExample && (
                                                <div className="flex justify-center items-center min-h-[100px] w-50 bg-gray-200 rounded m-4 fade-in-up-animation">
                                                        <Input 
                                                                placeholder="Default text"
                                                                className="max-w-md"
                                                        />
                                                </div>
                                        )}
                                        
                                        {/* Flexi character */}
                                        {showFlexiCharacter && (
                                                <>
                                                        <FlexiText 
                                                                className="fade-in-up-animation"
                                                                flexiImage={FlexiTeacher}>
                                                                Aside from the container, the text, and the buttons, here are some more of the components you can make!
                                                        </FlexiText>
                                                </>
                                        )}
                                </>
                        )}
                </Container>
        )
};

export default ComponentsMaker;