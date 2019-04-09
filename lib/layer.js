const pathToRegExp = require("path-to-regexp");

function Layer(path,methods,middleware){
	// 存放方法名称
	this.methods=[];
	// 存放中间件
	this.stack=Array.isArray(middleware) ?middleware:[middleware];
	// 路径
	this.path = path;
	this.regxp = pathToRegExp(path);

	methods.forEach(function(method){
		this.methods.push(method.toUpperCase()); // 放入大写方法名
	},this);

	Layer.prototype.match = function(path){
		return this.regxp.test(path);
	};

}

module.exports=Layer;