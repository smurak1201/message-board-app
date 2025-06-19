# ルート package.json・環境変数・開発/本番切り替えについて

## 本番環境に移行したときに変更するファイル名・内容

- `frontend/.env` ファイルの `VITE_API_URL` を本番用 API エンドポイントに書き換えてください。
  - 例: `VITE_API_URL=https://your-production-api.example.com`
- 必要に応じて `backend/.env` も本番用 DB 接続情報などに変更してください。

## 開発環境で 1 回のコマンド実行でサーバが起動する仕組み

- ルートの `package.json` に `npm-run-all` を使った `dev` スクリプトを用意しています。
- `npm install` をルートで実行後、`npm run dev` でフロントエンド・バックエンド両方の開発サーバが同時に起動します。
- 各ワークスペース（`frontend`/`backend`）の `dev` スクリプトを個別に実行することも可能です。

---

### 参考: ルート package.json のスクリプト

```json
"scripts": {
  "dev": "npm-run-all --parallel dev:*",
  "dev:frontend": "npm --workspace frontend run dev",
  "dev:backend": "npm --workspace backend run dev"
}
```

# ルート package.json のスクリプト・依存関係 コメント解説

- scripts.dev: フロントエンドとバックエンドを同時に開発モードで起動します
- scripts.dev:frontend: フロントエンドのみ起動
- scripts.dev:backend: バックエンドのみ起動
- devDependencies.npm-run-all: 複数の npm スクリプトを並列/直列で実行するためのツール

---

## npm-run-all --parallel dev:\* について

- `npm-run-all --parallel dev:*` は、`dev:` で始まる複数の npm スクリプト（例: `dev:frontend`, `dev:backend`）を同時に並列実行するコマンドです。
- これにより、1 回のコマンドでフロントエンドとバックエンドの開発サーバを同時に起動できます。
- 各サーバのログはターミナル上で同時に確認できます。

## npm-run-all --parallel dev:\* をどこで実行するか

- このコマンド（または `npm run dev`）は、プロジェクトのルートディレクトリ（`message-board-app` フォルダ直下）で実行してください。
- 例：

```
cd message-board-app
npm run dev
```

- ルートで実行することで、フロントエンド・バックエンド両方の開発サーバが同時に起動します。
