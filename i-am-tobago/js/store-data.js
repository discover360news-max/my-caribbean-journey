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
      hours: '11 am - 6 pm'
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
      hours: null
    },
    {
      name: "Heritage Haven: Books and Things",
      nation: 'tobago',
      address: "Esplanade",
      city: 'Scarborough, Tobago',
      phone: "1 (868) 290 7055",
      website: null,
      instagram: null,
      facebook: "https://www.facebook.com/p/Heritage-Haven-Books-and-Things-61566368980246/",
      hours: null
    },
    {
      name: "Gumbs Bookstore",
      nation: 'tobago',
      address: "Unit 32 E Teck Mall, Sangster's Hill",
      city: 'Scarborough, Tobago',
      phone: "1 (868) 639 4608",
      website: null,
      instagram: null,
      facebook: null,
      hours: null
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
      hours: null
    },

    //Trinidad Locations - add more details when possible
    {
      name: 'Metropolitan Book Suppliers',
      nation: 'trinidad',
      address: "12 Ariapita Avel",
      city: 'Port of Spain, Trinidad',
      phone: "1 (868) 467 9947",
      website: null,
      instagram: null,
      facebook: "https://www.facebook.com/metropolitanbookstt",
      hours: null
    }
  ]
};
