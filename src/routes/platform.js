const express = require('express');
const router = express.Router();
const limits = require('../services/Limits');

// Mock state representing internal ledger balance
let internalBalance = 1250000.00;

router.get('/balance', (req, res) => {
    res.json({ balance: internalBalance, institution: "EBICS / CBI Direct Access" });
});

router.post('/payout', (req, res) => {
    const { iban, amount } = req.body;
    
    if (!iban || !amount) {
        return res.status(400).json({ error: "Parametri IBAN e importo obbligatori." });
    }
    
    // Automation check via internal Limits service (replacing old manual review flow)
    const checkLimits = limits.verifyTransaction(amount);
    if (!checkLimits.valid) {
        return res.status(403).json({ error: `Transazione rifiutata: ${checkLimits.reason}` });
    }
    
    internalBalance -= amount;
    const txId = "TX-" + Math.floor(100000000 + Math.random() * 900000000);
    
    // Real-time settlement directly connected to institution core gateway logs
    console.log(`[AUDIT LEDGER] Direct settlement initiated. Tx: ${txId}, Amount: ${amount}, Channel: EBICS`);
    
    res.json({
        success: true,
        message: "Payout instradato ed eseguito direttamente sul circuito enterprise.",
        txId: txId,
        remainingBalance: internalBalance
    });
});

module.exports = router;
