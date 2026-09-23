# Tasks

## 1. プロジェクト基盤

- [x] 1.1 Bun + SolidStart でプロジェクトを初期化し、`bun run dev` で開発サーバーが起動することを確認する
- [x] 1.2 Biomeを導入し、`biome.json` の設定と `bun run lint` / `bun run format` 相当のスクリプトを `package.json` に追加して実行できることを確認する
- [x] 1.3 最低限のページレイアウト（ヘッダー/フッター/共通ページ枠）を実装し、開発サーバー上でトップページに表示されることを目視確認する

## 2. コンテンツパイプライン (`blog-content`)

- [x] 2.1 `content/posts/` ディレクトリを作成し、`import.meta.glob` を使って `.mdx` ファイル一覧を取得する仕組みを実装する
- [x] 2.2 frontmatter解析（`title` / `date` / `tags` / `description` / `draft`、`draft`未指定時は`false`）を実装し、サンプル記事1件を用いてフィールドが正しく解析されることを確認する
- [x] 2.3 ファイル名からスラッグを導出するロジックを実装し、`content/posts/my-first-post.mdx` が `my-first-post` になることを確認する
- [x] 2.4 `draft: true` の記事をコンテンツ集合の公開対象から除外するフィルタを実装し、draft記事とpublish記事を1件ずつ用意して除外されることを確認する

## 3. 記事詳細ページ (`blog-post-page`)

- [ ] 3.1 `routes/blog/[slug].tsx` を実装し、公開記事のMDX本文がレンダリングされることをブラウザで確認する
- [ ] 3.2 詳細ページにタイトル・日付・タグ（存在する場合のみ）を表示する
- [ ] 3.3 未知のスラッグおよびdraft記事のスラッグへのアクセスに対して404を返すことを確認する

## 4. 記事一覧ページ (`blog-post-list`)

- [ ] 4.1 `routes/index.tsx` を実装し、公開対象の全記事をタイトル・日付・タグ・description付きで一覧表示する
- [ ] 4.2 一覧を `date` の降順でソートし、日付が異なる複数記事を用意して並び順を確認する
- [ ] 4.3 `draft: true` の記事が一覧に表示されないことを確認する
- [ ] 4.4 一覧ページの各記事項目から対応する詳細ページ (`/blog/<slug>`) へのリンクを実装する

## 5. 静的サイト生成 (`static-site-generation`)

- [ ] 5.1 `vite.config.ts` の `nitro()` プラグイン設定に `static: true`（全ルートをcrawlLinksでプリレンダー）を追加する
- [ ] 5.2 公開記事を複数件・draft記事を1件用意した状態で `bun run build` を実行し、ビルド成果物に公開記事ページと一覧ページの静的HTMLが含まれることを確認する
- [ ] 5.3 同じビルド成果物にdraft記事に対応する静的HTMLが含まれないことを確認する
