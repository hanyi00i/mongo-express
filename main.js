const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"my-mongodb+srv-connection-string",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);
	const user = await User.login(req.body.username, req.body.password);
	if (user.username == req.body.username ) {
		res.json({
			_id: '123456',
			name: 'test',
			email: ' ',
			age: 18,
		})
	} else {
		res.send("Login Failed");
	}
})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password);
	if (user.username == req.body.username ) {
		res.json({
			_id: '123456',
			name: 'test',
			email: ' ',
			age: 18,
		})
	} else {
		res.send("Register Failed");
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
