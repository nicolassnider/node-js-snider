db.countries.find().pretty().explain("executionStats");

db.countries.find({ code: "CH" });

db.countries.find({ $eq: "EC" }); //equals

db.countries.find({ $ne: "EC" }); //notequals

db.countries.find({ code: "CO", name: "colombia" });

db.countries.find(
    {
        $and:
        [
            {
                code:"CO"
            },
            {
                name:
                {
                    $ne:"Chile"
                }
            }
        ]
    })

db.countries.find(
    {
        $and:
        [
            {
                code:"CO"
            },
            {
                name:
                {
                    $eq:"Chile"
                }
            }
        ]
    })

db.countries.find(
    {
        $or:
        [
            {
                code:"CO"
            },
            {
                name:
                {
                    $eq:"Ecuador"
                }
            }
        ]
    })



