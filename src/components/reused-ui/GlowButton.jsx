import React from 'react';
import '../reused-animations/scale.css';
import '../reused-animations/glow.css';

export function GlowButton({ 
    children, 
    onClick, 
    disabled = false,
    className = '',
    style = {},
    showGlow = true,
    animate = true,
    isShrinking = false,
    isGrowing = false,
    ...props 
}) {
    const handleClick = (e) => {
        if (disabled) return;
        
        if (onClick) {
            onClick(e);
        }
    };

    // Detect animation classes from className
    const detectAnimationClasses = (classString) => {
        if (!classString) return { animationClasses: '', nonAnimationClasses: '' };
        
        const classes = classString.split(' ').filter(cls => cls.trim());
        const animationCls = classes.filter(cls => cls.includes('-animation'));
        const nonAnimationCls = classes.filter(cls => !cls.includes('-animation'));
        
        return {
            animationClasses: animationCls.join(' '),
            nonAnimationClasses: nonAnimationCls.join(' ')
        };
    };

    const { animationClasses, nonAnimationClasses } = detectAnimationClasses(className);

    const baseClasses = `
        relative select-none transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;

    const buttonAnimationClasses = animate ? 
        (isShrinking ? 'shrink-animation' : isGrowing ? 'continue-animation' : '') : '';

    const buttonClasses = `
        ${baseClasses}
        bg-[#008545] hover:bg-[#00783E] text-white
        px-3 py-1.5 text-sm
        ${buttonAnimationClasses}
        ${animationClasses}
        rounded
        text-sm font-medium select-none
        ${nonAnimationClasses}
    `;

    const glowClasses = showGlow ? 
        `glow-button simple-glow ${animationClasses}${animationClasses ? ' stopped' : ''}` : 
        `glow-button ${animationClasses}`;

    return (
        <div className={glowClasses} style={style}>
            <button
                className={buttonClasses}
                onClick={handleClick}
                disabled={disabled}
                style={{
                    transformOrigin: 'center',
                    borderRadius: '4px',
                    zIndex: 50,
                    ...style
                }}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}