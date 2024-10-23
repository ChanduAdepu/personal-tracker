const db = require('../config/db');

const Transaction = {
  create: (transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const sql = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [type, category, amount, date, description], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, ...transaction });
    });
  },

  getAll: (callback) => {
    const sql = `SELECT * FROM transactions`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM transactions WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  },

  update: (id, transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const sql = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
    db.run(sql, [type, category, amount, date, description, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, ...transaction });
    });
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM transactions WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
};

const getSummary = (callback) => {
  const sql = `
    SELECT
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses
    FROM transactions
  `;

  db.get(sql, [], (err, row) => {
    if (err) {
      return callback(err);
    }
    const totalIncome = row.totalIncome || 0;
    const totalExpenses = row.totalExpenses || 0;
    const balance = totalIncome - totalExpenses;

    callback(null, { totalIncome, totalExpenses, balance });
  });
};

module.exports = {
Transaction,
getSummary,
}
