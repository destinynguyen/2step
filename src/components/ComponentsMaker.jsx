import React, { useState, useEffect, useRef } from 'react';
// Import components from Components folder
import { Container } from './reused-ui/Container';
import { GlowButton } from './reused-ui/GlowButton';
import { FlexiText } from './reused-ui/FlexiText';
import { NavButtons } from './reused-ui/NavButtons';
// Import Flexi sprites from Assets folder
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
// Import animations from Animations folder
import './reused-animations/fade.css';
import './reused-animations/scale.css';

// Render
const ComponentsMaker = () => {
        const [exploreButtonClicked, setExploreButtonClicked] = useState(false);
        const [isStep1, setIsStep1] = useState(true);
        const [isStep2, setIsStep2] = useState(false);
        const [isStep3, setIsStep3] = useState(false);
        const [currentStepIndex, setCurrentStepIndex] = useState(0);
        const [showNavigationExample, setShowNavigationExample] = useState(false);
        const [showFlexiCharacter, setShowFlexiCharacter] = useState(false);
        
        // Animation states
        const [isAnimating, setIsAnimating] = useState(false);
        const [isStep1FadingOut, setIsStep1FadingOut] = useState(false);
        const [isStep2FadingOut, setIsStep2FadingOut] = useState(false);
        const [isNavigationFadingOut, setIsNavigationFadingOut] = useState(false);

        // Functions
        // Handle reset button click
        const handleResetButtonClick = () => {
                setExploreButtonClicked(false);
                setIsStep2(false);
                setCurrentStepIndex(0);
                setShowNavigationExample(false);
                setShowFlexiCharacter(false);
                setIsAnimating(false);
                setIsStep1(true);
                setIsStep1FadingOut(false);
                setIsStep2FadingOut(false);
                setIsNavigationFadingOut(false);
        };

        // Handle first button click - using LCM's timing approach
        const handleExploreButtonClick = () => {
                // Start animation sequence
                setIsAnimating(true);
                setExploreButtonClicked(true);
                setIsStep1FadingOut(true);

                // Wait for fade-out animation to complete (0.5s) plus buffer
                setTimeout(() => {                        
                        // Show step 2 and start navigation animation
                        setIsStep2(true);
                        
                        // Wait a bit, then show navigation area
                        setTimeout(() => {
                                setShowNavigationExample(true);
                                
                                // Wait for navigation to appear, then show Flexi character
                                setTimeout(() => {
                                        setShowFlexiCharacter(true);
                                        setIsAnimating(false);
                                        // Hide step 1 elements after fade-out completes
                                        setIsStep1(false);
                                        setIsStep1FadingOut(false);
                                }, 800); // Wait for navigation animation
                        }, 300); // Wait for step 2 container
                }, 600); // Wait for fade-out animations (0.5s + 0.1s buffer)
        };

        const handleContinue1ButtonClick = () => {
                // Start step 2 fade-out animation for text and button
                setIsAnimating(true);
                setIsStep2FadingOut(true);
                
                // Wait for text and button fade-out to complete, then fade out navigation
                setTimeout(() => {
                        setIsNavigationFadingOut(true);
                        
                        // Wait for navigation fade-out to complete, then transition to step 3
                        setTimeout(() => {
                                setIsStep2(false);
                                setIsStep3(true);
                                setIsAnimating(false);
                                setIsStep2FadingOut(false);
                                setIsNavigationFadingOut(false);
                        }, 600); // Wait for navigation fade-out animations (0.5s + 0.1s buffer)
                }, 600); // Wait for text/button fade-out animations (0.5s + 0.1s buffer)
        };

        const handleContinue2ButtonClick = () => {
        };

        // Handle navigation
        const handleNavigate = (direction, newStepIndex) => {
                setCurrentStepIndex(newStepIndex);
        };

        return (
                <Container text="Components Maker" showResetButton={true} onReset={handleResetButtonClick}>
                        {/* Step 1: Intro text - only show if not hidden */}
                        {isStep1 && (
                                <>
                                        <FlexiText 
                                                className={isStep1FadingOut ? 'fade-out-up-animation' : ''}
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

                        {/* Step 2: Test area - using LCM's conditional rendering pattern */}
                        {isStep2 && (
                                <>
                                        {/* Navigation area - appears first */}
                                        {showNavigationExample && (
                                                <div className={`flex justify-center items-center min-h-[100px] w-50 bg-gray-200 rounded m-4 ${isNavigationFadingOut ? 'fade-out-down-animation' : 'fade-in-down-animation'}`}>
                                                        <NavButtons 
                                                                currentStepIndex={currentStepIndex}
                                                                totalSteps={5}
                                                                onNavigate={handleNavigate}
                                                        />
                                                </div>
                                        )}
                                        
                                        {/* Flexi character - appears after navigation */}
                                        {showFlexiCharacter && (
                                                <>
                                                        <FlexiText 
                                                                className={isStep2FadingOut ? 'fade-out-up-animation' : 'fade-in-up-animation'}
                                                                flexiImage={FlexiTeacher}>
                                                                Above are some more of the components you can make!
                                                        </FlexiText>
                                                        <GlowButton 
                                                                onClick={handleContinue1ButtonClick}
                                                                disabled={isAnimating}
                                                        >
                                                                <p>Continue</p>
                                                        </GlowButton>
                                                </>
                                        )}
                                </>
                        )}

                        {/* Step 3: Test area - using LCM's conditional rendering pattern */}
                        {isStep3 && (
                                <>
                                        <FlexiText 
                                                className="fade-in-up-animation"
                                                flexiImage={FlexiTeacher}>
                                                These componets can easily be altered to fit your needs as well!
                                        </FlexiText>
                                </>
                        )}
                </Container>
        )
};

export default ComponentsMaker;