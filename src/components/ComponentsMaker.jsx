import React, { useState, useEffect, useRef } from 'react';
// Import components from Components folder
import { Container } from './reused-ui/Container';
import { GlowButton } from './reused-ui/GlowButton';
import { FlexiText } from './reused-ui/FlexiText';
// Import Flexi sprites from Assets folder
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
// Import animations from Animations folder
import './reused-animations/fade.css';
import './reused-animations/scale.css';

// Render
const ComponentsMaker = () => {
        // State management
        const [firstButtonClicked, setFirstButtonClicked] = useState(false);

        // Functions
        // Handle reset button click
        const handleResetButtonClick = () => {
                setFirstButtonClicked(false);
        };

        // Handle first button click
        const handleFirstButtonClick = () => {
                setFirstButtonClicked(true);
        };

        return (
                <Container text="Components Maker" showResetButton={true} onReset={handleResetButtonClick}>
                        <FlexiText 
                                className={firstButtonClicked ? 'fade-out-up-animation' : ''}
                                flexiImage={FlexiTeacher}>
                                Welcome to the Components Maker!
                        </FlexiText>
                        <GlowButton 
                                className={firstButtonClicked ? 'shrink-out-animation' : ''}
                                onClick={handleFirstButtonClick}
                        >
                                <p>Click to Explore!</p>
                        </GlowButton>
                </Container>
        )
};

export default ComponentsMaker;