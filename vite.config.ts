import mdx from "@mdx-js/rollup";
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		{
			...mdx({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			}),
			enforce: "pre",
		},
		solidStart({
			extensions: ["mdx", "md"],
		}),
		nitro({
			static: true,
		}),
	],
});
