# Spec Delta

## Purpose

MDXファイルとして書かれた記事を発見し、メタデータ（frontmatter）を解析して、公開対象記事の一覧をシステムの他の部分（一覧ページ・詳細ページ・静的出力）に提供する。

## ADDED Requirements

### Requirement: 記事ファイルの発見
システムは `content/posts/` 配下にある `.mdx` ファイルをすべて記事コンテンツとして収集しなければならない(SHALL)。

#### Scenario: 新しい記事ファイルの追加
- **WHEN** `content/posts/` に新しい `.mdx` ファイルが追加される
- **THEN** そのファイルは次回のビルド/開発サーバー起動時に記事として収集される

### Requirement: URLスラッグの導出
システムは記事のURLスラッグをfrontmatterではなくファイル名から導出しなければならない(SHALL)。

#### Scenario: ファイル名からスラッグを導出
- **WHEN** `content/posts/my-first-post.mdx` が収集される
- **THEN** そのスラッグは `my-first-post` として導出される

### Requirement: frontmatterスキーマ
システムは各記事のfrontmatterから次のフィールドを解析しなければならない(SHALL): 必須項目として `title`（文字列）と `date`（日付）、任意項目として `tags`（文字列の配列）・`description`（文字列）・`draft`（真偽値、既定値は `false`）。

#### Scenario: 必須フィールドが揃った記事
- **WHEN** frontmatterに `title` と `date` が指定された記事が収集される
- **THEN** その記事は有効な記事として扱われる

#### Scenario: draftが省略された記事
- **WHEN** frontmatterに `draft` フィールドが存在しない記事が収集される
- **THEN** その記事の `draft` は `false` として扱われる

### Requirement: 下書き記事の除外
システムは `draft: true` が指定された記事を、一覧ページ・詳細ページ・静的出力のいずれからも除外しなければならない(SHALL)。

#### Scenario: draft記事の除外
- **WHEN** `draft: true` を持つ記事がコンテンツ集合に含まれる
- **THEN** その記事は公開対象の記事一覧に含まれない
