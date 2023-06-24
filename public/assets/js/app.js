import { router } from "./router.js";
import { loader } from "./loader.js";

class App {

	constructor() {}

	lastLayout = "";

	init() {
		this.checkRoutes();
		this.listener();
	}

	checkRoutes() {
		const pathName = window.location.pathname;
		router.find(route => {
			if(route.route === pathName) {
				this.buildLayout(route);
				this.lastLayout = route.layout;
			}
		});
	}

	buildLayout(route) {
		const layoutPath = `/html/layout/${route.layout}.js`;
		const templatePath = `/html/templates/${route.template}.js`;
		const rootElement = document.querySelector("#root");
		if(route.layout !== this.lastLayout) {
			console.log("not same");
			this.appendLoader(rootElement, route.loader);
		} else {
			console.log("same");
		}
		import(layoutPath).then(obj => {
			let element = obj[route.layout];
			if(route.layout !== this.lastLayout) {
				this.removeLoader(rootElement);
			}
			import(templatePath).then(comp => {
				const compHtml = comp[route.template];
				element = element.replace(`<outlet>`, compHtml);
				this.parseElement(element, rootElement);
			});
		});
	}

	parseElement(element, targetElement) {
		targetElement.innerHTML = "";
		const parser = new DOMParser();
		const htmlData = parser.parseFromString(element, "text/html");
		htmlData.querySelectorAll("body > *").forEach(element => {
			targetElement.appendChild(element);
		});
	}

	appendLoader(element, routeLoader) {
		const rootElement = document.querySelector("#root");
		const loaderHTML = loader.find(ld => ld.type === routeLoader).html;
		this.parseElement(loaderHTML, rootElement);
	}

	removeLoader() {
		const rootElement = document.querySelector("#root");
		rootElement.innerHTML = "";
	}

	handleLink(e) {
		const anchor = e.target.closest('a');
		if (anchor !== null) {
			history.pushState({}, anchor.href, anchor.href);
			this.checkRoutes();
		}
	}

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

const app = new App();

app.init();