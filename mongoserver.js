const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// set up express
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({origin:'http://localhost:3000'}))
app.listen(port, () => console.log(`Listening on port ${port}!`))

// set up mongoDB to use flashcards database
const mongoDB = 'mongodb://localhost/flashcards';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// connect to mongoDB
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection Error!'));

// Make schema and model for the flash cards
const flashCardSchema = new mongoose.Schema({
        name: String,
        cards: [{
                prompt: String,
                target: String
  }]     
});

const flashCardModel = mongoose.model('FlashCard', flashCardSchema );

// store the flash cards on the database when saved
app.post('/', function (req, res) {
        //save the info to the dabase
        const flashCardsName = req.query.name;
        const data = req.query.data.split(',');
        console.log('name is: ',flashCardsName);
        console.log('data is: ',data);
        const parsedCards = data.map((item,index) => {
                const pair = item.split(':');
                return(
                        {    
                                prompt: pair[0],
                                target: pair[1]
                        }

                )        
        })

        var cardsToSave = new flashCardModel({
                name: flashCardsName,
                cards: parsedCards
        })
        
        cardsToSave.save((err) => {
                if (err) {
                        console.error(err);
                        res.send({message:"There was an error while saving your cards in the database!"})
                }
                res.send({message:"Your flash cards were saved sucessfully!"});
        });
});

app.get('/', function (req, res) {
        //get the info from the database 
        //and send back a list of the flash card collections
        flashCardModel.find({},"name",(err,cards) => {
                if (err){
                        console.error(err);
                        res.send({message: 'There was an error getting the names from the database!'});
                }

                res.send(cards);
        });
});

app.get('/cards', function (req, res) {
        //get the info from the database 
        //and send back a list of the flash cards
        const name = req.query.name;
        flashCardModel.find({name:name},(err,cards) => {
                if (err){
                        console.erro(err);
                        res.send({message: 'There was an error getting the flashcards from the database'})
                }
                console.log(cards);
                res.send(cards)
        });
});



