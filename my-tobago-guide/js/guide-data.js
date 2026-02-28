// ===========================================
// MY TOBAGO GUIDE - Directory Data
// Add new links and categories here.
//
// Link fields:
//   title       (required) Display name
//   description (required) Short description
//   url         (required) External link
//   category    (required) Must match a category id
//   area        (required) e.g. 'island-wide', 'scarborough', 'crown-point'
//   featured    (optional) true = gold border highlight
//   image       (optional) Path relative to /my-tobago-guide/ e.g. 'images/this-bago-girl.jpg'
//   embedPage   (optional) Secondary stream/embed URL (adds Visit + Stream buttons)
//   live        (optional) false = hidden from directory
//   tags        (optional) Array of hidden search keywords — synonyms, local terms, vibes, activity types.
//               Use lowercase strings. These are never shown on the card.
//               Example: tags: ['roti', 'curry', 'street food', 'cheap eats', 'vegetarian friendly']
// ===========================================

var GUIDE_DATA = {
  categories: [
    {
      id: 'food-recipes',
      label: 'Food & Recipes',
      icon: '\uD83C\uDF7D\uFE0F',
      note: 'Tobago food is a journey in itself \u2014 from crab and dumpling to curry goat. These are the spots and resources I trust for the real thing.'
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
      icon: '\uD83D\uDCFB',
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

    // ─── Food & Recipes ───────────────────────────────────────────────

    {
      title: 'This Bago Girl',
      description: 'Authentic Tobagonian recipes, food culture, and kitchen stories straight from the island. A beautiful resource for anyone craving a taste of home.',
      url: 'https://thisbagogirl.com',
      category: 'food-recipes',
      area: 'island-wide',
      featured: true,
      tags: [
        'recipes', 'cooking', 'local food', 'tobagonian cuisine', 'food culture', 'home cooking',
        'blog', 'crab and dumpling', 'pelau', 'callaloo', 'provisions', 'creole', 'traditional',
        'blue food', 'dasheen', 'ground provision', 'curry', 'oil down', 'stew', 'cook up',
        'fish broth', 'macaroni pie', 'bake', 'saltfish', 'coconut', 'island recipes'
      ]
    },
    {
      title: 'Shore Things Cafe & Craft',
      description: 'Stunning Seaside Cafe & Craft Shop overlooking the Atlantic. Desserts \u2022 Lunch \u2022 Culture \u2022 Craft.',
      url: 'https://www.facebook.com/shorethingstobago',
      category: 'food-recipes',
      area: 'speyside',
      featured: false,
      tags: [
        'cafe', 'lunch', 'desserts', 'seaside', 'craft', 'shop', 'gifts', 'souvenirs',
        'art', 'dining', 'ocean view', 'atlantic', 'speyside', 'scenic', 'east tobago',
        'coffee', 'sweet treats', 'cultural', 'local crafts'
      ]
    },
    {
      title: 'Tobago Chocolate Delights',
      description: "Tobago Chocolate Delight's is the only bean to bar Artisan Chocolate Shop in Tobago.",
      url: 'https://www.facebook.com/tobagochocolatedelights/',
      category: 'food-recipes',
      area: 'scarborough',
      featured: true,
      tags: [
        'chocolate', 'artisan chocolate', 'bean to bar', 'craft chocolate', 'cacao', 'cocoa',
        'sweets', 'gifts', 'souvenirs', 'local produce', 'shop', 'treats', 'unique',
        'food gift', 'scarborough', 'handmade', 'premium', 'dark chocolate'
      ]
    },
    {
      title: "Kerry's Nice & Sweet Treats",
      description: 'Delicious homemade treats and baked goods from a local Tobagonian family. A sweet taste of home.',
      url: 'https://kerrysniceandsweettreats.com/',
      category: 'food-recipes',
      area: 'island-wide',
      featured: false,
      tags: [
        'baked goods', 'homemade', 'sweets', 'treats', 'cakes', 'pastries', 'desserts',
        'local', 'family business', 'sweet bread', 'black cake', 'sorrel', 'pone',
        'kurma', 'sugar cake', 'toolum', 'local sweets', 'tobagonian'
      ]
    },
    {
      title: "Rena's Roti Shop",
      description: "The roti is the best in Tobago, delicious and I'd give 6 stars if I could. Would recommend the potato and chickpea curry to anybody looking to try.",
      url: 'https://www.tripadvisor.com/Restaurant_Review-g147393-d4887660-Reviews-Rena_Chatack_Roti_Shop-Scarborough_Tobago_Trinidad_and_Tobago.html',
      category: 'food-recipes',
      area: 'scarborough',
      featured: false,
      tags: [
        'roti', 'curry', 'chickpea', 'potato', 'local food', 'street food', 'affordable',
        'budget', 'cheap eats', 'trini food', 'trinidadian', 'indian', 'wrap', 'dhalpuri',
        'paratha', 'buss up shut', 'vegetarian friendly', 'lunch', 'scarborough', 'best roti'
      ]
    },
    {
      title: "Sharon and Phebe's",
      description: 'A great welcome from Sharon, a nice feel to the place, and excellent food. Strongly recommended, very much worth the visit.',
      url: 'https://www.tripadvisor.com/Restaurant_Review-g1463485-d4052249-Reviews-Sharon_and_Phebe_s-Charlotteville_Tobago_Trinidad_and_Tobago.html',
      category: 'food-recipes',
      area: 'charlotteville',
      featured: false,
      tags: [
        'restaurant', 'dining', 'local food', 'charlotteville', 'recommended', 'authentic',
        'friendly', 'homestyle', 'north east tobago', 'lunch', 'dinner', 'creole'
      ]
      // ⚠️ FLAG FOR QUINCY: Not sure of the specific cuisine type here — seafood? creole? mixed?
      // Please confirm so we can add more specific tags (e.g. 'seafood', 'fish', 'crab')
    },

    // ─── Beaches & Nature ─────────────────────────────────────────────

    {
      title: 'Store Bay Beach',
      description: 'A beautiful beach with clear waters and a relaxed atmosphere. Perfect for swimming and sunbathing.',
      url: 'http://www.storebay.tt/',
      category: 'beaches-nature',
      area: 'crown-point',
      featured: false,
      tags: [
        'beach', 'swimming', 'sunbathing', 'clear water', 'calm sea', 'family friendly',
        'accessible', 'crown point', 'food stalls', 'local food', 'crab and dumpling',
        'nylon pool', 'glass bottom boat', 'snorkeling', 'relaxed', 'budget', 'free',
        'sunset', 'near airport', 'popular beach', 'lifeguard'
      ]
    },
    {
      title: 'Pigeon Point Heritage Park',
      description: 'A heritage park with historical significance and beautiful natural surroundings.',
      url: 'http://www.pigeonpoint.tt/',
      category: 'beaches-nature',
      area: 'crown-point',
      featured: true,
      tags: [
        'beach', 'heritage', 'park', 'pier', 'thatched roof', 'iconic', 'photography',
        'swimming', 'snorkeling', 'calm water', 'entry fee', 'scenic', 'crown point',
        'caribbean beach', 'postcard', 'wedding', 'instagram', 'turquoise water',
        'white sand', 'famous beach', 'boat trips', 'nylon pool', 'clear water'
      ]
    },
    {
      title: 'Shurland Nature Park',
      description: 'A beautiful nature park with walking trails and scenic views.',
      url: 'https://www.tripadvisor.com/Attraction_Review-g147392-d12918544-Reviews-Shurland_Nature_Park-Tobago_Trinidad_and_Tobago.html',
      category: 'beaches-nature',
      area: 'scarborough',
      featured: false,
      tags: [
        'nature', 'hiking', 'trails', 'walking', 'scenic', 'views', 'park', 'outdoors',
        'birdwatching', 'flora', 'fauna', 'peaceful', 'scarborough', 'green', 'garden'
      ]
      // ⚠️ FLAG FOR QUINCY: Limited info on this one — is it good for birdwatching specifically?
      // Any standout features worth tagging (waterfall, lookout point, etc.)?
    },
    {
      title: 'Corbin Local Wildlife',
      description: 'A local wildlife area with diverse flora and fauna.',
      url: 'https://tobagowildlife.org/',
      category: 'beaches-nature',
      area: 'scarborough',
      featured: false,
      tags: [
        'wildlife', 'birdwatching', 'birding', 'nature', 'hiking', 'outdoors',
        'conservation', 'rainforest', 'trails', 'flora', 'fauna', 'animals',
        'eco', 'sustainable', 'scarborough', 'forest', 'naturalist'
      ]
    },

    // ─── Culture & History ────────────────────────────────────────────

    {
      title: 'Tobago Events and Festivals',
      description: 'Discover the vibrant cultural events and festivals that take place throughout Tobago.',
      url: 'https://tobagofestivalscommission.com/',
      category: 'culture-history',
      area: 'island-wide',
      featured: false,
      tags: [
        'events', 'festivals', 'heritage festival', 'goat race', 'carnival', 'culture',
        'music', 'community', 'calendar', 'what\'s on', 'things to do', 'entertainment',
        'tobago heritage', 'folk', 'steel pan', 'soca', 'calypso', 'parang', 'traditional',
        'easter', 'crab and dumpling festival', 'food festival', 'regatta', 'dive festival'
      ]
    },
    {
      title: 'Tobago Heritage Conservation Society',
      description: "Preserving and promoting Tobago's cultural and natural heritage.",
      url: 'https://www.facebook.com/THCStobago',
      category: 'culture-history',
      area: 'island-wide',
      featured: false,
      tags: [
        'heritage', 'conservation', 'culture', 'history', 'preservation', 'community',
        'folklore', 'traditions', 'ole time', 'old time', 'ancestors', 'legacy',
        'tobagonian identity', 'plantation history', 'african heritage', 'indigenous',
        'research', 'education', 'museum'
      ]
    },

    // ─── Accommodation ────────────────────────────────────────────────

    {
      title: 'LuxStay Tobago',
      description: 'Luxury accommodations in Tobago with stunning views and top-notch amenities.',
      url: 'https://luxstaytobago.com/',
      category: 'accommodation',
      area: 'island-wide',
      featured: false,
      tags: [
        'luxury', 'upscale', 'high end', 'views', 'premium', 'holiday rental',
        'vacation rental', 'amenities', 'pool', 'modern', 'stylish'
      ]
      // ⚠️ FLAG FOR QUINCY: Is LuxStay a villa rental platform, a boutique hotel, or apartments?
      // Tagging more precisely (e.g. 'villa', 'hotel', 'self catering') would help a lot here
    },
    {
      title: 'Pint-Size Paradise',
      description: 'A charming and cozy alternative to traditional Tobago hotels.',
      url: 'https://pintsizeparadise.com/',
      category: 'accommodation',
      area: 'island-wide',
      featured: false,
      tags: [
        'boutique', 'cozy', 'charming', 'small', 'intimate', 'unique', 'affordable',
        'holiday rental', 'vacation rental', 'alternative', 'guesthouse', 'peaceful'
      ]
      // ⚠️ FLAG FOR QUINCY: What type of accommodation exactly — guesthouse, villa, studio, cabin?
      // And is it island-wide (multiple properties) or one specific location?
    },
    {
      title: 'Castara Retreats',
      description: 'A charming and cozy accommodation in Tobago with a unique character.',
      url: 'https://castararetreats.com/',
      category: 'accommodation',
      area: 'castara',
      featured: false,
      tags: [
        'castara', 'retreat', 'eco', 'eco friendly', 'sustainable', 'nature', 'secluded',
        'peaceful', 'romantic', 'boutique', 'beachfront', 'cottage', 'rainforest',
        'off the beaten track', 'village', 'authentic', 'swim', 'quiet', 'couples',
        'honeymoon', 'remote', 'lush', 'community tourism'
      ]
    },
    {
      title: 'Kariwak Village Holistic Haven',
      description: "A peaceful oasis in the heart of Crown Point, a stone's throw from the beach.",
      url: 'https://kariwak.com/',
      category: 'accommodation',
      area: 'crown-point',
      featured: false,
      tags: [
        'holistic', 'wellness', 'spa', 'yoga', 'organic', 'garden', 'restaurant',
        'peaceful', 'crown point', 'near beach', 'boutique hotel', 'pool', 'romantic',
        'eco friendly', 'meditation', 'couples', 'healthy food', 'retreat',
        'quiet', 'nature', 'cabins', 'lush gardens', 'award winning'
      ]
    },

    // ─── Activities & Tours ───────────────────────────────────────────

    {
      title: 'Frankie Tours and Rentals',
      description: 'A local tour and rental company offering guided tours and vehicle rentals in Tobago.',
      url: 'https://www.facebook.com/profile.php?id=100076162752587',
      category: 'activities-tours',
      area: 'island-wide',
      featured: true,
      tags: [
        'tours', 'car rental', 'vehicle rental', 'guided tour', 'island tour', 'transfers',
        'taxi', 'sightseeing', 'local guide', 'private tour', 'jeep', 'rental',
        'airport transfer', 'custom tour', 'day trip', 'affordable', 'local', 'trusted'
      ]
    },
    {
      title: 'Island Girl Tours',
      description: 'Experience pristine beaches, remarkable waterfalls, stunning nature hikes, bird watching, diving, water sports and activities, local cuisine and a vibrant nightlife\u2026 there is something for everyone.',
      url: 'https://islandgirltours.com/',
      category: 'activities-tours',
      area: 'island-wide',
      featured: false,
      tags: [
        'tours', 'guided tour', 'beaches', 'waterfalls', 'hiking', 'hike', 'birdwatching',
        'birding', 'diving', 'scuba', 'snorkeling', 'water sports', 'kayaking', 'fishing',
        'local cuisine', 'food tour', 'nightlife', 'island tour', 'sightseeing',
        'adventure', 'day trip', 'group tour', 'private tour', 'main ridge', 'argyle waterfall',
        'nylon pool', 'glass bottom boat', 'all inclusive', 'things to do'
      ]
    },

    // ─── Radio ────────────────────────────────────────────────────────

    {
      title: 'Radio Tambrin',
      description: 'Listen to local Tobago radio \u2014 music, news and community programming.',
      url: 'https://tambrintobago.com/',
      embedPage: 'https://streema.com/radios/Radio_Tambrin',
      category: 'radio',
      area: 'island-wide',
      featured: false,
      tags: [
        'radio', 'music', 'news', 'soca', 'calypso', 'local', 'community', 'live stream',
        'online radio', 'entertainment', 'listen', 'steel pan', 'chutney', 'parang',
        'tobago radio', 'local news', 'current affairs', 'culture', 'stream'
      ]
    },

    // ─── Practical Info ───────────────────────────────────────────────

    {
      title: 'ANR Robinson International Airport',
      description: 'The main airport serving Tobago, with flights to and from Trinidad and other Caribbean destinations.',
      url: 'https://tntairports.com/anr-robinson-international-airport/',
      category: 'practical-info',
      area: 'crown-point',
      featured: false,
      tags: [
        'airport', 'flights', 'arrivals', 'departures', 'ANR', 'crown point', 'fly',
        'caribbean airlines', 'transport', 'getting here', 'travel', 'trinidad',
        'international', 'flight schedule', 'landing', 'air travel', 'plane'
      ]
    },
    {
      title: 'Inter-Island Ferry',
      description: 'The main ferry service connecting Tobago to Trinidad and other islands.',
      url: 'https://www.ttitferry.com/',
      category: 'practical-info',
      area: 'scarborough',
      featured: true,
      tags: [
        'ferry', 'boat', 'trinidad', 'port of spain', 'transport', 'sea bridge',
        'schedule', 'tickets', 'inter-island', 'getting here', 'scarborough port',
        'sailing', 'passenger ferry', 'vehicle ferry', 'crossing', 'budget travel',
        'overnight ferry', 'sea travel', 'affordable'
      ]
    },
    {
      title: 'Public Transportation Schedule',
      description: 'The public transportation schedule for Tobago, including bus and taxi services.',
      url: 'https://ptsc.co.tt/routes-and-schedules/',
      category: 'practical-info',
      area: 'island-wide',
      featured: false,
      tags: [
        'bus', 'taxi', 'maxi taxi', 'ptsc', 'transport', 'getting around', 'schedule',
        'routes', 'public transit', 'cheap', 'budget', 'local transport', 'timetable',
        'scarborough', 'crown point', 'affordable', 'commute', 'travel'
      ]
    },
    {
      title: 'Currency Exchange Rate: USD to TTD',
      description: 'Current exchange rates for the Trinidad and Tobago Dollar (TTD).',
      url: 'https://www.google.com/search?q=USD+to+TTD',
      category: 'practical-info',
      area: 'island-wide',
      featured: false,
      tags: [
        'currency', 'exchange rate', 'money', 'TTD', 'USD', 'dollars', 'TT dollars',
        'banking', 'conversion', 'finance', 'budget', 'travel money', 'cash',
        'how much', 'cost of living', 'prices', 'GBP', 'CAD', 'euro'
      ]
    }
  ]
};
