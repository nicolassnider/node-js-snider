/*
mongo
use data_base
show collections
 */
db.countries.insert({
    name:"Ecuador",
    code:"EC"
})

db.countries.insert({
    name:"Colombia",
    code:"CO"
})

db.countries.insert(
    [
        {
            name:"Peru",
            code:"PE"
        },
        {
            name:"Chile",
            code:"CO"
        },
        {
            name:"Mexico",
            code:"MX"
        },
    ]
    )

db.countries.find()

