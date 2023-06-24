import { header } from "./header.js";
import { sidebar } from "./sidebar.js";
import { template } from "./template.js";

export const content = `
${header}
<div class="container">
	<div class="row">
		<div class="col-md-3">
			${sidebar}
		</div>
		<div class="col-md-9">
			${template}
		</div>
	</div>
</div>
`;