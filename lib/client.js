window.__ModuleLoader__.load({
	id: "dsh-session-chat-share",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		//#endregion
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/util.js
		var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.isInstanceOfElement = exports.nodeToDataURL = exports.svgToDataURL = exports.createImage = exports.canvasToBlob = exports.checkCanvasDimensions = exports.getPixelRatio = exports.getImageSize = exports.getStyleProperties = exports.toArray = exports.delay = exports.uuid = exports.resolveUrl = void 0;
			function resolveUrl(url, baseUrl) {
				if (url.match(/^[a-z]+:\/\//i)) return url;
				if (url.match(/^\/\//)) return window.location.protocol + url;
				if (url.match(/^[a-z]+:/i)) return url;
				var doc = document.implementation.createHTMLDocument();
				var base = doc.createElement("base");
				var a = doc.createElement("a");
				doc.head.appendChild(base);
				doc.body.appendChild(a);
				if (baseUrl) base.href = baseUrl;
				a.href = url;
				return a.href;
			}
			exports.resolveUrl = resolveUrl;
			exports.uuid = (function() {
				var counter = 0;
				var random = function() {
					return "0000".concat((Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
				};
				return function() {
					counter += 1;
					return "u".concat(random()).concat(counter);
				};
			})();
			function delay(ms) {
				return function(args) {
					return new Promise(function(resolve) {
						setTimeout(function() {
							return resolve(args);
						}, ms);
					});
				};
			}
			exports.delay = delay;
			function toArray(arrayLike) {
				var arr = [];
				for (var i = 0, l = arrayLike.length; i < l; i++) arr.push(arrayLike[i]);
				return arr;
			}
			exports.toArray = toArray;
			var styleProps = null;
			function getStyleProperties(options) {
				if (options === void 0) options = {};
				if (styleProps) return styleProps;
				if (options.includeStyleProperties) {
					styleProps = options.includeStyleProperties;
					return styleProps;
				}
				styleProps = toArray(window.getComputedStyle(document.documentElement));
				return styleProps;
			}
			exports.getStyleProperties = getStyleProperties;
			function px(node, styleProperty) {
				var val = (node.ownerDocument.defaultView || window).getComputedStyle(node).getPropertyValue(styleProperty);
				return val ? parseFloat(val.replace("px", "")) : 0;
			}
			function getNodeWidth(node) {
				var leftBorder = px(node, "border-left-width");
				var rightBorder = px(node, "border-right-width");
				return node.clientWidth + leftBorder + rightBorder;
			}
			function getNodeHeight(node) {
				var topBorder = px(node, "border-top-width");
				var bottomBorder = px(node, "border-bottom-width");
				return node.clientHeight + topBorder + bottomBorder;
			}
			function getImageSize(targetNode, options) {
				if (options === void 0) options = {};
				return {
					width: options.width || getNodeWidth(targetNode),
					height: options.height || getNodeHeight(targetNode)
				};
			}
			exports.getImageSize = getImageSize;
			function getPixelRatio() {
				var ratio;
				var FINAL_PROCESS;
				try {
					FINAL_PROCESS = process;
				} catch (e) {}
				var val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
				if (val) {
					ratio = parseInt(val, 10);
					if (Number.isNaN(ratio)) ratio = 1;
				}
				return ratio || window.devicePixelRatio || 1;
			}
			exports.getPixelRatio = getPixelRatio;
			var canvasDimensionLimit = 16384;
			function checkCanvasDimensions(canvas) {
				if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) if (canvas.width > canvas.height) {
					canvas.height *= canvasDimensionLimit / canvas.width;
					canvas.width = canvasDimensionLimit;
				} else {
					canvas.width *= canvasDimensionLimit / canvas.height;
					canvas.height = canvasDimensionLimit;
				}
				else if (canvas.width > canvasDimensionLimit) {
					canvas.height *= canvasDimensionLimit / canvas.width;
					canvas.width = canvasDimensionLimit;
				} else {
					canvas.width *= canvasDimensionLimit / canvas.height;
					canvas.height = canvasDimensionLimit;
				}
			}
			exports.checkCanvasDimensions = checkCanvasDimensions;
			function canvasToBlob(canvas, options) {
				if (options === void 0) options = {};
				if (canvas.toBlob) return new Promise(function(resolve) {
					canvas.toBlob(resolve, options.type ? options.type : "image/png", options.quality ? options.quality : 1);
				});
				return new Promise(function(resolve) {
					var binaryString = window.atob(canvas.toDataURL(options.type ? options.type : void 0, options.quality ? options.quality : void 0).split(",")[1]);
					var len = binaryString.length;
					var binaryArray = new Uint8Array(len);
					for (var i = 0; i < len; i += 1) binaryArray[i] = binaryString.charCodeAt(i);
					resolve(new Blob([binaryArray], { type: options.type ? options.type : "image/png" }));
				});
			}
			exports.canvasToBlob = canvasToBlob;
			function createImage(url) {
				return new Promise(function(resolve, reject) {
					var img = new Image();
					img.onload = function() {
						img.decode().then(function() {
							requestAnimationFrame(function() {
								return resolve(img);
							});
						});
					};
					img.onerror = reject;
					img.crossOrigin = "anonymous";
					img.decoding = "async";
					img.src = url;
				});
			}
			exports.createImage = createImage;
			function svgToDataURL(svg) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						return [2, Promise.resolve().then(function() {
							return new XMLSerializer().serializeToString(svg);
						}).then(encodeURIComponent).then(function(html) {
							return "data:image/svg+xml;charset=utf-8,".concat(html);
						})];
					});
				});
			}
			exports.svgToDataURL = svgToDataURL;
			function nodeToDataURL(node, width, height) {
				return __awaiter(this, void 0, void 0, function() {
					var xmlns, svg, foreignObject;
					return __generator(this, function(_a) {
						xmlns = "http://www.w3.org/2000/svg";
						svg = document.createElementNS(xmlns, "svg");
						foreignObject = document.createElementNS(xmlns, "foreignObject");
						svg.setAttribute("width", "".concat(width));
						svg.setAttribute("height", "".concat(height));
						svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
						foreignObject.setAttribute("width", "100%");
						foreignObject.setAttribute("height", "100%");
						foreignObject.setAttribute("x", "0");
						foreignObject.setAttribute("y", "0");
						foreignObject.setAttribute("externalResourcesRequired", "true");
						svg.appendChild(foreignObject);
						foreignObject.appendChild(node);
						return [2, svgToDataURL(svg)];
					});
				});
			}
			exports.nodeToDataURL = nodeToDataURL;
			var isInstanceOfElement = function(node, instance) {
				if (node instanceof instance) return true;
				var nodePrototype = Object.getPrototypeOf(node);
				if (nodePrototype === null) return false;
				return nodePrototype.constructor.name === instance.name || (0, exports.isInstanceOfElement)(nodePrototype, instance);
			};
			exports.isInstanceOfElement = isInstanceOfElement;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/clone-pseudos.js
		var require_clone_pseudos = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.clonePseudoElements = void 0;
			var util_1 = require_util();
			function formatCSSText(style) {
				var content = style.getPropertyValue("content");
				return "".concat(style.cssText, " content: '").concat(content.replace(/'|"/g, ""), "';");
			}
			function formatCSSProperties(style, options) {
				return (0, util_1.getStyleProperties)(options).map(function(name) {
					var value = style.getPropertyValue(name);
					var priority = style.getPropertyPriority(name);
					return "".concat(name, ": ").concat(value).concat(priority ? " !important" : "", ";");
				}).join(" ");
			}
			function getPseudoElementStyle(className, pseudo, style, options) {
				var selector = ".".concat(className, ":").concat(pseudo);
				var cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
				return document.createTextNode("".concat(selector, "{").concat(cssText, "}"));
			}
			function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
				var style = window.getComputedStyle(nativeNode, pseudo);
				var content = style.getPropertyValue("content");
				if (content === "" || content === "none") return;
				var className = (0, util_1.uuid)();
				try {
					clonedNode.className = "".concat(clonedNode.className, " ").concat(className);
				} catch (err) {
					return;
				}
				var styleElement = document.createElement("style");
				styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
				clonedNode.appendChild(styleElement);
			}
			function clonePseudoElements(nativeNode, clonedNode, options) {
				clonePseudoElement(nativeNode, clonedNode, ":before", options);
				clonePseudoElement(nativeNode, clonedNode, ":after", options);
			}
			exports.clonePseudoElements = clonePseudoElements;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/mimes.js
		var require_mimes = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.getMimeType = void 0;
			var WOFF = "application/font-woff";
			var JPEG = "image/jpeg";
			var mimes = {
				woff: WOFF,
				woff2: WOFF,
				ttf: "application/font-truetype",
				eot: "application/vnd.ms-fontobject",
				png: "image/png",
				jpg: JPEG,
				jpeg: JPEG,
				gif: "image/gif",
				tiff: "image/tiff",
				svg: "image/svg+xml",
				webp: "image/webp"
			};
			function getExtension(url) {
				var match = /\.([^./]*?)$/g.exec(url);
				return match ? match[1] : "";
			}
			function getMimeType(url) {
				return mimes[getExtension(url).toLowerCase()] || "";
			}
			exports.getMimeType = getMimeType;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/dataurl.js
		var require_dataurl = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.resourceToDataURL = exports.fetchAsDataURL = exports.makeDataUrl = exports.isDataUrl = void 0;
			function getContentFromDataUrl(dataURL) {
				return dataURL.split(/,/)[1];
			}
			function isDataUrl(url) {
				return url.search(/^(data:)/) !== -1;
			}
			exports.isDataUrl = isDataUrl;
			function makeDataUrl(content, mimeType) {
				return "data:".concat(mimeType, ";base64,").concat(content);
			}
			exports.makeDataUrl = makeDataUrl;
			function fetchAsDataURL(url, init, process) {
				return __awaiter(this, void 0, void 0, function() {
					var res, blob;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, fetch(url, init)];
							case 1:
								res = _a.sent();
								if (res.status === 404) throw new Error("Resource \"".concat(res.url, "\" not found"));
								return [4, res.blob()];
							case 2:
								blob = _a.sent();
								return [2, new Promise(function(resolve, reject) {
									var reader = new FileReader();
									reader.onerror = reject;
									reader.onloadend = function() {
										try {
											resolve(process({
												res,
												result: reader.result
											}));
										} catch (error) {
											reject(error);
										}
									};
									reader.readAsDataURL(blob);
								})];
						}
					});
				});
			}
			exports.fetchAsDataURL = fetchAsDataURL;
			var cache = {};
			function getCacheKey(url, contentType, includeQueryParams) {
				var key = url.replace(/\?.*/, "");
				if (includeQueryParams) key = url;
				if (/ttf|otf|eot|woff2?/i.test(key)) key = key.replace(/.*\//, "");
				return contentType ? "[".concat(contentType, "]").concat(key) : key;
			}
			function resourceToDataURL(resourceUrl, contentType, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cacheKey, dataURL, content, error_1, msg;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
								if (cache[cacheKey] != null) return [2, cache[cacheKey]];
								if (options.cacheBust) resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
								_a.label = 1;
							case 1:
								_a.trys.push([
									1,
									3,
									,
									4
								]);
								return [4, fetchAsDataURL(resourceUrl, options.fetchRequestInit, function(_a) {
									var res = _a.res, result = _a.result;
									if (!contentType) contentType = res.headers.get("Content-Type") || "";
									return getContentFromDataUrl(result);
								})];
							case 2:
								content = _a.sent();
								dataURL = makeDataUrl(content, contentType);
								return [3, 4];
							case 3:
								error_1 = _a.sent();
								dataURL = options.imagePlaceholder || "";
								msg = "Failed to fetch resource: ".concat(resourceUrl);
								if (error_1) msg = typeof error_1 === "string" ? error_1 : error_1.message;
								if (msg) console.warn(msg);
								return [3, 4];
							case 4:
								cache[cacheKey] = dataURL;
								return [2, dataURL];
						}
					});
				});
			}
			exports.resourceToDataURL = resourceToDataURL;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/clone-node.js
		var require_clone_node = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.cloneNode = void 0;
			var clone_pseudos_1 = require_clone_pseudos();
			var util_1 = require_util();
			var mimes_1 = require_mimes();
			var dataurl_1 = require_dataurl();
			function cloneCanvasElement(canvas) {
				return __awaiter(this, void 0, void 0, function() {
					var dataURL;
					return __generator(this, function(_a) {
						dataURL = canvas.toDataURL();
						if (dataURL === "data:,") return [2, canvas.cloneNode(false)];
						return [2, (0, util_1.createImage)(dataURL)];
					});
				});
			}
			function cloneVideoElement(video, options) {
				return __awaiter(this, void 0, void 0, function() {
					var canvas, ctx, dataURL_1, poster, contentType, dataURL;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (video.currentSrc) {
									canvas = document.createElement("canvas");
									ctx = canvas.getContext("2d");
									canvas.width = video.clientWidth;
									canvas.height = video.clientHeight;
									ctx === null || ctx === void 0 || ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
									dataURL_1 = canvas.toDataURL();
									return [2, (0, util_1.createImage)(dataURL_1)];
								}
								poster = video.poster;
								contentType = (0, mimes_1.getMimeType)(poster);
								return [4, (0, dataurl_1.resourceToDataURL)(poster, contentType, options)];
							case 1:
								dataURL = _a.sent();
								return [2, (0, util_1.createImage)(dataURL)];
						}
					});
				});
			}
			function cloneIFrameElement(iframe, options) {
				var _a;
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								_c.trys.push([
									0,
									3,
									,
									4
								]);
								if (!((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) return [3, 2];
								return [4, cloneNode(iframe.contentDocument.body, options, true)];
							case 1: return [2, _c.sent()];
							case 2: return [3, 4];
							case 3:
								_c.sent();
								return [3, 4];
							case 4: return [2, iframe.cloneNode(false)];
						}
					});
				});
			}
			function cloneSingleNode(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						if ((0, util_1.isInstanceOfElement)(node, HTMLCanvasElement)) return [2, cloneCanvasElement(node)];
						if ((0, util_1.isInstanceOfElement)(node, HTMLVideoElement)) return [2, cloneVideoElement(node, options)];
						if ((0, util_1.isInstanceOfElement)(node, HTMLIFrameElement)) return [2, cloneIFrameElement(node, options)];
						return [2, node.cloneNode(isSVGElement(node))];
					});
				});
			}
			var isSlotElement = function(node) {
				return node.tagName != null && node.tagName.toUpperCase() === "SLOT";
			};
			var isSVGElement = function(node) {
				return node.tagName != null && node.tagName.toUpperCase() === "SVG";
			};
			function cloneChildren(nativeNode, clonedNode, options) {
				var _a, _b;
				return __awaiter(this, void 0, void 0, function() {
					var children;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								if (isSVGElement(clonedNode)) return [2, clonedNode];
								children = [];
								if (isSlotElement(nativeNode) && nativeNode.assignedNodes) children = (0, util_1.toArray)(nativeNode.assignedNodes());
								else if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) children = (0, util_1.toArray)(nativeNode.contentDocument.body.childNodes);
								else children = (0, util_1.toArray)(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
								if (children.length === 0 || (0, util_1.isInstanceOfElement)(nativeNode, HTMLVideoElement)) return [2, clonedNode];
								return [4, children.reduce(function(deferred, child) {
									return deferred.then(function() {
										return cloneNode(child, options);
									}).then(function(clonedChild) {
										if (clonedChild) clonedNode.appendChild(clonedChild);
									});
								}, Promise.resolve())];
							case 1:
								_c.sent();
								return [2, clonedNode];
						}
					});
				});
			}
			function cloneCSSStyle(nativeNode, clonedNode, options) {
				var targetStyle = clonedNode.style;
				if (!targetStyle) return;
				var sourceStyle = window.getComputedStyle(nativeNode);
				if (sourceStyle.cssText) {
					targetStyle.cssText = sourceStyle.cssText;
					targetStyle.transformOrigin = sourceStyle.transformOrigin;
				} else (0, util_1.getStyleProperties)(options).forEach(function(name) {
					var value = sourceStyle.getPropertyValue(name);
					if (name === "font-size" && value.endsWith("px")) {
						var reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - .1;
						value = "".concat(reducedFont, "px");
					}
					if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") value = "block";
					if (name === "d" && clonedNode.getAttribute("d")) value = "path(".concat(clonedNode.getAttribute("d"), ")");
					targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
				});
			}
			function cloneInputValue(nativeNode, clonedNode) {
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLTextAreaElement)) clonedNode.innerHTML = nativeNode.value;
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLInputElement)) clonedNode.setAttribute("value", nativeNode.value);
			}
			function cloneSelectValue(nativeNode, clonedNode) {
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLSelectElement)) {
					var clonedSelect = clonedNode;
					var selectedOption = Array.from(clonedSelect.children).find(function(child) {
						return nativeNode.value === child.getAttribute("value");
					});
					if (selectedOption) selectedOption.setAttribute("selected", "");
				}
			}
			function decorate(nativeNode, clonedNode, options) {
				if ((0, util_1.isInstanceOfElement)(clonedNode, Element)) {
					cloneCSSStyle(nativeNode, clonedNode, options);
					(0, clone_pseudos_1.clonePseudoElements)(nativeNode, clonedNode, options);
					cloneInputValue(nativeNode, clonedNode);
					cloneSelectValue(nativeNode, clonedNode);
				}
				return clonedNode;
			}
			function ensureSVGSymbols(clone, options) {
				return __awaiter(this, void 0, void 0, function() {
					var uses, processedDefs, i, use, id, exist, definition, _a, _b, nodes, ns, svg, defs, i;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
								if (uses.length === 0) return [2, clone];
								processedDefs = {};
								i = 0;
								_c.label = 1;
							case 1:
								if (!(i < uses.length)) return [3, 4];
								use = uses[i];
								id = use.getAttribute("xlink:href");
								if (!id) return [3, 3];
								exist = clone.querySelector(id);
								definition = document.querySelector(id);
								if (!(!exist && definition && !processedDefs[id])) return [3, 3];
								_a = processedDefs;
								_b = id;
								return [4, cloneNode(definition, options, true)];
							case 2:
								_a[_b] = _c.sent();
								_c.label = 3;
							case 3:
								i++;
								return [3, 1];
							case 4:
								nodes = Object.values(processedDefs);
								if (nodes.length) {
									ns = "http://www.w3.org/1999/xhtml";
									svg = document.createElementNS(ns, "svg");
									svg.setAttribute("xmlns", ns);
									svg.style.position = "absolute";
									svg.style.width = "0";
									svg.style.height = "0";
									svg.style.overflow = "hidden";
									svg.style.display = "none";
									defs = document.createElementNS(ns, "defs");
									svg.appendChild(defs);
									for (i = 0; i < nodes.length; i++) defs.appendChild(nodes[i]);
									clone.appendChild(svg);
								}
								return [2, clone];
						}
					});
				});
			}
			function cloneNode(node, options, isRoot) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						if (!isRoot && options.filter && !options.filter(node)) return [2, null];
						return [2, Promise.resolve(node).then(function(clonedNode) {
							return cloneSingleNode(clonedNode, options);
						}).then(function(clonedNode) {
							return cloneChildren(node, clonedNode, options);
						}).then(function(clonedNode) {
							return decorate(node, clonedNode, options);
						}).then(function(clonedNode) {
							return ensureSVGSymbols(clonedNode, options);
						})];
					});
				});
			}
			exports.cloneNode = cloneNode;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-resources.js
		var require_embed_resources = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedResources = exports.shouldEmbed = exports.embed = exports.parseURLs = void 0;
			var util_1 = require_util();
			var mimes_1 = require_mimes();
			var dataurl_1 = require_dataurl();
			var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
			var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
			var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
			function toRegex(url) {
				var escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
				return new RegExp("(url\\(['\"]?)(".concat(escaped, ")(['\"]?\\))"), "g");
			}
			function parseURLs(cssText) {
				var urls = [];
				cssText.replace(URL_REGEX, function(raw, quotation, url) {
					urls.push(url);
					return raw;
				});
				return urls.filter(function(url) {
					return !(0, dataurl_1.isDataUrl)(url);
				});
			}
			exports.parseURLs = parseURLs;
			function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
				return __awaiter(this, void 0, void 0, function() {
					var resolvedURL, contentType, dataURL, content;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								_a.trys.push([
									0,
									5,
									,
									6
								]);
								resolvedURL = baseURL ? (0, util_1.resolveUrl)(resourceURL, baseURL) : resourceURL;
								contentType = (0, mimes_1.getMimeType)(resourceURL);
								dataURL = void 0;
								if (!getContentFromUrl) return [3, 2];
								return [4, getContentFromUrl(resolvedURL)];
							case 1:
								content = _a.sent();
								dataURL = (0, dataurl_1.makeDataUrl)(content, contentType);
								return [3, 4];
							case 2: return [4, (0, dataurl_1.resourceToDataURL)(resolvedURL, contentType, options)];
							case 3:
								dataURL = _a.sent();
								_a.label = 4;
							case 4: return [2, cssText.replace(toRegex(resourceURL), "$1".concat(dataURL, "$3"))];
							case 5:
								_a.sent();
								return [3, 6];
							case 6: return [2, cssText];
						}
					});
				});
			}
			exports.embed = embed;
			function filterPreferredFontFormat(str, _a) {
				var preferredFontFormat = _a.preferredFontFormat;
				return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, function(match) {
					while (true) {
						var _a = URL_WITH_FORMAT_REGEX.exec(match) || [], src = _a[0], format = _a[2];
						if (!format) return "";
						if (format === preferredFontFormat) return "src: ".concat(src, ";");
					}
				});
			}
			function shouldEmbed(url) {
				return url.search(URL_REGEX) !== -1;
			}
			exports.shouldEmbed = shouldEmbed;
			function embedResources(cssText, baseUrl, options) {
				return __awaiter(this, void 0, void 0, function() {
					var filteredCSSText, urls;
					return __generator(this, function(_a) {
						if (!shouldEmbed(cssText)) return [2, cssText];
						filteredCSSText = filterPreferredFontFormat(cssText, options);
						urls = parseURLs(filteredCSSText);
						return [2, urls.reduce(function(deferred, url) {
							return deferred.then(function(css) {
								return embed(css, url, baseUrl, options);
							});
						}, Promise.resolve(filteredCSSText))];
					});
				});
			}
			exports.embedResources = embedResources;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-images.js
		var require_embed_images = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedImages = void 0;
			var embed_resources_1 = require_embed_resources();
			var util_1 = require_util();
			var dataurl_1 = require_dataurl();
			var mimes_1 = require_mimes();
			function embedProp(propName, node, options) {
				var _a;
				return __awaiter(this, void 0, void 0, function() {
					var propValue, cssString;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
								if (!propValue) return [3, 2];
								return [4, (0, embed_resources_1.embedResources)(propValue, null, options)];
							case 1:
								cssString = _b.sent();
								node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
								return [2, true];
							case 2: return [2, false];
						}
					});
				});
			}
			function embedBackground(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var _a, _b, _c, _d;
					return __generator(this, function(_e) {
						switch (_e.label) {
							case 0: return [4, embedProp("background", clonedNode, options)];
							case 1:
								_a = _e.sent();
								if (_a) return [3, 3];
								return [4, embedProp("background-image", clonedNode, options)];
							case 2:
								_a = _e.sent();
								_e.label = 3;
							case 3: return [4, embedProp("mask", clonedNode, options)];
							case 4:
								_d = _e.sent();
								if (_d) return [3, 6];
								return [4, embedProp("-webkit-mask", clonedNode, options)];
							case 5:
								_d = _e.sent();
								_e.label = 6;
							case 6:
								_c = _d;
								if (_c) return [3, 8];
								return [4, embedProp("mask-image", clonedNode, options)];
							case 7:
								_c = _e.sent();
								_e.label = 8;
							case 8:
								_b = _c;
								if (_b) return [3, 10];
								return [4, embedProp("-webkit-mask-image", clonedNode, options)];
							case 9:
								_b = _e.sent();
								_e.label = 10;
							case 10: return [2];
						}
					});
				});
			}
			function embedImageNode(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var isImageElement, url, dataURL;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								isImageElement = (0, util_1.isInstanceOfElement)(clonedNode, HTMLImageElement);
								if (!(isImageElement && !(0, dataurl_1.isDataUrl)(clonedNode.src)) && !((0, util_1.isInstanceOfElement)(clonedNode, SVGImageElement) && !(0, dataurl_1.isDataUrl)(clonedNode.href.baseVal))) return [2];
								url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
								return [4, (0, dataurl_1.resourceToDataURL)(url, (0, mimes_1.getMimeType)(url), options)];
							case 1:
								dataURL = _a.sent();
								return [4, new Promise(function(resolve, reject) {
									clonedNode.onload = resolve;
									clonedNode.onerror = options.onImageErrorHandler ? function() {
										var attributes = [];
										for (var _i = 0; _i < arguments.length; _i++) attributes[_i] = arguments[_i];
										try {
											resolve(options.onImageErrorHandler.apply(options, attributes));
										} catch (error) {
											reject(error);
										}
									} : reject;
									var image = clonedNode;
									if (image.decode) image.decode = resolve;
									if (image.loading === "lazy") image.loading = "eager";
									if (isImageElement) {
										clonedNode.srcset = "";
										clonedNode.src = dataURL;
									} else clonedNode.href.baseVal = dataURL;
								})];
							case 2:
								_a.sent();
								return [2];
						}
					});
				});
			}
			function embedChildren(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var children, deferreds;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								children = (0, util_1.toArray)(clonedNode.childNodes);
								deferreds = children.map(function(child) {
									return embedImages(child, options);
								});
								return [4, Promise.all(deferreds).then(function() {
									return clonedNode;
								})];
							case 1:
								_a.sent();
								return [2];
						}
					});
				});
			}
			function embedImages(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (!(0, util_1.isInstanceOfElement)(clonedNode, Element)) return [3, 4];
								return [4, embedBackground(clonedNode, options)];
							case 1:
								_a.sent();
								return [4, embedImageNode(clonedNode, options)];
							case 2:
								_a.sent();
								return [4, embedChildren(clonedNode, options)];
							case 3:
								_a.sent();
								_a.label = 4;
							case 4: return [2];
						}
					});
				});
			}
			exports.embedImages = embedImages;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/apply-style.js
		var require_apply_style = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.applyStyle = void 0;
			function applyStyle(node, options) {
				var style = node.style;
				if (options.backgroundColor) style.backgroundColor = options.backgroundColor;
				if (options.width) style.width = "".concat(options.width, "px");
				if (options.height) style.height = "".concat(options.height, "px");
				var manual = options.style;
				if (manual != null) Object.keys(manual).forEach(function(key) {
					style[key] = manual[key];
				});
				return node;
			}
			exports.applyStyle = applyStyle;
		}));
		//#endregion
		//#region ../../../node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-webfonts.js
		var require_embed_webfonts = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedWebFonts = exports.getWebFontCSS = void 0;
			var util_1 = require_util();
			var dataurl_1 = require_dataurl();
			var embed_resources_1 = require_embed_resources();
			var cssFetchCache = {};
			function fetchCSS(url) {
				return __awaiter(this, void 0, void 0, function() {
					var cache, res, cssText;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								cache = cssFetchCache[url];
								if (cache != null) return [2, cache];
								return [4, fetch(url)];
							case 1:
								res = _a.sent();
								return [4, res.text()];
							case 2:
								cssText = _a.sent();
								cache = {
									url,
									cssText
								};
								cssFetchCache[url] = cache;
								return [2, cache];
						}
					});
				});
			}
			function embedFonts(data, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cssText, regexUrl, fontLocs, loadFonts;
					var _this = this;
					return __generator(this, function(_a) {
						cssText = data.cssText;
						regexUrl = /url\(["']?([^"')]+)["']?\)/g;
						fontLocs = cssText.match(/url\([^)]+\)/g) || [];
						loadFonts = fontLocs.map(function(loc) {
							return __awaiter(_this, void 0, void 0, function() {
								var url;
								return __generator(this, function(_a) {
									url = loc.replace(regexUrl, "$1");
									if (!url.startsWith("https://")) url = new URL(url, data.url).href;
									return [2, (0, dataurl_1.fetchAsDataURL)(url, options.fetchRequestInit, function(_a) {
										var result = _a.result;
										cssText = cssText.replace(loc, "url(".concat(result, ")"));
										return [loc, result];
									})];
								});
							});
						});
						return [2, Promise.all(loadFonts).then(function() {
							return cssText;
						})];
					});
				});
			}
			function parseCSS(source) {
				if (source == null) return [];
				var result = [];
				var cssText = source.replace(/(\/\*[\s\S]*?\*\/)/gi, "");
				var keyframesRegex = /* @__PURE__ */ new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
				while (true) {
					var matches = keyframesRegex.exec(cssText);
					if (matches === null) break;
					result.push(matches[0]);
				}
				cssText = cssText.replace(keyframesRegex, "");
				var importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
				var unifiedRegex = /* @__PURE__ */ new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
				while (true) {
					var matches = importRegex.exec(cssText);
					if (matches === null) {
						matches = unifiedRegex.exec(cssText);
						if (matches === null) break;
						else importRegex.lastIndex = unifiedRegex.lastIndex;
					} else unifiedRegex.lastIndex = importRegex.lastIndex;
					result.push(matches[0]);
				}
				return result;
			}
			function getCSSRules(styleSheets, options) {
				return __awaiter(this, void 0, void 0, function() {
					var ret, deferreds;
					return __generator(this, function(_a) {
						ret = [];
						deferreds = [];
						styleSheets.forEach(function(sheet) {
							if ("cssRules" in sheet) try {
								(0, util_1.toArray)(sheet.cssRules || []).forEach(function(item, index) {
									if (item.type === CSSRule.IMPORT_RULE) {
										var importIndex_1 = index + 1;
										var url = item.href;
										var deferred = fetchCSS(url).then(function(metadata) {
											return embedFonts(metadata, options);
										}).then(function(cssText) {
											return parseCSS(cssText).forEach(function(rule) {
												try {
													sheet.insertRule(rule, rule.startsWith("@import") ? importIndex_1 += 1 : sheet.cssRules.length);
												} catch (error) {
													console.error("Error inserting rule from remote css", {
														rule,
														error
													});
												}
											});
										}).catch(function(e) {
											console.error("Error loading remote css", e.toString());
										});
										deferreds.push(deferred);
									}
								});
							} catch (e) {
								var inline_1 = styleSheets.find(function(a) {
									return a.href == null;
								}) || document.styleSheets[0];
								if (sheet.href != null) deferreds.push(fetchCSS(sheet.href).then(function(metadata) {
									return embedFonts(metadata, options);
								}).then(function(cssText) {
									return parseCSS(cssText).forEach(function(rule) {
										inline_1.insertRule(rule, inline_1.cssRules.length);
									});
								}).catch(function(err) {
									console.error("Error loading remote stylesheet", err);
								}));
								console.error("Error inlining remote css file", e);
							}
						});
						return [2, Promise.all(deferreds).then(function() {
							styleSheets.forEach(function(sheet) {
								if ("cssRules" in sheet) try {
									(0, util_1.toArray)(sheet.cssRules || []).forEach(function(item) {
										ret.push(item);
									});
								} catch (e) {
									console.error("Error while reading CSS rules from ".concat(sheet.href), e);
								}
							});
							return ret;
						})];
					});
				});
			}
			function getWebFontRules(cssRules) {
				return cssRules.filter(function(rule) {
					return rule.type === CSSRule.FONT_FACE_RULE;
				}).filter(function(rule) {
					return (0, embed_resources_1.shouldEmbed)(rule.style.getPropertyValue("src"));
				});
			}
			function parseWebFontRules(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					var styleSheets, cssRules;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (node.ownerDocument == null) throw new Error("Provided element is not within a Document");
								styleSheets = (0, util_1.toArray)(node.ownerDocument.styleSheets);
								return [4, getCSSRules(styleSheets, options)];
							case 1:
								cssRules = _a.sent();
								return [2, getWebFontRules(cssRules)];
						}
					});
				});
			}
			function normalizeFontFamily(font) {
				return font.trim().replace(/["']/g, "");
			}
			function getUsedFonts(node) {
				var fonts = /* @__PURE__ */ new Set();
				function traverse(node) {
					(node.style.fontFamily || getComputedStyle(node).fontFamily).split(",").forEach(function(font) {
						fonts.add(normalizeFontFamily(font));
					});
					Array.from(node.children).forEach(function(child) {
						if (child instanceof HTMLElement) traverse(child);
					});
				}
				traverse(node);
				return fonts;
			}
			function getWebFontCSS(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					var rules, usedFonts, cssTexts;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, parseWebFontRules(node, options)];
							case 1:
								rules = _a.sent();
								usedFonts = getUsedFonts(node);
								return [4, Promise.all(rules.filter(function(rule) {
									return usedFonts.has(normalizeFontFamily(rule.style.fontFamily));
								}).map(function(rule) {
									var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
									return (0, embed_resources_1.embedResources)(rule.cssText, baseUrl, options);
								}))];
							case 2:
								cssTexts = _a.sent();
								return [2, cssTexts.join("\n")];
						}
					});
				});
			}
			exports.getWebFontCSS = getWebFontCSS;
			function embedWebFonts(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cssText, _a, _b, styleNode, sytleContent;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								if (!(options.fontEmbedCSS != null)) return [3, 1];
								_a = options.fontEmbedCSS;
								return [3, 5];
							case 1:
								if (!options.skipFonts) return [3, 2];
								_b = null;
								return [3, 4];
							case 2: return [4, getWebFontCSS(clonedNode, options)];
							case 3:
								_b = _c.sent();
								_c.label = 4;
							case 4:
								_a = _b;
								_c.label = 5;
							case 5:
								cssText = _a;
								if (cssText) {
									styleNode = document.createElement("style");
									sytleContent = document.createTextNode(cssText);
									styleNode.appendChild(sytleContent);
									if (clonedNode.firstChild) clonedNode.insertBefore(styleNode, clonedNode.firstChild);
									else clonedNode.appendChild(styleNode);
								}
								return [2];
						}
					});
				});
			}
			exports.embedWebFonts = embedWebFonts;
		}));
		//#endregion
		//#region src/client/locales.ts
		var import_lib = (/* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
							case 0:
							case 1:
								t = op;
								break;
							case 4:
								_.label++;
								return {
									value: op[1],
									done: false
								};
							case 5:
								_.label++;
								y = op[1];
								op = [0];
								continue;
							case 7:
								op = _.ops.pop();
								_.trys.pop();
								continue;
							default:
								if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
									_ = 0;
									continue;
								}
								if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
									_.label = op[1];
									break;
								}
								if (op[0] === 6 && _.label < t[1]) {
									_.label = t[1];
									t = op;
									break;
								}
								if (t && _.label < t[2]) {
									_.label = t[2];
									_.ops.push(op);
									break;
								}
								if (t[2]) _.ops.pop();
								_.trys.pop();
								continue;
						}
						op = body.call(thisArg, _);
					} catch (e) {
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.getFontEmbedCSS = exports.toBlob = exports.toJpeg = exports.toPng = exports.toPixelData = exports.toCanvas = exports.toSvg = void 0;
			var clone_node_1 = require_clone_node();
			var embed_images_1 = require_embed_images();
			var apply_style_1 = require_apply_style();
			var embed_webfonts_1 = require_embed_webfonts();
			var util_1 = require_util();
			function toSvg(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, clonedNode, datauri;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, (0, clone_node_1.cloneNode)(node, options, true)];
							case 1:
								clonedNode = _b.sent();
								return [4, (0, embed_webfonts_1.embedWebFonts)(clonedNode, options)];
							case 2:
								_b.sent();
								return [4, (0, embed_images_1.embedImages)(clonedNode, options)];
							case 3:
								_b.sent();
								(0, apply_style_1.applyStyle)(clonedNode, options);
								return [4, (0, util_1.nodeToDataURL)(clonedNode, width, height)];
							case 4:
								datauri = _b.sent();
								return [2, datauri];
						}
					});
				});
			}
			exports.toSvg = toSvg;
			function toCanvas(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, svg, img, canvas, context, ratio, canvasWidth, canvasHeight;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, toSvg(node, options)];
							case 1:
								svg = _b.sent();
								return [4, (0, util_1.createImage)(svg)];
							case 2:
								img = _b.sent();
								canvas = document.createElement("canvas");
								context = canvas.getContext("2d");
								ratio = options.pixelRatio || (0, util_1.getPixelRatio)();
								canvasWidth = options.canvasWidth || width;
								canvasHeight = options.canvasHeight || height;
								canvas.width = canvasWidth * ratio;
								canvas.height = canvasHeight * ratio;
								if (!options.skipAutoScale) (0, util_1.checkCanvasDimensions)(canvas);
								canvas.style.width = "".concat(canvasWidth);
								canvas.style.height = "".concat(canvasHeight);
								if (options.backgroundColor) {
									context.fillStyle = options.backgroundColor;
									context.fillRect(0, 0, canvas.width, canvas.height);
								}
								context.drawImage(img, 0, 0, canvas.width, canvas.height);
								return [2, canvas];
						}
					});
				});
			}
			exports.toCanvas = toCanvas;
			function toPixelData(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, canvas, ctx;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, toCanvas(node, options)];
							case 1:
								canvas = _b.sent();
								ctx = canvas.getContext("2d");
								return [2, ctx.getImageData(0, 0, width, height).data];
						}
					});
				});
			}
			exports.toPixelData = toPixelData;
			function toPng(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [2, canvas.toDataURL()];
						}
					});
				});
			}
			exports.toPng = toPng;
			function toJpeg(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [2, canvas.toDataURL("image/jpeg", options.quality || 1)];
						}
					});
				});
			}
			exports.toJpeg = toJpeg;
			function toBlob(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas, blob;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [4, (0, util_1.canvasToBlob)(canvas)];
							case 2:
								blob = _a.sent();
								return [2, blob];
						}
					});
				});
			}
			exports.toBlob = toBlob;
			function getFontEmbedCSS(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						return [2, (0, embed_webfonts_1.getWebFontCSS)(node, options)];
					});
				});
			}
			exports.getFontEmbedCSS = getFontEmbedCSS;
		})))();
		/** Locale namespace owned by the chat-segment share browser dialog. */
		const NS = "session-chat-share";
		/** Simplified-Chinese session-chat-share strings. */
		const zh = {
			"header.label": "分享",
			"dialog.title": "分享聊天片段",
			"dialog.description": "选择消息范围，以 Markdown、HTML 或 TXT 复制或下载。",
			"dialog.loading": "正在加载消息…",
			"dialog.empty": "此会话没有可分享的消息。",
			"dialog.historyFailed": "无法加载消息。",
			"dialog.copyFailed": "复制失败。",
			"dialog.downloadFailed": "下载失败。",
			"dialog.rangeFrom": "从",
			"dialog.rangeTo": "到",
			"dialog.format": "格式",
			"dialog.format.markdown": "Markdown",
			"dialog.format.html": "HTML",
			"dialog.format.txt": "TXT",
			"dialog.format.png": "PNG",
			"dialog.capNotice": "仅显示最新 300 条消息；保存 TXT 与 /share txt 会导出完整对话。",
			"dialog.messages": "消息",
			"dialog.preview": "预览",
			"dialog.copy": "复制",
			"dialog.copied": "已复制",
			"dialog.markdownCopy": "复制",
			"dialog.markdownCopied": "已复制",
			"dialog.markdownFootnotes": "脚注",
			"dialog.download": "下载",
			"dialog.close": "关闭",
			"options": "选项",
			"options.redact": "脱敏敏感信息",
			"options.tools": "包含工具调用",
			"options.subagents": "包含子代理对话",
			"options.multiselect": "多选模式",
			"role.user": "用户",
			"role.assistant": "助手",
			"role.tool": "工具",
			"role.subagent": "子代理",
			"artifact.sharedFrom": "分享自 DeepSeek Harness"
		};
		/** English session-chat-share strings. */
		const en = {
			"header.label": "Share",
			"dialog.title": "Share chat segment",
			"dialog.description": "Select a message range and copy or download it as Markdown, HTML, or TXT.",
			"dialog.loading": "Loading messages…",
			"dialog.empty": "This session has no shareable messages.",
			"dialog.historyFailed": "Could not load messages.",
			"dialog.copyFailed": "Copy failed.",
			"dialog.downloadFailed": "Download failed.",
			"dialog.rangeFrom": "From",
			"dialog.rangeTo": "To",
			"dialog.format": "Format",
			"dialog.format.markdown": "Markdown",
			"dialog.format.html": "HTML",
			"dialog.format.txt": "TXT",
			"dialog.format.png": "PNG",
			"dialog.capNotice": "Showing the newest 300 messages; Save TXT and /share txt export the whole chat.",
			"dialog.messages": "Messages",
			"dialog.preview": "Preview",
			"dialog.copy": "Copy",
			"dialog.copied": "Copied",
			"dialog.markdownCopy": "Copy",
			"dialog.markdownCopied": "Copied",
			"dialog.markdownFootnotes": "Footnotes",
			"dialog.download": "Download",
			"dialog.close": "Close",
			"options": "Options",
			"options.redact": "Redact sensitive info",
			"options.tools": "Include tool calls",
			"options.subagents": "Include subagent conversations",
			"options.multiselect": "Multi-select mode",
			"role.user": "User",
			"role.assistant": "Assistant",
			"role.tool": "Tool",
			"role.subagent": "Subagent",
			"artifact.sharedFrom": "Shared from DeepSeek Harness"
		};
		/**
		* English artifact vocabulary for renderers invoked without explicit labels.
		* Derived from the dictionary so translated copy lives only in this file.
		*/
		const FALLBACK_LABELS = {
			user: en["role.user"],
			assistant: en["role.assistant"],
			tool: en["role.tool"],
			subagent: en["role.subagent"],
			sharedFrom: en["artifact.sharedFrom"]
		};
		//#endregion
		//#region src/client/render.ts
		/** One fixed timestamp format so shared artifacts read identically on every machine. */
		function formatShareTime(time) {
			return new Date(time).toLocaleString(void 0, {
				dateStyle: "medium",
				timeStyle: "medium"
			});
		}
		function labelsOf$1(options) {
			return options.labels ?? FALLBACK_LABELS;
		}
		function roleLabel(role, labels) {
			if (role === "user") return labels.user;
			if (role === "assistant") return labels.assistant;
			if (role === "tool") return labels.tool;
			return labels.subagent;
		}
		/** The artifact header: title, model, and the shared-from line. */
		function headerLines(labels, meta) {
			const lines = [];
			if (meta?.title !== void 0 && meta.title !== "") lines.push(`# ${meta.title}`, "");
			if (meta?.model !== void 0 && meta.model !== "") lines.push(`Model: ${meta.model}`, "");
			lines.push(labels.sharedFrom, "");
			return lines;
		}
		/**
		* Render the selected range as Markdown with role headers and timestamps.
		* @param messages - chronological share messages (already range-sliced).
		* @param options - labels, optional header meta.
		* @returns one Markdown document.
		*/
		function renderShareMarkdown(messages, options = {}) {
			const labels = labelsOf$1(options);
			const lines = headerLines(labels, options.meta);
			for (const message of messages) lines.push(`**${roleLabel(message.role, labels)}** · ${formatShareTime(message.time)}`, "", message.text, "");
			return lines.join("\n").trimEnd() + "\n";
		}
		/**
		* Render the selected range as plain text with role headers and timestamps.
		* @param messages - chronological share messages (already range-sliced).
		* @param options - labels, optional header meta.
		* @returns one plain-text document (no markup).
		*/
		function renderShareTxt(messages, options = {}) {
			const labels = labelsOf$1(options);
			const lines = headerLines(labels, options.meta).map((line) => line.replace(/^# /, ""));
			for (const message of messages) lines.push(`${roleLabel(message.role, labels)} · ${formatShareTime(message.time)}`, "", message.text, "");
			return lines.join("\n").trimEnd() + "\n";
		}
		/** Escape text for safe inclusion in the generated HTML page. */
		function escapeHtml(text) {
			return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
		}
		/** Render inline markdown (code, bold, italic, links) on already-escaped text. */
		function inline(escaped) {
			const codes = [];
			// v8 ignore next -- every matched token is a captured index, so codes[index] always holds the code text
			return escaped.replace(/`([^`]+)`/g, (_match, code) => {
				codes.push(code);
				return `\u0000${codes.length - 1}\u0000`;
			}).replace(/!\[([^\]]*)\]\([^)]+\)/g, (_match, alt) => `[${alt}]`).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_match, label, href) => `<a href="${href}" rel="noreferrer">${label}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>").replace(/\u0000(\d+)\u0000/g, (_match, index) => `<code>${codes[Number(index)] ?? ""}</code>`);
		}
		/** One `<li>` from a bullet/ordered line's content. */
		function listItem(content) {
			return `<li>${inline(escapeHtml(content.trim()))}</li>`;
		}
		/** Split raw text into blocks and render GFM-lite HTML. */
		function renderGfmHtml(text) {
			const lines = text.split("\n");
			const blocks = [];
			let plain = [];
			const flushPlain = () => {
				if (plain.length === 0) return;
				blocks.push(`<p>${plain.map((line) => inline(escapeHtml(line.trim()))).join("<br />")}</p>`);
				plain = [];
			};
			let index = 0;
			while (index < lines.length) {
				const line = lines[index];
				const trimmed = line.trim();
				if (trimmed === "") {
					flushPlain();
					index += 1;
					continue;
				}
				const fence = /^```([^\n]*)$/.exec(trimmed);
				if (fence !== null) {
					flushPlain();
					const code = [];
					index += 1;
					while (index < lines.length && !/^```\s*$/.test(lines[index].trim())) {
						code.push(lines[index]);
						index += 1;
					}
					index += 1;
					// v8 ignore next -- the fence regex always captures the info string, so the group is defined
					const lang = fence[1]?.trim() ?? "";
					const cls = lang === "" ? "" : ` class="language-${escapeHtml(lang)}"`;
					blocks.push(`<pre><code${cls}>${escapeHtml(code.join("\n").trimEnd())}</code></pre>`);
					continue;
				}
				const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
				if (heading !== null) {
					flushPlain();
					// v8 ignore next -- the `#{1,6}` regex always captures the run, so the group is defined
					const level = Math.min(6, heading[1]?.length ?? 6);
					blocks.push(`<h${level}>${inline(escapeHtml(heading[2].trim()))}</h${level}>`);
					index += 1;
					continue;
				}
				if (trimmed.startsWith(">")) {
					flushPlain();
					const quote = [];
					while (index < lines.length && lines[index].trim().startsWith(">")) {
						quote.push(lines[index].trim().replace(/^>\s?/, ""));
						index += 1;
					}
					blocks.push(`<blockquote><p>${quote.map((q) => inline(escapeHtml(q))).join("<br />")}</p></blockquote>`);
					continue;
				}
				const bullet = /^[-*+]\s+(.+)$/.exec(trimmed);
				if (bullet !== null) {
					flushPlain();
					const items = [listItem(bullet[1])];
					index += 1;
					while (index < lines.length) {
						const next = lines[index].trim();
						const nextBullet = /^[-*+]\s+(.+)$/.exec(next);
						if (nextBullet === null) break;
						items.push(listItem(nextBullet[1]));
						index += 1;
					}
					blocks.push(`<ul>${items.join("")}</ul>`);
					continue;
				}
				const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
				if (ordered !== null) {
					flushPlain();
					const items = [listItem(ordered[1])];
					index += 1;
					while (index < lines.length) {
						const next = lines[index].trim();
						const nextOrdered = /^\d+\.\s+(.+)$/.exec(next);
						if (nextOrdered === null) break;
						items.push(listItem(nextOrdered[1]));
						index += 1;
					}
					blocks.push(`<ol>${items.join("")}</ol>`);
					continue;
				}
				if (trimmed.includes("|") && index + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[index + 1].trim()) && lines[index + 1].includes("-")) {
					flushPlain();
					const splitRow = (row) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
					const header = splitRow(trimmed);
					index += 2;
					const body = [];
					while (index < lines.length && lines[index].trim().includes("|")) {
						body.push(splitRow(lines[index].trim()));
						index += 1;
					}
					const cells = (row, tag) => row.map((cell) => `<${tag}>${inline(escapeHtml(cell))}</${tag}>`).join("");
					blocks.push(`<table><thead><tr>${cells(header, "th")}</tr></thead><tbody>${body.map((row) => `<tr>${cells(row, "td")}</tr>`).join("")}</tbody></table>`);
					continue;
				}
				plain.push(line);
				index += 1;
			}
			flushPlain();
			return blocks.join("\n");
		}
		/**
		* Render the selected range as a self-contained HTML page with GFM-lite
		* body rendering; session images embed as data URIs when provided.
		* @param messages - chronological share messages (already range-sliced).
		* @param options - labels, optional header meta, optional resolved images.
		* @returns a complete HTML document the recipient can open in any browser.
		*/
		function renderShareHtml(messages, options = {}) {
			const labels = labelsOf$1(options);
			const body = messages.map((message) => {
				const imageTags = (message.images ?? []).map((image) => {
					const dataUri = options.images?.get(image.attachmentId);
					return dataUri === void 0 ? `<p class="image-marker">[${escapeHtml(image.name ?? labels.sharedFrom)}]</p>` : `<p class="image"><img src="${dataUri}" alt="${escapeHtml(image.name ?? "")}" loading="lazy" /></p>`;
				}).join("\n");
				return [
					"<section class=\"message\">",
					`<p class="role">${escapeHtml(roleLabel(message.role, labels))} · ${escapeHtml(formatShareTime(message.time))}</p>`,
					message.text !== "" ? renderGfmHtml(message.text) : "",
					imageTags,
					"</section>"
				].join("\n");
			}).join("\n");
			const metaLines = [];
			if (options.meta?.title !== void 0 && options.meta.title !== "") metaLines.push(`<h1>${escapeHtml(options.meta.title)}</h1>`);
			if (options.meta?.model !== void 0 && options.meta.model !== "") metaLines.push(`<p class="meta">Model: ${escapeHtml(options.meta.model)}</p>`);
			metaLines.push(`<p class="meta">${escapeHtml(labels.sharedFrom)}</p>`);
			return [
				"<!doctype html>",
				"<html lang=\"en\">",
				"<head>",
				"<meta charset=\"utf-8\" />",
				"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />",
				"<title>Chat segment</title>",
				"<style>",
				":root { color-scheme: light dark; }",
				"body { font-family: system-ui, -apple-system, \"Segoe UI\", sans-serif; max-width: 820px; margin: 0 auto; padding: 24px 20px 64px; color: #1f2328; line-height: 1.6; }",
				"@media (prefers-color-scheme: dark) { body { color: #e6e6e6; } }",
				".meta { color: #6b7280; font-size: 13px; }",
				".message { margin: 20px 0; }",
				".role { font-weight: 600; }",
				"h1 { font-size: 22px; }",
				"h2 { font-size: 19px; } h3 { font-size: 17px; } h4, h5, h6 { font-size: 15px; }",
				"pre { background: #f6f8fa; padding: 12px; border-radius: 8px; overflow-x: auto; }",
				"@media (prefers-color-scheme: dark) { pre { background: #161b22; } }",
				"code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; }",
				"table { border-collapse: collapse; margin: 8px 0; }",
				"th, td { border: 1px solid #d0d7de; padding: 4px 10px; font-size: 14px; }",
				"blockquote { margin: 8px 0; padding-left: 12px; border-left: 3px solid #d0d7de; color: #57606a; }",
				"img { max-width: 100%; border-radius: 8px; }",
				"p { margin: 8px 0; }",
				"</style>",
				"</head>",
				"<body>",
				"<main>",
				...metaLines,
				body,
				"</main>",
				"</body>",
				"</html>",
				""
			].join("\n");
		}
		/** One safe browser download filename for the shared artifact. */
		function shareFileName(sessionId, from, to, format) {
			const safe = sessionId.replace(/[^A-Za-z0-9_-]/g, "_");
			const extension = format === "html" ? "html" : format === "txt" ? "txt" : format === "png" ? "png" : "md";
			return `dsh-session-chat-share-${safe}-${from + 1}-${to + 1}.${extension}`;
		}
		/**
		* Best-effort redaction for shared artifacts: masks common credential shapes
		* and local absolute/home paths. Applied to message text before rendering.
		* @param text - raw message text.
		* @returns text with sensitive shapes replaced by `[key]` / `[path]`.
		*/
		function redactSensitive(text) {
			return text.replace(/\b(sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,})\b/g, "[key]").replace(/(?:~(?=[/\\]|$)(?:[/\\][^\s"']*)?|(?:\/Users\/[^/\s]+|C:\\Users\\[^\\\s]+)(?:[/\\][^\s"']*)?)/g, "[path]");
		}
		/** Known controller error codes the dialog localizes; anything else is shown raw. */
		const CHAT_SHARE_ERROR = {
			copyFailed: "copy-failed",
			downloadFailed: "download-failed"
		};
		const INITIAL = { bySession: {} };
		/** The share payload route owned by the host half (kept in sync with `SHARE_ROUTE`). */
		const SHARE_ROUTE = "/api/session.share";
		/** Resolve the browser's Host base with the connection carrier's null-origin fallback. */
		function hostBase() {
			const origin = globalThis.location?.origin;
			return origin !== void 0 && origin !== "null" ? origin : "http://dsh.internal";
		}
		function messageOf(error) {
			return error instanceof Error ? error.message : String(error);
		}
		/**
		* Read one session's share payload from the host route.
		* @param sessionId - session whose messages are shared.
		* @param signal - caller cancellation.
		* @returns the parsed payload.
		* @throws when the host route reports a failure.
		*/
		async function fetchSharePayload(sessionId, signal) {
			const url = new URL(SHARE_ROUTE, hostBase());
			url.searchParams.set("sessionId", String(sessionId));
			url.searchParams.set("includeSubagents", "true");
			const response = await fetch(url, {
				method: "GET",
				signal
			});
			if (!response.ok) {
				const detail = await response.text().catch(() => "");
				throw new Error(detail === "" ? `Share failed: HTTP ${response.status}` : detail);
			}
			return await response.json();
		}
		/**
		* Hand a Blob to the browser download manager through an object URL.
		* @param blob - artifact bytes.
		* @param filename - browser download filename.
		*/
		function saveBlob(blob, filename) {
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = filename;
			anchor.click();
			window.setTimeout(() => {
				URL.revokeObjectURL(url);
			}, 1e4);
		}
		/** Apply best-effort redaction to every row's text. */
		function redactRows(rows) {
			return rows.map((row) => ({
				...row,
				text: redactSensitive(row.text)
			}));
		}
		/** Map the payload's inlined images to the data URIs the HTML export embeds. */
		function imageMap(messages) {
			const images = /* @__PURE__ */ new Map();
			for (const message of messages) for (const image of message.images ?? []) if (image.data !== null && !images.has(image.attachmentId)) images.set(image.attachmentId, `data:${image.mediaType};base64,${image.data}`);
			return images;
		}
		/** Project one payload message onto a dialog row. */
		function rowOf(message) {
			return message.images.length === 0 ? {
				seq: message.seq,
				role: message.role,
				text: message.text,
				time: message.time
			} : {
				seq: message.seq,
				role: message.role,
				text: message.text,
				time: message.time,
				images: message.images
			};
		}
		/**
		* Build the dialog rows for one payload, honoring the row options.
		* @param payload - host payload with parent and subagent items.
		* @param includeTools - keep tool-call rows.
		* @param includeSubagents - keep subagent header and child rows.
		* @returns every shareable row in payload order.
		*/
		function shareRows(payload, includeTools, includeSubagents) {
			const rows = [];
			for (const message of payload.messages) {
				if (message.role === "tool" && !includeTools) continue;
				if ((message.role === "subagent" || message.child !== null) && !includeSubagents) continue;
				const row = rowOf(message);
				if (row.text.trim() === "") continue;
				rows.push(row);
			}
			return rows;
		}
		/** Owns one in-flight payload read per Session and publishes dialog state. */
		var ChatShareController = class {
			fetchPayload;
			clipboard;
			save;
			labels;
			toPng;
			/** uSES-safe state source shared by every Session-scoped contribution. */
			store = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)(INITIAL);
			active = /* @__PURE__ */ new Map();
			payloads = /* @__PURE__ */ new Map();
			disposed = false;
			/**
			* @param fetchPayload - host payload reader.
			* @param clipboard - clipboard writer returning whether the write landed.
			* @param save - browser save operation for the generated artifact Blob.
			* @param labels - optional live artifact vocabulary (follows the UI locale).
			* @param toPng - optional rasterizer for PNG downloads.
			*/
			constructor(fetchPayload = fetchSharePayload, clipboard = _deepseek_ai_dsh_client_ui_primitives.writeClipboard, save = saveBlob, labels, toPng) {
				this.fetchPayload = fetchPayload;
				this.clipboard = clipboard;
				this.save = save;
				this.labels = labels;
				this.toPng = toPng;
			}
			/**
			* Open (or reopen) one Session's share dialog; concurrent gestures share one read.
			* @param sessionId - Session whose chat segment is shared.
			* @returns after the dialog state settles (open, loaded, or failed).
			*/
			open(sessionId) {
				const existing = this.active.get(sessionId);
				if (existing !== void 0) return existing.done;
				if (this.disposed) return Promise.resolve();
				const cached = this.store.getSnapshot().bySession[String(sessionId)];
				if (cached !== void 0 && !cached.loading && cached.error === null) {
					this.publish(sessionId, {
						...cached,
						open: true
					});
					return Promise.resolve();
				}
				const abort = new AbortController();
				const done = this.load(sessionId, abort.signal).finally(() => {
					this.active.delete(sessionId);
				});
				this.active.set(sessionId, {
					abort,
					done
				});
				return done;
			}
			/**
			* Save the whole chat as one plain-text file, without opening the dialog.
			* @param sessionId - Session whose chat is saved.
			* @param lastN - keep only the newest n rows; the whole chat when absent.
			* @returns after the browser save starts or the failure is published.
			*/
			async saveTxt(sessionId, lastN) {
				if (this.disposed) return;
				const controller = new AbortController();
				try {
					const all = shareRows(await this.payloadOf(sessionId, controller.signal), true, true);
					const rows = lastN === void 0 || lastN >= all.length ? all : all.slice(all.length - lastN);
					const text = renderShareTxt(redactRows(rows), this.renderOptions());
					const from = Math.max(0, all.length - rows.length);
					this.save(new Blob([text], { type: "text/plain;charset=utf-8" }), shareFileName(String(sessionId), from, Math.max(0, all.length - 1), "txt"));
				} catch (error) {
					const entry = this.store.getSnapshot().bySession[String(sessionId)];
					if (entry !== void 0) this.publish(sessionId, {
						...entry,
						error: messageOf(error)
					});
				}
			}
			/**
			* Close one Session's dialog without cancelling an in-flight read.
			* @param sessionId - Session whose dialog closes.
			*/
			dismiss(sessionId) {
				const current = this.store.getSnapshot().bySession[String(sessionId)];
				if (current === void 0 || !current.open) return;
				this.publish(sessionId, {
					...current,
					open: false
				});
			}
			/**
			* Set the inclusive single-select range.
			* @param sessionId - Session owning the dialog.
			* @param from - start index.
			* @param to - end index.
			*/
			setRange(sessionId, from, to) {
				const current = this.entry(sessionId);
				if (current === void 0) return;
				const last = Math.max(0, current.messages.length - 1);
				const start = Math.min(Math.max(0, Math.min(from, to)), last);
				const end = Math.min(Math.max(0, Math.max(from, to)), last);
				this.publish(sessionId, {
					...current,
					from: start,
					to: end
				});
			}
			/**
			* Choose the artifact format.
			* @param sessionId - Session owning the dialog.
			* @param format - next format.
			*/
			setFormat(sessionId, format) {
				const current = this.entry(sessionId);
				if (current === void 0 || current.format === format) return;
				this.publish(sessionId, {
					...current,
					format
				});
			}
			/**
			* Toggle best-effort redaction.
			* @param sessionId - Session owning the dialog.
			* @param redact - next redaction state.
			*/
			setRedact(sessionId, redact) {
				const current = this.entry(sessionId);
				if (current === void 0 || current.redact === redact) return;
				this.publish(sessionId, {
					...current,
					redact
				});
			}
			/**
			* Toggle tool-call rows.
			* @param sessionId - Session owning the dialog.
			* @param includeTools - next tool-row state.
			*/
			setIncludeTools(sessionId, includeTools) {
				const current = this.entry(sessionId);
				if (current === void 0 || current.includeTools === includeTools) return;
				this.publish(sessionId, this.rebuild(sessionId, current, { includeTools }));
			}
			/**
			* Toggle subagent descendant rows.
			* @param sessionId - Session owning the dialog.
			* @param includeSubagents - next subagent-row state.
			* @returns after the rebuilt rows are published.
			*/
			setIncludeSubagents(sessionId, includeSubagents) {
				const current = this.entry(sessionId);
				if (current === void 0 || current.includeSubagents === includeSubagents) return Promise.resolve();
				this.publish(sessionId, this.rebuild(sessionId, current, { includeSubagents }));
				return Promise.resolve();
			}
			/**
			* Toggle multi-select mode; leaving it clears the selection.
			* @param sessionId - Session owning the dialog.
			* @param multiMode - next mode.
			*/
			setMultiMode(sessionId, multiMode) {
				const current = this.entry(sessionId);
				if (current === void 0 || current.multiMode === multiMode) return;
				const selected = multiMode ? Array.from({ length: current.messages.length }, (_, index) => index).filter((index) => index >= current.from && index <= current.to) : [];
				this.publish(sessionId, {
					...current,
					multiMode,
					selected
				});
			}
			/**
			* Replace the multi-select membership.
			* @param sessionId - Session owning the dialog.
			* @param indices - chosen row indices.
			*/
			setSelected(sessionId, indices) {
				const current = this.entry(sessionId);
				if (current === void 0) return;
				const last = current.messages.length - 1;
				const selected = [...new Set(indices.filter((index) => index >= 0 && index <= last))].sort((a, b) => a - b);
				this.publish(sessionId, {
					...current,
					selected
				});
			}
			/**
			* Copy the selected range in the chosen format.
			* @param sessionId - Session owning the dialog.
			* @returns after the clipboard write settles.
			*/
			async copy(sessionId) {
				const current = this.entry(sessionId);
				if (current === void 0) return;
				this.publish(sessionId, {
					...current,
					busy: "copy",
					copied: false,
					error: null
				});
				try {
					const messages = this.selection(current);
					const text = current.format === "html" ? renderShareHtml(messages, {
						...this.renderOptions(),
						images: imageMap(messages)
					}) : current.format === "txt" ? renderShareTxt(messages, this.renderOptions()) : renderShareMarkdown(messages, this.renderOptions());
					const ok = await this.clipboard(text);
					const next = this.entry(sessionId);
					if (next === void 0) return;
					this.publish(sessionId, ok ? {
						...next,
						busy: null,
						copied: true,
						error: null
					} : {
						...next,
						busy: null,
						error: CHAT_SHARE_ERROR.copyFailed
					});
				} catch (error) {
					const next = this.entry(sessionId);
					if (next === void 0) return;
					this.publish(sessionId, {
						...next,
						busy: null,
						error: messageOf(error) || CHAT_SHARE_ERROR.copyFailed
					});
				}
			}
			/**
			* Download the selected range in the chosen format.
			* @param sessionId - Session owning the dialog.
			* @returns after the browser save starts or the failure is published.
			*/
			async download(sessionId) {
				const current = this.entry(sessionId);
				if (current === void 0) return;
				this.publish(sessionId, {
					...current,
					busy: "download",
					error: null
				});
				try {
					const messages = this.selection(current);
					if (current.format === "png") {
						await this.downloadPng(sessionId, messages, current);
						return;
					}
					const options = current.format === "html" ? {
						...this.renderOptions(),
						images: imageMap(messages)
					} : this.renderOptions();
					const content = current.format === "html" ? renderShareHtml(messages, options) : current.format === "txt" ? renderShareTxt(messages, options) : renderShareMarkdown(messages, options);
					const mime = current.format === "html" ? "text/html;charset=utf-8" : current.format === "txt" ? "text/plain;charset=utf-8" : "text/markdown;charset=utf-8";
					const filename = shareFileName(String(sessionId), current.from, current.to, current.format);
					this.save(new Blob([content], { type: mime }), filename);
					const next = this.entry(sessionId);
					if (next !== void 0) this.publish(sessionId, {
						...next,
						busy: null
					});
				} catch (error) {
					const next = this.entry(sessionId);
					if (next !== void 0) this.publish(sessionId, {
						...next,
						busy: null,
						error: messageOf(error) || CHAT_SHARE_ERROR.downloadFailed
					});
				}
			}
			/**
			* Abort active reads and reach quiescence.
			* @returns after every active operation settles.
			*/
			async dispose() {
				this.disposed = true;
				const active = [...this.active.values()];
				for (const operation of active) operation.abort.abort();
				await Promise.allSettled(active.map((operation) => operation.done));
			}
			async load(sessionId, signal) {
				this.publish(sessionId, {
					open: true,
					loading: true,
					messages: [],
					from: 0,
					to: 0,
					multiMode: false,
					selected: [],
					format: "markdown",
					redact: true,
					includeTools: false,
					includeSubagents: false,
					busy: null,
					copied: false,
					error: null
				});
				try {
					const payload = await this.payloadOf(sessionId, signal);
					if (signal.aborted) return;
					const rows = this.capRows(shareRows(payload, false, false));
					this.publish(sessionId, {
						open: true,
						loading: false,
						messages: rows,
						from: 0,
						to: Math.max(0, rows.length - 1),
						multiMode: false,
						selected: [],
						format: "markdown",
						redact: true,
						includeTools: false,
						includeSubagents: false,
						busy: null,
						copied: false,
						error: null
					});
				} catch (error) {
					if (signal.aborted) return;
					const base = this.entry(sessionId) ?? {
						open: true,
						loading: false,
						messages: [],
						from: 0,
						to: 0,
						multiMode: false,
						selected: [],
						format: "markdown",
						redact: true,
						includeTools: false,
						includeSubagents: false,
						busy: null,
						copied: false,
						error: null
					};
					this.publish(sessionId, {
						...base,
						loading: false,
						error: messageOf(error)
					});
				}
			}
			async payloadOf(sessionId, signal) {
				const cached = this.payloads.get(sessionId);
				if (cached !== void 0) return cached;
				const payload = await this.fetchPayload(sessionId, signal);
				this.payloads.set(sessionId, payload);
				return payload;
			}
			rebuild(sessionId, current, patch) {
				const payload = this.payloads.get(sessionId);
				const includeTools = patch.includeTools ?? current.includeTools;
				const includeSubagents = patch.includeSubagents ?? current.includeSubagents;
				if (payload === void 0) return {
					...current,
					includeTools,
					includeSubagents
				};
				const rows = this.capRows(shareRows(payload, includeTools, includeSubagents));
				return {
					...current,
					includeTools,
					includeSubagents,
					messages: rows,
					from: 0,
					to: Math.max(0, rows.length - 1),
					multiMode: false,
					selected: []
				};
			}
			capRows(rows) {
				return rows.length <= 300 ? [...rows] : rows.slice(rows.length - 300);
			}
			selection(entry) {
				const rows = entry.multiMode ? entry.selected.flatMap((index) => {
					const row = entry.messages[index];
					return row === void 0 ? [] : [row];
				}) : entry.messages.slice(entry.from, entry.to + 1);
				return entry.redact ? redactRows(rows) : [...rows];
			}
			renderOptions() {
				return this.labels === void 0 ? {} : { labels: this.labels() };
			}
			async downloadPng(sessionId, messages, current) {
				if (this.toPng === void 0) throw new Error("PNG export is unavailable on this host.");
				const node = document.createElement("div");
				node.style.position = "fixed";
				node.style.left = "-10000px";
				node.style.top = "0";
				node.style.width = "820px";
				node.innerHTML = renderShareHtml(messages, {
					...this.renderOptions(),
					images: imageMap(messages)
				});
				document.body.appendChild(node);
				try {
					const dataUrl = await this.toPng(node);
					const filename = shareFileName(String(sessionId), current.from, current.to, "png");
					this.save(new Blob([dataUrl], { type: "image/png" }), filename);
					const next = this.entry(sessionId);
					if (next !== void 0) this.publish(sessionId, {
						...next,
						busy: null
					});
				} finally {
					node.remove();
				}
			}
			entry(sessionId) {
				return this.store.getSnapshot().bySession[String(sessionId)];
			}
			publish(sessionId, entry) {
				this.store.update((state) => {
					state.bySession = {
						...state.bySession,
						[String(sessionId)]: entry
					};
				});
			}
		};
		//#endregion
		//#region \0dsh-css:D:\deepseek-harness\packages\session-query\session-chat-share\src\client\Dialog.module.css.mjs
		const css$1 = ".XfqGVG_content{flex-direction:column;gap:12px;min-height:0;display:flex}.XfqGVG_status{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.XfqGVG_controls{flex-wrap:wrap;align-items:flex-end;gap:12px;display:flex}.XfqGVG_rangeControl{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:4px;font-size:13px;display:flex}.XfqGVG_rangeControl select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-elevated);max-width:260px;height:28px;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);border-radius:6px;font-size:13px}.XfqGVG_formatControl{color:var(--dsw-alias-label-secondary);border:none;align-items:center;gap:12px;margin:0;padding:0;font-size:13px;display:flex}.XfqGVG_formatControl legend,.XfqGVG_optionControl legend{margin-bottom:4px;padding:0}.XfqGVG_formatControl label,.XfqGVG_optionControl label{cursor:pointer;align-items:center;gap:4px;display:inline-flex}.XfqGVG_optionControl{color:var(--dsw-alias-label-secondary);border:none;flex-direction:column;gap:6px;margin:0;padding:0;font-size:13px;display:flex}.XfqGVG_messagesHeading{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px}.XfqGVG_list{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;max-height:220px;margin:0;padding:0;list-style:none;overflow-y:auto}.XfqGVG_row{width:100%;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);text-align:left;cursor:pointer;background:0 0;border:none;align-items:center;gap:8px;padding:6px 10px;font-size:13px;line-height:20px;display:flex}.XfqGVG_row:hover{background:var(--dsw-alias-interactive-bg-hover)}.XfqGVG_rowSelected{background:var(--dsw-alias-interactive-bg-active)}.XfqGVG_rowIndex{color:var(--dsw-alias-label-dimmed);font-variant-numeric:tabular-nums;flex:none}.XfqGVG_rowCheck{text-align:center;width:14px;color:var(--dsw-alias-label-primary);flex:none;font-size:12px}.XfqGVG_rowRole{flex:none;font-weight:600}.XfqGVG_rowTool{color:var(--dsw-alias-label-dimmed);font-weight:400}.XfqGVG_rowTime{color:var(--dsw-alias-label-dimmed);flex:none;font-size:12px}.XfqGVG_rowText{text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary);overflow:hidden}.XfqGVG_preview{color:var(--dsw-alias-label-secondary);font-size:13px}.XfqGVG_preview summary{cursor:pointer;user-select:none}.XfqGVG_previewBody{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-elevated);max-height:240px;color:var(--dsw-alias-label-primary);word-break:break-word;border-radius:8px;margin:8px 0 0;padding:10px 12px;font-size:13px;line-height:20px;overflow:auto}.XfqGVG_previewRow{margin:8px 0}.XfqGVG_previewRow:first-child{margin-top:0}.XfqGVG_previewRole{color:var(--dsw-alias-label-secondary);margin-bottom:2px;font-size:12px;font-weight:600;display:block}";
		const tagId$1 = "dsh-session-chat-share/Dialog.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-session-chat-share";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var Dialog_module_css_default = {
			"content": "XfqGVG_content",
			"controls": "XfqGVG_controls",
			"formatControl": "XfqGVG_formatControl",
			"list": "XfqGVG_list",
			"messagesHeading": "XfqGVG_messagesHeading",
			"optionControl": "XfqGVG_optionControl",
			"preview": "XfqGVG_preview",
			"previewBody": "XfqGVG_previewBody",
			"previewRole": "XfqGVG_previewRole",
			"previewRow": "XfqGVG_previewRow",
			"rangeControl": "XfqGVG_rangeControl",
			"row": "XfqGVG_row",
			"rowCheck": "XfqGVG_rowCheck",
			"rowIndex": "XfqGVG_rowIndex",
			"rowRole": "XfqGVG_rowRole",
			"rowSelected": "XfqGVG_rowSelected",
			"rowText": "XfqGVG_rowText",
			"rowTime": "XfqGVG_rowTime",
			"rowTool": "XfqGVG_rowTool",
			"status": "XfqGVG_status"
		};
		//#endregion
		//#region src/client/Dialog.tsx
		/** One line of the range selector and message list. */
		function optionLabel(index, role, time, text) {
			// v8 ignore next -- `split` always yields at least one line, so the first line is never absent
			const firstLine = text.split("\n")[0]?.trim() ?? "";
			const preview = firstLine.length > 48 ? `${firstLine.slice(0, 48)}…` : firstLine;
			return `#${index + 1} ${role} · ${formatShareTime(time)} · ${preview}`;
		}
		/** Map a controller error to localized copy; reader failures keep their raw detail. */
		function errorMessage(error, t) {
			if (error === null) return null;
			if (error === CHAT_SHARE_ERROR.copyFailed) return t("dialog.copyFailed");
			if (error === CHAT_SHARE_ERROR.downloadFailed) return t("dialog.downloadFailed");
			if (error === "") return t("dialog.historyFailed");
			return `${t("dialog.historyFailed")} ${error}`;
		}
		/** Localized chrome the markdown preview's code fences and footnotes read. */
		function markdownLabels(t) {
			return {
				code: {
					copyLabel: t("dialog.markdownCopy"),
					copiedLabel: t("dialog.markdownCopied")
				},
				footnotes: t("dialog.markdownFootnotes")
			};
		}
		/**
		* Modal shared by the Session Header button and this browser's `/share` command.
		* @param props - Session runtime, bound controller state, actions, and localized copy.
		* @returns the modal portal contribution.
		*/
		function ChatShareDialog({ sessionId, useChatShare, setRange, setFormat, setRedact, setIncludeTools, setIncludeSubagents, setMultiMode, setSelected, copy, download, dismiss, t }) {
			const entry = useChatShare((state) => state.bySession[String(sessionId)]);
			const open = entry?.open === true;
			const loading = entry?.loading === true;
			const messages = entry?.messages ?? [];
			const from = entry?.from ?? 0;
			const to = entry?.to ?? 0;
			const multiMode = entry?.multiMode ?? false;
			const selected = entry?.selected ?? [];
			const format = entry?.format ?? "markdown";
			const redact = entry?.redact ?? true;
			const includeTools = entry?.includeTools ?? false;
			const includeSubagents = entry?.includeSubagents ?? false;
			const busy = entry?.busy ?? null;
			const copied = entry?.copied === true;
			const error = entry?.error ?? null;
			const capped = messages.length >= 300;
			const [flashCopied, setFlashCopied] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (!copied) return;
				setFlashCopied(true);
				const timer = window.setTimeout(() => {
					setFlashCopied(false);
				}, 1500);
				return () => {
					window.clearTimeout(timer);
				};
			}, [copied]);
			const roleLabel = (role) => {
				if (role === "user") return t("role.user");
				if (role === "assistant") return t("role.assistant");
				if (role === "tool") return t("role.tool");
				return t("role.subagent");
			};
			const errorText = errorMessage(error, t);
			const clickMessage = (index) => {
				if (multiMode) {
					setSelected(sessionId, selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index]);
					return;
				}
				if (index < from) setRange(sessionId, index, to);
				else if (index > to) setRange(sessionId, from, index);
				else setRange(sessionId, index, index);
			};
			const range = multiMode ? selected.filter((index) => index >= 0 && index < messages.length).map((index) => messages[index]) : messages.slice(from, to + 1);
			const previewText = (text) => redact ? redactSensitive(text) : text;
			const actionsDisabled = busy !== null || messages.length === 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open,
				onClose: () => {
					dismiss(sessionId);
				},
				title: t("dialog.title"),
				description: t("dialog.description"),
				closeLabel: t("dialog.close"),
				// v8 ignore next -- the CSS-module declaration types every class name as a string, so the fallback is unreachable
				contentClassName: Dialog_module_css_default.content ?? "",
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						icon: flashCopied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, {}),
						disabled: actionsDisabled,
						onClick: () => {
							copy(sessionId);
						},
						children: flashCopied ? t("dialog.copied") : t("dialog.copy")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDownloadOutline16, {}),
						disabled: actionsDisabled,
						onClick: () => {
							download(sessionId);
						},
						children: t("dialog.download")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						onClick: () => {
							dismiss(sessionId);
						},
						children: t("dialog.close")
					})
				] }),
				children: [
					loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Dialog_module_css_default.status,
						children: t("dialog.loading")
					}),
					!loading && errorText !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Dialog_module_css_default.status,
						children: errorText
					}),
					!loading && errorText === null && messages.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Dialog_module_css_default.status,
						children: t("dialog.empty")
					}),
					!loading && errorText === null && messages.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: Dialog_module_css_default.controls,
							children: [
								!multiMode && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: Dialog_module_css_default.rangeControl,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("dialog.rangeFrom") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
										value: from,
										disabled: busy !== null,
										onChange: (event) => {
											setRange(sessionId, Number(event.target.value), to);
										},
										children: messages.map((message, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: index,
											children: optionLabel(index, roleLabel(message.role), message.time, message.text)
										}, message.seq))
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: Dialog_module_css_default.rangeControl,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("dialog.rangeTo") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
										value: to,
										disabled: busy !== null,
										onChange: (event) => {
											setRange(sessionId, from, Number(event.target.value));
										},
										children: messages.map((message, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: index,
											children: optionLabel(index, roleLabel(message.role), message.time, message.text)
										}, message.seq))
									})]
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
									className: Dialog_module_css_default.formatControl,
									disabled: busy !== null,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("dialog.format") }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "radio",
											name: `session-chat-share-format-${String(sessionId)}`,
											value: "markdown",
											checked: format === "markdown",
											onChange: () => {
												setFormat(sessionId, "markdown");
											}
										}), t("dialog.format.markdown")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "radio",
											name: `session-chat-share-format-${String(sessionId)}`,
											value: "html",
											checked: format === "html",
											onChange: () => {
												setFormat(sessionId, "html");
											}
										}), t("dialog.format.html")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "radio",
											name: `session-chat-share-format-${String(sessionId)}`,
											value: "txt",
											checked: format === "txt",
											onChange: () => {
												setFormat(sessionId, "txt");
											}
										}), t("dialog.format.txt")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "radio",
											name: `session-chat-share-format-${String(sessionId)}`,
											value: "png",
											checked: format === "png",
											onChange: () => {
												setFormat(sessionId, "png");
											}
										}), t("dialog.format.png")] })
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
									className: Dialog_module_css_default.optionControl,
									disabled: busy !== null,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("options") }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: redact,
											onChange: (event) => {
												setRedact(sessionId, event.target.checked);
											}
										}), t("options.redact")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: includeTools,
											onChange: (event) => {
												setIncludeTools(sessionId, event.target.checked);
											}
										}), t("options.tools")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: includeSubagents,
											disabled: loading,
											onChange: (event) => {
												setIncludeSubagents(sessionId, event.target.checked);
											}
										}), t("options.subagents")] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: multiMode,
											onChange: (event) => {
												setMultiMode(sessionId, event.target.checked);
											}
										}), t("options.multiselect")] })
									]
								})
							]
						}),
						capped && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: Dialog_module_css_default.status,
							children: t("dialog.capNotice")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: Dialog_module_css_default.messagesHeading,
							children: t("dialog.messages")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
							className: Dialog_module_css_default.list,
							children: messages.map((message, index) => {
								const selectedRow = multiMode ? selected.includes(index) : index >= from && index <= to;
								const toolRow = message.role === "tool";
								const subagentRow = message.role === "subagent";
								return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: selectedRow ? `${Dialog_module_css_default.row} ${Dialog_module_css_default.rowSelected}` : Dialog_module_css_default.row,
									"aria-pressed": selectedRow,
									onClick: () => {
										clickMessage(index);
									},
									children: [
										multiMode && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: Dialog_module_css_default.rowCheck,
											"aria-hidden": "true",
											children: selectedRow ? "✓" : ""
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: Dialog_module_css_default.rowIndex,
											children: ["#", index + 1]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: toolRow || subagentRow ? `${Dialog_module_css_default.rowRole} ${Dialog_module_css_default.rowTool}` : Dialog_module_css_default.rowRole,
											children: roleLabel(message.role)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: Dialog_module_css_default.rowTime,
											children: formatShareTime(message.time)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: Dialog_module_css_default.rowText,
											children: message.text.split("\n")[0]
										})
									]
								}) }, message.seq);
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
							className: Dialog_module_css_default.preview,
							open: true,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("dialog.preview") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: Dialog_module_css_default.previewBody,
								children: range.map((message) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: Dialog_module_css_default.previewRow,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: Dialog_module_css_default.previewRole,
										children: [
											roleLabel(message.role),
											" · ",
											formatShareTime(message.time)
										]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MarkdownText, {
										text: previewText(message.text),
										labels: markdownLabels(t)
									})]
								}, message.seq))
							})]
						})
					] })
				]
			});
		}
		//#endregion
		//#region \0dsh-css:D:\deepseek-harness\packages\session-query\session-chat-share\src\client\HeaderAction.module.css.mjs
		const css = ".GUrF3q_shareButton{border:1px solid var(--dsw-alias-border-l2);min-width:96px;height:32px;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);cursor:pointer;background:0 0;border-radius:18px;justify-content:center;align-items:center;gap:4px;padding:6px 12px;font-size:13px;font-weight:400;line-height:20px;display:inline-flex}.GUrF3q_shareButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.GUrF3q_shareButton:disabled{color:var(--dsw-alias-label-dimmed);cursor:wait}.GUrF3q_shareButton span,.GUrF3q_shareButton svg{flex:none}.GUrF3q_shareButton span{white-space:nowrap}";
		const tagId = "dsh-session-chat-share/HeaderAction.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-session-chat-share";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var HeaderAction_module_css_default = { "shareButton": "GUrF3q_shareButton" };
		//#endregion
		//#region src/client/HeaderAction.tsx
		/**
		* Render the Session Header share capsule and its shared range dialog.
		* @param props - Session runtime, share controller, and localized dialog copy.
		* @returns the persistent Header action and Session-scoped dialog.
		*/
		function ChatShareHeaderAction(props) {
			const { sessionId, useChatShare, open, t } = props;
			const loading = useChatShare((state) => state.bySession[String(sessionId)])?.loading === true;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: HeaderAction_module_css_default.shareButton,
				disabled: loading,
				"aria-busy": loading,
				onClick: () => {
					open(sessionId);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("header.label") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconShareOutline16, { size: 12 })]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChatShareDialog, { ...props })] });
		}
		//#endregion
		//#region src/client/index.ts
		/**
		* Browser half of chat-segment share: the Session-header share action and the
		* modal it opens. Rows arrive from the host share route, so this half owns only
		* presentation, format choice, and the browser-side save.
		*/
		/** Required services for the dictionaries and the header-slot contribution. */
		const inject = ["slots", "locale"];
		/** Follow the live UI locale in generated artifacts. */
		function labelsOf(t) {
			return () => ({
				user: t("role.user"),
				assistant: t("role.assistant"),
				tool: t("role.tool"),
				subagent: t("role.subagent"),
				sharedFrom: t("artifact.sharedFrom")
			});
		}
		/** Run a `/share` command intent produced by the host command handler. */
		function runShareIntent(controller, sessionId, resultText) {
			const [verb, flag, count] = resultText.split(":");
			if (verb !== "share") return;
			if (flag === "txt") {
				const lastN = count === void 0 || count === "" ? void 0 : Number(count);
				controller.saveTxt(sessionId, Number.isFinite(lastN) ? lastN : void 0);
			} else controller.open(sessionId);
		}
		/**
		* Provide the share controller and mount its dialog into the Session Header.
		* @param ctx - browser context carrying slots and locale services.
		*/
		function apply(ctx) {
			const controller = new ChatShareController(void 0, void 0, void 0, labelsOf(ctx.locale.bind(NS)), (node) => (0, import_lib.toPng)(node, {
				pixelRatio: 2,
				cacheBust: true
			}));
			ctx.provide("chatShare", controller);
			ctx.effect(() => async () => {
				await controller.dispose();
			}, "session-chat-share: browser lifecycle");
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "session-chat-share: browser dictionaries");
			ctx.on("command/executed", (sessionId, commandName, result) => {
				if (commandName === "share" && result.kind === "success") runShareIntent(controller, sessionId, result.text ?? "share");
			});
			ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
				name: "conversation.session.header.utilities",
				id: "session-chat-share",
				locale: NS,
				inject: () => ({
					hooks: { chatShare: controller.store },
					open: (sessionId) => controller.open(sessionId),
					setRange: (sessionId, from, to) => {
						controller.setRange(sessionId, from, to);
					},
					setFormat: (sessionId, format) => {
						controller.setFormat(sessionId, format);
					},
					setRedact: (sessionId, redact) => {
						controller.setRedact(sessionId, redact);
					},
					setIncludeTools: (sessionId, includeTools) => {
						controller.setIncludeTools(sessionId, includeTools);
					},
					setIncludeSubagents: (sessionId, includeSubagents) => controller.setIncludeSubagents(sessionId, includeSubagents),
					setMultiMode: (sessionId, multiMode) => {
						controller.setMultiMode(sessionId, multiMode);
					},
					setSelected: (sessionId, indices) => {
						controller.setSelected(sessionId, indices);
					},
					copy: (sessionId) => controller.copy(sessionId),
					download: (sessionId) => controller.download(sessionId),
					dismiss: (sessionId) => {
						controller.dismiss(sessionId);
					}
				})
			}, ChatShareHeaderAction));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map