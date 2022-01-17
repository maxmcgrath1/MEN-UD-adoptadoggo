const express = require('express');
const router = express.Router();
const dogs = require('../models/dogs_model.js')

router.get('/', (req, res) => {
    
    const allDogs = dogs.find();
    const context = { dogs: allDogs };
    res.render('index.ejs', context);

});

router.post('/', (req, res) => {
    dogs.create(req.body, (error, createdDog) => {
        if(error) console.log(error);
        console.log(createdDog);


        res.redirect("/dogs");
    })
})

router.get("/new", function(req, res) {
    res.render("new.ejs")
})

router.get('/:dogId', (req, res) => {
    
    dogs.findById(req.params.dogId, (error, foundDog) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
        res.render('show.ejs', {dog: foundDog});
    });
    
});

router.delete('/:dogId', (req, res) => {
    dogs.findByIdAndDelete(req.params.dogId, (error, deleteDog) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteDog);
        res.redirect('/dogs')
    })
})

router.get('/:dogId/edit', (req, res) => {
    dogs.findById(req.params.dogId, (error, updatedDog) => {
        if(error) console.log(error);

        console.log(updatedDog);
        res.render('edit.ejs', { dog: updatedDog})
    })
})

router.put('/:dogId', (req, res) => {
    console.log(`The request is ${req}`)

    dogs.findByIdAndUpdate(req.params.dogId, req.body,(error, updatedDog) => {
        if (error) return console.log(error);

        console.log(updatedDog);

        return res.redirect(`/dogs`);
    });
});

module.exports = router;