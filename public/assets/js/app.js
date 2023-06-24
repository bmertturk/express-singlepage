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
			this.appendLoader(rootElement, route.loaderLayout);
		}
		import(layoutPath).then(obj => {
			let element = obj[route.layout];
			if(route.layout !== this.lastLayout) {
				this.removeLoader(rootElement);
			}
			element = this.loaderWrapper(element, route.loaderTemplate);
			this.parseElement(element, rootElement);
			import(templatePath).then(comp => {
				const compHtml = comp[route.template];
				element = this.removeLoaderWrapper(element);
				element = element.replace(`<outlet>`, compHtml);
				this.parseElement(element, rootElement);
			});
		});
	}

	elementDom(element) {
		const parser = new DOMParser();
		return parser.parseFromString(element, "text/html");
	}

	parseElement(element, targetElement) {
		targetElement.innerHTML = "";
		const htmlData = this.elementDom(element);
		htmlData.querySelectorAll("body > *").forEach(element => {
			targetElement.appendChild(element);
		});
	}

	appendLoader(element, routeLoader) {
		const loaderHTML = loader.find(ld => ld.type === routeLoader).html;
		this.parseElement(loaderHTML, element);
	}

	removeLoader(element) {
		element.innerHTML = "";
	}
	
	loaderWrapper(element, routeLoader) {
		const loaderHTML = loader.find(ld => ld.type === routeLoader).html;
		const loaderWrapperHTML = `<div class="bm-loader">${loaderHTML}</div>`;
		return element.replace(`<outlet>`, loaderWrapperHTML);
	}

	removeLoaderWrapper(element) {
		const htmlData = this.elementDom(element);
		let loader = htmlData.querySelector(".bm-loader");
		loader = loader.innerHTML = "";
		let newElement = "";
		htmlData.querySelectorAll("body > *").forEach(element => {
			newElement += element.outerHTML;
		});
		return newElement.replace(`<div class="bm-loader"></div>`, "<outlet>");
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