const express = require('express');
const router = express.Router();
const db = require('../models/database');

// 驗證模組
function isAuthenticated(req, res, next) {
  // if (req.session) {
  //   return next();
  // } else {
  //   res.status(401).json({ success: false, message: 'Unauthorized' });
  // }
  return next();
}

// 取得最新文章
router.get('/', (req, res) => {
  const category = req.query.category;
  let query = "SELECT * FROM articles";
  let params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  query += " ORDER BY last_edit_time DESC";

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching articles' });
    } else {
      res.json({ success: true, articles: rows });
    }
  });
});

// 取得單篇文章
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM articles WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching article' });
    } else {
      res.json({ success: true, article: row });
    }
  });
});

// 新增文章
router.post('/', isAuthenticated, (req, res) => {
  const { title, content, author, category, userId } = req.body;
  const last_edit_time = new Date().toISOString();
  db.run("INSERT INTO articles (title, content, author, last_edit_time, category, user_id) VALUES (?, ?, ?, ?, ?, ?)", [title, content, author, last_edit_time, category, userId], function(err) {
    if (err) {
      res.status(500).json({ success: false, message: 'Error creating article' });
    } else {
      res.json({ success: true, article: { id: this.lastID, title, content, author, last_edit_time, category, user_id: req.session.user } });
    }
  });
});

// 編輯文章
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { title, content, author, category, userId } = req.body;
  const last_edit_time = new Date().toISOString();
  db.run("UPDATE articles SET title = ?, content = ?, author = ?, last_edit_time = ?, category = ? WHERE id = ? AND user_id = ?", [title, content, author, last_edit_time, category, id, userId], function(err) {
    if (err) {
      res.status(500).json({ success: false, message: 'Error updating article' });
    } else {
      res.json({ success: true, article: { id, title, content, author, last_edit_time, category } });
    }
  });
});

// 刪除文章
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM articles WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ success: false, message: 'Error deleting article' });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;