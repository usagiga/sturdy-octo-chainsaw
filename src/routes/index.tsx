import { For, Show } from "solid-js";
import { getPublishedPosts } from "~/lib/posts";

export default function Home() {
	const posts = getPublishedPosts();
	return (
		<div>
			<h1>Blog</h1>
			<ul>
				<For each={posts}>
					{(post) => (
						<li>
							<a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>
							<div>{post.frontmatter.date}</div>
							<Show when={post.frontmatter.tags}>
								<ul>
									<For each={post.frontmatter.tags}>
										{(tag) => <li>{tag}</li>}
									</For>
								</ul>
							</Show>
							<Show when={post.frontmatter.description}>
								<p>{post.frontmatter.description}</p>
							</Show>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
