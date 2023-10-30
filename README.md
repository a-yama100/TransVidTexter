# TransVidTexter

#### 【注意】このコードはサンプルです。高度なセキュリティやエラーハンドリング等は実装されていない場合があります。

TransVidTexterは、ブラウザから動画ファイルをアップロードすると、文字起こしした後のテキストがブラウザ上に表示されるWebアプリケーションです。文字起こししたテキストには、各セリフごとに通番とタイムスタンプが行頭に記載されます。

## 主な機能

- ユーザーの登録・ログイン
- 動画ファイルのアップロードと文字起こし
- 文字起こしテキストのブラウザ上での表示
- テキスト形式でのダウンロード

## 開始方法

1. **環境のセットアップ**
    ```bash
    # Node.jsのインストールが必要です。

    # Next.jsアプリケーションの初期化
    npx create-next-app transvidtexter
    ```

2. **データベースのセットアップ**
   - PostgreSQLを使用しています。適切なスキーマとテーブルをセットアップしてください。

3. **開発サーバーの実行**
    ```bash
    npm run dev
    # または
    yarn dev
    ```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## もっと詳しく知る

- [Next.js ドキュメンテーション](https://nextjs.org/docs) - Next.jsの機能やAPIについて学べます。
- [GitHubのリポジトリ](https://github.com/a-yama100/TransVidTexter.git) - ソースコードや最新の変更を確認できます。

## デプロイ

Next.jsアプリをデプロイする最も簡単な方法は、[Vercelプラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細は、[Next.jsのデプロイドキュメンテーション](https://nextjs.org/docs/deployment)をご参照ください。
