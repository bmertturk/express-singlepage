import { router } from "./router.js";
import { loader } from "./loader.js";

class App {

	constructor() {}

	

	init() {
		this.checkRoutes();
	}

	checkRoutes() {
		const pathName = window.location.pathname;
		router.find(route => {
			if(route.route === pathName) {
				this.buildLayout(route);
			}
		});
	}

	buildLayout(route) {
		const layoutPath = `/html/layout/${route.layout}.js`;
		const templatePath = `/html/templates/${route.template}.js`;
		const rootElement = document.querySelector("#root");
		//this.appendLoader(rootElement, route.loader);
		import(layoutPath).then(obj => {
			let element = obj[route.layout];
			import(templatePath).then(comp => {
				//this.removeLoader();
				const compHtml = comp[route.template];
				element = element.replace(`<outlet>`, compHtml);
				this.parseElement(element, rootElement);
			});
		});
	}

	parseElement(element, targetElement) {
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

}

const app = new App();

app.init();