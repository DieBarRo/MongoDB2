[
    '{{repeat(20)}}',
    {
      invoiceNumber: '{{index(1)}}',
      date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
      customer: {
        identificationNumber: "{{index(100)}}",
        firstName: '{{firstName()}}',
        lastName: '{{surname()}}',
        place: {
          address: '{{integer(100, 999)}} {{street()}}',
          city: '{{city()}}',
          state: '{{state()}}'
        }
      },
      seller: {
        identificationNumber: "{{index(100)}}",
        firstName: '{{firstName()}}',
        lastName: '{{surname()}}',
      },
      details: [
        '{{repeat(1, 4)}}',
        {
          id: '{{index(1)}}',
          productId: '{{random("2-0023-D", "2-0023-D", "5-0023-D", "1-0023-D", "3-0023-D")}}',
          price: '{{integer(20000, 250000)}}',
          quantity: '{{integer(1, 20)}}',
        }
      ]
    }
  ]