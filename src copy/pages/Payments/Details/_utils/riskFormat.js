export const riskFormat = (riskLevel, riskScore) => {
  if (riskLevel && riskScore) {
    return `${riskLevel} (${riskScore})`;
  }
  if (riskLevel) {
    return riskLevel;
  }
  if (riskScore) {
    return `(${riskScore})`;
  }

  return false;
};
