const express = require('express');
const router = express.Router();
const db = require('../models/database');

// 登入或註冊
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (row) {
          req.session.user = row.id;
          req.session.save((err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error saving session' });
            }
            res.json({ success: true, id: row.id, username: row.username });
          });
        } else {
          res.json({success: false})
        }
      });
    } else {
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
          if (err) {
            res.status(500).json({ success: false, message: 'Error registering user' });
          } else {
            req.session.user = this.lastID;
            req.session.save((err) => {
              if (err) {
                return res.status(500).json({ success: false, message: 'Error saving session' });
              }
              res.json({ success: true, id: this.lastID, username: username });
            });
          }
        });
      }
    });
});

// 登出
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error destroying session' });
    }
    res.json({ success: true });
  });
});

// 取得當前用戶 session
// router.get('/session', (req, res) => {
//   if (req.session.user) {
//     db.get("SELECT * FROM users WHERE id = ?", [req.session.user], (err, row) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: 'Error fetching user' });
//       }
//       res.json({ authenticated: true, user: row });
//     });
//   } else {
//     res.json({ authenticated: false });
//   }
// });

module.exports = router;