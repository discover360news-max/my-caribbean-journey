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
//   quincyNote  (optional) Quincy's personal take — shown in the listing tray
//   coords      (optional) [lat, lng] — powers the mini map in the listing tray
//   featured    (optional) true = gold border highlight
//   image       (optional) Path relative to /my-tobago-guide/ e.g. 'images/this-bago-girl.jpg'
//   embedPage   (optional) Secondary stream/embed URL (adds Visit + Stream buttons)
//   live        (optional) false = hidden from directory
//   plusCode    (optional) Google Plus Code for this location — enables a "Get Directions" link.
//               Find a Plus Code at plus.codes or Google Maps (right-click a location -> copy Plus Code).
//               Example: plusCode: '3HGQ+P8 Scarborough, Tobago'
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

    // --- Food & Recipes ---

    {
      title: 'This Bago Girl',
      description: 'Authentic Tobagonian recipes, food culture, and kitchen stories straight from the island. A beautiful resource for anyone craving a taste of home.',
      url: 'https://thisbagogirl.com',
      category: 'food-recipes',
      area: 'island-wide',
      quincyNote: 'The recipe site I point people to when they want real Tobago cooking. Every dish is the genuine thing — crab and dumpling, callaloo, oil down, cook up. If this is your first time with Tobagonian food, start here.',
      featured: true,
      image: 'images/this-bago-girl.webp',
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
      plusCode: '568V+67J Lambeau, Trinidad and Tobago',
      coords: [11.2978, -60.5491],
      quincyNote: 'Way out east in Speyside, overlooking the Atlantic — one of the most beautiful views you\'ll eat in front of on this island. Good lunch, good desserts, and the craft shop carries pieces you won\'t find anywhere else on the island.',
      featured: false,
      image: 'images/shore-things.webp',
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
      plusCode: '568V+67J Lambeau, Trinidad and Tobago',
      coords: [11.1852, -60.7401],
      quincyNote: 'One bean-to-bar chocolate shop on the whole island — this is it. They grow the cacao, make the bars, and the flavour is nothing like anything you\'ll find on a shelf. Take some home. It\'s the kind of gift people actually remember.',
      featured: true,
      image: 'images/tobago-chocolate-delights.webp',
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
      area: 'whim-estate',
      plusCode: '57W3+HG5 Orange Hill, Trinidad and Tobago',
      coords: [11.2082, -60.7099],
      quincyNote: 'This is a family business and you can taste it. The black cake, the pone, the sweet bread — made the way they\'re supposed to be. If you want the real Tobago sweet side, Kerry\'s is it.',
      featured: false,
      image: 'images/kerrys-nice-and-sweet-treats.webp',
      tags: [
        'baked goods', 'homemade', 'sweets', 'treats', 'cakes', 'pastries', 'desserts',
        'local', 'family business', 'sweet bread', 'black cake', 'sorrel', 'pone',
        'kurma', 'sugar cake', 'toolum', 'local sweets', 'tobagonian', 'whim estate', 'catering'
      ]
    },
    {
      title: "Rena's Roti Shop",
      description: "The roti is the best in Tobago, delicious and I'd give 6 stars if I could. Would recommend the potato and chickpea curry to anybody looking to try.",
      url: 'https://www.tripadvisor.com/Restaurant_Review-g147393-d4887660-Reviews-Rena_Chatack_Roti_Shop-Scarborough_Tobago_Trinidad_and_Tobago.html',
      category: 'food-recipes',
      area: 'scarborough',
      plusCode: '57M5+4QQ, Scarborough, Trinidad & Tobago',
      coords: [11.1836, -60.7393],
      quincyNote: 'Best roti on the island. I\'m not just saying that — I\'ve tried them all. Get the potato and chickpea curry. Go early, go hungry.',
      featured: false,
      image: 'images/renas-roti-shop.webp',
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
      plusCode: '8FC2+M56, Charlotteville, Trinidad & Tobago',
      coords: [11.3119, -60.5513],
      quincyNote: 'Charlotteville is all the way on the northeast tip — the kind of place that makes you feel like you\'ve stepped outside of time. Sharon\'s is where you eat when you get there. Good food, warm welcome, and a view that makes you slow down.',
      featured: false,
      image: 'images/sharon-and-phebes.webp',
      tags: [
        'restaurant', 'dining', 'local food', 'charlotteville', 'recommended', 'authentic',
        'friendly', 'homestyle', 'north east tobago', 'lunch', 'dinner', 'creole',
        'seafood', 'shrimp', 'prawns', 'fish', 'bbq', 'bbq chicken', 'grilled chicken',
        'fries', 'view', 'scenic', 'ocean view', 'sea view', 'casual dining'
      ]
    },

    // --- Beaches & Nature ---

    {
      title: 'Store Bay Beach',
      description: 'A beautiful beach with clear waters and a relaxed atmosphere. Perfect for swimming and sunbathing.',
      url: 'http://www.storebay.tt/',
      category: 'beaches-nature',
      area: 'crown-point',
      plusCode: '5546+94J Crown Point, Trinidad and Tobago',
      coords: [11.1477, -60.8409],
      quincyNote: 'This is where most people land in Tobago, and it\'s a perfect introduction. Calm water, food stalls right on the beach, and you can get crab and dumpling five minutes after your swim. It gets busy but for good reason.',
      featured: false,
      image: 'images/store-bay-beach.webp',
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
      plusCode: '55C6+R82 Crown Point, Trinidad and Tobago',
      coords: [11.1547, -60.8463],
      quincyNote: 'This is the postcard — the thatched pier, turquoise water, white sand. The image people carry when they think Tobago. There\'s an entry fee, but go early in the morning and you\'ll have most of it to yourself.',
      featured: true,
      image: 'images/pigeon-point-heritage-park.webp',
      tags: [
        'beach', 'heritage', 'park', 'pier', 'thatched roof', 'iconic', 'photography',
        'swimming', 'snorkeling', 'calm water', 'entry fee', 'scenic', 'crown point',
        'caribbean beach', 'postcard', 'wedding', 'instagram', 'turquoise water',
        'white sand', 'famous beach', 'boat trips', 'nylon pool', 'clear water'
      ]
    },
    {
      title: 'Shurland Nature Park',
      description: 'A hidden gem tucked in the hills — hike trails, a natural spring path, waterfall, fruit trees, and stunning views. Watch hummingbirds feed up close and spot parrots in the wild. Local food on site including pelau and fish, plus homemade desserts.',
      url: 'https://www.tripadvisor.com/Attraction_Review-g147392-d12918544-Reviews-Shurland_Nature_Park-Tobago_Trinidad_and_Tobago.html',
      category: 'beaches-nature',
      area: 'roxborough',
      plusCode: '79PF+9FX Anse Fourmi, Trinidad and Tobago',
      coords: [11.2802, -60.5832],
      quincyNote: 'This one is special to me. You hike through fruit trees, past a natural spring, and end up at a waterfall with hummingbirds feeding right beside you. They serve real food on site too. It\'s the kind of place that reminds you why Tobago is different.',
      featured: false,
      image: 'images/shurland-nature-park.webp',
      tags: [
        'nature', 'hiking', 'hike', 'trails', 'walking', 'scenic', 'views', 'viewpoint',
        'park', 'outdoors', 'birdwatching', 'birding', 'hummingbird', 'hummingbird feeding',
        'parrot', 'parrot viewing', 'flora', 'fauna', 'peaceful', 'scarborough',
        'waterfall', 'spring', 'river', 'river path', 'stream', 'fruit trees', 'local food',
        'pelau', 'fish', 'local desserts', 'food', 'family friendly', 'eco', 'nature walk',
        'lush', 'green', 'rainforest', 'photography', 'hidden gem', 'off the beaten track'
      ]
    },
    {
      title: 'Corbin Local Wildlife',
      description: 'A local wildlife area with diverse flora and fauna.',
      url: 'https://tobagowildlife.org/',
      category: 'beaches-nature',
      area: 'mason-hall',
      plusCode: '672W+P2G Mason Hall, Trinidad and Tobago',
      coords: [11.2271, -60.6712],
      quincyNote: 'The Main Ridge is one of the oldest protected rainforests in the western hemisphere. Corbin is your way in. If you\'re a birder or just someone who needs to be in the forest for a while, make the trip.',
      featured: false,
      image: 'images/corbin-local-wildlife.webp',
      tags: [
        'wildlife', 'birdwatching', 'birding', 'nature', 'hiking', 'outdoors',
        'conservation', 'rainforest', 'trails', 'flora', 'fauna', 'animals',
        'eco', 'sustainable', 'scarborough', 'forest', 'naturalist'
      ]
    },

    // --- Culture & History ---

    {
      title: 'Tobago Events and Festivals',
      description: 'Discover the vibrant cultural events and festivals that take place throughout Tobago.',
      url: 'https://tobagofestivalscommission.com/',
      category: 'culture-history',
      area: 'island-wide',
      quincyNote: 'This is the official calendar for what\'s on across the island. If you can be here for the Heritage Festival in July, do it — two weeks of living history. The goat race at Buccoo is something else entirely.',
      featured: false,
      image: 'images/tobago-events-and-festivals.webp',
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
      quincyNote: 'They\'re doing the quiet, important work of keeping Tobago\'s history alive — the folklore, the traditions, the stories that don\'t get written down easily. If you want to understand where this island comes from, this is a good place to start.',
      featured: false,
      image: 'images/tobago-heritage-conservation-society.webp',
      tags: [
        'heritage', 'conservation', 'culture', 'history', 'preservation', 'community',
        'folklore', 'traditions', 'ole time', 'old time', 'ancestors', 'legacy',
        'tobagonian identity', 'plantation history', 'african heritage', 'indigenous',
        'research', 'education', 'museum'
      ]
    },

    // --- Accommodation ---

    {
      title: 'LuxStay Tobago',
      description: 'Luxury accommodations in Tobago with stunning views and top-notch amenities.',
      url: 'https://luxstaytobago.com/',
      category: 'accommodation',
      area: 'island-wide',
      quincyNote: 'Good option if you\'re coming with a large group or want your own space to spread out. Multiple properties across the island, proper amenities, and they know Tobago well enough to point you in the right direction.',
      featured: false,
      image: 'images/luxstay-tobago.webp',
      tags: [
        'luxury', 'villa', 'large villa', 'upscale', 'high end', 'premium', 'stylish', 'modern',
        'holiday rental', 'vacation rental', 'self catering', 'amenities', 'pool',
        'group accommodation', 'sleeps 8', 'large group', 'family', 'multiple rooms',
        'crown point', 'buccoo', 'shirvan road', 'topaz', 'sapphire', 'opal', 'citrine', 'diamond',
        'studio', 'apartment', 'multiple locations', 'island wide', 'hotel style',
        'air conditioning', 'wifi', 'kitchen', 'private', 'spacious'
      ]
    },
    {
      title: 'Pint-Size Paradise',
      description: 'A charming and cozy alternative to traditional Tobago hotels.',
      url: 'https://pintsizeparadise.com/',
      category: 'accommodation',
      area: 'island-wide',
      quincyNote: 'Charming properties scattered around the island — more personality than a standard hotel stay. Good for those who want to feel settled in a spot rather than just passing through.',
      featured: false,
      image: 'images/pint-size-paradise.webp',
      tags: [
        'airbnb', 'airbnb style', 'holiday rental', 'vacation rental', 'self catering',
        'multiple properties', 'island wide', 'large group', 'family', 'sleeps 5', 'bedrooms',
        'villa', 'house rental', 'home rental', 'private', 'spacious', 'affordable',
        'charming', 'cozy', 'unique', 'alternative', 'kitchen', 'wifi', 'flexible'
      ]
    },
    {
      title: 'Castara Retreats',
      description: 'A charming and cozy accommodation in Tobago with a unique character.',
      url: 'https://castararetreats.com/',
      category: 'accommodation',
      area: 'castara',
      plusCode: '78H3+6HW, Castara Retreats, North Side Road, Castara, Trinidad & Tobago',
      coords: [11.2682, -60.7104],
      quincyNote: 'Castara is one of my favourite parts of this island. The village still feels like itself, the beach is right there, and it\'s quiet in a way that actually gets into you. Castara Retreats fits that energy perfectly. Bring someone you love.',
      featured: false,
      image: 'images/castara-retreats.webp',
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
      plusCode: '5537+66 Crown Point, Trinidad and Tobago',
      coords: [11.1493, -60.8360],
      quincyNote: 'Kariwak has been part of Crown Point for decades and still does things right — the gardens, the pool, the feeling of the place. One of the best meals you can have in Tobago is right here. Worth visiting for dinner even if you\'re staying somewhere else.',
      featured: false,
      image: 'images/kariwak-village-holistic-haven.webp',
      tags: [
        'holistic', 'wellness', 'spa', 'yoga', 'organic', 'garden', 'restaurant',
        'peaceful', 'crown point', 'near beach', 'boutique hotel', 'pool', 'romantic',
        'eco friendly', 'meditation', 'couples', 'healthy food', 'retreat',
        'quiet', 'nature', 'cabins', 'lush gardens', 'award winning'
      ]
    },

    // --- Activities & Tours ---

    {
      title: 'Frankie Tours and Rentals',
      description: 'A local tour and rental company offering guided tours and vehicle rentals in Tobago.',
      url: 'https://www.facebook.com/profile.php?id=100076162752587',
      category: 'activities-tours',
      area: 'island-wide',
      plusCode: '558G+M2W, Buccoo, Trinidad & Tobago',
      coords: [11.1704, -60.8229],
      quincyNote: 'This is who I trust. Frankie knows this island properly, keeps things fair, and genuinely wants to show you the good parts. Whether it\'s a rental car or a guided tour, he\'s who I\'d call first.',
      featured: true,
      image: 'images/frankie-tours-and-rentals.webp',
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
      quincyNote: 'If you want someone else to handle the planning — beaches, the Main Ridge, Argyle Waterfall, nightlife — Island Girl puts together a real itinerary. Good for first-timers who want to see the whole island without having to figure it all out themselves.',
      featured: false,
      image: 'images/island-girl-tours.webp',
      tags: [
        'tours', 'guided tour', 'beaches', 'waterfalls', 'hiking', 'hike', 'birdwatching',
        'birding', 'diving', 'scuba', 'snorkeling', 'water sports', 'kayaking', 'fishing',
        'local cuisine', 'food tour', 'nightlife', 'island tour', 'sightseeing',
        'adventure', 'day trip', 'group tour', 'private tour', 'main ridge', 'argyle waterfall',
        'nylon pool', 'glass bottom boat', 'all inclusive', 'things to do'
      ]
    },

    // --- Radio ---

    {
      title: 'Radio Tambrin',
      description: 'Listen to local Tobago radio \u2014 music, news and community programming.',
      url: 'https://tambrintobago.com/',
      embedPage: 'https://streema.com/radios/Radio_Tambrin',
      category: 'radio',
      area: 'island-wide',
      quincyNote: 'Tambrin is the sound of Tobago. Local news, soca, parang, calypso — put it on in the background and the island comes to you. Great way to get into the rhythm before you arrive, or stay connected after you leave.',
      featured: false,
      image: 'images/radio-tambrin.webp',
      tags: [
        'radio', 'music', 'news', 'soca', 'calypso', 'local', 'community', 'live stream',
        'online radio', 'entertainment', 'listen', 'steel pan', 'chutney', 'parang',
        'tobago radio', 'local news', 'current affairs', 'culture', 'stream'
      ]
    },

    // --- Practical Info ---

    {
      title: 'ANR Robinson International Airport',
      description: 'The main airport serving Tobago, with flights to and from Trinidad and other Caribbean destinations.',
      url: 'https://tntairports.com/anr-robinson-international-airport/',
      category: 'practical-info',
      area: 'crown-point',
      plusCode: '5526+X24, Crown Point, Trinidad & Tobago',
      coords: [11.1500, -60.8367],
      quincyNote: 'Small airport, moves fast. Caribbean Airlines runs the Trinidad-Tobago route — a short hop. All regional connections go through here. Check for schedules and what to expect on arrival and departure.',
      featured: false,
      image: 'images/anr-robinson-international-airport.webp',
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
      coords: [11.1840, -60.7351],
      quincyNote: 'The sea bridge. Overnight from Port of Spain to Scarborough — I\'ve done it more times than I can count. You can bring your car, it\'s much cheaper than flying, and there\'s something about arriving by sea. Book ahead, especially around holidays.',
      featured: true,
      image: 'images/inter-island-ferry.webp',
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
      quincyNote: 'This is how local people move around — maxi taxis and PTSC buses on the main routes. Cheap and covers more than you\'d think. Good for budget travellers or anyone who wants to travel the real way.',
      featured: false,
      image: 'images/public-transportation-schedule.webp',
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
      quincyNote: 'TT dollars are what you spend here. USD is widely accepted at most places, but having local cash for markets, roadside stalls and smaller spots always helps. The rate sits around 6.7 TTD to the dollar — this link gives you the live figure.',
      featured: false,
      image: 'images/currency-exchange-rate-usd-ttd.webp',
      tags: [
        'currency', 'exchange rate', 'money', 'TTD', 'USD', 'dollars', 'TT dollars',
        'banking', 'conversion', 'finance', 'budget', 'travel money', 'cash',
        'how much', 'cost of living', 'prices', 'GBP', 'CAD', 'euro'
      ]
    }
  ]
};
