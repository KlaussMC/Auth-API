const HTTP = require('http');

const API = require('./api.js');
const {
	get,
	post,
	put,
	del
} = API;

const methods = {
	get(req, res) {
		res.write(format((get[req.method](req.args)) || "undefined"));
	},
	post(req, res) {
		res.write(format((post[req.method](req.args)) || "undefined"));
	},
	put(req, res) {
		res.write(format((put[req.method](req.args)) || "undefined"));
	},
	del(req, res) {
		res.write(format((del[req.method](req.args)) || "undefined"));
	}
}

let server = HTTP.createServer((req, res) => {

	const {
		get,
		post,
		put,
		del
	} = methods;

	try {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
		switch (req.method) {
			case "GET":
				get(parseURL(req.url), res);
				break;
			case "POST":
				post(parseURL(req.url), res);
				break;
			case "PUT":
				put(parseURL(req.url), res);
				break;
			case "DELETE":
				del(parseURL(req.url), res);
				break
			default:
				res.writeHead(500)
				res.write(`Unused HTTP method: '${req.method}'`);
		}
	} catch (e) {
		res.writeHead(404)
		res.write(`Unknown function ${req.method}:${req.url.split('/').pop()}`)
	}

	res.end();
}).listen(3000, e => {
	if (e) throw e;
	else console.log("listening");
});

let parseURL = url => {
	let tmpParams = url.split('?'),
		path = tmpParams.shift(),
		method = path.split('/').pop().toLowerCase(),
		params = {};

	tmpParams.forEach(p => {
		let s = p.split('=')
		params[s[0]] = s[1]
	})

	return {
		path,
		method,
		params
	}
}

let format = str => {
	return JSON.stringify(typeof str != "object" ? {
		output: str
	} : { ...str
	}) // thanks beautify. love ya (🤢)
}