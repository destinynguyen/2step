import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/Container';
import { GlowButton } from './ui/GlowButton';

const ComponentsMaker = () => {
        return (
                <Container text="Components Maker" showResetButton={true} onReset={() => {}}>
                        <GlowButton>
                                <p>Click to Explore!</p>
                        </GlowButton>
                </Container>
        )
};


export default ComponentsMaker;