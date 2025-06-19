# message-board-app

## 概要

このアプリは、React と Node.js/Express、PostgreSQL を使ったシンプルな掲示板アプリです。

## 著作権表記

Copyright (c) 2025 skipt

## 使用している主なライブラリ・フレームワーク

### フロントエンド

- [React](https://react.dev/) : UI 構築のための JavaScript ライブラリ
- [Vite](https://vitejs.dev/) : 高速なフロントエンドビルドツール
- [Chakra UI v3](https://chakra-ui.com/) : モダンな UI コンポーネントライブラリ
- [react-icons](https://react-icons.github.io/react-icons/) : アイコン集
- [react-hot-toast](https://react-hot-toast.com/) : トースト通知ライブラリ
- TypeScript : 型安全な JavaScript 開発

### バックエンド

- [Node.js](https://nodejs.org/) : JavaScript 実行環境
- [Express](https://expressjs.com/) : Node.js 用 Web アプリケーションフレームワーク
- [pg](https://node-postgres.com/) : PostgreSQL 用 Node.js クライアント
- [cors](https://www.npmjs.com/package/cors) : CORS 対応ミドルウェア

### データベース

- [PostgreSQL](https://www.postgresql.org/) : オープンソースのリレーショナルデータベース

## 技術の説明

- **フロントエンド**は React + Chakra UI で構築し、API 通信でバックエンドと連携しています。
- **バックエンド**は Express で RESTful な API を提供し、データは PostgreSQL に保存されます。
- **CORS**対応により、フロントエンドとバックエンドを別サーバーで開発できます。
- **react-hot-toast**でユーザー操作時の通知を実装しています。

---

このリポジトリのコードは学習・個人利用の範囲で自由にご利用ください。
