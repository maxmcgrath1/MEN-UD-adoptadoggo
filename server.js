const express = require('express');
const app = express();
const dogsController = require('./controllers/dogs_controller.js')
const methodOverride = require('method-override');

const PORT = 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'))

app.use('/dogs', dogsController)

app.use((req, res, next) => {    
    console.log("I'm running for another new route")
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});

// Routes
app.get("/", function(req, res) {
    res.send("I am the internet and I am doing things!")
})
        
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});
        
app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});
