db.invoices.aggregate([
    { $match: { invoiceNumber: 1}},
    { $unwind: "$details"},
    {
        $lookup: {
            from: "products",
            localField: "details.productId",
            foreignField: "code",
            as: "details.product",
        }
    },
    {
        $addFields: { "details.totalPerProduct":
          { $multiply: [ "$details.price", "$details.quantity"] } }
    },
    {
        $project: { "details.productId": 0, "details.product.price": 0, "details.product._id": 0}
    },
])

db.invoices.aggregate([
    { $match: { invoiceNumber: 1}},
    { $unwind: "$details"},
    {
        $lookup: {
            from: "products",
            localField: "details.productId",
            foreignField: "code",
            as: "details.product",
        }
    },
    {
        $addFields: { "details.totalPerProduct":
          { $multiply: [ "$details.price", "$details.quantity"] } }
    },
    {
        $project: { "details.productId": 0, "details.product.price": 0, "details.product._id": 0}
    },
    {
        $group: {
            _id: {invoiceNumber: "$invoiceNumber", date: "$date", customer: "$customer", seller: "$seller"}, details: { $push: "$details"} 
        }
    },
    {
        $project: { _id: 0, invoiceNumber: "$_id.invoiceNumber", date: "$_id.date", customer: "$_id.customer", seller: "$_id.seller", details: 1}
    }
])