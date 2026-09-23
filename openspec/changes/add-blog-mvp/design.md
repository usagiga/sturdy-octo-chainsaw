# Design

## Context

リポジトリは現在空で、`package.json` すら存在しない。技術スタックはBun / SolidJS / Biomeと決まっており、SolidJSのメタフレームワークであるSolidStartを採用する（セットアップ負荷を抑えたい個人ブログのため）。動機は proposal.md - Why を参照。

SolidStart v2はサーバーエンジンとしてNitro v3を使い、`vite.config.ts` 内の `nitro()` プラグインの `static: true`（内部的には `prerender.crawlLinks: true` 相当）によりビルド時のプリレンダリング（SSG）をサポートしている。`create-solid`（`--solidstart --v2`）には `with-mdx` テンプレートが用意されており、これをベースにスキャフォールドした（実装時に実機検証済み）。Biomeは2026年時点でMarkdown自体のフォーマット/lintを新たにサポートしたが、MDX固有のサポートは別扱いで確立していない。

## Goals / Non-Goals

**Goals:**
- MDXで書いた記事をSolidStart上でMDXコンポーネントとしてレンダリングできること
- 記事一覧・記事詳細の両ルートをビルド時に静的HTMLとして出力できること
- frontmatterの `draft` フラグでビルド対象から記事を除外できること

**Non-Goals:**
- OGP/metaタグ生成、RSS/Atomフィード、サイトマップ生成（proposal.mdのP1に後回し）
- タグによる絞り込みUI（表示のみが本変更のスコープ）
- Cloudflare Pages固有のアダプタ設定・base path調整（デプロイ先を意識しない実装とする合意のため）
- スタイリングの作り込み（最低限のレイアウトのみ）

## Decisions

### コンテンツ発見とルーティング: コンテンツディレクトリ + 動的ルート + `import.meta.glob`
`content/posts/*.mdx` をViteの `import.meta.glob`（eagerかつ `?raw` またはMDXコンパイル結果を取得できる形）で一括取得し、`routes/blog/[slug].tsx`（詳細）と `routes/index.tsx`（一覧）の2つの動的/静的ルートから参照する。

代替案として「MDXファイルをそのまま `routes/blog/*.mdx` に1対1で配置する」方式も検討したが、この場合、一覧ページ構築のために記事メタデータを横断的に集計する仕組みを別途用意する必要があり、二重管理になるため採用しなかった。

### スラッグ導出: ファイル名ベース
`content/posts/<filename>.mdx` の `<filename>` をそのままスラッグとして使う。frontmatterにスラッグを持たせない。ファイル名とURLが常に一致するため、記事作成時に迷う余地がない（探索での合意事項）。

### frontmatter解析ライブラリ
`@mdx-js/rollup` の `remarkPlugins` に `remark-frontmatter` + `remark-mdx-frontmatter` を追加し、MDXファイル先頭のYAML frontmatterを `frontmatter` という名前付きexportとしてコンパイル時に分離する。この方式はMDXコンパイルパイプラインに完全に統合されるため、`gray-matter` のような別ライブラリによるファイル再パースは不要と実装時に判明し、採用した。

### プリレンダリング方式: `crawlLinks` によるリンク追跡
`vite.config.ts` の `nitro({ static: true })` を設定し、ルート(`/`、一覧ページ)から始めてレンダリングされたHTML中の `<a href>` を辿る形で全記事詳細ページを自動的にプリレンダリング対象に含める（Nitro内部では `prerender.crawlLinks: true` に相当）。

代替案として、`import.meta.glob` で得たスラッグ一覧を `prerender.routes` に明示的に渡す方法も検討した。この方法はビルド設定側でも記事一覧を把握する必要があり、コンテンツ側（ルートコンポーネント）と設定側の二重管理になる。`crawlLinks` であれば一覧ページのリンクが唯一の情報源になるため、こちらを採用する。draft記事は一覧ページにリンクが出力されないため、`crawlLinks` からも自然に除外される。

### Biomeの適用範囲
Biomeは `.ts` / `.tsx` などのコードに対してlint/formatを適用する。`.mdx` ファイル内のMarkdown/JSXに対する自動フォーマットは、Biome側のMDXサポートが未確立のため本変更では対象外とする（Non-Goals参照）。

## Risks / Trade-offs

- [Biomeが `.mdx` を公式サポートしていない] → 記事本文のフォーマットは手動に委ねる。将来BiomeのMarkdown/MDXサポートが拡充された時点で再検討する。
- [`crawlLinks` はリンクを辿れない孤立ページを検出できない] → 本変更のスコープでは一覧ページが全記事へのリンクを持つため問題にならない。将来ページが増えて一覧からリンクされない記事ページが生まれる場合は、明示的な `routes` 指定への切り替えを検討する。
- [Nitro v3は本稿執筆時点でbetaリリース（date-versioned `-beta` タグ）が `latest` distタグになっている] → scaffold直後の固定バージョンで `bun run build` がRolldown/Vite 8まわりのエラーで失敗する事象を実装時に確認したため、最新betaへ明示的に更新して解消した（`package.json` にバージョンを固定）。将来安定版がリリースされ次第、追随を検討する。
