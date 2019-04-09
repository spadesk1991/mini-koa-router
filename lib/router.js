const Layer = require("./layer");

function Router(opt){
// 容纳layer
	this.stack=[];
	const methods= [
		"get",
		"post",
		"delelte",
		"patch",
		"put",
		"head",
		"options",
	];

	methods.forEach(function(method){
		Router.prototype[method] = function(path,middleware){
			this.register(path,[method],middleware);
			return this;
		};
	},this);

	Router.prototype.register=function(path,methods,middleware){
		let stack =this.stack;
		let route = new Layer(path,methods,middleware);
		stack.push(route);
		return route;
	};
	Router.prototype.match=function(path,method){
		const layers = this.stack;
		let layer;

		const matched={
			path:[],
			pathAndMethod:[],
			route:false,
		};
		for(var len=layers.length,i=0;i<len;i++){
			layer =layers[i];
			// layer.path为路由注册时注册的路径,layer.regxp 为路径对应的的正则表达式
			if (layer.match(path)){ // 匹配传入的路径
				matched.path.push(layer);
				if (layer.methods.length===0||~layer.methods.indexOf(method)){
					matched.pathAndMethod.push(layer);
					if (layer.methods.length) matched.route =true;
				}
			}
		}
		return matched;
	};

	Router.prototype.routes=function(){
		var router =this;
		const dispath=function dispath(ctx,next){
			const path =ctx.path;
			const method = ctx.method;
			const matched = router.match(path,ctx.method);
			if (!matched.route)return next();
			const matchedLayers=matched.pathAndMethod;
			return matchedLayers[0].stack[0](ctx,next);
		};
		return dispath;
	};
}
module.exports =Router;