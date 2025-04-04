


/////////////////////////////////////////////////////////////////////////////////
///Validations
/////////////////////////////////////////////////////////////////////////////////




// db.createCollection("user", {
//     validator: {
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["email", "password"],
//             additionalProperties: false,
//             properties: {
//                 name: {
//                     bsonType: "string"
//                 },
//                 lastName: {
//                     bsonType: "string"
//                 },
//                 email: {
//                     bsonType: "string"
//                 },
//                 password: {
//                     bsonType: "string",
//                     minLenght: 5,
//                     maxLenght: 15,
//                     pattern: "^[A-Za-z0-9]{8,}$"
//                 },
//                 status: {
//                     bsonType: "string",
//                     enum: ["activo", "inactivo", "pendiente"]
//                 },
//                 age: {
//                     bsonType: "int",
//                     minimum: 18,
//                     maximum: 99
//                 },
//                 talla: {
//                     bsonType: "array",
//                     uniqueItems: true,
//                     items: {
//                         bsonType: "string"
//                     }
//                 },
//             }
//         }
//     }
    
// }
// )


db.runCommand({
    collMod: "users",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "idNumber", "idType", "eMail", "password", "place"],
            properties: {
                firstName: {
                    bsonType: "string"
                },
                lastName: {
                    bsonType: "string"
                },
                idNumber: {
                    bsonType: "string"
                },
                idType: {
                    bsonType: "string",
                    enum: ["cc", "ti", "ce"]
                },
                email: {
                    bsonType: "string",
                    pattern: /^[\w]{3,}[@][\w]{3,}[.][\w]{1,3}$/
                },
                password: {
                    bsonType: "string",
                    minLenght: 5,
                    maxLenght: 15,
                    pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#?!@$%^&*\-])/
                },
                place: {
                    bsonType: "object",
                    properties: {
                        city: {
                            bsonType: "string"
                        }
                    }
                },
                active: {
                    bsonType: "bool"
                },
                userType: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "string"
                    }
                },
                phone: {
                    bsonType: "string",
                    pattern: /^[0-9]{9}$/
                },
                registredDate: {
                    bsonType: "date"
                }
            }
        }
    }

}
)

db.runCommand({
    collMod: "products",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["productCode", "productName", "brand", "price", "vat", "description"],
            properties: {
                productCode: {
                    bsonType: "string",
                    minLenght: 3,
                    maxLenght: 3
                },
                productName: {
                    bsonType: "string"
                },
                description: {
                    bsonType: "string"
                },
                brand: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "double",
                    minimum: 0
                },
                vat: {
                    bsonType: "double",
                    minimum: 0
                },
                active: {
                    bsonType: "bool"
                },
                stock: {
                    bsonType: "int",
                    minimum: 0
                },
                sales: {
                    bsonType: "int",
                    minimum: 0
                }
            }
        }
    }

}
)


db.runCommand({
    collMod: "paymentMethod",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["paymentMethod", "paymentName"],
            properties: {
                paymentMethod: {
                    bsonType: "string",
                    minLenght: 4,
                    maxLenght: 4
                },
                paymentName: {
                    bsonType: "string"
                },
                active: {
                    bsonType: "bool"
                }
            }
        }
    }

}
)

db.runCommand({
    collMod: "sales",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["reference", "paymentMethod", "date", "client", "seller"],
            properties: {
                reference: {
                    bsonType: "string",
                    minLenght: 5,
                    maxLenght: 5
                },
                paymentName: {
                    bsonType: "string",
                    minLenght: 4,
                    maxLenght: 4
                },
                date: {
                    bsonType: "date"
                },
                client: {
                    bsonType: "string",
                },
                client: {
                    bsonType: "string",
                },
                details: {
                    bsonType: "array",
                    items: {
                        bsonType: "object"
                    }
                },
            }
        }
    }

}
)


db.runCommand({
    collMod: "categories",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["categoryCode", "categoryName"],
            properties: {
                categoryCode: {
                    bsonType: "string",
                    minLenght: 4,
                    maxLenght: 4
                },
                categoryName: {
                    bsonType: "string"
                },
                active: {
                    bsonType: "bool"
                }
            }
        }
    }

}
)
