// acmeStore

[
    { $match: { date: "03-01-2025" }},
    { $project: { product: 1, quantity: 1}},
    { $group: { _id: "$product", totalQuantity: { $sum: "$quantity"} }}
]


[
    { $project: { product: 1, quantity: 1, price: 1}},
    { $group: { _id: "$product", totalQuantity: { $sum: { $multiply: [ "$price", "$quantity"]}} }}
]

// acme_school2

// codigo nombre y promedio

// [
//     { $project: { courses: 1 }},
//     { $unwind: "$courses" },
//     { $group: { 
//         _id: { code: "$courses.code", name: "$courses.name"},
//         average: { $avg: "$courses.grade" }}
//     },
//     { $project: { _id: 0, code: "$_id.code", name: "$_id.name", average: 1 }},
//     { $sort: { code: 1 }}
// ]

// [
//     { $project: { courses: 1 }},
//     { $unwind: "$courses" },
//     { $group: { 
//         _id: { code: "$courses.code", name: "$courses.name"}}
//     },
//     { $project: { _id: 0, code: "$_id.code", name: "$_id.name"}},
//     { $sort: { code: 1 }}
// ]

// db.students.aggregate()

db.createCollection("courses")

db.courses.insertMany(db.students.aggregate([
    { $project: { courses: 1 }},
    { $unwind: "$courses" },
    { $group: { 
        _id: { code: "$courses.code", name: "$courses.name"}}
    },
    { $project: { _id: 0, code: "$_id.code", name: "$_id.name"}},
    { $sort: { code: 1 }}
]).toArray())



db.students.find().forEach(function(doc) {
    db.students.updateOne(
        { _id: doc._id },
        { $set: { name: "value" } }
    );
});


db.students.aggregate([
    {
        "$project": { code: 1, name: 1, identificationType: 1}
    },
    {
        "$lookup": {
            "from": "identificationTypes",
            "localField": "identificationType",
            "foreignField": "_id",
            "as": "identificationType"
        }
    },
    {
        "$unwind": "$identificationType"
    },
    {
        "$project": { _id: 0, code: 1, name: 1, identificationCode: "$identificationType.code", identificationName: "$identificationType.name"}
    }
])