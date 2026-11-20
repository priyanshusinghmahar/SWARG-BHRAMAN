// Authentic Uttarakhand Personal Suggester & Mountain Vibe Matcher Data

export const QUIZ_QUESTIONS = [
  {
    id: 'mood',
    title: 'What is your core Mountain Mood & Travel Soul?',
    subtitle: 'Choose the vibe that best reflects what you are yearning for on this trip.',
    options: [
      {
        id: 'spiritual',
        icon: '🕉️',
        label: 'Spiritual Solitude & Sacred Shrines',
        desc: 'Ancient stone sanctums, river ganga aartis, meditation caves, chanting & deep inner stillness.',
        badge: 'Devbhoomi Grace',
        tags: ['spiritual', 'heritage', 'peace']
      },
      {
        id: 'adventure',
        icon: '🏔️',
        label: 'High-Altitude Summit & Ridge Thrill',
        desc: '3,000m+ meadows, alpine ridge walks, night stargazing, camping by crystal lakes & snow passes.',
        badge: 'Trek & Adrenaline',
        tags: ['trek', 'snow', 'adventure']
      },
      {
        id: 'romance',
        icon: '💑',
        label: 'Cozy Himalayan Romance & Alpenglow',
        desc: 'Pine chalets, stone fireplaces, candle-lit mountain terraces, emerald lake boating & quiet sunset walks.',
        badge: 'Couple & Honeymoon',
        tags: ['romance', 'scenic', 'comfort']
      },
      {
        id: 'culture',
        icon: '🎨',
        label: 'Native Village Living & Artisan Immersion',
        desc: 'Staying with indigenous families, learning sacred Aipan folk art, woodfire hearth cooking & coppercraft.',
        badge: 'Zero Middleman',
        tags: ['culture', 'artisan', 'food']
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧‍👦',
        label: 'Family Scenic Circuit & Mythic Tales',
        desc: 'Comfortable paved routes, gentle ropeways, sacred lore for elders, safe scenic nature spots & sweet bazaars.',
        badge: 'Comfort & Heritage',
        tags: ['family', 'heritage', 'scenic']
      },
      {
        id: 'wildlife',
        icon: '🐅',
        label: 'Wildlife Safari & Dark Sky Astronomy',
        desc: 'Royal Bengal tiger glades, rare Himalayan monal birds, deep Sal jungles, pristine rivers & zero light pollution.',
        badge: 'Nature & Forest',
        tags: ['wildlife', 'nature', 'photography']
      }
    ]
  },
  {
    id: 'companions',
    title: 'Who is traveling on this journey?',
    subtitle: 'This helps customize group logistics, trail difficulty, and room configurations.',
    options: [
      {
        id: 'solo',
        icon: '🎒',
        label: 'Solo Traveler / Digital Nomad',
        desc: 'Looking for peaceful spaces, native homestays with verified scouts, and quiet reading or work nooks.',
        badge: 'Independent',
        travelerCount: 1
      },
      {
        id: 'couple',
        icon: '👫',
        label: 'Couple / Romantic Duo',
        desc: 'Private rooms, stunning mountain sunrise panoramas, cozy hearths, and secluded nature walks.',
        badge: 'Duo Special',
        travelerCount: 2
      },
      {
        id: 'friends',
        icon: '🏕️',
        label: 'Friends Tribe / Trek Squad',
        desc: 'High energy, campfire storytelling, river rafting, group dorms or riverside tent glamping.',
        badge: 'Adventure Gang',
        travelerCount: 4
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧',
        label: 'Family with Elders & Children',
        desc: 'Easy road access, minimal rough trekking, warm hospitable hosts, and round-the-clock comfort.',
        badge: 'All Ages Safe',
        travelerCount: 4
      }
    ]
  },
  {
    id: 'duration',
    title: 'How many days do you want to spend in the mountains?',
    subtitle: 'We will match the optimal circuit distance to avoid travel fatigue.',
    options: [
      {
        id: 'weekend',
        icon: '⚡',
        label: 'Quick Weekend Rejuvenation (2 - 3 Days)',
        desc: 'Short drive from Kathgodam or Dehradun. Low transit time, maximum scenic unwinding.',
        badge: 'Quick Escape',
        days: '2-3 Days'
      },
      {
        id: 'standard',
        icon: '🌿',
        label: 'Comprehensive Mountain Trail (4 - 6 Days)',
        desc: 'The golden balance: explore 2 interconnected valleys, experience village culture, and take a summit hike.',
        badge: 'Most Popular',
        days: '4-6 Days'
      },
      {
        id: 'sabbatical',
        icon: '🧘',
        label: 'Deep Himalayan Sabbatical (7 - 12 Days)',
        desc: 'Unrushed slow travel through high Johar or Garhwal valleys, sacred passes, and offbeat hamlets.',
        badge: 'Slow Living',
        days: '7-12 Days'
      }
    ]
  },
  {
    id: 'budget',
    title: 'What is your preferred daily budget per person?',
    subtitle: '100% of your stay and guide expenses go directly to local mountain families.',
    options: [
      {
        id: 'budget',
        icon: '🪙',
        label: 'Native Homestay & Backpacker (₹2,500 - ₹3,800 / day)',
        desc: 'Authentic village homestay, home-cooked woodfire chulha meals, shared local transit & local guidance.',
        badge: 'Value & Community'
      },
      {
        id: 'comfort',
        icon: '⭐',
        label: 'Boutique Pine Chalet & Heritage (₹4,500 - ₹7,500 / day)',
        desc: 'Private stone-and-cedar lodge, dedicated NIM certified trek guide, experiential workshops & taxi transit.',
        badge: 'Balanced Comfort'
      },
      {
        id: 'luxury',
        icon: '👑',
        label: 'Luxury Alpine Haven & Heli Option (₹8,000 - ₹16,000+ / day)',
        desc: 'Heated luxury glamping, private 4x4 SUV, organic gourmet Pahadi dining, priority darshan passes.',
        badge: 'Signature Luxury'
      }
    ]
  },
  {
    id: 'food',
    title: 'What mountain gastronomy experience excites you most?',
    subtitle: 'Uttarakhand has rich, health-giving millets, unique pulses, and centuries-old sweet making traditions.',
    options: [
      {
        id: 'native',
        icon: '🍲',
        label: 'Traditional Kumaoni & Garhwali Thali',
        desc: 'Freshly milled Mandua (Finger Millet) roti, Bhatt ki Churkani, Gahat Dal, Kafuli & Bhaang Ki Chutney.',
        badge: '100% Organic Farm'
      },
      {
        id: 'sweet',
        icon: '🍬',
        label: 'GI-Certified Bal Mithai & Singodi Trail',
        desc: 'Freshly roasted khoya fudge rolled in white sugar globules, and Singodi wrapped in fragrant Maalu leaves.',
        badge: 'Heritage Sweets'
      },
      {
        id: 'satvik',
        icon: '🪔',
        label: 'Sacred Satvik Prasadam & Herbal Teas',
        desc: 'Zero-onion-garlic nourishing temple food, freshly brewed Himalayan Tulsi, Rhododendron (Buransh) nectar.',
        badge: 'Pure & Healing'
      },
      {
        id: 'bakery',
        icon: '☕',
        label: 'Cozy Ridge Bakeries & Artisan Coffee',
        desc: 'Warm apple cinnamon crumbles, sticky ginger cake, fresh sourdough, and hot filter coffee overlooking peaks.',
        badge: 'Colonial & Modern'
      }
    ]
  }
];

