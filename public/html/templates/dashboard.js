export const dashboard = {

	posts: [],

	html() {
		return `
		<article class="m-0">
			<div id="dashboard">
				${this.posts.map(post => {
					return `<div>${post.title}</div>`
				}).join("")}
			</div>
		</article>
		`
	},

	async init(callback) {
		await this.fetchData();
		callback();
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
	}
}