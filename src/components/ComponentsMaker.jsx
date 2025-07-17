import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/Container';
import { GlowButton } from './ui/GlowButton';
import { FlexiText } from './ui/FlexiText';

import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';

const ComponentsMaker = () => {
        return (
                <Container text="Components Maker" showResetButton={true} onReset={() => {}}>
                        <FlexiText flexiImage={FlexiTeacher}>
                                Welcome to the Components Maker!
                        </FlexiText>
                        <GlowButton>
                                <p>Click to Explore!</p>
                        </GlowButton>
                </Container>
        )
};


export default ComponentsMaker;