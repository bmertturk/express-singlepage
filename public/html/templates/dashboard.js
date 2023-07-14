import {app} from "../../assets/js/app.js";
import { router } from "../../html/router.js";

export const dashboard = {

	posts: [],
	mahmut: 1,
	ali: "dsadhsjahkj",
	postobj: {},

	html() {
		return `
		<article class="m-0">
			<div id="dashboard">
			<button>Change</button>
				<h1 bind="mahmut"></h1>
				<h2 bind="ali"></h2>
				<p bind="posts"></p>
				<pre bind="postobj"></pre>
				${this.posts.map(post => {
			return `<div>${post.title}</div>`
		}).join("")}
			</div>
		</article>
		`
	},

	async init() {
		await this.fetchData();
	},

	afterInit() {
		this.listeners();
	},

	async fetchData() {

		const url = 'https://jsonplaceholder.typicode.com/posts/';
		try {
			const response = await fetch(url);
			const result = await response.json();
			this.posts = result;
		} catch (error) {
			console.error(error);
		}
	},

	listeners() {
		document.querySelector("button").addEventListener("click", e => {
			app.render("mahmut", _ => {
				return "dsadhskjadhskja"
			});
		});
	}
}