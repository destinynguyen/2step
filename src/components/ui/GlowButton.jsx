import React, { useState } from 'react';

export function GlowButton({ 
    children, 
    onClick, 
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    style = {},
    showGlow = true,
    animate = true,
    ...props 
}) {
    const [isShrinking, setIsShrinking] = useState(false);

    const handleClick = (e) => {
        if (disabled) return;
        
        if (animate) {
            setIsShrinking(true);
            setTimeout(() => {
                setIsShrinking(false);
            }, 500);
        }
        
        if (onClick) {
            onClick(e);
        }
    };

    const baseClasses = `
        relative select-none transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;

    const sizeClasses = {
        small: 'px-2 py-1 text-xs',
        medium: 'px-3 py-1.5 text-sm',
        large: 'px-4 py-2 text-base'
    };

    const variantClasses = {
        primary: 'bg-[#008545] hover:bg-[#00783E] text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        outline: 'bg-transparent border border-[#008545] text-white hover:bg-[#008545] hover:text-white'
    };

    const animationClasses = animate ? 
        (isShrinking ? 'shrink-animation' : 'continue-animation') : '';

    const buttonClasses = `
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${animationClasses}
        rounded
        text-sm font-medium select-none
        ${className}
    `;

    const glowClasses = showGlow ? 
        `glow-button ${isShrinking ? 'simple-glow stopped' : 'simple-glow'}` : '';

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
            
            <style>{`
                @property --r {
                    syntax: '<angle>';
                    inherits: false;
                    initial-value: 0deg;
                }

                .glow-button { 
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3;
                    transition: all .3s ease;
                    padding: 7px;
                    width: fit-content;
                    height: fit-content;
                    margin-bottom: 5px;
                    margin-right: 5px;
                }

                .glow-button::before {
                    content: "";
                    display: block;
                    position: absolute;
                    background: #fff;
                    inset: 2px;
                    border-radius: 4px;
                    z-index: -2;
                }

                .simple-glow { 
                    background: conic-gradient(
                        from var(--r),
                        transparent 0%,
                        rgb(0, 255, 132) 2%,
                        rgb(0, 214, 111) 8%,
                        rgb(0, 174, 90) 12%,
                        rgb(0, 133, 69) 14%,
                        transparent 15%
                    );
                    animation: rotating 3s linear infinite;
                    transition: animation 0.3s ease;
                }

                .simple-glow.stopped {
                    animation: none;
                    background: none;
                }

                @keyframes rotating {
                    0% {
                        --r: 0deg;
                    }
                    100% {
                        --r: 360deg;
                    }
                }

                .shrink-animation {
                    animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                .continue-animation {
                    animation: growButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                @keyframes shrinkButton {
                    from {
                        transform: scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: scale(0);
                        opacity: 0;
                    }
                }

                @keyframes growButton {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}