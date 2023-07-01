export const user = {

	users: [],

	async init(callback){
		await this.fetchData();
		callback();
	},

	async fetchData() {
		const url = 'https://jsonplaceholder.typicode.com/users/';
		try {
			const response = await fetch(url);
			const result = await response.json();
			this.users = result;
		} catch (error) {
			console.error(error);
		}
	},

	html() {
		return `
		<article class="m-0">
		<figure>
			<table>
				<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">E-mail</th>
					<th scope="col">Name</th>
					<th scope="col">Username</th>
					<th scope="col">Phone</th>
					<th scope="col">website</th>
				</tr>
				</thead>
				<tbody>
				${this.users.map(user => {
					return `
						<tr>
							<th scope="row">${user.id}</th>
							<td>${user.email}</td>
							<td>${user.name}</td>
							<td>${user.username}</td>
							<td>${user.phone}</td>
							<td><a href="${user.website}">${user.website}</a></td>
						</tr>
					`
				}).join("")}
				</tbody>
			</table>
		</figure>
		</article>
		`
	}
}