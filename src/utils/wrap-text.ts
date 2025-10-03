function wrapText(text: string, maxCharsPerLine: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length < maxCharsPerLine) {
      currentLine += `${word} `;
    } else {
      lines.push(currentLine.trim());
      currentLine = `${word} `;
    }
  }

  if (currentLine) lines.push(currentLine.trim());

  return lines;
}
export default wrapText;
