import { content } from "./loaders/content.js";
import { nocontent } from "./loaders/nocontent.js";
import { login } from "./loaders/login.js";
import { template } from "./loaders/template.js";

export const loader = [
	{
		type: "content",
		html: content
	},
	{
		type: "nocontent",
		html: nocontent
	},
	{
		type: "login",
		html: login
	},
	{
		type: "template",
		html: template
	}
];