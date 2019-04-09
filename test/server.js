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
	});
// .put("/users/:id", (ctx, next) => {
// 	// ...
// })
// .del("/users/:id", (ctx, next) => {
// 	// ...
// })
// .all("/users/:id", (ctx, next) => {
// 	// ...
// });

app.use(router.routes());
app.listen(1000);