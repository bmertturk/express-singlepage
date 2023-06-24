import { header } from "./header.js";
import { login } from "./login.js";

export const nocontent = `
${header}
<div class="container">
	<div class="row">
		<div class="col">
			${login}
		</div>
	</div>
</div>
`;