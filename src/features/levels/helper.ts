export const setDelayedHintMessage = (
  message: string,
  delay: number,
  end: number,
  setHintMessage: (value: React.SetStateAction<string>) => void,
  setShowHint: (value: React.SetStateAction<boolean>) => void
) => {
  setTimeout(() => {
    setHintMessage(message);
    setShowHint(true);
  }, delay);
  setTimeout(() => setShowHint(false), end);
};
