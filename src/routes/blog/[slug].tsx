import { useParams } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { For, Show } from "solid-js";
import { getPublishedPostBySlug } from "~/lib/posts";

export default function BlogPost() {
	const params = useParams();
	const post = () => getPublishedPostBySlug(params.slug);

	return (
		<Show
			when={post()}
			fallback={
				<>
					<HttpStatusCode code={404} />
					<p>記事が見つかりませんでした: {params.slug}</p>
				</>
			}
		>
			{(p) => {
				const Content = p().Content;
				return (
					<article>
						<h1>{p().frontmatter.title}</h1>
						<p>{p().frontmatter.date}</p>
						<Show when={p().frontmatter.tags}>
							<ul>
								<For each={p().frontmatter.tags}>{(tag) => <li>{tag}</li>}</For>
							</ul>
						</Show>
						<Content />
					</article>
				);
			}}
		</Show>
	);
}
