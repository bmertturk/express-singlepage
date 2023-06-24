export const router = [
	{
		route: "/",
		layout: "content",
		template: "dashboard",
		loaderLayout: "content",
		loaderTemplate: "template"
	},
	{
		route: "/users",
		layout: "content",
		template: "user",
		loaderLayout: "content",
		loaderTemplate: "template"
	},
	{
		route: "/login",
		layout: "nocontent",
		template: "login",
		loaderLayout: "nocontent",
		loaderTemplate: "login"
	}
];