db.insertOne({
    "numFactura": "5555",
    "fecha": "2025-10-01",
    "cliente": {
        "identificacion": "555555",
        "nombre": "Yusepe",
        "Email": "Yuesepe@hotmail.com"
    },
    "items": [
        { "producto": "arroz", "cantidad": 2, "valor": 15000 },
        { "producto": "yuca", "cantidad": 5, "valor": 100 },
        { "producto": "papa", "cantidad": 3, "valor": 500 },
        { "producto": "azucar", "cantidad": 2, "valor": 200 }
    ],
    "banco": ObjectId("555555555")
})