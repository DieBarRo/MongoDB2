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
            _id: $invoiceNumber
        }
    }

])