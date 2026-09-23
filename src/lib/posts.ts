import type { Component } from "solid-js";

export interface PostFrontmatter {
	title: string;
	date: string;
	tags?: string[];
	description?: string;
	draft?: boolean;
}

interface PostModule {
	default: Component;
	frontmatter: PostFrontmatter;
}

const postModules = import.meta.glob("/content/posts/*.mdx", {
	eager: true,
}) as Record<string, PostModule>;

export interface Post {
	slug: string;
	frontmatter: PostFrontmatter;
	Content: Component;
}

const allPosts: Post[] = Object.entries(postModules).map(([path, mod]) => {
	const slug = path.replace(/^\/content\/posts\//, "").replace(/\.mdx$/, "");
	return { slug, frontmatter: mod.frontmatter, Content: mod.default };
});

export function getPublishedPosts(): Post[] {
	return allPosts
		.filter((post) => !post.frontmatter.draft)
		.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPublishedPostBySlug(slug: string): Post | undefined {
	return allPosts.find((post) => post.slug === slug && !post.frontmatter.draft);
}
