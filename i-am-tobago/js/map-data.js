/* =============================================================
   I Am Tobago — Historical Map Location Data
   Static data from the book. Never changes.
   x / y = percentage of SVG viewBox (0-100) width / height.
   Categories: history | folklore | nature | village | religious

   Pin placement formula (calibrated to Quincy's traced island):
     Island bbox in 900×520 SVG space: x=[127, 772], y=[85, 412]
     Geographic bounds: lon 60.870°W–60.476°W, lat 11.362°N–11.148°N
     x% = (126.95 + (60.870 - lon) / 0.394 * 645.02) / 9
     y% = (85.09  + (11.362 - lat) / 0.214 * 326.86) / 5.2

   Coordinates sourced from OpenStreetMap (Photon API) where available.
   Offshore features (Buccoo Reef, Nylon Pool) nudged to nearest coast.
   ============================================================= */

const MAP_LOCATIONS = [

  /* ── History ─────────────────────────────────────────────── */
  {
    id: 'fort-king-george',
    name: 'Fort King George',
    category: 'history',
    x: 40.2, y: 70.5,
    description: 'Built by the British in 1777, Fort King George overlooks Scarborough Harbour and remains one of the best-preserved colonial fortifications in the Caribbean. The fort changed hands between European powers — British, French, and Dutch — a remarkable 22 times before Tobago was permanently ceded to Britain in 1814. Its cannons still point out to sea.'
  },
  {
    id: 'mystery-tombstone',
    name: 'The Mystery Tomb of Betty Stiven',
    category: 'history',
    x: 30.7, y: 57.8,
    description: 'In a Plymouth churchyard stands one of the Caribbean\'s most haunting inscriptions: "She was a mother without knowing it, and a wife without letting her husband know it, except by her kind indulgences to him." Betty Stiven died in 1783 alongside her unborn child, and the cryptic words carved above them have baffled historians, scholars, and storytellers for over two centuries. No one has ever explained them.'
  },
  {
    id: 'courland-bay-monument',
    name: 'Courland Bay Monument',
    category: 'history',
    x: 30.8, y: 58.0,
    description: 'A monument unveiled in 1978 commemorates one of history\'s more improbable colonial ventures: the Duchy of Courland — a small Baltic state in present-day Latvia — established "New Courland" on Tobago in 1654. The monument overlooks the bay their ships once anchored in and stands near the ruins of Fort James, the British fortification built on the same headland generations later.'
  },
  {
    id: 'fort-james',
    name: 'Fort James',
    category: 'history',
    x: 29.4, y: 55.7,
    description: 'Established in the 1760s by the British on the headland above Great Courland Bay, Fort James served as military barracks and a coastal watch point. Four cannons still point out to sea from a well-kept grassy promontory. It occupies ground the Courlanders first fortified more than a century earlier — each European power building over the ruins of the last, as was the custom in a colony that changed hands 33 times in three centuries.'
  },
  {
    id: 'fort-granby',
    name: 'Fort Granby',
    category: 'history',
    x: 74.1, y: 37.5,
    description: 'Perched on a headland near Speyside, Fort Granby was a British coastal defence battery that guarded the northeastern approaches to the island. Far less visited than Fort King George, it offers a raw and atmospheric encounter with Tobago\'s colonial-era fortifications and sweeping views across the Atlantic.'
  },
  {
    id: 'bloody-bay',
    name: 'Bloody Bay',
    category: 'history',
    x: 56.3, y: 35.0,
    description: 'This serene north-coast bay carries a name with two competing stories. One holds that in 1666, Admiral Sir John Harman\'s English fleet defeated the combined Dutch and French forces so decisively that the sea itself ran red. Another theory suggests the name derives from the Dutch "Rasphuys Bay" — a brazilwood processing site — corrupted over centuries into something far more dramatic. The truth, like much of Tobago\'s history, remains disputed.'
  },
  {
    id: 'signal-hill',
    name: 'Signal Hill',
    category: 'history',
    x: 33.5, y: 70.0,
    description: 'Rising above Scarborough on the hills overlooking the south coast, Signal Hill served as a military communications post during Tobago\'s colonial era. Messages were relayed by flag and fire between hilltop stations, keeping the island\'s scattered garrisons connected. The hill remains a landmark above Scarborough and a reminder of its strategic importance to European powers.'
  },
  {
    id: 'robinson-crusoe-heritage',
    name: 'Crusoe\'s Cave',
    category: 'history',
    x: 20.3, y: 76.3,
    description: 'Tobago has long been claimed as the inspiration for Daniel Defoe\'s Robinson Crusoe (1719). A sea cave on the southwest coast near Lowlands is locally associated with the marooned sailor\'s legend. Whether Defoe ever visited remains disputed, but the island\'s wild beauty made it a convincing stand-in for a castaway\'s paradise.'
  },

  /* ── Folklore ─────────────────────────────────────────────── */
  {
    id: 'la-diablesse-road',
    name: 'La Diablesse\'s Road',
    category: 'folklore',
    x: 37.2, y: 56.5,
    description: 'Lonely roads through Tobago\'s interior have long been said to be the haunt of La Diablesse — the Devil Woman. She appears as a beautiful woman in a wide-brimmed hat, hiding a cloven hoof beneath her long skirts. Men who follow her into the night are led off cliffs or deep into the forest, never to return. The old road through Les Coteaux is one of her favourite paths.'
  },
  {
    id: 'soucouyant-bon-accord',
    name: 'Soucouyant\'s Skin Tree',
    category: 'folklore',
    x: 22.4, y: 77.2,
    description: 'The Soucouyant is an old woman by day who sheds her skin at night and transforms into a fireball, flying across the island to drink the blood of the living. Villages near Bon Accord whisper of a particular silk-cotton tree where her discarded skin was once found at dawn. Leaving rice or salt at your doorstep was said to keep her at bay.'
  },
  {
    id: 'papa-bois-mason-hall',
    name: 'Papa Bois Territory',
    category: 'folklore',
    x: 42.5, y: 58.1,
    description: 'The forest around Mason Hall and the Main Ridge is considered the territory of Papa Bois — Father of the Forest. Half-man, half-deer, he is the guardian of all wild animals. Hunters who enter the forest disrespectfully risk being led in circles until they are hopelessly lost. Those who treat the forest with reverence may catch a glimpse of the old man watching from the shadows.'
  },
  {
    id: 'douen-parlatuvier',
    name: 'Douen Grounds',
    category: 'folklore',
    x: 55.5, y: 33.0,
    description: 'The Douen are the spirits of children who died before being baptised, their feet turned backwards so they can never find their way home. Near Parlatuvier, the mangrove edges and stream banks are said to be where these tiny figures wander, calling out the names of living children to lead them astray. Parents warn: never call your child\'s name aloud near water at dusk.'
  },
  {
    id: 'jumbies-moriah',
    name: 'Moriah — Village of Spirits',
    category: 'folklore',
    x: 42.2, y: 49.4,
    description: 'Moriah is one of Tobago\'s oldest and most storied villages, celebrated during the Tobago Heritage Festival for its "Ole Time Wedding" — a full reenactment of a 19th-century post-emancipation wedding procession through the village streets, complete with traditional costumes and dances. The old Moravian Church, a wooden structure on limestone stilts that survived Hurricane Flora in 1963, still stands at the village\'s heart. Old-timers speak of jumbies — restless spirits of the dead — who linger near silk-cotton trees and crossroads after sundown.'
  },
  {
    id: 'gang-gang-sarah',
    name: 'Gang Gang Sarah\'s Silk Cotton Tree',
    category: 'folklore',
    x: 38.6, y: 52.6,
    description: 'In the village of Golden Lane stands a massive silk-cotton tree where, legend says, Gang Gang Sarah — an African healer and witch — met her end. Blown across the sea from Africa, she first landed at Les Coteaux and settled in Golden Lane with her husband Long Tom. When she tried to fly home to Africa in her old age, she found she had lost her power: someone had given her salt to eat, and salt breaks the magic. Two headstones mark the burial site. The tree remains a place of extraordinary spiritual weight.'
  },

  /* ── Nature ─────────────────────────────────────────────── */
  {
    id: 'main-ridge-forest',
    name: 'Main Ridge Forest Reserve',
    category: 'nature',
    x: 62.7, y: 39.3,
    description: 'Proclaimed in 1776, the Main Ridge Forest Reserve is the oldest legally protected rainforest in the Western Hemisphere — predating any national park in the world. Its conservation was remarkably far-sighted: British colonial administrators protected it to ensure consistent rainfall and water supply for the island. Today it shelters hundreds of bird species and the endemic Tobago Motmot.'
  },
  {
    id: 'argyle-waterfall',
    name: 'Argyle Waterfall',
    category: 'nature',
    x: 65.7, y: 46.1,
    description: 'Cascading in three tiers through the rainforest, Argyle is Tobago\'s highest waterfall and one of the most dramatic in the entire Caribbean. The river that feeds it rises in the protected Main Ridge, flowing through forests unchanged for centuries. Local legend holds that spirits bathe here at midnight, and the pool\'s colour is said to change with the mood of the land.'
  },
  {
    id: 'buccoo-reef',
    name: 'Buccoo Reef',
    category: 'nature',
    x: 21.5, y: 70.5,
    description: 'Jacques Cousteau rated Buccoo Reef the third most spectacular coral reef in the world. Designated a protected marine park in 1973, it stretches across thousands of acres of shallow turquoise water and shelters over 100 species of fish, brain coral, elkhorn, fire coral, sea turtles, and mangrove ecosystems. The reef\'s formation took thousands of years; warming oceans now threaten what centuries of life built. The Nylon Pool — a natural white-sand lagoon in the open sea — sits just beyond the reef edge.'
  },
  {
    id: 'little-tobago',
    name: 'Little Tobago Island',
    category: 'nature',
    x: 81.2, y: 34.3,
    description: 'Known as "Bird of Paradise Island," Little Tobago was home to a colony of Greater Birds of Paradise introduced from New Guinea in 1909. Though the species died out here after Hurricane Flora in 1963, the island remains one of the Caribbean\'s finest seabird sanctuaries — home to Red-billed Tropicbirds, Magnificent Frigatebirds, and Brown Boobies nesting on near-vertical cliffs above the Atlantic.'
  },
  {
    id: 'nylon-pool',
    name: 'The Nylon Pool',
    category: 'nature',
    x: 19.5, y: 65.5,
    description: 'A natural shallow lagoon sitting in the open sea beyond Buccoo Reef, the Nylon Pool gets its name from the crystal clarity of its waist-deep water — as transparent as nylon stockings. The sandbar beneath is said to have youth-restoring properties, and locals swear that bathing here turns back the years. Princess Margaret was among its most famous believers.'
  },

  /* ── Village ─────────────────────────────────────────────── */
  {
    id: 'charlotteville',
    name: 'Charlotteville',
    category: 'village',
    x: 72.8, y: 28.0,
    description: 'First settled by the Dutch in 1633 and named after an early settler woman called Charlotte, Charlotteville sits in a steep-sided bay at Tobago\'s northeastern tip. Archaeological surveys have identified 93 sites of First Peoples habitation in the area — evidence of a human presence stretching back millennia before any European arrived. Accessible only by a winding mountain road, the village remains one of the island\'s most remote, its fishing culture and folk traditions alive in ways that the rest of Tobago has mostly moved past.'
  },
  {
    id: 'castara',
    name: 'Castara Bay',
    category: 'village',
    x: 45.8, y: 40.6,
    description: 'A small bay on Tobago\'s northern coast, Castara remains one of the least commercialised fishing villages on the island. Colourful pirogues are drawn up on the sand each morning, and the catch is sold fresh on the beach. The surrounding forest meets the sea in a wall of green, and the village\'s pace of life reflects an older, quieter Tobago that the rest of the island has mostly moved past.'
  },
  {
    id: 'parlatuvier',
    name: 'Parlatuvier',
    category: 'village',
    x: 53.9, y: 35.2,
    description: 'Parlatuvier sits at the end of a long, sheltered bay hemmed in by forest. One of the north coast\'s most traditional communities, it is known for its fishing culture and its proximity to Bloody Bay. The village\'s older residents carry oral histories of the island that stretch back generations, including stories of plantation life, rebellion, and the spirits that walk the roads after dark.'
  },
  {
    id: 'speyside',
    name: 'Speyside',
    category: 'village',
    x: 75.3, y: 36.4,
    description: 'Speyside looks out across the waters toward Little Tobago from the Atlantic-facing coast. The remnants of a lucrative 19th-century sugar estate still stand here — including a historic waterwheel, silent now but once driven by the river that flows down from the Main Ridge. Today the village is the departure point for glass-bottom boat tours and birdwatching trips to Bird of Paradise Island, and one of the best places in the Caribbean to dive alongside giant manta rays.'
  },
  {
    id: 'plymouth',
    name: 'Plymouth',
    category: 'village',
    x: 31.6, y: 58.1,
    description: 'One of Tobago\'s oldest towns, Plymouth was the site of the Courland settlement in the 1630s and later a British administrative centre. Today it is a quiet coastal community that belies its turbulent past. Beyond the Mystery Tombstone in its churchyard, Plymouth holds the ruins of Fort James, an early Dutch fortification overlooking Great Courland Bay — one of the most historically layered squares of land on the island.'
  },

  /* ── Religious ─────────────────────────────────────────────── */
  {
    id: 'sharon-moravian',
    name: 'Sharon Moravian Church',
    category: 'religious',
    x: 34.8, y: 59.2,
    description: 'The Moravian Church has shaped Tobago\'s spiritual and social life for nearly three centuries. Arriving as missionaries in the 1820s, the Moravians were among the first to provide formal education to enslaved people, building schools alongside their churches. Sharon\'s congregation is one of the oldest, and its churchyard holds headstones that mark the island\'s transition from slavery to freedom.'
  },
  {
    id: 'bon-accord',
    name: 'Bon Accord Heritage',
    category: 'religious',
    x: 21.5, y: 76.5,
    description: 'Bon Accord\'s name — "Good Agreement" — is said to derive from a treaty between early European settlers and the island\'s indigenous Kalina people. The community grew up around a Moravian mission and retains a strong sense of spiritual heritage. The lagoon at Bon Accord is one of the island\'s most significant coastal wetlands, where the sacred and the natural intertwine.'
  },
  {
    id: 'canaan-church',
    name: 'Canaan Village Chapel',
    category: 'religious',
    x: 25.0, y: 76.1,
    description: 'The village of Canaan — its biblical name chosen by freed enslaved people after Emancipation in 1834 — was established as a symbol of arrival in a promised land. The chapel at its heart was built by those same newly freed men and women, and remains a living monument to the faith that sustained Tobago\'s people through generations of hardship and resilience.'
  }

];
