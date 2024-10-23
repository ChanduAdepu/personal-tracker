const Transaction = require('../models/transactionModel');

const createTransaction = (req, res) => {
  Transaction.create(req.body, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(transaction);
  });
};

const getAllTransactions = (req, res) => {
  Transaction.getAll((err, transactions) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(transactions);
  });
};

const getTransactionById = (req, res) => {
  const { id } = req.params;
  Transaction.getById(id, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  });
};

const updateTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.update(id, req.body, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(transaction);
  });
};

const deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send(); // No content
  });
};

const getSummary = (req, res) => {
  Transaction.getSummary((err, summary) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(summary);
  });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary
};
