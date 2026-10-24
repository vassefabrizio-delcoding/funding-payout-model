const express = require('express');
const router = express.Router();
const limitsService = require('../services/Limits');

router.get('/balance', (req, res) => {
  res.json({ status: "success", balance: 1250000.00, currency: "EUR", network: "EBICS/CBI Live Network" });
});

router.get('/limits', (req, res) => {
  res.json({ status: "success", limits: limitsService.getLimits() });
});

router.post('/limits', (req, res) => {
  const updated = limitsService.updateLimits(req.body);
  res.json({ status: "success", limits: updated });
});

router.post('/payout', (req, res) => {
  const { amount, iban, recipient } = req.body;
  const check = limitsService.checkTransaction(Number(amount));
  if (!check.allowed) {
    return res.status(400).json({ status: "error", message: check.reason });
  }
  res.json({
    status: "success",
    message: "Disposizione inviata a EBICS/CBI per €" + amount,
    transactionId: "TX-" + Math.floor(Math.random() * 10000000),
    recipient,
    iban,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;