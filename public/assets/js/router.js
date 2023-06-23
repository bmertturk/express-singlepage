export const router = [
	{
		route: "/",
		layout: "content",
		template: "dashboard",
		loader: "content"
	},
	{
		route: "/users",
		layout: "content",
		template: "user",
		loader: "content"
	},
	{
		route: "/login",
		layout: "nocontent",
		template: "login",
		loader: "login"
	}
];