import { header } from "../snippets/header.js";
import { sidebar } from "../snippets/sidebar.js";

export const content = `
	${header}
	<div class="container">
		<div class="row">
			<div class="col-md-3">${sidebar}</div>
			<div class="col-md-9"><outlet></div>
		</div>
	</div>
`;