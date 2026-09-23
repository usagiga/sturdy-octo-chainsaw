# Spec Delta

## Purpose

公開されている記事を一覧できるページを提供し、読者が記事を発見できるようにする。

## ADDED Requirements

### Requirement: 記事一覧の表示
システムは公開対象の全記事を一覧ページに表示しなければならない(SHALL)。各項目にはタイトル・日付・タグ（存在する場合）・description（存在する場合）を含めなければならない(SHALL)。

#### Scenario: 一覧項目の内容
- **WHEN** 一覧ページがレンダリングされる
- **THEN** 各公開記事について、タイトルと日付が表示される

#### Scenario: descriptionを持つ記事の一覧表示
- **WHEN** `description` を持つ記事が一覧に表示される
- **THEN** その記事の項目にdescriptionが表示される

### Requirement: 日付降順ソート
一覧ページの記事は `date` の降順（新しい記事が先）で表示されなければならない(SHALL)。

#### Scenario: 複数記事の並び順
- **WHEN** 日付が異なる複数の公開記事が存在する
- **THEN** 一覧ページには最も新しい `date` を持つ記事が最初に表示される

### Requirement: 下書き記事の一覧非表示
一覧ページは `draft: true` の記事を表示してはならない(SHALL NOT)。

#### Scenario: draft記事の除外
- **WHEN** `draft: true` を持つ記事が存在する
- **THEN** その記事は一覧ページに表示されない
