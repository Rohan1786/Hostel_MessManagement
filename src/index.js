const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
// Your other file

const { LogInCollection, PaymentCollection } = require("./mongo");

// Now you can use LogInCollection and PaymentCollection in this file

const { name } = require("ejs")
const { error } = require("console")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))




const tempelatePath = path.join(__dirname, '../views')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine','ejs');


app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('choose')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
});
app.get('/admin', (req, res) => {
    res.render('admin')
});

app.get('/payment',(req,res)=>{
    res.render('payment')
})


// app.get("/get",(req,res)=>{
//     LogInCollection.find()
//     .then(logincollections=>res,json())
//     .catch(err=>res.json(err));

// })
app.get('/mess', async (req, res) => {
    try {
        const messId = req.params.id;
        const mess = await MessCollection.findById(messId);
        res.render('mess', { mess });
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/payment', async (req, res) => {
    try {
        const data = new PaymentCollection({
            name: req.body.name,
            email: req.body.email,
            amount: req.body.amount
        });

        await data.save();

        const paymentData = await PaymentCollection.find({ name: req.body.name, amount: req.body.amount });

        if (paymentData.length > 0) {
            res.render('payment_details', { paymentData });
        } 
        else {
            res.send("Data not found in the database.");
        }
    } catch (error) {
        res.send("Wrong inputs or an error occurred.");
    }
});



// app.post('/signup', async (req, res) => {
    
//     const data = new LogInCollection({
//         name: req.body.name,
//         email:req.body.email,
//         password: req.body.password
       
//     });
//     await data.save();

   
    

//     const checking = await LogInCollection.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.render('home')
//     }
//     else{
//         await LogInCollection.insertMany([data])
//     }
//    }
//    catch{
//     res.send("wrong inputs")
//    }

//     res.status(201).render("home", {
//         naming: req.body.name
//     })
// })

app.post('/signup', async (req, res) => {
    const data = new LogInCollection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await data.save();

    const users = await LogInCollection.find();

    try {
        if (users.some(user => user.name === req.body.name && user.password === req.body.password)) {
            res.render('home', { naming: req.body.name });
            app.get("/student",(req,res)=>{
                res.render('student', { users });
            })
            // res.render('student', { users });
        } else {
            res.render('student', { users });
        }
    } catch (error) {
        res.send("An error occurred: " + error.message);
    }
});



app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
            
        }


    }
    
    catch (e) {

        res.send("wrong details");
        

    }


})


app.post('/admin', (req, res) => {

    try {
        
        // const check ={ name: "rohan" }

        // if (check.password === "123") {
        //     res.status(201).render("home", { naming: `${'123'}+${name}` })
        // }
        const name=document.querySelector('#name');
        const pass=document.querySelector('#pass');
        if(name=="rohan"&&pass=="1234"){
            res.send("hello")
        }

        else {
            res.send("incorrect password")
            
        }


    }
    
    catch (e) {

        res.render("wrong details");
        

    }


})

// app.get("/payment_details",(req,res)=>{
//     res.render('payment_details')
// })

app.get("/admin_main",(req,res)=>{
    res.render("admin_main")
})
// app.get("/student",(req,res)=>{
//     res.render("student");
// })
// app.get("/mess",(req,res)=>{
//     res.render("mess")
// })

app.listen(port, () => {
    console.log('port connected');
});