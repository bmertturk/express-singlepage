export const router = [
	{
		route: "/",
		layout: "content",
		template: "dashboard",
		loaderLayout: "content",
		loaderTemplate: "content"
	},
	{
		route: "/users",
		layout: "content",
		template: "user",
		loaderLayout: "content",
		loaderTemplate: "content"
	},
	{
		route: "/login",
		layout: "nocontent",
		template: "login",
		loaderLayout: "login",
		loaderTemplate: "content"
	}
];