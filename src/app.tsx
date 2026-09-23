import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<header>
						<a href="/">sturdy-octo-chainsaw</a>
					</header>
					<main>
						<Suspense>{props.children}</Suspense>
					</main>
					<footer>
						<small>&copy; usagiga</small>
					</footer>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
