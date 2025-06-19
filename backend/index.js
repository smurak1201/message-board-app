const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL接続設定
const pool = new Pool({
  user: 'message_board_user', // あなたのPostgreSQLユーザー名
  host: 'localhost',
  database: 'message_board', // あなたのデータベース名
  password: 'message_board_user', // あなたのPostgreSQLパスワード
  port: 5432, // デフォルトポート
});

// JSONボディのパース
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// 投稿一覧取得
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'データ取得エラー!' });
  }
});

// 投稿作成
app.post('/api/posts', async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'contentは必須です' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO posts (content) VALUES ($1) RETURNING *',
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: '投稿作成エラー' });
  }
});

// 投稿編集
app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'contentは必須です' });
  }
  try {
    const result = await pool.query(
      'UPDATE posts SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: '投稿が見つかりません' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: '投稿編集エラー' });
  }
});

// 投稿削除
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: '投稿が見つかりません' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '投稿削除エラー' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
