//nueva collection
db.products.insert(
    [
        {
            name:"Flutter",
            price:19.99
        },
        {
            name:"Node.js",
            price:19.99,
            note:"Great"
        },
    ]
)

db.products.find({
    price:{$gt:19.99}
})

db.products.find({
    price:{$gte:19.99}
})