// Rich Curated Suggestion Circuits
export const SUGGESTED_CIRCUITS = [
  {
    id: 'circuit-chopta-tungnath',
    title: 'Chopta, Tungnath & Deoriatal Sanctuary',
    region: 'Garhwal Alps (Rudraprayag)',
    archetype: 'The High-Altitude Mystic & Trekker',
    tagline: 'Mini Switzerland, Alpine Meadows & World’s Highest Shiva Temple',
    matchScore: 98,
    altitude: '2,680 m to 3,680 m',
    idealDays: '4 - 5 Days',
    approxCostPerPerson: 3800,
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    tags: ['trek', 'spiritual', 'snow', 'adventure', 'solo', 'friends'],
    moods: ['spiritual', 'adventure'],
    companions: ['solo', 'friends', 'couple'],
    durations: ['weekend', 'standard'],
    budgets: ['budget', 'comfort'],
    whyMatched: [
      'Perfect match for your craving for crisp 3,000m+ air, silent bugyal meadows, and panoramic 360° Himalayan peaks.',
      'Includes sacred sunrise trek to Tungnath (12,073 ft) and Chandrashila summit with views of Nanda Devi & Trishul.',
      'Stay in eco-homestays with solar heating and woodfire hearth cooking.'
    ],
    stayRecommendation: {
      name: 'Buransh Pine Eco-Lodge, Sari Village',
      type: 'Native Homestay with Woodfire Hearth',
      feature: 'Overlooks Chaukhamba reflection in Deoriatal Lake'
    },
    guideMatch: {
      name: 'Himanshu Negi',
      badge: 'NIM Certified High-Altitude Lead',
      rate: '₹2,200/day'
    },
    localDelicacy: 'Hot Mandua Roti with freshly churned Pahadi butter & Rhododendron flower squash',
    districtSpecialty: 'Handmade Woolen Tweed & Organic Himalayan Rajma (Rudraprayag)'
  },
  {
    id: 'circuit-kasar-jageshwar',
    title: 'Almora, Kasar Devi & Jageshwar Cosmic Belt',
    region: 'Cultural Heart of Kumaon (Almora)',
    archetype: 'The Soulful Seeker & Heritage Artisan',
    tagline: 'Ancient 9th-Century Stone Shrines, Geomagnetic Peace & Folk Arts',
    matchScore: 96,
    altitude: '1,638 m to 1,870 m',
    idealDays: '4 - 6 Days',
    approxCostPerPerson: 3200,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['spiritual', 'culture', 'artisan', 'romance', 'couple', 'family', 'solo'],
    moods: ['spiritual', 'culture', 'romance'],
    companions: ['solo', 'couple', 'family'],
    durations: ['weekend', 'standard', 'sabbatical'],
    budgets: ['budget', 'comfort'],
    whyMatched: [
      'Tailored for inner calm, historic architecture, and direct creative connection with mountain folk masters.',
      'Visit the 124 sacred stone temples of Jageshwar hidden deep inside an ancient deodar forest.',
      'Meditate at Kasar Devi (Van Allen radiation belt, shared with Machu Picchu and Stonehenge).'
    ],
    stayRecommendation: {
      name: 'Kasaar Deodar Heritage Cottage',
      type: 'Stone & Pine Architecture Homestay',
      feature: '360° sunset views over Trishul & Panchachuli peaks'
    },
    guideMatch: {
      name: 'Prakash Chandra Pant',
      badge: 'Kumaon Cultural Historian & Heritage Walk Leader',
      rate: '₹1,800/day'
    },
    localDelicacy: 'GI-Certified Almora Bal Mithai & hot Bhatt ki Churkani thali',
    districtSpecialty: 'Hand-hammered Pure Copper Water Vessels from Tamta Mohalla & Aipan Canvas'
  },
  {
    id: 'circuit-auli-joshimath',
    title: 'Auli, Joshimath & Gorson Bugyal',
    region: 'Chamoli High Garhwal',
    archetype: 'The Alpine Snow & Alpenglow Connoisseur',
    tagline: 'India’s Premier Ski Slopes & Unbroken 180° Nanda Devi Panorama',
    matchScore: 94,
    altitude: '2,800 m to 3,050 m',
    idealDays: '4 - 5 Days',
    approxCostPerPerson: 6500,
    coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    tags: ['snow', 'adventure', 'romance', 'scenic', 'couple', 'friends'],
    moods: ['adventure', 'romance'],
    companions: ['couple', 'friends'],
    durations: ['standard', 'weekend'],
    budgets: ['comfort', 'luxury'],
    whyMatched: [
      'Ideal for couples and mountain lovers wanting majestic snow vistas and exhilarating alpine cable cars.',
      'Ride the 4 km Asia-longest ropeway from Joshimath directly into glistening alpine meadows.',
      'Snow sports in winter, blooming wildflower carpets in summer, and cozy heated chalet stays.'
    ],
    stayRecommendation: {
      name: 'Cliff Top Alpine Chalet, Upper Auli',
      type: 'Luxury Pine Glamping Lodge',
      feature: 'Floor-to-ceiling glass wall facing Nanda Devi peak'
    },
    guideMatch: {
      name: 'Sunita Rawat',
      badge: 'Garhwal Women-Led Alpine Trekking Guide',
      rate: '₹2,500/day'
    },
    localDelicacy: 'Warm Kafuli (spinach-fenugreek curry) with Jhangora (barnyard millet) and hot chai',
    districtSpecialty: 'Chamoli Handloom Sheep Wool Shawls & Ringal Bamboo Baskets'
  },
  {
    id: 'circuit-rishikesh-devprayag',
    title: 'Rishikesh, Shivpuri & Devprayag Confluence',
    region: 'Ganges Valley (Tehri & Pauri Garhwal)',
    archetype: 'The River Soul & Dynamic Explorer',
    tagline: 'Sacred Confluences, White-Water River Rapids & Sunset Aartis',
    matchScore: 93,
    altitude: '372 m to 830 m',
    idealDays: '3 - 4 Days',
    approxCostPerPerson: 3499,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    tags: ['spiritual', 'adventure', 'family', 'friends', 'weekend'],
    moods: ['spiritual', 'adventure', 'family'],
    companions: ['friends', 'family', 'solo', 'couple'],
    durations: ['weekend', 'standard'],
    budgets: ['budget', 'comfort'],
    whyMatched: [
      'Matches short getaway desires with rapid access, vibrant aarti bells, and adrenaline river rafting.',
      'Stand at Devprayag where Bhagirathi and Alaknanda visibly merge in two distinct shades of blue to form the holy Ganga.',
      'Experience evening Aarti at Parmarth Niketan or Triveni Ghat with Vedic river hymns.'
    ],
    stayRecommendation: {
      name: 'Ganga Kuteer Riverside Ashram Retreat',
      type: 'Riverside Eco-Resort',
      feature: 'Direct private stone steps to clean sandy Ganges beach'
    },
    guideMatch: {
      name: 'Arvind Goswami',
      badge: 'Sacred Shrine & Yatra Logistics Master',
      rate: '₹1,500/day'
    },
    localDelicacy: 'Garhwali Gahat (Horsegram) ke Paranthe with fresh mint hemp chutney',
    districtSpecialty: 'Rishikesh Hand-rolled Herbal Incense & Tehri Soni Crafts'
  },
  {
    id: 'circuit-nainital-mukteshwar',
    title: 'Nainital, Mukteshwar & Peora Fruit Orchards',
    region: 'Kumaon Lake District (Nainital)',
    archetype: 'The Gentle Lake & Pine Haven',
    tagline: 'Emerald Lakes, Quaint Colonial Corners & Fruit Tree Valleys',
    matchScore: 92,
    altitude: '2,084 m to 2,286 m',
    idealDays: '3 - 5 Days',
    approxCostPerPerson: 4200,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['romance', 'family', 'scenic', 'couple', 'family'],
    moods: ['romance', 'family'],
    companions: ['couple', 'family'],
    durations: ['weekend', 'standard'],
    budgets: ['comfort', 'luxury', 'budget'],
    whyMatched: [
      'Designed for family ease and romantic relaxation with gentle walks and cool deodar shade.',
      'Sail classical wooden boats across emerald Naini Lake and visit the ancient Mukteshwar Dham (350-year-old Shiva temple).',
      'Walk through plum and apricot orchards in serene Peora away from all city clamor.'
    ],
    stayRecommendation: {
      name: 'Orchard Retreat Peora',
      type: 'Colonial Stone Cottage & Organic Farm',
      feature: 'Freshly baked apple crisps with view of Nanda Kot'
    },
    guideMatch: {
      name: 'Prakash Chandra Pant',
      badge: 'Heritage & Lake Guide',
      rate: '₹1,600/day'
    },
    localDelicacy: 'Hot Singodi sweet wrapped in fresh Maalu leaf & Dubke with Bhatia dal',
    districtSpecialty: 'Handmade Scented Botanical Candles & Fruit Jams (Nainital)'
  },
  {
    id: 'circuit-munsiyari-johar',
    title: 'Munsiyari, Johar Valley & Khaliya Top',
    region: 'Pithoragarh Border Valley',
    archetype: 'The Raw Himalayan Explorer & Tribal Weaver',
    tagline: 'Five Sacred Horns (Panchachuli), Ancient Silk Route & Alpine Treks',
    matchScore: 95,
    altitude: '2,200 m to 3,500 m',
    idealDays: '6 - 9 Days',
    approxCostPerPerson: 3600,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['trek', 'culture', 'offbeat', 'adventure', 'solo', 'friends'],
    moods: ['adventure', 'culture'],
    companions: ['solo', 'friends'],
    durations: ['standard', 'sabbatical'],
    budgets: ['budget', 'comfort'],
    whyMatched: [
      'Matches those seeking untouched offbeat majesty, raw peaks, and rich indigenous Tibetan-border history.',
      'Wake up face-to-face with the towering Panchachuli peaks (The Five Cooking Hearths of the Pandavas).',
      'Meet indigenous Bhotia women weavers crafting traditional Chutka and Thulma sheep wool blankets.'
    ],
    stayRecommendation: {
      name: 'Johar High Mountain Homestay, Sarmoli',
      type: 'Community-Run Women Homestay',
      feature: 'Authentic stone hearth with homemade Bhatt ki Churkani'
    },
    guideMatch: {
      name: 'Himanshu Negi',
      badge: 'High Altitude Expedition Leader',
      rate: '₹2,400/day'
    },
    localDelicacy: 'Munsiyari Organic White Rajma, Jhula grass seasoning & Maduwa roti',
    districtSpecialty: 'Pure Bhotia Yak & Sheep Wool Handwoven Blankets (GI Tagged)'
  },
  {
    id: 'circuit-corbett-pangot',
    title: 'Jim Corbett & Pangot Misty Forest',
    region: 'Nainital & Pauri Foothills',
    archetype: 'The Wilderness Naturalist & Bird Chaser',
    tagline: 'Royal Bengal Tiger Sal Groves & 500+ Rare Himalayan Birds',
    matchScore: 91,
    altitude: '400 m to 1,984 m',
    idealDays: '3 - 5 Days',
    approxCostPerPerson: 4800,
    coverImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    tags: ['wildlife', 'nature', 'photography', 'family', 'friends'],
    moods: ['wildlife', 'family'],
    companions: ['family', 'friends', 'couple'],
    durations: ['weekend', 'standard'],
    budgets: ['comfort', 'luxury'],
    whyMatched: [
      'A haven for wildlife lovers, photographers, and families eager for open-top 4x4 safaris.',
      'Explore the historic Dhikala and Bijrani zones along the pristine Ramganga river.',
      'Quiet birding hideouts in Pangot with Koklass and Cheer pheasants calling at dawn.'
    ],
    stayRecommendation: {
      name: 'Wilderness River Lodge, Marchula',
      type: 'Eco-Resort on Ramganga River Bank',
      feature: 'Open-air starlight dinners and morning bird walks'
    },
    guideMatch: {
      name: 'Deepa Joshi',
      badge: 'Flora, Herbs & Himalayan Birding Naturalist',
      rate: '₹2,000/day'
    },
    localDelicacy: 'Kumaoni Nimbu Sanan (mustard yogurt lemon salad) with fresh jaggery',
    districtSpecialty: 'Wild Forest Honey & Aromatic Lemongrass Oil'
  },
  {
    id: 'circuit-mana-badrinath',
    title: 'Badrinath Dham & Mana - The First Indian Village',
    region: 'Alaknanda High Valley (Chamoli)',
    archetype: 'The Mythic Pilgrim & Border Explorer',
    tagline: 'Abode of Lord Badri, Saraswati Gorge & Vyas Gufa',
    matchScore: 97,
    altitude: '3,300 m to 3,800 m',
    idealDays: '5 - 7 Days',
    approxCostPerPerson: 8200,
    coverImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    tags: ['spiritual', 'heritage', 'culture', 'family', 'sabbatical'],
    moods: ['spiritual', 'culture', 'family'],
    companions: ['family', 'couple', 'solo'],
    durations: ['standard', 'sabbatical'],
    budgets: ['comfort', 'luxury'],
    whyMatched: [
      'A deeply sacred and culturally rich circuit nestled between Nar and Narayan mountain ranges.',
      'Savor herbal chai at "India’s First Tea Shop" right at the Indo-Tibetan border in Mana village.',
      'Walk across Bhim Pul, a massive natural monolithic stone bridge laid over the roaring Saraswati river.'
    ],
    stayRecommendation: {
      name: 'Badri Narayan Alpine Retreat',
      type: 'Heated Pilgrim Guest House',
      feature: 'Direct early morning view of Neelkanth pyramid peak'
    },
    guideMatch: {
      name: 'Arvind Goswami',
      badge: 'Sacred Shrine & Yatra Logistics Master',
      rate: '₹2,000/day'
    },
    localDelicacy: 'Badri Cow Ghee Khichdi with local Himalayan rock salt & roasted hemp seeds',
    districtSpecialty: 'Handspun Bhotia Tweed Ponchos & Badri Tulsi Garlands'
  }
];

