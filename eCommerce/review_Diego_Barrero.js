/////////////////////////////////////////////////////////////////////////////////
///User
/////////////////////////////////////////////////////////////////////////////////


// crear un usuario
firstName = "Diego";
lastName = "Barrero";
idNumber = "AB11103234";
idType = "PASSPORT";
email = "diego@gmail.com";
phone = "322643888";
password = "Viva.La%Veg#987";
city = "Bucaramanga";
country = "Colombia";
addres = "vereda";
zipCode = "721523";
userType = ["A", "C"];
active = true;
registredDate = new Date();

// Aqui estan las variables en filita para no copiarlas una por una xd
firstName = "Diego", lastName = "Barrero", idNumber = "AB11103234", idType = "PASSPORT", email = "diego@gmail.com", phone = "322643888", password = "Viva.La%Veg#987", city = "Bucaramanga", country = "Colombia", addres = "vereda", zipCode = "721523", userType = ["A", "C"], active = true, registredDate = new Date();

db.users.insertOne(
    {
        "firstName":firstName,
        "lastName": lastName,
        "idNumber": idNumber,
        "idType": idType,
        "eMail": email, // (regex),
        "phone": phone, // (regex),
        "password": password, // (regex),
        "place":{
            "city": city,
            "country": country,
            "addres": addres,
            "zipCode": zipCode,
        },
        "userType": userType, //A/C
        "active": active,
        "registredDate": registredDate,
        }
)


