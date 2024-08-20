const express = require("express")
const path = require("path");
const app = express();
const hbs = require("hbs");


require("./db/conn");

const Register = require('./models/registers');
const exp = require("constants");
const { register } = require("module");

const port = process.env.port || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);



// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, resp) => {
    resp.render("index")
    // resp.send("Some technical issue  website start in few year")

});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});



app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                username,
                email: req.body.email,
                password,
                confirmpassword: req.body.confirmpassword
            })

            const registered = await registerEmployee.save();
            // res.status(201).render("index");
            res.send(registered)
        } else {
            res.send("password is not matching")
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.send('Error registering user');
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Register.findOne({ username: username });
        if (!user) {
            return res.send("username not found");
        }
        const pass = await Register.findOne({ password: password });

        if (user.username == username && pass.password == password) {
            res.send(`welcome ${username} profile`)
        }
      
    }
    catch (e) {
        res.send(e)
    }



})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})