const Router = require("../lib/router");
const Koa =require("koa");
const router = new Router();
const app = new Koa();
router.get("/", (ctx) => {
	ctx.status =200;
	ctx.body = "Hello World!";
})
	.get("/users", (ctx) => {
		ctx.status =200;
		ctx.body="hello users";
	})
	.put("/users/:id", (ctx) => {
		const {id} = ctx.pramas;
		ctx.body=`put id=${id}`;
	})
	.delete("/users/:id", (ctx) => {
		const {id} = ctx.pramas;
		ctx.body=`del id=${id}`;
	});


app.use(router.routes());
app.listen(1000);