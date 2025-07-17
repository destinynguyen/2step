import React from 'react';

export function Container({ 
	children, 
	className = "", 
	maxWidth = "max-w-[464px]",
	showShadow = true,
	showBorder = true,
	selectNone = true,
	text = "Default Text",
	showResetButton = false,
	onReset,
	...props 
}) {
	const baseClasses = [
		"w-full",
		"min-w-[300px]",
		"min-h-[500px]",
		maxWidth,
		"mx-auto",
		"mt-5",
		"px-2",
		"bg-white",
		"rounded-lg",
		"flex",
		"flex-col",
	];

	if (showShadow) {
		baseClasses.push("shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)]");
	}

	if (showBorder) {
		baseClasses.push("border border-gray-200");
	}

	if (selectNone) {
		baseClasses.push("select-none");
	}

	const containerClasses = `${baseClasses.join(" ")} ${className}`.trim();

	return (
		<div className={containerClasses} {...props}>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-[#5750E3] text-sm font-medium select-none">{text}</h2>
					{showResetButton && (
						<button 
							className="text-sm px-3 py-1 rounded border transition-colors text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400"
							onClick={onReset}
							title="Reset interactive"
						>
							Reset
						</button>
					)}
				</div>
				<div className="space-y-4">
					<div className="w-full bg-white border border-[#5750E3]/30 rounded-md relative overflow-hidden" style={{ minHeight: '420px', height: 'auto' }}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
