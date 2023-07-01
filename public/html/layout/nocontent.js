import { header } from "../snippets/header.js";

export const nocontent = {
	async init(callback) {
		callback();
	},

	html() {
		return `
		${header}
		<div class="container">
			<div class="row">
				<div class="col"><outlet></div>
			</div>
		</div>
		`
	}
}