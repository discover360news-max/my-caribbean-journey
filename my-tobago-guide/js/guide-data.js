// ===========================================
// MY TOBAGO GUIDE - Directory Data
// Add new links and categories here.
// ===========================================

var GUIDE_DATA = {
  categories: [
    {
      id: 'food-recipes',
      label: 'Food & Recipes',
      icon: '\uD83C\uDF7D\uFE0F',
      note: 'Tobago food is a journey in itself — from crab and dumpling to curry goat. These are the spots and resources I trust for the real thing.'
    },
    {
      id: 'beaches-nature',
      label: 'Beaches & Nature',
      icon: '\uD83C\uDFD6\uFE0F',
      note: null
    },
    {
      id: 'culture-history',
      label: 'Culture & History',
      icon: '\uD83D\uDCD6',
      note: null
    },
    {
      id: 'accommodation',
      label: 'Accommodation',
      icon: '\uD83C\uDFE0',
      note: null
    },
    {
      id: 'activities-tours',
      label: 'Activities & Tours',
      icon: '\uD83E\uDD3F',
      note: null
    },
    {
      id: 'radio',
      label: 'Local Radio',
      icon: '\uD83D\uDCFB', // radio emoji
      note: 'Local stations and live streams from Tobago'
    },
    {
      id: 'practical-info',
      label: 'Practical Info',
      icon: '\uD83D\uDCCB',
      note: null
    }
  ],
  links: [
    {
      title: 'This Bago Girl',
      description: 'Authentic Tobagonian recipes, food culture, and kitchen stories straight from the island. A beautiful resource for anyone craving a taste of home.',
      url: 'https://thisbagogirl.com',
      category: 'food-recipes',
      featured: true
    },
    {
      title: 'Radio Tambrin',
      description: 'Listen to local Tobago radio — music, news and community programming.',
      url: 'https://tambrintobago.com/',
      embedPage: 'https://streema.com/radios/Radio_Tambrin',
      category: 'radio',
      featured: false
    }
  ]
};
