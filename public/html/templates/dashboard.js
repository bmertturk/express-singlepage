export const dashboard = {

	control: "",

	html() {
		return `
		<article class="m-0">
			<div id="dashboard">${this.control}</div>
		</article>
		`
	},

	async init(callback) {
		await this.fetchData();
		callback();
	},

	async fetchData() {

		const url = 'https://jsonplaceholder.typicode.com/todos/1';
		
		try {
			const response = await fetch(url);
			const result = await response.json();
			this.control = result.title;
		} catch (error) {
			console.error(error);
		}
	}
}