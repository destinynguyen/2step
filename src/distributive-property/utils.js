// Generate random distributive property expression
export function generateDistributiveExpression() {
  // Generate random numbers between 1 and 10
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const c = Math.floor(Math.random() * 10) + 1;
  
  return {
    a: a,
    b: b,
    c: c,
    expression: `${a}(${b} + ${c})`
  };
}

// Calculate the result
export function calculateDistributiveProperty(a, b, c) {
  return {
    ab: a * b,
    ac: a * c,
    total: a * b + a * c
  };
}

// Generate random two-step equation ax + b = c
export function generateTwoStepEquation() {
  // Generate random integers between -10 and 10 for b and c
  const b = Math.floor(Math.random() * 21) - 10; // -10 to 10
  const c = Math.floor(Math.random() * 21) - 10; // -10 to 10
  
  // Generate a coefficient a that is always a fraction with numerator 1
  const aOptions = [
    { value: 1/2, type: 'fraction', denominator: 2 },
    { value: 1/3, type: 'fraction', denominator: 3 },
    { value: 1/4, type: 'fraction', denominator: 4 },
    { value: 1/5, type: 'fraction', denominator: 5 },
    { value: 1/6, type: 'fraction', denominator: 6 },
    { value: 1/7, type: 'fraction', denominator: 7 },
    { value: 1/8, type: 'fraction', denominator: 8 },
    { value: 1/9, type: 'fraction', denominator: 9 },
    { value: 1/10, type: 'fraction', denominator: 10 }
  ];
  
  const selectedA = aOptions[Math.floor(Math.random() * aOptions.length)];
  const a = selectedA.value;
  
  // Calculate x to ensure it's an integer
  // ax + b = c => x = (c - b) / a
  const x = Math.round((c - b) / a);
  
  // Recalculate c to ensure x is exactly an integer
  const adjustedC = a * x + b;
  
  return {
    a: a,
    b: b,
    c: adjustedC,
    x: x,
    aType: selectedA.type,
    denominator: selectedA.denominator,
    expression: formatTwoStepEquation(a, b, adjustedC)
  };
}

// Format the two-step equation for display
function formatTwoStepEquation(a, b, c) {
  let aDisplay = '';
  
  // Handle fraction display for a
  if (a === 1) {
    aDisplay = '';
  } else if (a === -1) {
    aDisplay = '-';
  } else if (Number.isInteger(a)) {
    aDisplay = a.toString();
  } else {
    // Handle fractions (a is already in form 1/n)
    const denominator = Math.round(1 / a);
    aDisplay = `x/${denominator}`;
  }
  
  // Handle the sign for b
  const bSign = b >= 0 ? '+' : '';
  const bDisplay = bSign + b.toString();
  
  // Build the expression
  if (aDisplay === '') {
    return `x ${bDisplay} = ${c}`;
  } else if (aDisplay === '-') {
    return `-x ${bDisplay} = ${c}`;
  } else if (aDisplay.includes('/')) {
    // For fractions, we need to handle differently
    const denominator = aDisplay.split('/')[1];
    return `x/${denominator} ${bDisplay} = ${c}`;
  } else {
    return `${aDisplay}x ${bDisplay} = ${c}`;
  }
} 