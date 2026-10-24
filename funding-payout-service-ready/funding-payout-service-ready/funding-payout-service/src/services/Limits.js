let globalLimits = { maxSingle: 50000, dailyCum: 200000, currentDailyTotal: 0 };
module.exports = {
  getLimits: () => globalLimits,
  updateLimits: (newLimits) => { globalLimits = { ...globalLimits, ...newLimits }; return globalLimits; },
  checkTransaction: (amount) => {
    if (amount > globalLimits.maxSingle) return { allowed: false, reason: "Superato limite singola transazione (€" + globalLimits.maxSingle + ")" };
    if (globalLimits.currentDailyTotal + amount > globalLimits.dailyCum) return { allowed: false, reason: "Superato limite giornaliero cumulativo" };
    globalLimits.currentDailyTotal += amount;
    return { allowed: true };
  }
};