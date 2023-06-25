export const dashboard = {
	html() {
		return `
		<article class="m-0">
			<div id="dashboard"></div>
		</article>
		`
	},

	init() {
		this.fetchData();
	},

	async fetchData() {
		const url = 'https://free-epic-games.p.rapidapi.com/free';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '72d06d296amsha6f3f11d0b16b66p1b7a2ejsn3fef53749809',
				'X-RapidAPI-Host': 'free-epic-games.p.rapidapi.com'
			}
		};
		
		try {
			const response = await fetch(url, options);
			const result = await response.text();
			document.querySelector("#dashboard").innerHTML = result;
		} catch (error) {
			console.error(error);
		}
	}
}