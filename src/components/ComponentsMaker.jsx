import React, { useState, useEffect, useRef } from 'react';
// Import components from Components folder
import { Container } from './reused-ui/Container';
import { GlowButton } from './reused-ui/GlowButton';
import { FlexiText } from './reused-ui/FlexiText';
// Import Flexi sprites from Assets folder
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
// Import animations from Animations folder
import './reused-animations/fade.css';
import './reused-animations/scale.css';

// Render
const ComponentsMaker = () => {
        // State management
        const [exploreButtonClicked, setExploreButtonClicked] = useState(false);
        const [isStep2, setIsStep2] = useState(false);

        // Functions
        // Handle reset button click
        const handleResetButtonClick = () => {
                setExploreButtonClicked(false);
                setIsStep2(false);
        };

        // Handle first button click
        const handleExploreButtonClick = () => {
                setExploreButtonClicked(true);
                setTimeout(() => {
                        setIsStep2(true);
                }, 1000);
        };

        return (
                <Container text="Components Maker" showResetButton={true} onReset={handleResetButtonClick}>
                        {/* Step 1: Into text */}
                        <FlexiText 
                                className={exploreButtonClicked ? 'fade-out-up-animation' : ''}
                                flexiImage={FlexiWave}>
                                Welcome to the Components Maker!
                        </FlexiText>
                        <GlowButton 
                                className={exploreButtonClicked ? 'shrink-out-animation' : ''}
                                onClick={handleExploreButtonClick}
                        >
                                <p>Click to Explore!</p>
                        </GlowButton>

                        {/* Step 2: Test area */}
                        {isStep2 && (
                                <FlexiText 
                                        className={isStep2 ? 'fade-in-down-animation' : ''}
                                        flexiImage={FlexiTeacher}>
                                        Above are the components you can make!
                                </FlexiText>
                        )}
                </Container>
        )
};

export default ComponentsMaker;