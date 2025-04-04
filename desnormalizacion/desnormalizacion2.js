db.invoices.insertOne({
    "invoiceNumber": "0001",
    "date": "2025-02-01",
    "customer": {
        "identificationNumber": "",
        "firstName": "Pepe",
        "lastName": "Pardo",
        "place": {
            "address": "Cl. 25 # 35 - 01",
            "city": "Barranquilla",
            "state": "Atlántico"
        }
    },
    "seller": {
        "identificationNumber": "10002",
        "firstName": "Juanita",
        "lastName": "La del Barrio"
    },
    "details": [
        {
            "itemNumber": 1,
            "productId": ObjectId("0001"),
            "price": 30,
            "quantity": 10,
            "observation": "Enviar en cajas separadas"
        },
        {
            "itemNumber": 2,
            "productId": ObjectId("0002"),
            "price": 45,
            "quantity": 12
        }
    ]

})

db.products.insertMany([
    {
        "code": "2-0023-D",
        "name": "Teclado inalámbrico",
        "price": 50
    },
    {
        "code": "4-0023-D",
        "name": "Cable red UTP RJ45",
        "price": 5
    }
])

db.runCommand({
    collMod: "products",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["code", "name", "price"],
            properties: {
                code: {
                    bsonType: "string"
                },
                name: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "number",
                    minimum: 0
                }
            }
        }
    }

}
)

db.runCommand({
    collMod: "invoices",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["invoiceNumber", "date", "customer", "seller", "details"],
            properties: {
                date: {
                    bsonType: "date"
                },
                customer: {
                    bsonType: "object",
                    required: ["identificationNumber", "firstName", "lastName", "place"],
                    properties: {
                        identificationNumber: {
                            bsonType: "string"
                        },
                        firstName: {
                            bsonType: "string"
                        },
                        lastName: {
                            bsonType: "string"
                        },
                        place: {
                            bsonType: "object"
                        }
                    }
                },
                seller: {
                    bsonType: "object",
                    required: ["identificationNumber", "firstName", "lastName"],
                    properties: {
                        identificationNumber: {
                            bsonType: "string"
                        },
                        firstName: {
                            bsonType: "string"
                        },
                        lastName: {
                            bsonType: "string"
                        }
                    }
                },
                details: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["itemNumber", "price", "quantity"],
                        properties: {
                            itemNumber: {
                                bsonType: "number"
                            },
                            price: {
                                bsonType: "number",
                                minimum: 0
                            },
                            quantity: {
                                bsonType: "number",
                                minimum: 0
                            },
                            observation: {
                                bsonType: "string"
                            }
                        }
                    }
                }
            }
        }
    }

}
)