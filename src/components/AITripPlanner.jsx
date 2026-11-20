import React, { useState } from 'react';
import { 
  Sparkles, IndianRupee, Calendar, Users, Compass, 
  CheckCircle2, ArrowRight, Download, Printer, ShieldCheck, 
  HeartHandshake, MapPin, AlertCircle, TrendingUp, Zap, ChevronDown, Check 
} from 'lucide-react';

export default function AITripPlanner({ onBookGeneratedPlan, initialBudget = 25000 }) {
  const [budget, setBudget] = useState(initialBudget);
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState('couple');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [interest, setInterest] = useState('crafts-and-culture');
  const [pace, setPace] = useState('balanced');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const budgetPresets = [
    { label: '₹8,000 Backpacker', value: 8000 },
    { label: '₹18,000 Explorer', value: 18000 },
    { label: '₹35,000 Cultural Duo', value: 35000 },
    { label: '₹65,000 Family Heritage', value: 65000 },
    { label: '₹1,20,000 Luxury Retreat', value: 120000 },
  ];

  const DESTINATION_OPTIONS = [
    { id: 'all', label: 'All Uttarakhand (AI Best Circuit)', region: 'Garhwal & Kumaon', icon: '✨', badge: 'Auto-Optimized' },
    { id: 'chopta', label: 'Chopta, Tungnath & Chandrashila', region: 'Garhwal Alps (2,680m)', icon: '🏔️', badge: 'Trek & Meadows' },
    { id: 'almora', label: 'Almora, Kasar Devi & Binsar', region: 'Kumaon Cultural Heart', icon: '🎨', badge: 'Aipan & Copper' },
    { id: 'rishikesh', label: 'Rishikesh & Haridwar', region: 'Ganges Valley', icon: '🧘', badge: 'Aarti & Rafting' },
    { id: 'auli', label: 'Auli & Joshimath', region: 'Chamoli (3,050m)', icon: '⛷️', badge: 'Snow Slopes & Ropeway' },
    { id: 'nainital', label: 'Nainital, Bhimtal & Mukteshwar', region: 'Lake District', icon: '🛶', badge: 'Lakes & Bakeries' },
    { id: 'corbett', label: 'Jim Corbett National Park', region: 'Ramnagar Tiger Belt', icon: '🐅', badge: 'Wildlife Safari' },
    { id: 'kedarnath', label: 'Kedarnath Dham & Valley', region: 'Mandakini Gorge (3,584m)', icon: '🕉️', badge: 'Sacred Pilgrimage' },
    { id: 'munsiyari', label: 'Munsiyari & Panchachuli', region: 'Johar High Valley', icon: '🏔️', badge: '5 Peaks & Weavers' },
    { id: 'valleyofflowers', label: 'Valley of Flowers & Hemkund', region: 'UNESCO Biosphere', icon: '🌸', badge: 'Wild Alpine Flora' },
    { id: 'mussoorie', label: 'Mussoorie & Landour', region: 'Garhwal Ridge', icon: '🌲', badge: 'Colonial Trails & Pines' }
  ];

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setGenerationStep(0);

    const destLabel = DESTINATION_OPTIONS.find(d => d.id === selectedDestination)?.label || 'Uttarakhand';

    const steps = [
      `Analyzing ₹${budget.toLocaleString('en-IN')} budget for ${duration} days in ${destLabel}...`,
      'Matching authentic local homestays and mountain cottages...',
      'Integrating master artisan workshops & direct studio sessions...',
      'Curating authentic Pahadi food stops & sweet trails...',
      'Finalizing mountain passes, SDRF eco-coverage & GPS coordinates...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setGenerationStep(current);
      } else {
        clearInterval(interval);
        compileAIItinerary();
        setIsGenerating(false);
      }
    }, 400);
  };

  const compileAIItinerary = () => {
    const travelersCount = travelers === 'solo' ? 1 : travelers === 'couple' ? 2 : 4;
    const effectiveBudget = budget;

    const stayPct = 0.35;
    const transportPct = 0.25;
    const foodPct = 0.18;
    const artisanPct = 0.14;
    const permitsPct = 0.08;

    const stayCost = Math.round(effectiveBudget * stayPct);
    const transportCost = Math.round(effectiveBudget * transportPct);
    const foodCost = Math.round(effectiveBudget * foodPct);
    const artisanCost = Math.round(effectiveBudget * artisanPct);
    const permitsCost = Math.round(effectiveBudget * permitsPct);
    const totalAllocated = stayCost + transportCost + foodCost + artisanCost + permitsCost;
    const savings = Math.max(0, effectiveBudget - totalAllocated);

    let title = '';
    let summary = '';
    let route = [];
    let dailyDays = [];

    // 1. Destination-Specific Plans
    if (selectedDestination === 'chopta') {
      title = `${duration}-Day Chopta, Tungnath & Chandrashila Alpine Expedition`;
      summary = `A high-altitude alpine adventure hiking through scarlet rhododendron forests, camping on Chopta's meadows (2,680m), darshan at the world's highest Shiva shrine (Tungnath, 3,680m), and 360° summit views at Chandrashila (4,000m).`;
      route = ['Rishikesh', 'Devprayag Sangam', 'Sari Village', 'Deoriatal Reflection Lake', 'Chopta Meadow', 'Tungnath Shiva Shrine', 'Chandrashila Peak'];
      dailyDays = [
        {
          day: 1,
          title: 'Arrival in Rishikesh & Foothills Acclimatization',
          morning: 'Arrive in Rishikesh/Haridwar. Drive along the holy Ganges to Shivpuri riverside camp.',
          afternoon: 'Acclimatization walk along the white sand riverbanks and evening tea with Pahadi snacks.',
          evening: 'Attend the peaceful Ganga Aarti with floating lamps and Vedic hymns.',
          stay: 'Riverside Eco-Camp (Shivpuri)',
          foodHighlight: 'Wood-fired Pahadi Daal and organic salad',
          artisanHighlight: 'River clay pottery & brass temple bells'
        },
        {
          day: 2,
          title: 'Devprayag Sangam to Sari Village & Deoria Tal',
          morning: 'Drive past Devprayag (holy confluence of Alaknanda & Bhagirathi). Ascend into pine and oak hills.',
          afternoon: 'Reach Sari village (2,000m). Hike 2.5 km to Deoria Tal, a pristine lake mirroring Chaukhamba peaks.',
          evening: 'Traditional Garhwali homestay dinner cooked over wood fire with local host family.',
          stay: 'Sari Village Stone Homestay',
          foodHighlight: 'Chainsoo (slow-cooked black gram) with Mandua Roti & Pahadi Ghee',
          artisanHighlight: 'Garhwali Likai hand-carved cedar wooden window frames'
        },
        {
          day: 3,
          title: 'Chopta Alpine Meadows & Camp Settlement',
          morning: 'Short drive to Chopta (2,680m), the Switzerland of Uttarakhand.',
          afternoon: 'Explore rolling high-altitude bugyals, spot Himalayan Monal birds, and set up alpine tents.',
          evening: 'Sunset over Chaukhamba massif followed by hot mountain soup and stargazing.',
          stay: 'Chopta Eco Dome Glamping',
          foodHighlight: 'Steaming Garhwali Jhol Dal with Red Rice',
          artisanHighlight: 'Hand-knitted sheep wool beanies and gloves'
        },
        {
          day: 4,
          title: 'Summit Push: Tungnath Temple (3,680m) & Chandrashila (4,000m)',
          morning: 'Early 4:30 AM alpine climb through rhododendron groves to Tungnath, the highest of the Panch Kedars.',
          afternoon: 'Push to Chandrashila peak (4,000m) for jaw-dropping 360° panoramas of Nanda Devi, Trishul, and Kedarnath.',
          evening: 'Descent back to Chopta camp for celebratory ginger chai and folk songs.',
          stay: 'Chopta Eco Dome Glamping',
          foodHighlight: 'Hot Pahadi Rajma with spicy timur chutney',
          artisanHighlight: 'Carved miniature cedar wood Trishuls'
        },
        {
          day: 5,
          title: 'Ukhimath Sacred Winter Seat & Return Journey',
          morning: 'Visit Omkareshwar Temple in Ukhimath, the winter residence of Kedarnath and Madhyamaheshwar deities.',
          afternoon: 'Scenic descent along Mandakini river towards Rishikesh / Haridwar.',
          evening: 'Drop-off at Haridwar / Dehradun for onward flight or train.',
          stay: 'Departure',
          foodHighlight: 'Garhwali Koda (Finger Millet) poori with Aloo Gutuk',
          artisanHighlight: 'Pahadi wild honey & Jakhiya seeds'
        }
      ];
    } else if (selectedDestination === 'almora') {
      title = `${duration}-Day Almora Cultural Guilds & Kasar Devi Mystic Trail`;
      summary = `Immerse in Kumaon’s cultural capital: hands-on sacred Aipan painting with master artisan Meenakshi Joshi, 4th-gen copper craft in Tamta Mohalla, geomagnetic meditation on Crank's Ridge, and 124 ancient stone shrines of Jageshwar Dham.`;
      route = ['Kathgodam', 'Almora Paltan Bazar', 'Tamta Mohalla', 'Kasar Devi Ridge', 'Binsar Sanctuary', 'Jageshwar Dham'];
      dailyDays = [
        {
          day: 1,
          title: 'Scenic Foothills Drive to Almora Ridge',
          morning: 'Arrive at Kathgodam / Pantnagar. Drive through green pine forests ascending to Almora (1,638m).',
          afternoon: 'Check in to a heritage stone cottage at Kasar Devi ridge overlooking the snow peaks.',
          evening: 'Walk to Kasar Devi temple, known for its geomagnetic planetary belt shared with Stonehenge and Machu Picchu.',
          stay: 'Kasar Devi Stone Heritage Cottage',
          foodHighlight: 'Warm Pahadi Ginger-Cardamom Chai & Roasted Bhutta',
          artisanHighlight: 'Handmade pine cone crafts & mountain journals'
        },
        {
          day: 2,
          title: 'Almora Paltan Bazar & Sacred Aipan Painting Masterclass',
          morning: 'Stroll through Almora’s 500-year-old stone paved Paltan Bazar. Meet master artisan Meenakshi Joshi.',
          afternoon: '3-Hour Sacred Aipan Workshop: Learn to paint with red geru clay and white rice paste. Paint your own Chowki panel.',
          evening: 'Visit 150-year-old Kheem Singh Mohan Singh shop for warm Bal Mithai coated with sugar beads and Singodi in Maalu leaf.',
          stay: 'Kasar Devi Stone Heritage Cottage',
          foodHighlight: 'Authentic Almora Bal Mithai and Singodi',
          artisanHighlight: 'Your personal painted Aipan Chowki wooden panel'
        },
        {
          day: 3,
          title: 'Tamta Mohalla Coppersmiths & 9th-Century Katarmal Sun Temple',
          morning: 'Visit Tamta Mohalla to meet 4th-generation coppersmith Harish Tamta. Watch manual hammer forging of pure Ayurvedic carafes.',
          afternoon: 'Excursion to Katarmal Sun Temple, second only to Konark, renowned for ancient stone sculptures.',
          evening: 'Dinner at Pahadi Rasoi: Bhatt ki Churkani, Mandua ki Roti, and Kumaoni Raita with spicy mustard.',
          stay: 'Kasar Devi Stone Heritage Cottage',
          foodHighlight: 'Slow-cooked Bhatt ki Churkani with red rice and white butter',
          artisanHighlight: 'Direct purchase of certified hand-beaten copperware'
        },
        {
          day: 4,
          title: 'Ancient Cedar Forests of Jageshwar Dham (124 Stone Shrines)',
          morning: 'Drive through thick Deodar valleys to Jageshwar Dham, a sacred 8th-century temple complex of 124 stone temples.',
          afternoon: 'Forest bathing walk along the Jataganga stream. Picnic lunch with local hemp seed chutney (Bhang ki Chutney).',
          evening: 'Sunset over Trishul and Nanda Devi peaks from Binsar Zero Point.',
          stay: 'Binsar Eco Village Retreat',
          foodHighlight: 'Pahadi Gahat (Horsegram) Parantha with mint dip',
          artisanHighlight: 'Sacred Rudraksha malas and cedar incense'
        },
        {
          day: 5,
          title: 'Binsar Women’s Organic Collective & Return Journey',
          morning: 'Visit Binsar Mahila Self-Help Collective. Learn how wild Jakhiya spices and Buransh flowers are harvested.',
          afternoon: 'Sample fresh Buransh juice and organic apricot oils before descent towards Kathgodam.',
          evening: 'Board train or car transfer at Kathgodam Railway Station.',
          stay: 'Departure',
          foodHighlight: 'Pahadi Jhangora (Barnyard Millet) Kheer',
          artisanHighlight: 'Safe packaging of all certified souvenirs'
        }
      ];
    } else if (selectedDestination === 'rishikesh') {
      title = `${duration}-Day Rishikesh & Haridwar Sacred Ganges & Wellness Yatra`;
      summary = `Experience the spiritual heart of Uttarakhand: VIP front-row seating at Triveni Ghat Maha Aarti, Grade-III river rafting on the Ganges, Beatles Ashram meditation, and organic Ayurvedic dining in Tapovan.`;
      route = ['Haridwar Har Ki Pauri', 'Rishikesh Ram Jhula', 'Beatles Ashram', 'Shivpuri Ganga Rapids', 'Triveni Ghat VIP Aarti', 'Vashistha Cave'];
      dailyDays = [
        {
          day: 1,
          title: 'Haridwar Har Ki Pauri & River Sanctity',
          morning: 'Arrival in Haridwar. Check in to heritage riverside retreat.',
          afternoon: 'Explore historic Mansa Devi ropeway and sacred bathing ghats.',
          evening: 'Witness the world-famous Ganga Aarti at Har Ki Pauri with 10,000 floating lamps and echoing conch shells.',
          stay: 'Haridwar Heritage Ganges Haveli',
          foodHighlight: 'Famous Haridwar crispy kachori with potato curry',
          artisanHighlight: 'Pure brass camphor lamps and temple bells'
        },
        {
          day: 2,
          title: 'Rishikesh Ram Jhula & Iconic Beatles Ashram',
          morning: 'Drive 40 mins to Rishikesh. Check into boutique Tapovan retreat overlooking the suspension bridge.',
          afternoon: 'Explore Maharishi Mahesh Yogi’s Beatles Ashram (Chaurasi Kutia) adorned with vibrant psychedelic graffiti.',
          evening: 'Sunset sound healing session with Tibetan singing bowls near Lakshman Jhula.',
          stay: 'Tapovan Riverside Haven',
          foodHighlight: 'Ayurvedic Sattvic Thali with fresh mint and tulsi tea',
          artisanHighlight: 'Rudraksha beads & certified gemstone malas'
        },
        {
          day: 3,
          title: 'White Water Rafting on Ganges & Neer Garh Waterfall',
          morning: 'Gear up for 16 km Grade-III white water rafting from Shivpuri through Roller Coaster and Club House rapids.',
          afternoon: 'Hike to Neer Garh cascade for a dip in turquoise mountain spring pools.',
          evening: 'VIP front-row seating at Triveni Ghat Maha Aarti arranged by PahadiVibe concierges.',
          stay: 'Tapovan Riverside Haven',
          foodHighlight: 'Chotiwala Royal Feast with Pahadi Dal and Gulab Jamun',
          artisanHighlight: 'Ganges clay diyas and natural river incense'
        },
        {
          day: 4,
          title: 'Vashistha Cave Meditation & Organic Farm Cooking',
          morning: 'Early morning meditation at the subterranean Swami Vashistha Gufa, nestled under ancient banyan trees.',
          afternoon: 'Visit a local organic farm in Narendra Nagar. Learn to cook Pahadi Aloo ke Gutke with mustard oil.',
          evening: 'Quiet riverside bonfire under starlit Himalayan foothills.',
          stay: 'Tapovan Riverside Haven',
          foodHighlight: 'Pahadi Aloo Gutuk with fresh cucumber raita',
          artisanHighlight: 'Himalayan essential oils and lemongrass hydrosol'
        },
        {
          day: 5,
          title: 'Morning Yoga by the Ghats & Departure',
          morning: 'Sunrise Hatha yoga session on the sandy riverbank with a certified master.',
          afternoon: 'Souvenir shopping for pure organic spices and Khadi fabrics.',
          evening: 'Transfer to Dehradun Jolly Grant Airport or Haridwar station.',
          stay: 'Departure',
          foodHighlight: 'Fresh pomegranate juice & Ayurvedic herbal biscuits',
          artisanHighlight: 'Certified organic Himalayan chamomile tea'
        }
      ];
    } else if (selectedDestination === 'auli') {
      title = `${duration}-Day Auli Snow Slopes & Joshimath High Himalayan Trail`;
      summary = `Marvel at the towering peaks of Nanda Devi, Kamet and Dunagiri. Ride Asia's highest and longest cable car (ropeway), hike through alpine bugyals of Gorson, and explore the ancient Adi Shankaracharya Math in Joshimath.`;
      route = ['Rishikesh', 'Joshimath Ancient Math', 'Auli Ropeway', 'Gorson Bugyal', 'Nanda Devi Viewpoint', 'Tapovan Hot Springs'];
      dailyDays = [
        {
          day: 1,
          title: 'Ascent to the Sacred Valley of Joshimath',
          morning: 'Scenic mountain drive from Rishikesh/Haridwar through Rudraprayag and Chamoli along the Alaknanda river.',
          afternoon: 'Check in at Joshimath (1,890m), the ancient winter seat of Badrinath and gateway to peaks.',
          evening: 'Visit the 1,200-year-old Kalpavriksha tree and Shankaracharya Math with evening temple chants.',
          stay: 'Joshimath Alpine Lodge',
          foodHighlight: 'Garhwali Kafuli (spinach-fenugreek curry) with hot rice',
          artisanHighlight: 'Bhotia sheep-wool handwoven blankets (Pankhi)'
        },
        {
          day: 2,
          title: 'Auli Ropeway Ride & Panoramic Nanda Devi Vista',
          morning: 'Board the 4 km Auli cable car (Asia’s highest ropeway) rising from Joshimath to Auli (3,050m).',
          afternoon: 'Check in to pine ski cottages overlooking India’s second highest peak, Nanda Devi (7,816m).',
          evening: 'Stroll around the artificial snow reservoir and watch golden alpenglow illuminate Dunagiri and Hathi Parbat.',
          stay: 'Auli Pine Ski Cottage',
          foodHighlight: 'Steaming Garhwali Jhol Dal with local red rice',
          artisanHighlight: 'Hand-knitted Himalayan woolen socks and caps'
        },
        {
          day: 3,
          title: 'Trek to Gorson Bugyal Alpine Meadow (3,519m)',
          morning: '3 km moderate hike through oak and deodar forests to Gorson Bugyal, a vast undulating alpine meadow.',
          afternoon: 'Picnic lunch at the meadow surrounded by 180° amphitheater of 7,000m peaks.',
          evening: 'Sunset bonfire with hot Pahadi tea and mountain stories from local NIM trek leader Arjun Negi.',
          stay: 'Auli Pine Ski Cottage',
          foodHighlight: 'Hot Pahadi Rajma with spicy wild timur pepper',
          artisanHighlight: 'Hand-carved wooden prayer wheels'
        },
        {
          day: 4,
          title: 'Tapovan Natural Sulphur Hot Springs & Village Walk',
          morning: 'Drive 14 km to Tapovan hot springs where natural mineral water bubbles from mountain rocks.',
          afternoon: 'Visit a traditional Garhwali stone village to observe traditional terrace farming and water mills.',
          evening: 'Dinner with local village elders sampling slow-cooked mountain mutton or roasted mushrooms.',
          stay: 'Joshimath Alpine Lodge',
          foodHighlight: 'Pahadi Gahat ke Paranthe with freshly churned butter',
          artisanHighlight: 'Pure Himalayan Shilajit and saffron'
        },
        {
          day: 5,
          title: 'Scenic Alaknanda Descent to Dehradun / Haridwar',
          morning: 'Early morning sunrise view over Trishul peaks. Begin descent along the river gorge.',
          afternoon: 'Lunch stop at Srinagar Garhwal for river trout or local thali.',
          evening: 'Arrival at Dehradun Airport or Haridwar Junction for departure.',
          stay: 'Departure',
          foodHighlight: 'Garhwali Bal Mithai and sweet Arsa',
          artisanHighlight: 'Packed Himalayan rock salt and organic lentils'
        }
      ];
    } else if (selectedDestination === 'nainital') {
      title = `${duration}-Day Nainital Lakes & Mukteshwar Orchard Heritage`;
      summary = `Glide on emerald mountain waters of Naini Lake, visit Naina Devi shrine, relish apple crumble at Sakley's Mountain Bakery, and explore fruit orchards and cliff viewpoints of Mukteshwar and Chauli ki Jali.`;
      route = ['Kathgodam', 'Naini Lake', 'Naina Devi Temple', 'Bhimtal Island', 'Mukteshwar Dham', 'Chauli ki Jali'];
      dailyDays = [
        {
          day: 1,
          title: 'Arrival in Nainital Lake District',
          morning: 'Arrive at Kathgodam. Scenic 1-hour drive through pine ridges up to Nainital (2,084m).',
          afternoon: 'Check into heritage lakeview lodge. Wooden sailboat cruise across the emerald waters of Naini Lake.',
          evening: 'Sunset walk along Mall Road, visit Naina Devi shrine, and taste hot roasted corn with lemon salt.',
          stay: 'Nainital Heritage Pine Lodge',
          foodHighlight: 'Warm Apple Crumble & Hot Chocolate at Sakley’s Mountain Cafe',
          artisanHighlight: 'Artisanal carved scented candles of Nainital'
        },
        {
          day: 2,
          title: 'Bhimtal Island Lake & Traditional Pahadi Kitchen',
          morning: 'Drive 22 km to serene Bhimtal with its iconic central lake island and ancient aquarium.',
          afternoon: 'Lunch at Pahadi Rasoi in Bhowali: Bhatt ki Churkani, Mandua ki Roti, and Kumaoni mustard raita.',
          evening: 'Stroll around Naukuchiatal (nine-cornered lake) known for kayaking and migratory birds.',
          stay: 'Bhimtal Lakeside Stone Villa',
          foodHighlight: 'Slow-cooked Bhatt ki Churkani and Gahat Parantha',
          artisanHighlight: 'Locally hand-knitted woolen cardigans & shawls'
        },
        {
          day: 3,
          title: 'Mukteshwar Ridge & Chauli ki Jali Rock Cliffs',
          morning: 'Scenic climb through apple, plum, and peach orchards to Mukteshwar (2,286m).',
          afternoon: 'Visit the 350-year-old Mukteshwar Dham Shiva temple and walk to dramatic rock cliffs at Chauli ki Jali.',
          evening: 'Panorama of snow peaks (Trishul, Nanda Devi, Panchachuli) followed by organic orchard dinner.',
          stay: 'Mukteshwar Apple Orchard Retreat',
          foodHighlight: 'Farm-fresh apricot pie and wild thyme roasted potatoes',
          artisanHighlight: 'Wild apricot scrub and cold-pressed Himalayan oils'
        },
        {
          day: 4,
          title: 'Himadri State Emporium & Organic Fruit Processing',
          morning: 'Visit local women’s fruit cooperative to taste wild rhododendron jelly and mountain gooseberry jam.',
          afternoon: 'Visit Himadri Handloom & Handicrafts Emporium to shop certified Aipan panels and Pashmina.',
          evening: 'Bonfire with local Kumaoni folk music in orchard gardens.',
          stay: 'Mukteshwar Apple Orchard Retreat',
          foodHighlight: 'Kumaoni Singodi wrapped in fragrant Maalu leaf',
          artisanHighlight: 'Certified Himadri GI-tagged woolens and Aipan paintings'
        },
        {
          day: 5,
          title: 'Pines Descent to Kathgodam',
          morning: 'Morning birdwatching walk through deodar canopy. Pack jars of homemade jams.',
          afternoon: 'Scenic descent through Bhowali fruit market to Kathgodam.',
          evening: 'Board afternoon Shatabdi / flight for return trip.',
          stay: 'Departure',
          foodHighlight: 'Pahadi Jhangora kheer & fresh hill fruits',
          artisanHighlight: 'Crates of organic mountain apples and jams'
        }
      ];
    } else if (selectedDestination === 'corbett') {
      title = `${duration}-Day Jim Corbett Royal Wildlife & Kosi River Safaris`;
      summary = `Venture into India's oldest national park: open 4x4 Gypsy safaris in Dhikala & Bijrani zones, track wild Bengal tigers and Asian elephant herds with licensed senior naturalist Kundan Rawat, and relax by the clear waters of Kosi river.`;
      route = ['Ramnagar Gateway', 'Dhikala Grasslands', 'Bijrani Tiger Zone', 'Kosi Riverbank', 'Corbett Waterfalls'];
      dailyDays = [
        {
          day: 1,
          title: 'Gateway to the Tiger Land & Kosi Riverbank',
          morning: 'Arrival in Ramnagar. Check in to luxury riverside eco-resort along the clear waters of Kosi river.',
          afternoon: 'Nature walk along the river gravel with senior naturalist Kundan Rawat to spot kingfishers and deer.',
          evening: 'Wildlife documentary screening and orientation on Corbett’s 600+ avian and mammal species.',
          stay: 'Kosi Riverside Jungle Lodge',
          foodHighlight: 'Kumaoni village style chicken / paneer curry cooked with local herbs',
          artisanHighlight: 'Handmade wooden tiger carvings & wildlife photo prints'
        },
        {
          day: 2,
          title: 'Dawn Safari in Bijrani Zone & Elephant Herds',
          morning: '5:30 AM open-top 4x4 Gypsy safari into Bijrani zone, famed for dense Sal forests and tiger sightings.',
          afternoon: 'Post-safari riverside brunch. Relax by the pool or visit the historic Jim Corbett Museum in Kaladhungi.',
          evening: 'Afternoon jeep trail tracking fresh pugmarks and alarm calls of spotted deer and langurs.',
          stay: 'Kosi Riverside Jungle Lodge',
          foodHighlight: 'Pahadi Dal Makhani with fresh tandoori roti',
          artisanHighlight: 'Organic wild honey from Corbett buffer villages'
        },
        {
          day: 3,
          title: 'Dhikala Deep Grasslands & Ramganga River Watch',
          morning: 'Expedition into Dhikala, the heart of Corbett, offering sprawling grasslands and river vistas.',
          afternoon: 'Watch wild Asian elephant herds crossing the Ramganga river and crocodiles basking on rocks.',
          evening: 'Sundowner on the Machan tower watching colors fade over the Shivalik foothills.',
          stay: 'Corbett Wilderness Camp',
          foodHighlight: 'Slow-cooked mutton/dal in clay handi',
          artisanHighlight: 'Local Ringal bamboo handwoven baskets'
        },
        {
          day: 4,
          title: 'Corbett Waterfalls & Kumaon Village Immersion',
          morning: 'Guided birdwatching walk along Corbett Waterfalls; spot Great Hornbills and crested serpent eagles.',
          afternoon: 'Visit a buffer zone Kumaoni village. Learn about human-wildlife co-existence and bee-keeping.',
          evening: 'Stargazing bonfire with stories of legendary conservationist Jim Corbett.',
          stay: 'Corbett Wilderness Camp',
          foodHighlight: 'Bhatt ki Churkani with organic red rice',
          artisanHighlight: 'Hemp seed spice mixes and beeswax candles'
        },
        {
          day: 5,
          title: 'Final Morning Bird Trail & Departure',
          morning: 'Gentle sunrise river walk spotting otters and migratory ducks.',
          afternoon: 'Check-out and transfer to Ramnagar Railway Station or Delhi drive.',
          evening: 'Departure with memorable wildlife encounters.',
          stay: 'Departure',
          foodHighlight: 'Crispy hill kachoris and Pahadi tea',
          artisanHighlight: 'Souvenir field guide signed by naturalist'
        }
      ];
    } else if (selectedDestination === 'kedarnath') {
      title = `${duration}-Day Sacred Kedarnath Jyotirlinga & High Himalayas Pilgrimage`;
      summary = `A deeply spiritual pilgrimage along the roaring Mandakini river to the sacred high-altitude Kedarnath Jyotirlinga (3,584m), flanked by dramatic snow-capped massifs and Vedic evening aartis.`;
      route = ['Haridwar', 'Rudraprayag Sangam', 'Guptkashi', 'Sonprayag / Gaurikund', 'Kedarnath Temple', 'Bhairavnath Ridge'];
      dailyDays = [
        {
          day: 1,
          title: 'Haridwar to Guptkashi along the Alaknanda & Mandakini',
          morning: 'Early departure from Haridwar. Scenic drive past Devprayag and Rudraprayag confluences.',
          afternoon: 'Arrive in Guptkashi (1,319m) overlooking the Chaukhamba peaks. Visit ancient Vishwanath Temple.',
          evening: 'Biometric pilgrim registration and briefing with certified spiritual guide Virendra Bisht.',
          stay: 'Guptkashi Pilgrim Haven Lodge',
          foodHighlight: 'Sattvic Garhwali Thali (No onion, no garlic)',
          artisanHighlight: 'Sacred Rudraksha malas from Kedarnath valley'
        },
        {
          day: 2,
          title: 'Sonprayag to Kedarnath Dham Sacred Trek (3,584m)',
          morning: 'Drive to Sonprayag/Gaurikund. Begin the sacred 16 km mountain pilgrimage along the roaring Mandakini.',
          afternoon: 'Pass gushing waterfalls (Jungle Chatti, Bheembali, Lincholi). Arrive at Kedarnath plateau.',
          evening: 'First darshan of the ancient 1,000-year-old stone temple standing proud beneath Kedarnath peak (6,940m).',
          stay: 'Kedarnath GMVN Temple Guest House',
          foodHighlight: 'Hot khichdi with pure Pahadi ghee and ginger tea',
          artisanHighlight: 'Shivalinga stones and sacred sacred thread (Mouli)'
        },
        {
          day: 3,
          title: 'Maha Abhishek & Divine Aarti at Kedarnath Temple',
          morning: '4:00 AM Maha Abhishek inside the inner sanctum. Touch the holy triangular rock Shivalinga.',
          afternoon: 'Hike 1 km up to Bhairavnath Temple for breathtaking aerial views of the entire Kedarnath valley.',
          evening: 'Mesmerizing evening Aarti with hundreds of brass lamps echoing against glacial peaks.',
          stay: 'Kedarnath GMVN Temple Guest House',
          foodHighlight: 'Hot vegetable daliya and warm spiced milk',
          artisanHighlight: 'Kedarnath holy temple ashes (Bhasma)'
        },
        {
          day: 4,
          title: 'Descent to Gaurikund & Relaxation in Guptkashi',
          morning: 'Early morning prayers during sunrise over the snow-covered temple spire. Begin scenic descent.',
          afternoon: 'Reach Gaurikund and transfer back to Guptkashi for rejuvenating warm bath and rest.',
          evening: 'Quiet satsang and devotional music by the temple courtyard.',
          stay: 'Guptkashi Pilgrim Haven Lodge',
          foodHighlight: 'Pahadi Dal Tadka with hot tawa rotis',
          artisanHighlight: 'Pure Himalayan Shilajit and incense sticks'
        },
        {
          day: 5,
          title: 'Return Journey via Rishikesh to Haridwar',
          morning: 'Scenic return drive along the Mandakini river gorges.',
          afternoon: 'Stop at Rishikesh for afternoon rest and holy dip at Triveni Ghat.',
          evening: 'Transfer to Haridwar railway station for onward departure.',
          stay: 'Departure',
          foodHighlight: 'Chotiwala special pilgrimage thali',
          artisanHighlight: 'Brass containers with holy Ganga Jal'
        }
      ];
    } else if (selectedDestination === 'munsiyari') {
      title = `${duration}-Day Munsiyari Panchachuli & Bhotia Artisan Expedition`;
      summary = `A trans-Himalayan journey into the high Johar Valley: witness the five sacred peaks of Panchachuli, visit Darkot indigenous Bhotia weaving village for Pashmina and sheep-wool rugs, and trek to Khaliya Top meadow with native scout Mohan Singh.`;
      route = ['Haldwani', 'Chaukori Tea Gardens', 'Birthi Waterfalls', 'Munsiyari Darkot Village', 'Khaliya Top', 'Panchachuli Vista'];
      dailyDays = [
        {
          day: 1,
          title: 'Ascent to Kumaon Hills: Haldwani to Chaukori',
          morning: 'Arrive at Kathgodam / Haldwani. Drive past Almora to the quiet tea hamlet of Chaukori.',
          afternoon: 'Check into tea garden cottages with front-facing views of Nanda Devi and Trishul massifs.',
          evening: 'Sunset over the snow peaks with freshly brewed organic Kumaon tea.',
          stay: 'Chaukori Tea Garden Cottages',
          foodHighlight: 'Chaukori organic tea with warm Gahat pakoras',
          artisanHighlight: 'Handmade wooden tea caddies'
        },
        {
          day: 2,
          title: 'Birthi Falls & Gateway to Munsiyari (2,200m)',
          morning: 'Drive deeper into Pithoragarh district. Stop at majestic 126m Birthi Waterfall.',
          afternoon: 'Ascend Kalamuni Pass (2,740m) for your first jaw-dropping view of the five Panchachuli peaks. Arrive Munsiyari.',
          evening: 'Check into indigenous Bhotia homestay. View golden alpenglow on the five legendary peaks.',
          stay: 'Panchachuli View Bhotia Homestay',
          foodHighlight: 'Pahadi Koda Roti with local wild honey & white butter',
          artisanHighlight: 'Bhotia handwoven Pashmina shawls (Chukla & Dan)'
        },
        {
          day: 3,
          title: 'Darkot Bhotia Weaving Guild & Heritage Tribal Museum',
          morning: 'Visit Darkot village, home to indigenous Bhotia master weavers like Bhagwati Devi.',
          afternoon: 'Witness carding, spinning on drop spindles (Takli), and handloom weaving of sheep-wool rugs.',
          evening: 'Visit Tribal Heritage Museum curated by Master Surendra Pangtey displaying antique Tibetan trade artifacts.',
          stay: 'Panchachuli View Bhotia Homestay',
          foodHighlight: 'Pahadi Madira (Barnyard Millet) Kheer and Mutton curry',
          artisanHighlight: 'Direct purchase of GI-Tagged Munsiyari Woolen Carpets'
        },
        {
          day: 4,
          title: 'Alpine Meadow Hike to Khaliya Top (3,500m)',
          morning: 'Hike through oak and rhododendron forest up to Khaliya Top alpine meadow with guide Mohan Singh.',
          afternoon: '360° trans-Himalayan view stretching into western Nepal and Tibet borders.',
          evening: 'Descent back to Munsiyari for village folk dance and Masakbaja music.',
          stay: 'Panchachuli View Bhotia Homestay',
          foodHighlight: 'Traditional Johari Gahat soup and fried Bhatt snacks',
          artisanHighlight: 'Himalayan wild herb teas and spices'
        },
        {
          day: 5,
          title: 'Scenic Return via Pithoragarh Valley',
          morning: 'Final sunrise over Panchachuli peaks. Pack woolens and organic Johar kidney beans (Munsiyari Rajma).',
          afternoon: 'Drive down through Pithoragarh to Kathgodam.',
          evening: 'Drop-off at Kathgodam railway station for departure.',
          stay: 'Departure',
          foodHighlight: 'Original GI-Tagged Munsiyari Rajma with red rice',
          artisanHighlight: '5kg bag of organic certified Munsiyari Rajma'
        }
      ];
    } else if (selectedDestination === 'valleyofflowers') {
      title = `${duration}-Day Valley of Flowers & Hemkund Alpine Biosphere Trek`;
      summary = `Step into a UNESCO World Heritage biosphere bursting with over 500 varieties of wild Himalayan wildflowers, followed by the sacred glacial lake and Gurudwara at Hemkund Sahib (4,329m).`;
      route = ['Rishikesh', 'Joshimath', 'Govindghat', 'Ghangaria Basecamp', 'Valley of Flowers Biosphere', 'Hemkund Sahib Glacier Lake'];
      dailyDays = [
        {
          day: 1,
          title: 'Rishikesh to Joshimath High Mountain Drive',
          morning: 'Drive 250 km through the Garhwal valley along the roaring Alaknanda river.',
          afternoon: 'Arrive at Joshimath gateway. Acclimatization walk through the local bazaar.',
          evening: 'Trek equipment check and briefing with NIM-certified guide Arjun Negi.',
          stay: 'Joshimath Mountain Inn',
          foodHighlight: 'Hot Garhwali Thali with Chainsoo & rice',
          artisanHighlight: 'Garhwali hand-knitted woolen mufflers'
        },
        {
          day: 2,
          title: 'Govindghat to Ghangaria Alpine Basecamp (3,050m)',
          morning: 'Drive to Govindghat. Begin 13 km trek along Lakshman Ganga gorge to Ghangaria basecamp.',
          afternoon: 'Ascend through pine and birch forests with views of cascading mountain streams.',
          evening: 'Arrive Ghangaria village. Hot tea and rest by wood-fired mountain stoves.',
          stay: 'Ghangaria Alpine Basecamp',
          foodHighlight: 'Steaming dal-chawal with spicy mountain pickle',
          artisanHighlight: 'Locally carved birch wood walking sticks'
        },
        {
          day: 3,
          title: 'UNESCO Valley of Flowers Exploration (3,650m)',
          morning: 'Enter the UNESCO national park. Hike into the 8 km glacial valley bursting with 500+ wildflower species.',
          afternoon: 'Spot rare Brahmakamal, Blue Poppy, Himalayan Bell Flower, and spot butterflies.',
          evening: 'Visit the memorial grave of botanist Joan Margaret Legge before returning to Ghangaria.',
          stay: 'Ghangaria Alpine Basecamp',
          foodHighlight: 'Hot vegetable Maggi and ginger honey lemon tea',
          artisanHighlight: 'Botanical flora picture guides'
        },
        {
          day: 4,
          title: 'Sacred High-Altitude Hemkund Sahib (4,329m)',
          morning: 'Challenging 6 km alpine ascent to the sacred glacial lake of Hemkund Sahib.',
          afternoon: 'Take blessing at the world’s highest Gurudwara flanked by seven snow-capped massifs. Drink hot langar tea.',
          evening: 'Descent back to Ghangaria. Celebratory evening with fellow mountain trekkers.',
          stay: 'Ghangaria Alpine Basecamp',
          foodHighlight: 'Langar Dal with fresh rotis and hot Halwa',
          artisanHighlight: 'Sacred Kada and wool caps'
        },
        {
          day: 5,
          title: 'Trek Down to Govindghat & Drive to Rishikesh',
          morning: 'Descent trek from Ghangaria to Govindghat. Board private cab.',
          afternoon: 'Drive along Alaknanda river back to Rishikesh / Dehradun.',
          evening: 'Onward departure flight or train.',
          stay: 'Departure',
          foodHighlight: 'Fresh river trout or Garhwali meal at Devprayag',
          artisanHighlight: 'Pressed flower souvenir bookmark'
        }
      ];
    } else if (selectedDestination === 'mussoorie') {
      title = `${duration}-Day Mussoorie Queen of Hills & Landour Literary Trail`;
      summary = `Wander through silent deodar canopies of Landour, taste homemade peanut butter from 1928 at A. Prakash & Co., browse Ruskin Bond's favorite mountain trails, and catch amber sunsets from George Everest Peak.`;
      route = ['Dehradun', 'Mussoorie Mall', 'Landour Sister Bazaar', 'Char Dukan', 'Jabarkhet Nature Reserve', 'George Everest Peak'];
      dailyDays = [
        {
          day: 1,
          title: 'Arrival in Mussoorie: Queen of the Hills',
          morning: 'Arrive in Dehradun. 1-hour scenic climb up the serpentine highway to Mussoorie (2,005m).',
          afternoon: 'Check in to colonial pine-view estate. Stroll along historic Mall Road and Camel’s Back Road.',
          evening: 'Sunset over Doon Valley with roasted bhutta and hot mountain cocoa.',
          stay: 'Mussoorie Heritage Colonial Estate',
          foodHighlight: 'Tibetan momos and thukpa at Kalsang Friends Corner',
          artisanHighlight: 'Handcrafted wooden walking sticks and antique brass'
        },
        {
          day: 2,
          title: 'Landour Cantt, Sister’s Bazaar & Char Dukan',
          morning: 'Ascend to peaceful Landour cantonment beneath towering deodars. Visit Sister’s Bazaar.',
          afternoon: 'Stop at A. Prakash & Co. (Est. 1928) for homemade crunchy peanut butter and apple-cinnamon chutney.',
          evening: 'Tea at Char Dukan near St. Paul’s Church and visit Landour Bakehouse for warm walnut tart.',
          stay: 'Landour Deodar Forest Lodge',
          foodHighlight: 'Warm Spiced Walnut Pie & Cinnamon Crepes at Landour Bakehouse',
          artisanHighlight: 'A. Prakash & Co. signature fresh peanut butter jar'
        },
        {
          day: 3,
          title: 'Jabarkhet Nature Reserve Forest Bathing Walk',
          morning: 'Guided nature walk through private eco-reserve of Jabarkhet with naturalist Anita Chauhan.',
          afternoon: 'Spot barking deer, leopard tracks, and rare Himalayan orchids in the protected forest.',
          evening: 'Book-signing session at Cambridge Book Depot (frequented by Ruskin Bond).',
          stay: 'Landour Deodar Forest Lodge',
          foodHighlight: 'Pahadi Gahat Parantha with local wild plum chutney',
          artisanHighlight: 'Autographed Ruskin Bond mountain book & Landour tea'
        },
        {
          day: 4,
          title: 'George Everest Peak & Happy Valley Tibetan Settlement',
          morning: 'Hike to the historic estate of Sir George Everest for sweeping vistas of Aglar Valley and snow peaks.',
          afternoon: 'Explore Happy Valley, the first home of the Dalai Lama in India. Visit Shedup Choephelling temple.',
          evening: 'Sunset picnic at Cloud’s End followed by cozy fireplace dinner.',
          stay: 'Mussoorie Heritage Colonial Estate',
          foodHighlight: 'Slow-cooked Garhwali mutton or vegetable curry',
          artisanHighlight: 'Tibetan prayer flags and handwoven singing bowls'
        },
        {
          day: 5,
          title: 'Morning Forest Walk & Descent to Dehradun',
          morning: 'Early morning sunrise walk along Lal Tibba, the highest point of Mussoorie.',
          afternoon: 'Shop pure woolen shawls and descent towards Dehradun.',
          evening: 'Transfer to Dehradun Railway Station or Jolly Grant Airport.',
          stay: 'Departure',
          foodHighlight: 'Fresh ginger-lime soda & bakery cookies',
          artisanHighlight: 'Deodar essential oil & handloom scarf'
        }
      ];
    } else {
      // Default: Multi-region Grand Circuit
      title = `${duration}-Day Grand Uttarakhand Devbhoomi Panorama`;
      summary = `A harmoniously balanced journey combining sacred shrines, peaceful mountain lakes, Pahadi food tastings, and direct artisan encounters tailored to your ₹${budget.toLocaleString('en-IN')} budget.`;
      route = ['Rishikesh', 'Haridwar', 'Nainital', 'Almora', 'Mukteshwar'];
      dailyDays = [
        {
          day: 1,
          title: 'Sacred Ganges Initiation in Rishikesh',
          morning: 'Arrival in Haridwar / Rishikesh. Check in to riverside spiritual ashram or boutique hotel.',
          afternoon: 'Walk across Ram Jhula and Lakshman Jhula. Savor authentic Pahadi lassi and thali.',
          evening: 'Front-row VIP seating for Triveni Ghat Aarti with live conch shells and floating diyas.',
          stay: 'Ganges Riverside Haven',
          foodHighlight: 'Chotiwala Royal Thali with authentic Pahadi Dal',
          artisanHighlight: 'Rudraksha beads & brass temple bells'
        },
        {
          day: 2,
          title: 'Journey to the Lake District of Kumaon',
          morning: 'Drive up the picturesque Kathgodam-Nainital highway into the cool pines.',
          afternoon: 'Private yacht boat tour on Naini Lake and darshan at Naina Devi shrine.',
          evening: 'Stroll on Mall Road, visit Sakley’s for mountain desserts and hot cocoa.',
          stay: 'Nainital Heritage Pine Lodge',
          foodHighlight: 'Warm Apple Crumble & Hot Mountain Chocolate at Sakley’s',
          artisanHighlight: 'Handmade scented candles of Nainital'
        },
        {
          day: 3,
          title: 'Almora Heritage Crafts & Bal Mithai Exploration',
          morning: 'Drive to Almora, the cultural soul of Kumaon. Check in near Kasar Devi.',
          afternoon: 'Hands-on Aipan art session with Meenakshi Joshi and visit to Tamta Mohalla copper workshops.',
          evening: 'Fresh Bal Mithai and Singodi tasting at Kheem Singh Mohan Singh.',
          stay: 'Kasar Devi Himalayan View Cottage',
          foodHighlight: 'Original Almora Bal Mithai and Singodi in Maalu leaf',
          artisanHighlight: 'Aipan Sacred Chowki Panel crafted by you'
        },
        {
          day: 4,
          title: 'Mukteshwar Fruit Orchards & Chauli ki Jali',
          morning: 'Drive through apple, plum, and apricot orchards to Mukteshwar (2,286m).',
          afternoon: 'Explore 350-year-old Mukteshwar Dham temple and rock formations at Chauli ki Jali.',
          evening: 'Homestyle organic village dinner with Bhatt ki Churkani and Mandua rotis.',
          stay: 'Mukteshwar Orchard Retreat',
          foodHighlight: 'Bhatt ki Churkani & Mandua Roti with White Butter',
          artisanHighlight: 'Wild apricot scrub & cold-pressed oil'
        },
        {
          day: 5,
          title: 'Scenic Return via Bhimtal Lake',
          morning: 'Stop at peaceful Bhimtal lake with its central island aquarium.',
          afternoon: 'Shop certified handloom woolens and Rhododendron preserves at Himadri Emporium.',
          evening: 'Transfer to Kathgodam / Pantnagar for onward journey.',
          stay: 'Departure',
          foodHighlight: 'Pahadi Gahat Parantha with local green chutney',
          artisanHighlight: 'Bhotia sheep-wool handloom shawl'
        }
      ];
    }

    // Dynamic extension up to duration
    const finalDays = dailyDays.slice(0, duration);
    if (finalDays.length < duration) {
      for (let i = finalDays.length + 1; i <= duration; i++) {
        finalDays.push({
          day: i,
          title: `Extended Exploration: Day ${i} in Mountain Serenity`,
          morning: 'Gentle sunrise nature trail, birdwatching, and organic Himalayan breakfast.',
          afternoon: 'Guided walk to ancient terraced watermills (Gharat) or private workshop with village artisan.',
          evening: 'Sunset bonfire with live Pahadi folk songs and stargazing beneath pristine night skies.',
          stay: 'Valley View Village Homestay',
          foodHighlight: 'Homestyle Kumaoni/Garhwali Rasoi with seasonal wild greens',
          artisanHighlight: 'Traditional wood carving and pine-needle weaving demonstration'
        });
      }
    }

    setGeneratedPlan({
      title,
      summary,
      duration,
      travelersCount,
      budget,
      route,
      costBreakdown: {
        stay: stayCost,
        transport: transportCost,
        food: foodCost,
        artisans: artisanCost,
        permits: permitsCost,
        total: totalAllocated,
        savings
      },
      days: finalDays
    });
  };

  return (
    <section id="ai-planner" className="py-20 bg-[#091614] text-white relative overflow-hidden">
      {/* Decorative Aurora Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-emerald-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI Himalayan Concierge & Budget Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white leading-tight">
            AI Trip Planner Tailored to Your Exact Budget
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose your dream Uttarakhand destination or let AI curate the best circuit, set your budget, and let our intelligent engine craft an authentic itinerary with itemized costs, master artisans, and certified homestays.
          </p>
        </div>

        {/* Input Configuration Box (Luxury Glassmorphic Panel) */}
        <div className="bg-[#0E221E]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/25 mb-12">
          
          {/* 1. Destination / Circuit Selector (Prompt Requirement) */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <label className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Step 1: Choose Your Destination or Circuit</span>
                </label>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a specific region in Uttarakhand or choose AI Best Pick to explore across Garhwal & Kumaon.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
                {DESTINATION_OPTIONS.find(d => d.id === selectedDestination)?.label}
              </span>
            </div>

            {/* Destination Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {DESTINATION_OPTIONS.map(dest => {
                const isSelected = selectedDestination === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-600/90 to-teal-800/90 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50'
                        : 'bg-black/40 border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{dest.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate leading-tight">{dest.label}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{dest.region}</div>
                      <span className={`inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                        isSelected ? 'bg-black/30 text-emerald-200' : 'bg-white/5 text-amber-300/80'
                      }`}>
                        {dest.badge}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white text-emerald-900 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Budget Slider & Presets (6 Cols) */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                    <span>Total Trip Budget (INR)</span>
                  </label>
                  <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-300 drop-shadow">
                    ₹{budget.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="2500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-3 bg-black/50 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-white/10"
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span>₹5,000 (Backpacker)</span>
                  <span>₹50,000 (Family Comfort)</span>
                  <span>₹1,50,000+ (Luxury)</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {budgetPresets.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => setBudget(preset.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        budget === preset.value
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-400/50'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Duration in Devbhoomi</span>
                  </label>
                  <span className="text-xl font-extrabold font-serif text-white">
                    {duration} Days / {duration - 1} Nights
                  </span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="14"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-3 bg-black/50 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-white/10"
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span>2 Days (Weekend)</span>
                  <span>5 Days (Ideal Circuit)</span>
                  <span>14 Days (Grand Chardham)</span>
                </div>
              </div>

              {/* Group Composition */}
              <div>
                <label className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Who is Traveling?</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'solo', label: 'Solo Wanderer', icon: '🎒' },
                    { id: 'couple', label: 'Couple / Duo', icon: '👫' },
                    { id: 'family', label: 'Family (3-5)', icon: '👨‍👩‍👧‍👦' },
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setTravelers(g.id)}
                      className={`p-3.5 rounded-2xl border text-center transition ${
                        travelers === g.id
                          ? 'bg-gradient-to-b from-purple-950/80 to-purple-900/60 border-purple-400 text-white font-bold shadow-lg shadow-purple-950/50'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="text-2xl mb-1">{g.icon}</div>
                      <div className="text-xs">{g.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Experience Theme & Rhythm (6 Cols) */}
            <div className="lg:col-span-6 space-y-7">
              
              {/* Interest Type */}
              <div>
                <label className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-rose-400" />
                  <span>Primary Experience Theme</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'crafts-and-culture', label: 'Pahadi Arts & Culture', desc: 'Aipan, Copper, Weavers & Bal Mithai', icon: '🎨' },
                    { id: 'treks-and-adventure', label: 'Treks & High Bugyals', desc: 'Chopta, Tungnath & Rafting', icon: '🥾' },
                    { id: 'spiritual-and-scenic', label: 'Spiritual Sacred Shrines', desc: 'Ganga Aarti, Kedarnath, Quiet Valleys', icon: '🕉️' },
                    { id: 'wildlife-and-lakes', label: 'Wildlife & Hill Cafes', desc: 'Corbett Tigers, Nainital boating, Landour', icon: '🐅' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setInterest(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        interest === item.id
                          ? 'bg-gradient-to-b from-rose-950/70 to-orange-950/60 border-rose-400 text-white shadow-lg'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-bold text-xs">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Rhythm & Pace */}
              <div>
                <label className="text-sm font-bold text-slate-200 mb-3 block">
                  Travel Rhythm & Pace
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'relaxed', label: 'Slow Travel', sub: 'Deep village stays' },
                    { id: 'balanced', label: 'Balanced', sub: 'Highlights & leisure' },
                    { id: 'fast', label: 'Action-Packed', sub: 'Maximum valleys' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPace(p.id)}
                      className={`p-3 rounded-2xl border text-center transition ${
                        pace === p.id
                          ? 'bg-emerald-950/80 border-emerald-400 text-white font-bold shadow'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.label}</div>
                      <div className="text-[10px] text-slate-400">{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate AI Button */}
              <div className="pt-2">
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold text-base shadow-2xl shadow-amber-950/50 transition duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-amber-100 animate-spin" />
                  <span>
                    {isGenerating 
                      ? 'AI is Orchestrating Devbhoomi Itinerary...' 
                      : `Generate AI Plan for ${DESTINATION_OPTIONS.find(d => d.id === selectedDestination)?.label.split(' ')[0]} (₹${budget.toLocaleString('en-IN')})`}
                  </span>
                </button>
              </div>

              {/* Stepper Status */}
              {isGenerating && (
                <div className="p-4 bg-black/60 border border-emerald-500/40 rounded-2xl text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Reasoning Engine Running:</span>
                  </div>
                  <div className="text-emerald-300 pl-4 border-l-2 border-emerald-500 py-1">
                    Step {generationStep + 1} of 5: Matching real homestays & mountain artisans...
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Generated Plan Presentation Card */}
        {generatedPlan && (
          <div className="bg-[#0B1E1A] rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/40 animate-in fade-in zoom-in-95">
            
            {/* Top Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Custom AI Mountain Itinerary
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
                  {generatedPlan.title}
                </h3>
                <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                  {generatedPlan.summary}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-white/20 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print Plan</span>
                </button>

                <button
                  onClick={() => onBookGeneratedPlan(generatedPlan)}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transition"
                >
                  <span>Book This AI Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Budget Breakdown Summary */}
            <div className="mt-6 mb-8">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider">
                  Itemized Financial Allocation (Target: ₹{budget.toLocaleString('en-IN')})
                </span>
                <span className="text-emerald-400 font-semibold">
                  For {generatedPlan.travelersCount} Traveler(s)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 bg-white/5 rounded-2xl border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Homestays</span>
                  <span className="text-lg font-bold text-white font-serif">₹{generatedPlan.costBreakdown.stay.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">35% Verified hosts</span>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-blue-500/20">
                  <span className="text-[10px] text-blue-400 uppercase font-bold block">Transit</span>
                  <span className="text-lg font-bold text-white font-serif">₹{generatedPlan.costBreakdown.transport.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">25% Mountain cabs</span>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-amber-500/20">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">Pahadi Food</span>
                  <span className="text-lg font-bold text-white font-serif">₹{generatedPlan.costBreakdown.food.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">18% Rasois & Sweets</span>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-rose-500/20">
                  <span className="text-[10px] text-rose-400 uppercase font-bold block">Artisans</span>
                  <span className="text-lg font-bold text-white font-serif">₹{generatedPlan.costBreakdown.artisans.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">14% Direct workshops</span>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-purple-500/20">
                  <span className="text-[10px] text-purple-400 uppercase font-bold block">Permits & Aarti</span>
                  <span className="text-lg font-bold text-white font-serif">₹{generatedPlan.costBreakdown.permits.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">8% Forest & VIP passes</span>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/20">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Emergency Buffer</span>
                  <span className="text-lg font-bold text-emerald-400 font-serif">₹{generatedPlan.costBreakdown.savings.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Reserve savings</span>
                </div>
              </div>
            </div>

            {/* Route Stops Ribbon */}
            <div className="mb-8 p-4 bg-black/40 rounded-2xl border border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Optimized Mountain Highway Circuit:
              </span>
              {generatedPlan.route.map((r, i) => (
                <React.Fragment key={i}>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/15 font-semibold text-white">
                    {r}
                  </span>
                  {i < generatedPlan.route.length - 1 && (
                    <span className="text-slate-500">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Day by Day Itinerary */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold font-serif text-white">
                Day-by-Day Mountain Schedule
              </h4>

              <div className="space-y-3">
                {generatedPlan.days.map(d => (
                  <div
                    key={d.day}
                    className="p-5 rounded-2xl bg-black/30 border border-white/10 hover:border-emerald-500/40 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 mb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                          D{d.day}
                        </span>
                        <h5 className="font-bold text-white text-base font-serif">
                          {d.title}
                        </h5>
                      </div>
                      <span className="text-xs text-slate-400">
                        🏡 {d.stay}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-amber-300 block mb-1">🌅 Morning</span>
                        <p className="text-slate-300 leading-relaxed">{d.morning}</p>
                      </div>
                      <div>
                        <span className="font-bold text-blue-300 block mb-1">☀️ Afternoon</span>
                        <p className="text-slate-300 leading-relaxed">{d.afternoon}</p>
                      </div>
                      <div>
                        <span className="font-bold text-purple-300 block mb-1">🌙 Evening</span>
                        <p className="text-slate-300 leading-relaxed">{d.evening}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-rose-300 bg-rose-950/60 border border-rose-500/30 px-2.5 py-1 rounded-md font-semibold">
                        🎨 Artisan: {d.artisanHighlight}
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-md font-semibold">
                        🍲 Culinary: {d.foodHighlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Book Button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                ✦ 100% Direct payment to native village homestays and master craftsmen.
              </div>
              <button
                onClick={() => onBookGeneratedPlan(generatedPlan)}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition"
              >
                <span>Book This Custom AI Itinerary Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
