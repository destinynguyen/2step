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