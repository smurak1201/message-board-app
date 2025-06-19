const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL接続設定
const pool = new Pool({
  user: 'massage_board_user', // あなたのPostgreSQLユーザー名
  host: 'localhost',
  database: 'message_board',
  password: 'password', // あなたのPostgreSQLパスワード
  port: 5432, // デフォルトポート
});

// JSONボディのパース
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
