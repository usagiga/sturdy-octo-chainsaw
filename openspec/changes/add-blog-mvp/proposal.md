# Proposal

## Why

このリポジトリは個人ブログをゼロから構築するためのものだが、現時点でアプリケーションコードが一切存在しない。まずはMDXで記事を書いて公開できる最小限のブログとして成立させ、以降の機能（RSS、OGP、スタイリング等）を積み増していく土台を作る。

## What Changes

- Bun + SolidStart + Biome によるプロジェクト基盤を新規に構築する
- `content/posts/*.mdx` に配置した記事を、frontmatter（title / date / tags / description / draft）付きで読み込む仕組みを追加する
- 記事のURLスラッグはファイル名から自動導出する（frontmatterにslugは持たせない）
- 記事一覧ページ（日付降順、draft記事は非表示）を追加する
- 記事詳細ページ（`/blog/[slug]`、存在しないslugは404）を追加する
- SolidStartのprerender設定により、全記事ページを静的出力（SSG）する

## Capabilities

### New Capabilities
- `blog-content`: MDXファイルからの記事コンテンツ収集、frontmatter解析、draft記事の除外ルール
- `blog-post-page`: 個別記事ページの表示（本文・タイトル・日付・タグの表示、未存在slugの404）
- `blog-post-list`: 記事一覧ページの表示（日付降順、draft除外）
- `static-site-generation`: 全記事ルートをビルド時に静的出力するプリレンダー設定

### Modified Capabilities
(なし。既存specは存在しない)

## Impact

- 新規: プロジェクト全体の初期構築（`package.json`, SolidStart設定, Biome設定, `content/posts/` ディレクトリ, `routes/` 配下のページ）
- 依存追加: `@solidjs/start`, `solid-js`, MDX統合プラグイン, frontmatter解析ライブラリ, Biome
- デプロイ設定（Cloudflare Pages向けのアダプタ設定等）は本変更のスコープ外とする
