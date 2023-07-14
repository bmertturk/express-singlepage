import { router } from "../../html/router.js";
import { loader } from "../../html/loader.js";
import { sidebar } from "../../html/loaders/sidebar.js";

export const app = {

	lastRoute: [],
	lastObj: "",
	rootElement: document.querySelector("#root"),

	init() {
		this.checkRoutes();
		this.listener();
	},

	checkRoutes() {
		const pathName = window.location.pathname;
		router.find(route => {
			if(route.route === pathName) {
				this.buildLayout(route);
				this.lastRoute = route;
			}
		});
	},

	async buildLayout(route) {
		const layoutPath = `/html/layout/${route.layout}.js`;
		const templatePath = `/html/templates/${route.template}.js`;
		;
		if(route.layout !== this.lastRoute.layout) {
			this.appendLoader(this.rootElement, route.loaderLayout);
		}
		import(layoutPath).then(obj => {
			if(route.layout !== this.lastRoute.layout) {
				this.removeLoader(this.rootElement);
			}
			obj[route.layout].init().then(_ => {
				let element = obj[route.layout].html();
				element = this.loaderWrapper(element, route.loaderTemplate);
				let parsedElement = this.parseElement(element);
				this.renderElement(parsedElement, this.rootElement);
				import(templatePath).then(comp => {
					comp[route.template].init().then(_ => {
						this.lastObj = comp[route.template].html();
						element = this.removeLoaderWrapper(element);
						element = element.replace(`<outlet>`, this.lastObj);
						const parsedElement = this.initialRender(element, comp[route.template]);
						this.renderElement(parsedElement, this.rootElement);
						if(comp[route.template].afterInit) comp[route.template].afterInit();
					});
				});
				if(obj[route.layout].afterInit) obj[route.layout].afterInit();
			});
		})
	},

	parseElement(element) {
		const parser = new DOMParser();
		return parser.parseFromString(element, "text/html");
	},
	
	renderElement(htmlData, targetElement) {
		targetElement.innerHTML = "";
		htmlData.querySelectorAll("body > *").forEach(element => {
			targetElement.appendChild(element);
		});
	},

	initialRender(element, template) {
		const parsedElement = this.parseElement(element);
		parsedElement.querySelectorAll("[bind]").forEach(element => {
			const bindedValue = element.getAttribute("bind");
			const method = template[bindedValue];
			if(Array.isArray(method)) {
				console.log(bindedValue + " is Array");
			}
			if(typeof method === "string" || typeof method === "number") {
				console.log(bindedValue + " is string or number");
			}
			if(typeof method === "object" && !Array.isArray(method)) {
				console.log(bindedValue + " is object");
			}
			element.innerHTML = method;
		});
		return parsedElement;
	},

	render(bind, value) {
		document.querySelectorAll(`[bind="${bind}"]`).forEach(element => {
			element.innerHTML = value();
		});
	},

	appendLoader(element, routeLoader) {
		const loaderHTML = loader.find(ld => ld.type === routeLoader).html;
		this.parseElement(loaderHTML, element);
	},

	removeLoader(element) {
		element.innerHTML = "";
	},
	
	loaderWrapper(element, routeLoader) {
		const loaderHTML = loader.find(ld => ld.type === routeLoader).html;
		const loaderWrapperHTML = `<div class="bm-loader">${loaderHTML}</div>`;
		return element.replace(`<outlet>`, loaderWrapperHTML);
	},

	removeLoaderWrapper(element) {
		const htmlData = this.parseElement(element);
		let loader = htmlData.querySelector(".bm-loader");
		loader = loader.innerHTML = "";
		let newElement = "";
		htmlData.querySelectorAll("body > *").forEach(element => {
			newElement += element.outerHTML;
		});
		return newElement.replace(`<div class="bm-loader"></div>`, "<outlet>");
	},

	handleLink(e) {
		const anchor = e.target.closest('a');
		if (anchor !== null) {
			history.pushState({}, anchor.href, anchor.href);
			this.checkRoutes();
		}
	},

	listener() {
		document.addEventListener('click', e => {
			e.preventDefault();
			this.handleLink(e);
		});
		window.onpopstate = (e) => {
			this.checkRoutes();
		}
	}

}

app.init();