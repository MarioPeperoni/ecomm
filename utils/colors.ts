export default function GetCoolColors(color: string) {
  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "");

    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  };

  // Convert input hex color to RGB
  const [r, g, b] = hexToRgb(color);

  // Function to adjust each RGB component with a fixed step
  const adjustColor = (value: number, adjustment: number) =>
    Math.max(0, Math.min(255, value + adjustment));

  // Generate a smooth gradient with distinct but matching colors
  const gradientColors = [];
  const steps = 6; // Number of colors to generate

  // Gradual and controlled adjustment for each step
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);

    // Apply controlled and uniform changes to RGB components
    const rAdj = Math.round((factor - 0.3) * 140);
    const gAdj = Math.round((factor - 0.3) * 140);
    const bAdj = Math.round((factor - 0.3) * 100);

    // Apply the adjustments to each RGB component
    const newR = adjustColor(r, rAdj);
    const newG = adjustColor(g, gAdj);
    const newB = adjustColor(b, bAdj);

    // Add the new color to the gradient array
    gradientColors.push(`rgb(${newR}, ${newG}, ${newB})`);
  }

  return gradientColors;
}
