/* =============================================================
   I Am Tobago — Historical Map Location Data
   Static data from the book. Never changes.
   x / y = percentage of SVG viewBox (0-100) width / height.
   Categories: history | folklore | nature | village | religious
             | forts | waterfalls | waterwheels | islands

   Pin placement formula (georeferenced to Quincy's traced island):
   Derived from 9 manually-verified ground control points (2026-03-22).
   Max residual error: 1.3% x, 1.0% y.

     x% = 218.8825 * lon + 1.9429 * lat + 13310.65
     y% = -8.5133  * lon - 293.6998 * lat + 2832.00

   Where lon = decimal degrees West (negative), lat = decimal degrees North.
   Example: Fort King George (11.177666°N, 60.727098°W):
     x% = 218.8825 * (-60.727098) + 1.9429 * 11.177666 + 13310.65 ≈ 40.2
     y% = -8.5133  * (-60.727098) - 293.6998 * 11.177666 + 2832.00 ≈ 65.5

   Pins marked REAL have confirmed GPS coordinates.
   All others use formula estimates and may need visual verification.
   ============================================================= */

const MAP_LOCATIONS = [

  /* ── Forts ───────────────────────────────────────────────── */
  {
    id: 'fort-king-george',
    name: 'Fort King George',
    category: 'forts',
    x: 40.2, y: 65.5,
    description: 'Built by the British in 1777, Fort King George overlooks Scarborough Harbour and remains one of the best-preserved colonial fortifications in the Caribbean. The fort changed hands between European powers — British, French, and Dutch — a remarkable 22 times before Tobago was permanently ceded to Britain in 1814. Its cannons still point out to sea.'
  },
  {
    id: 'fort-james',
    name: 'Fort James',
    category: 'forts',
    x: 28.5, y: 53.4,
    description: 'Established in the 1760s by the British on the headland above Great Courland Bay, Fort James served as military barracks and a coastal watch point. Four cannons still point out to sea from a well-kept grassy promontory. It occupies ground the Courlanders first fortified more than a century earlier — each European power building over the ruins of the last, as was the custom in a colony that changed hands 33 times in three centuries.'
  },
  {
    id: 'fort-granby',
    name: 'Fort Granby',
    category: 'forts',
    x: 54.7, y: 63.6,
    description: 'Perched on a headland near Speyside, Fort Granby was a British coastal defence battery that guarded the northeastern approaches to the island. Far less visited than Fort King George, it offers a raw and atmospheric encounter with Tobago\'s colonial-era fortifications and sweeping views across the Atlantic.'
  },

  /* ── History ─────────────────────────────────────────────── */
  {
    id: 'mystery-tombstone',
    name: 'The Mystery Tomb of Betty Stiven',
    category: 'history',
    x: 29.6, y: 53.8,
    description: 'In a Plymouth churchyard stands one of the Caribbean\'s most haunting inscriptions: "She was a mother without knowing it, and a wife without letting her husband know it, except by her kind indulgences to him." Betty Stiven died in 1783 alongside her unborn child, and the cryptic words carved above them have baffled historians, scholars, and storytellers for over two centuries. No one has ever explained them.'
  },
  {
    id: 'courland-bay-monument',
    name: 'Courland Bay Monument',
    category: 'history',
    x: 29.6, y: 55.1,
    description: 'A monument unveiled in 1978 commemorates one of history\'s more improbable colonial ventures: the Duchy of Courland — a small Baltic state in present-day Latvia — established "New Courland" on Tobago in 1654. The monument overlooks the bay their ships once anchored in and stands near the ruins of Fort James, the British fortification built on the same headland generations later.'
  },
  {
    id: 'bloody-bay',
    name: 'Bloody Bay',
    category: 'history',
    x: 61.3, y: 28.5,
    description: 'This serene north-coast bay carries a name with two competing stories. One holds that in 1666, Admiral Sir John Harman\'s English fleet defeated the combined Dutch and French forces so decisively that the sea itself ran red. Another theory suggests the name derives from the Dutch "Rasphuys Bay" — a brazilwood processing site — corrupted over centuries into something far more dramatic. The truth, like much of Tobago\'s history, remains disputed.'
  },
  {
    id: 'signal-hill',
    name: 'Signal Hill',
    category: 'history',
    x: 32.9, y: 66.1,
    description: 'Rising above Scarborough on the hills overlooking the south coast, Signal Hill served as a military communications post during Tobago\'s colonial era. Messages were relayed by flag and fire between hilltop stations, keeping the island\'s scattered garrisons connected. The hill remains a landmark above Scarborough and a reminder of its strategic importance to European powers.'
  },
  {
    id: 'robinson-crusoe-heritage',
    name: 'Crusoe\'s Cave',
    category: 'history',
    x: 29.6, y: 74.7,
    description: 'Tobago has long been claimed as the inspiration for Daniel Defoe\'s Robinson Crusoe (1719). A sea cave on the southwest coast near Lowlands is locally associated with the marooned sailor\'s legend. Whether Defoe ever visited remains disputed, but the island\'s wild beauty made it a convincing stand-in for a castaway\'s paradise.'
  },

  /* ── Folklore ─────────────────────────────────────────────── */
  {
    id: 'la-diablesse-road',
    name: 'La Diablesse\'s Road',
    category: 'folklore',
    x: 36.9, y: 52.2,
    description: 'Lonely roads through Tobago\'s interior have long been said to be the haunt of La Diablesse — the Devil Woman. She appears as a beautiful woman in a wide-brimmed hat, hiding a cloven hoof beneath her long skirts. Men who follow her into the night are led off cliffs or deep into the forest, never to return. The old road through Les Coteaux is one of her favourite paths.'
  },
  {
    id: 'soucouyant-bon-accord',
    name: 'Soucouyant\'s Skin Tree',
    category: 'folklore',
    x: 18.9, y: 73.6,
    description: 'The Soucouyant is an old woman by day who sheds her skin at night and transforms into a fireball, flying across the island to drink the blood of the living. Villages near Bon Accord whisper of a particular silk-cotton tree where her discarded skin was once found at dawn. Leaving rice or salt at your doorstep was said to keep her at bay.'
  },
  {
    id: 'papa-bois-mason-hall',
    name: 'Papa Bois Territory',
    category: 'folklore',
    x: 43.2, y: 53.6,
    description: 'The forest around Mason Hall and the Main Ridge is considered the territory of Papa Bois — Father of the Forest. Half-man, half-deer, he is the guardian of all wild animals. Hunters who enter the forest disrespectfully risk being led in circles until they are hopelessly lost. Those who treat the forest with reverence may catch a glimpse of the old man watching from the shadows.'
  },
  {
    id: 'douen-parlatuvier',
    name: 'Douen Grounds',
    category: 'folklore',
    x: 55.5, y: 32.0,
    description: 'The Douen are the spirits of children who died before being baptised, their feet turned backwards so they can never find their way home. Near Parlatuvier, the mangrove edges and stream banks are said to be where these tiny figures wander, calling out the names of living children to lead them astray. Parents warn: never call your child\'s name aloud near water at dusk.'
  },
  {
    id: 'jumbies-moriah',
    name: 'Moriah — Village of Spirits',
    category: 'folklore',
    x: 43.0, y: 44.9,
    description: 'Moriah is one of Tobago\'s oldest and most storied villages, celebrated during the Tobago Heritage Festival for its "Ole Time Wedding" — a full reenactment of a 19th-century post-emancipation wedding procession through the village streets, complete with traditional costumes and dances. The old Moravian Church, a wooden structure on limestone stilts that survived Hurricane Flora in 1963, still stands at the village\'s heart. Old-timers speak of jumbies — restless spirits of the dead — who linger near silk-cotton trees and crossroads after sundown.'
  },
  {
    id: 'gang-gang-sarah',
    name: 'Gang Gang Sarah\'s Silk Cotton Tree',
    category: 'folklore',
    x: 37.8, y: 50.5,
    description: 'In the village of Golden Lane stands a massive silk-cotton tree where, legend says, Gang Gang Sarah — an African healer and witch — met her end. Blown across the sea from Africa, she first landed at Les Coteaux and settled in Golden Lane with her husband Long Tom. When she tried to fly home to Africa in her old age, she found she had lost her power: someone had given her salt to eat, and salt breaks the magic. Two headstones mark the burial site. The tree remains a place of extraordinary spiritual weight.'
  },

  /* ── Nature ──────────────────────────────────────────────── */
  {
    id: 'main-ridge-forest',
    name: 'Main Ridge Forest Reserve',
    category: 'nature',
    x: 67.7, y: 33.8,
    description: 'Proclaimed in 1776, the Main Ridge Forest Reserve is the oldest legally protected rainforest in the Western Hemisphere — predating any national park in the world. Its conservation was remarkably far-sighted: British colonial administrators protected it to ensure consistent rainfall and water supply for the island. Today it shelters hundreds of bird species and the endemic Tobago Motmot.'
  },
  {
    id: 'buccoo-reef',
    name: 'Buccoo Reef',
    category: 'nature',
    x: 17.0, y: 66.2,
    description: 'Jacques Cousteau rated Buccoo Reef the third most spectacular coral reef in the world. Designated a protected marine park in 1973, it stretches across thousands of acres of shallow turquoise water and shelters over 100 species of fish, brain coral, elkhorn, fire coral, sea turtles, and mangrove ecosystems. The reef\'s formation took thousands of years; warming oceans now threaten what centuries of life built.'
  },
  {
    id: 'nylon-pool',
    name: 'The Nylon Pool',
    category: 'nature',
    x: 13.8, y: 65.0,
    description: 'A natural shallow lagoon sitting in the open sea beyond Buccoo Reef, the Nylon Pool gets its name from the crystal clarity of its waist-deep water — as transparent as nylon stockings. The sandbar beneath is said to have youth-restoring properties, and locals swear that bathing here turns back the years. Princess Margaret was among its most famous believers.'
  },
  {
    id: 'pigeon-peak',
    name: 'Pigeon Peak',
    category: 'nature',
    x: 64.0, y: 35.4,
    description: 'At 576 metres, Pigeon Peak is the highest point in Tobago, rising deep within the Main Ridge Forest Reserve. Cloaked in mist and cloud forest, it marks the spine of the island and is the source of many of the rivers and streams that feed Tobago\'s communities. The climb through ancient rainforest is demanding, but the views across both the Caribbean Sea and the Atlantic are unlike anything else on the island.'
  },
  {
    id: 'turtle-beach',
    name: 'Turtle Beach',
    category: 'nature',
    x: 28.4, y: 53.1,
    description: 'The long curve of Great Courland Bay — locally known as Turtle Beach — is one of the most important leatherback sea turtle nesting sites in the Caribbean. Between March and August each year, giant leatherbacks haul themselves up the sand at night to lay their eggs, continuing a cycle that has played out on this shore for millions of years. Conservation teams monitor each nest, and guided night watches offer a rare and humbling encounter with these ancient creatures.'
  },
  {
    id: 'no-mans-land',
    name: 'No Man\'s Land',
    category: 'nature',
    x: 18.8, y: 69.6,  /* REAL — 11.168646°N, 60.824912°W */
    description: 'A flat, shifting sandbar rising from the shallow sea south of Buccoo, No Man\'s Land is one of Tobago\'s most striking natural formations. Accessible only by boat, it appears and disappears with the tides and seasons — sometimes a wide white beach, sometimes barely above water. Sea turtles rest here, pelicans crowd the shore, and on calm days the water surrounding it runs in shades of turquoise and jade. It belongs to no one, which is precisely the point.'
  },

  /* ── Waterfalls ──────────────────────────────────────────── */
  {
    id: 'argyle-waterfall',
    name: 'Argyle Waterfall',
    category: 'waterfalls',
    x: 71.3, y: 42.6,
    description: 'Cascading in three tiers through the rainforest, Argyle is Tobago\'s highest waterfall and one of the most dramatic in the entire Caribbean. The river that feeds it rises in the protected Main Ridge, flowing through forests unchanged for centuries. Local legend holds that spirits bathe here at midnight, and the pool\'s colour is said to change with the mood of the land.'
  },

  /* ── Waterwheels ─────────────────────────────────────────── */
  {
    id: 'arnos-vale-waterwheel',
    name: 'Arnos Vale Waterwheel',
    category: 'waterwheels',
    x: 77.0, y: 38.8,
    description: 'The great iron waterwheel at Arnos Vale is one of the most evocative relics of Tobago\'s plantation era. Built in the 19th century to process sugar cane on the Arnos Vale estate, it was powered by the river flowing down from the Main Ridge. The estate is long gone, but the wheel still stands on the Atlantic coast near Speyside — silent now, surrounded by forest, a monument to the labour that built the Caribbean\'s colonial economy.'
  },

  /* ── Islands ─────────────────────────────────────────────── */
  {
    id: 'little-tobago',
    name: 'Little Tobago',
    category: 'islands',
    x: 89.3, y: 30.1,
    description: 'Known as "Bird of Paradise Island," Little Tobago was home to a colony of Greater Birds of Paradise introduced from New Guinea in 1909. Though the species died out here after Hurricane Flora in 1963, the island remains one of the Caribbean\'s finest seabird sanctuaries — home to Red-billed Tropicbirds, Magnificent Frigatebirds, and Brown Boobies nesting on near-vertical cliffs above the Atlantic.'
  },
  {
    id: 'the-sisters',
    name: 'The Sisters',
    category: 'islands',
    x: 58.7, y: 19.8,  /* REAL — 11.332842°N, 60.644274°W */
    description: 'The Sisters — also known as the St. Giles Islands — are a cluster of dramatic rocky outcrops rising from the sea at Tobago\'s northeastern tip. Uninhabited and exposed to the full force of the Atlantic, they are among the most important seabird nesting sites in the southern Caribbean. Magnificent Frigatebirds, Red-footed Boobies, and Laughing Gulls crowd the cliffs each season. The rocks are visible from Charlotteville on a clear day, standing like sentinels at the edge of the island.'
  },
  {
    id: 'london-bridge',
    name: 'London Bridge',
    category: 'islands',
    x: 83.1, y: 12.4,  /* REAL — 11.354981°N, 60.533172°W */
    description: 'A natural rock arch rising from the sea near the Sisters, London Bridge is one of Tobago\'s most striking coastal formations — carved by centuries of Atlantic wave action into a vaulted stone bridge. Accessible only by boat, it is a destination for divers and kayakers drawn by the caves, channels, and abundant sea life sheltering in its shadows. The arch gives a framing view of the open Atlantic beyond that is hard to forget.'
  },

  /* ── Village ─────────────────────────────────────────────── */
  {
    id: 'charlotteville',
    name: 'Charlotteville',
    category: 'village',
    x: 79.3, y: 22.0,
    essayUrl: '',
    description: 'First settled by the Dutch in 1633 and named after an early settler woman called Charlotte, Charlotteville sits in a steep-sided bay at Tobago\'s northeastern tip. Archaeological surveys have identified 93 sites of First Peoples habitation in the area — evidence of a human presence stretching back millennia before any European arrived. Accessible only by a winding mountain road, the village remains one of the island\'s most remote, its fishing culture and folk traditions alive in ways that the rest of Tobago has mostly moved past.'
  },
  {
    id: 'castara',
    name: 'Castara Bay',
    category: 'village',
    x: 47.8, y: 35.5,
    essayUrl: '',
    description: 'A small bay on Tobago\'s northern coast, Castara remains one of the least commercialised fishing villages on the island. Colourful pirogues are drawn up on the sand each morning, and the catch is sold fresh on the beach. The surrounding forest meets the sea in a wall of green, and the village\'s pace of life reflects an older, quieter Tobago that the rest of the island has mostly moved past.'
  },
  {
    id: 'parlatuvier',
    name: 'Parlatuvier',
    category: 'village',
    x: 57.1, y: 30.1,
    essayUrl: '',
    description: 'Parlatuvier sits at the end of a long, sheltered bay hemmed in by forest. One of the north coast\'s most traditional communities, it is known for its fishing culture and its proximity to Bloody Bay. The village\'s older residents carry oral histories of the island that stretch back generations, including stories of plantation life, rebellion, and the spirits that walk the roads after dark.'
  },
  {
    id: 'speyside',
    name: 'Speyside',
    category: 'village',
    x: 82.8, y: 30.4,
    essayUrl: '',
    description: 'Speyside looks out across the waters toward Little Tobago from the Atlantic-facing coast. The remnants of a lucrative 19th-century sugar estate still stand here — including a historic waterwheel, silent now but once driven by the river that flows down from the Main Ridge. Today the village is the departure point for glass-bottom boat tours and birdwatching trips to Bird of Paradise Island, and one of the best places in the Caribbean to dive alongside giant manta rays.'
  },
  {
    id: 'plymouth',
    name: 'Plymouth',
    category: 'village',
    x: 30.1, y: 54.1,
    essayUrl: '',
    description: 'One of Tobago\'s oldest towns, Plymouth was the site of the Courland settlement in the 1630s and later a British administrative centre. Today it is a quiet coastal community that belies its turbulent past. Beyond the Mystery Tombstone in its churchyard, Plymouth holds the ruins of Fort James, an early Dutch fortification overlooking Great Courland Bay — one of the most historically layered squares of land on the island.'
  },
  {
    id: 'les-coteaux',
    name: 'Les Coteaux',
    category: 'village',
    x: 37.1, y: 51.5,  /* REAL — 11.227740°N, 60.741831°W */
    image: '/blog/images/beyondfolklore.webp',
    essayUrl: '/blog/les-coteaux-more-than-folklore/',
    description: 'For many in Tobago, the name Les Coteaux carries a feeling before it carries a meaning. Long before it became known for folklore — for Gang Gang Sarah who first landed here, for La Diablesse who walks its roads — Les Coteaux was shaped by the weight of plantation history and the quiet, enduring survival of its people.'
  },

  /* ── Religious ───────────────────────────────────────────── */
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
    x: 20.5, y: 74.0,
    description: 'Bon Accord\'s name — "Good Agreement" — is said to derive from a treaty between early European settlers and the island\'s indigenous Kalina people. The community grew up around a Moravian mission and retains a strong sense of spiritual heritage. The lagoon at Bon Accord is one of the island\'s most significant coastal wetlands, where the sacred and the natural intertwine.'
  },
  {
    id: 'canaan-church',
    name: 'Canaan Village Chapel',
    category: 'religious',
    x: 22.0, y: 72.4,
    description: 'The village of Canaan — its biblical name chosen by freed enslaved people after Emancipation in 1834 — was established as a symbol of arrival in a promised land. The chapel at its heart was built by those same newly freed men and women, and remains a living monument to the faith that sustained Tobago\'s people through generations of hardship and resilience.'
  }

];
