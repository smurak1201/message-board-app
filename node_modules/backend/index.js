// ExpressフレームワークとPostgreSQL用のpgパッケージ、CORS用パッケージを読み込み
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Expressアプリの作成
const app = express();
const PORT = process.env.PORT || 3000; // ポート番号（環境変数がなければ3000）

// PostgreSQL接続設定
const pool = new Pool({
  user: 'message_board_user', // PostgreSQLのユーザー名
  host: 'localhost',         // DBサーバーのホスト名
  database: 'message_board', // データベース名
  password: 'message_board_user', // パスワード
  port: 5432,                // ポート番号（デフォルト: 5432）
});

// CORS（クロスオリジン）を許可
app.use(cors({
  origin: [
    'http://localhost:5173', // 開発用フロントエンド
    'https://messageboard-app.netlify.app' // Netlifyの本番URLに書き換えてください
  ],
  credentials: true // 必要に応じて
}));

// JSON形式のリクエストボディをパース
app.use(express.json());

// =====================
// APIエンドポイント
// =====================

// 投稿一覧取得（GET）
app.get('/api/posts', async (req, res) => {
  try {
    // postsテーブルから全件取得し、作成日時の新しい順に並べる
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows); // 取得したデータをJSONで返す
  } catch (err) {
    res.status(500).json({ error: 'データ取得エラー!' });
  }
});

// 投稿作成（POST）
app.post('/api/posts', async (req, res) => {
  const { content } = req.body; // リクエストボディからcontentを取得
  if (!content) {
    return res.status(400).json({ error: 'contentは必須です' });
  }
  try {
    // postsテーブルに新しい投稿を追加
    const result = await pool.query(
      'INSERT INTO posts (content) VALUES ($1) RETURNING *',
      [content]
    );
    res.status(201).json(result.rows[0]); // 作成した投稿を返す
  } catch (err) {
    res.status(500).json({ error: '投稿作成エラー' });
  }
});

// 投稿編集（PUT）
app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params; // URLパラメータからidを取得
  const { content } = req.body; // リクエストボディからcontentを取得
  if (!content) {
    return res.status(400).json({ error: 'contentは必須です' });
  }
  try {
    // 指定したidの投稿内容を更新
    const result = await pool.query(
      'UPDATE posts SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: '投稿が見つかりません' });
    }
    res.json(result.rows[0]); // 更新後の投稿を返す
  } catch (err) {
    res.status(500).json({ error: '投稿編集エラー' });
  }
});

// 投稿削除（DELETE）
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params; // URLパラメータからidを取得
  try {
    // 指定したidの投稿を削除
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: '投稿が見つかりません' });
    }
    res.json({ success: true }); // 削除成功を返す
  } catch (err) {
    res.status(500).json({ error: '投稿削除エラー' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