// Secret Gems for the "Surprise Me 🎲" feature
export const SECRET_OFFBEAT_GEMS = [
  {
    id: 'gem-khirsu',
    title: 'Khirsu Village - The Silent Oak & Apple Glade',
    district: 'Pauri Garhwal',
    altitude: '1,700 m',
    tagline: 'Zero crowds, dense deodar-oak forests, and a panoramic view of 300 Himalayan peaks.',
    bestFor: 'Writing, Meditation & Solitude',
    stay: 'Forest Rest House & Apple Orchard Homestay',
    cost: '₹2,200 / day',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gem-chaukori',
    title: 'Chaukori - Tea Gardens in the Shadow of Nanda Devi',
    district: 'Pithoragarh',
    altitude: '2,010 m',
    tagline: 'Emerald tea plantations surrounded by fruit orchards with unobstructed sunrise over Trishul.',
    bestFor: 'Romantic Sunrise & Tea Lovers',
    stay: 'Chaukori Pine Cottages',
    cost: '₹2,800 / day',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gem-harsil',
    title: 'Harsil Valley - The Apple & Cedar Haven of Bhagirathi',
    district: 'Uttarkashi',
    altitude: '2,620 m',
    tagline: 'Wooden carved post offices, rushing glacial streams, and crisp Wilson apples along the Gangotri route.',
    bestFor: 'Nature Photography & Mountain Cycling',
    stay: 'Bhagirathi Wood Chalet',
    cost: '₹3,400 / day',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gem-kanatal',
    title: 'Kanatal & Kaudia Forest - The Cloud Mist Ridge',
    district: 'Tehri Garhwal',
    altitude: '2,590 m',
    tagline: 'Floating above the clouds with direct jeep trails into Kaudia forest sanctuary and Surkanda Devi shrine.',
    bestFor: 'Quick Weekend Chill & Starlight Tents',
    stay: 'Alpine Starlight Glamping',
    cost: '₹3,100 / day',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80'
  }
];

// Matching algorithm to calculate customized match score
export function matchCircuits(answers) {
  const { mood = 'spiritual', companions = 'couple', duration = 'standard', budget = 'comfort' } = answers;

  return SUGGESTED_CIRCUITS.map(circuit => {
    let score = 70; // baseline

    // Mood match (+15)
    if (circuit.moods.includes(mood)) {
      score += 15;
    }

    // Companions match (+8)
    if (circuit.companions.includes(companions)) {
      score += 8;
    }

    // Duration match (+4)
    if (circuit.durations.includes(duration)) {
      score += 4;
    }

    // Budget match (+3)
    if (circuit.budgets.includes(budget)) {
      score += 3;
    }

    // Cap between 82 and 99
    const finalScore = Math.min(99, Math.max(82, score));
    return {
      ...circuit,
      calculatedScore: finalScore
    };
  }).sort((a, b) => b.calculatedScore - a.calculatedScore);
}
