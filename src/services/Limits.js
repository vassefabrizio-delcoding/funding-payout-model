// Limits logic running automated controls
let maxSingleTx = 500000.00; 
let maxDailyCumulative = 2500000.00;
let currentDailySpent = 45000.00; // populated from previous database logs

function verifyTransaction(amount) {
    if (amount > maxSingleTx) {
        return { valid: false, reason: `L'importo supera il tetto massimo per singola transazione autorizzato di €${maxSingleTx.toLocaleString('it-IT')}` };
    }
    if ((currentDailySpent + amount) > maxDailyCumulative) {
        return { valid: false, reason: "Il cumulo delle transazioni supera il limite giornaliero autorizzato dal pannello di controllo dei rischi." };
    }
    currentDailySpent += amount;
    return { valid: true };
}

module.exports = {
    verifyTransaction
};
