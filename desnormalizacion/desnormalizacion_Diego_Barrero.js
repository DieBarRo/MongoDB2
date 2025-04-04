db.pacientes.insertMany([
    {
        "codigoPaciente": "1000",
        "nombre": "jacinto",
        "apellido": "Buenavista",
        vivienda: {
            "dirección": "CALLE 1 # 1 – 1",
            "ciudad": "SPRINTFIELD",
            "departamento": "CUNDINAMARCA"
        },
        "telefono": "3502525123"
    }
])

db.doctores.insertMany([
    {
        "codigoDoctor": "3001",
        "nombre": "juan",
        "apellido": "Mata Lozano",
    }
])

db.consultas.insertMany([
    {
        "fecha": "01/02/25",
        "codigoDoctor": "3001",
        "codigoPaciente": "1000",
        "apellido": "Mata Lozano",
        "IPS": "Salud Fatal",
        "consultorio": "102",
        "diagnostico": {
            enfermedad: "virus del mono",
            sintomas: [
                "tos aguda",
                "fiebre",
                "dolor de cabeza"
            ],
            tratamiento: [
                {
                    medicamento: "paracetamol",
                    cantidad: 12,
                    dosis: "2 pildoras diarias",
                    tiempoTratamiento: "7 Dias"
                },
                {
                    medicamento: "Mieltertos",
                    cantidad: 1,
                    dosis: "1 cucharada",
                    tiempoTratamiento: "30 Dias"
                },
                {
                    medicamento: "acetaminofen",
                    cantidad: 28,
                    dosis: "1 pastilla cada 6 horas",
                    tiempoTratamiento: "7 Dias"
                }
            ]
        }
    }
])