//Hace una especie de validacion en la que si no se cumple el regex se elimina la cuenta.
db.users.deleteMany({eMail: {$not: {$regex: /^[\w]{3,}[@][\w]{3,}[.][\w]{1,3}$/}}});
db.users.deleteMany({phone: {$not: {$regex: /^[0-9]{9}$/}}});
db.users.deleteMany({password: {$not:{$regex: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#?!@$%^&*\-])/}}});


//Hacer un log In
userEmail = "diego@gmail.com", userPassword = "Viva.La%Veg#987"
db.users.find({$and: [{"eMail" : userEmail},{"password": userPassword}]})? true : false 


//Actualizar algun dato
//Aqui cambia las variables dependiendo de que quiere cambiar -->
userIdNumber = "AB11103234", dataToUpdate = "firstName", newData = "Maria"; 
db.users.updateOne({idNumber: userIdNumber}, {$set: {[dataToUpdate] : newData}})


//Cambiar el estado del usuario
userIdNumber = "AB11103234", newState = false
db.users.updateOne({idNumber: userIdNumber}, {$set: {active: newState}})


//Quitar el rol de Admin al usuario
userIdNumber = "AB11103234"
db.users.updateOne({idNumber: userIdNumber}, {$pull: {userType : "A"}})

//Agregar el rol de Admin al usuario
userIdNumber = "AB11103234"
db.users.updateOne({idNumber: userIdNumber}, {$addToSet: {userType : "A"}});



/////////////////////////////////////////////////////////////////////////////////
///Product
/////////////////////////////////////////////////////////////////////////////////

// Crear un producto nuevo
productCode = "001"; 
productName= "arroz"; 
description= "Es arroz nmms xd";
imagen= "https://imagenes/unafotoDB).jpg";
price= 1500, stock= 100; 
brand= "diana";
condition = "new";
active = true;
vat = 0.12;
sales= 722

// Aqui estan las variables en filita para no copiarlas una por una xd
productCode = "001", productName= "arroz", description= "Es arroz nmms xd", imagen= "https://imagenes/unafotoDB).jpg", price= 1500, stock= 100, brand= "diana", condition = "new", active = true , vat = 0.12, sales= 722

db.products.insertOne({
    "productCode": productCode,
    "productName": productName,
    "description": description,
    "imagen": imagen,
    "price": price,
    "stock": stock,
    "brand": brand,
    "condition": condition,
    "active": active,
    "vat": vat,
    "sales": sales
})

//Mostrar productos por orden de ventas
db.products.aggregate({$sort: {sales: -1}})

//Filtro de productos que sean nuevos


//Filtro de productos por marca y que cuesten menos de 2000
db.products.aggregate([
    {$match : {brand: "diana", price: {$lte: 2000}}}
])

//Mostrar todos los productos con el stock que les queda
db.products.find({},{_id: 0, productCode: 1, productName: 1, stock: 1})

//Cambiar el estado del producto
productIdNumber = "001", newState = false
db.products.updateOne({productCode: productIdNumber}, {$set: {active: newState}})

//Cambiar algun dato
productIdNumber = "001", dataToUpdate = "price", newData = "2001"
db.products.updateOne({productCode: productIdNumber}, {$set: {[dataToUpdate] : newData}})

//Vender un producto
productIdNumber = "001", cuantity = 5;
db.products.updateOne({productCode: productIdNumber}, {$inc: {sales: cuantity}})



/////////////////////////////////////////////////////////////////////////////////
///Payment method
/////////////////////////////////////////////////////////////////////////////////

//Agregar metodo de pago
paymentCode= "P001";
paymentName= "PSE";
active= true;

paymentCode= "P001", paymentName= "PSE", active= true;

db.paymentMethod.insertOne({
    "paymentCode": paymentCode,
    "paymentName": paymentName,
    "active": active
})

//Cambiar el estado del metodo de pago
paymentNumber = "P001", newState = false;
db.paymentMethod.updateOne({paymentCode: paymentNumber}, {$set: {active: newState}})

/////////////////////////////////////////////////////////////////////////////////
///sales
/////////////////////////////////////////////////////////////////////////////////

reference= "SN300";
date = new Date();
paymentMethod= "P001";
client= "AB11103234";
seller= "unkown";
details= [{product: "001", quantity: 10, price:1500}];

reference= "SN300", date = new Date(), paymentMethod= "P001", client= "AB11103234", seller= "unkown", details= [{product: "001", quantity: 10, price:1500}];

db.sales.insertOne(
    {
        "reference": reference,
        "date": date,
        "paymentMethod": paymentMethod,
        "client": client,
        "seller": seller,
        "details": details
    }
)

//Cambiar los valores de los detalles
db.sales.updateOne(
    {"details.product": "001"}, 
    {$set: { "details.$.quantity": 20}} 
  )


/////////////////////////////////////////////////////////////////////////////////
///Categories
/////////////////////////////////////////////////////////////////////////////////

//Agregar nueva categoria
categoryCode= "C001";
categoryName= "grain";
active= true;

categoryCode= "C001", categoryName= "grain", active= true;

db.categories.insertOne({
    "categoryCode": categoryCode,
    "categoryName": categoryName,
    "active": active
})

//Cambiar el estado de la categoria
categoryCode = "C001", newState = false;
db.categories.updateOne({categoryCode: categoryCode}, {$set: {active: newState}})


/////////////////////////////////////////////////////////////////////////////////
///Roles
/////////////////////////////////////////////////////////////////////////////////


db.createRole({
    role: "readAccess",
    privileges: [
        {
            resource: { db: "eCommerce", collection: "" },
            actions: [ "find" ]
        }
    ],
    roles: []
})

db.createRole({
    role: "writeAccess",
    privileges: [
        {
            resource: { db: "eCommerce", collection: "" },
            actions: [ "update" ]
        }
    ],
    roles: []
})

db.createRole({
    role: "dbDesigner",
    privileges: [
        {
            resource: { db: "eCommerce", collection: "" },
            actions: [ "find", "insert", "update", "drop" ]
        }
    ],
    roles: []
})

db.createUser(
    {
       user: "softwareDev1", 
       pwd: "Soft*123",     
       roles: [       
          { role: "readAccess", db: "eCommerce" },
       ]
    }
 )

 db.grantRolesToUser (
    "softwareDev1",[{role:"writeAccess",db:"eCommerce"}]
    )

db.createUser(
    {
       user: "dataBaseDesigner1", 
       pwd: "dbDes1*123",     
       roles: [       
          { role: "dbDesigner", db: "eCommerce" },
       ]
    }
 )


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
