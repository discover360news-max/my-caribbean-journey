// ===========================================
// I AM TOBAGO - Physical Store Locations
// Add or update stores here.
// Only fields with a value will be shown on the card.
// Set unused fields to null.
// ===========================================

var STORE_DATA = {
  nations: [
    { id: 'us',       label: 'United States', flag: '\uD83C\uDDFA\uD83C\uDDF8' },
    { id: 'tobago',   label: 'Tobago',        flag: '\uD83C\uDDF9\uD83C\uDDF9' },
    { id: 'trinidad', label: 'Trinidad',      flag: '\uD83C\uDDF9\uD83C\uDDF9' }
  ],
  stores: [

    //Tobago Locations - add more details when possible
    {
      name: "Aimee's Bohemian Jewelry & Imports",
      nation: 'us',
      address: '2610 Sutherland Avenue',
      city: 'Knoxville, TN',
      phone: '+1 865 546 2333',
      website: null,
      instagram: null,
      facebook: 'https://www.facebook.com/aimees.bohemian',
      hours: 'Mon-Sat - 11am - 6pm',
      plusCode: 'X23R+M7 Knoxville, Tennessee, USA'   // e.g. 'VJ29+M5 Knoxville, Tennessee'
    },
    {
      name: "Nelson's Bookstore",
      nation: 'tobago',
      address: "Port Mall | Corner Milford Rd & Sangster's Hill",
      city: 'Scarborough, Tobago',
      phone: "1 (868) 660 7506",
      website: null,
      instagram: null,
      facebook: null,
      hours: 'Mon-Fri 9am - 5pm <br> Sat - 9am - 2pm',
      plusCode: '57J4+6WC Scarborough, Trinidad and Tobago'   // e.g. '7P29+QF Scarborough, Tobago'
    },
    {
      name: "Heritage Haven: Books and Things",
      nation: 'tobago',
      address: "13C Milford Road | Esplanade",
      city: 'Scarborough, Tobago',
      phone: "1 (868) 290 7055",
      website: null,
      instagram: null,
      facebook: "https://www.facebook.com/p/Heritage-Haven-Books-and-Things-61566368980246/",
      hours: '9am - 5pm',
      plusCode: '57J5+JH Scarborough, Trinidad and Tobago'   // e.g. '7P29+QF Scarborough, Tobago'
    },
    {
      name: "Gumbs Bookstore",
      nation: 'tobago',
      address: "Unit 32 ETeck Mall, Sangster's Hill",
      city: 'Scarborough, Tobago',
      phone: "1 (868) 639 4608",
      website: null,
      instagram: null,
      facebook: null,
      hours: null,
      plusCode: '57M6+84H Scarborough, Trinidad and Tobago'   // e.g. '7P29+QF Scarborough, Tobago'
    },
    {
      name: "Shore Things Café & Craft",
      nation: 'tobago',
      address: "25 Old Milford Rd",
      city: 'Lambeau, Tobago',
      phone: "1 (868) 635 1072",
      website: null,
      instagram: null,
      facebook: "https://www.facebook.com/shorethingstobago",
      hours: 'Tue-Fri - 11am - 6pm <br> Sat - 8am - 3pm',
      plusCode: '568V+67J Lambeau, Trinidad and Tobago'   // e.g. 'XXXX+XX Lambeau, Tobago'
    },

    //Trinidad Locations - add more details when possible
    {
      name: 'Metropolitan Book Suppliers',
      nation: 'trinidad',
      address: "12 Ariapita Ave",
      city: 'Port of Spain, Trinidad',
      phone: "1 (868) 467 9947",
      website: 'http://metrobookstt.com/',
      instagram: null,
      facebook: "https://www.facebook.com/metropolitanbookstt",
      hours: 'Mon-Fri - 8am - 4:30pm <br> Sat - 9am - 2:30pm',
      plusCode: 'MF5J+CF Port of Spain, Trinidad and Tobago'   // e.g. 'XXXX+XX Port of Spain, Trinidad'
    }
  ]
};
