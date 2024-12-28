export function calculate(calParams: string): string {
  console.log(`Entered calParams >> ${calParams}`);

  return String(eval(calParams));
}
