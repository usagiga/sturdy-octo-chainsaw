import { For } from "solid-js";
import { getPublishedPosts } from "~/lib/posts";

// Placeholder home page. The real listing page (blog-post-list) lands in a
// later change on this stack; this only proves the content pipeline works.
export default function Home() {
	const posts = getPublishedPosts();
	return (
		<div>
			<h1>Blog</h1>
			<ul>
				<For each={posts}>
					{(post) => (
						<li>
							{post.frontmatter.date} - {post.frontmatter.title} ({post.slug})
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
