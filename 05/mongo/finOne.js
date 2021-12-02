db.products.findOne({price:9.99}) //null
db.products.findOne({price:19.99})

db.products.findOne({$or:[
    {name:"Flutter"},
    {price:{
        $gt:19.99
    }}
]}) //primero trae flutter

db.products.find({},{_id:0}) //sin id
db.products.find({},{_id:0,price:0}) //sin id, nombre

