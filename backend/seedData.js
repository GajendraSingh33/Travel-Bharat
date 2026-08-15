import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Temple from './models/Temple.js';
import Circuit from './models/Circuit.js';
import User from './models/User.js';

dotenv.config();

export const sampleTemples = [
  {
    _id: '64f8a1230000000000000001',
    name: 'Kashi Vishwanath Temple',
    slug: 'kashi-vishwanath-temple',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
    coordinates: { lat: 25.3109, lng: 83.0107 },
    deity: {
      name: 'Lord Shiva (Vishwanath / Vishweshwara)',
      category: 'Shaivism',
      significance: 'One of the most sacred 12 Jyotirlingas, symbolizing the light of supreme consciousness.',
    },
    history:
      'Kashi Vishwanath is one of the oldest living places of worship in human history, mentioned in the Skanda Purana. The original shrine was rebuilt multiple times over millennia. The present structure was constructed by Maharani Ahilyabai Holkar of Indore in 1780. In 2021, the Kashi Vishwanath Corridor was inaugurated, connecting the temple directly with the sacred Ghats of the Ganga.',
    architecturalStyle: 'North Indian Nagara style with gold-plated spires (Shikharas)',
    constructionEra: '1780 CE (Present structure by Ahilyabai Holkar)',
    rituals: [
      { name: 'Mangala Aarti', timing: '03:00 AM - 04:00 AM', description: 'First sacred morning prayer performed before dawn.' },
      { name: 'Bhog Aarti', timing: '11:30 AM - 12:00 PM', description: 'Offering of sacred food and sweets to Lord Vishwanath.' },
      { name: 'Sapta Rishi Aarti', timing: '07:00 PM - 08:30 PM', description: 'Intricate ritual performed by seven priests representing seven sages.' },
      { name: 'Shringar Aarti', timing: '09:00 PM - 10:15 PM', description: 'Night adornment of the Shivling with flowers and sandalwood paste.' },
      { name: 'Shayan Aarti', timing: '10:30 PM - 11:00 PM', description: 'Final bedtime prayers before closing sanctum doors.' }
    ],
    darshanTimings: [
      { title: 'General Public Darshan', timing: '04:00 AM - 11:00 AM & 12:00 PM - 07:00 PM', note: 'Free general line queue' },
      { title: 'Sugam Darshan (VIP / Fast Track)', timing: '06:00 AM - 06:00 PM', note: 'Prior online booking recommended via shrine portal' }
    ],
    festivals: [
      { name: 'Mahashivratri', month: 'February / March', description: 'Grand night-long celebrations, procession, and millions of pilgrims.' },
      { name: 'Dev Deepawali', month: 'November (Kartik Purnima)', description: 'Over one million earthen lamps light up the Ganga Ghats and temple complex.' },
      { name: 'Rangbhari Ekadashi', month: 'March', description: 'Celebration of Lord Shiva bringing Goddess Parvati to Kashi after marriage.' }
    ],
    dressCode: 'Dhoti/Kurta for men and Saree/Salwar Kameez for women. Leather items (belts, wallets, shoes) strictly forbidden inside sanctum.',
    entryFee: 'Free Entry for general public',
    cameraPolicy: 'Mobile phones, cameras, smartwatches, and electronics must be deposited in security lockers outside.',
    guidelines: [
      'Carry valid government photo ID for security check.',
      'Deposit shoes and leather items in official shoe counters.',
      'Maintain Silence and decorum in the sanctum sanctorum.',
      'Flowers and bilva leaves bought from verified vendors outside are permitted.'
    ],
    nearbyFacilities: {
      accommodation: 'Numerous government guest houses, Yatri Nivas, and hotels available along Dashashwamedh Road.',
      transport: '10 km from Varanasi Junction Railway Station; 25 km from Lal Bahadur Shastri International Airport.',
      parking: 'Parking available at Godowlia Multi-Level Parking (500 meters walk to temple corridor).',
      food: 'Free Annapurna Temple Kitchen (Prasadam) and iconic local eateries serving Kachori-Jalebi and Lassi.'
    },
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['12 Jyotirlinga', 'Kashi Circuit', 'Uttar Pradesh Pilgrimage'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000002',
    name: 'Kedarnath Temple',
    slug: 'kedarnath-temple',
    state: 'Uttarakhand',
    city: 'Rudraprayag',
    address: 'Garhwal Himalayas, Kedarnath, Rudraprayag, Uttarakhand 246445',
    coordinates: { lat: 30.7352, lng: 79.0669 },
    deity: {
      name: 'Lord Shiva (Kedar / Sadashiva)',
      category: 'Shaivism',
      significance: 'Highest among the 12 Jyotirlingas and part of the Chhota Char Dham of Uttarakhand.',
    },
    history:
      'Situated at an altitude of 3,583 meters (11,755 ft) amidst snow-clad Himalayan peaks, Kedarnath is believed to have been originally built by the Pandavas and revived by Adi Shankaracharya in the 8th century CE. The massive stone temple weathered the catastrophic 2013 Himalayan floods virtually unscathed due to a giant natural boulder (Bhim Shila) behind it.',
    architecturalStyle: 'Ancient Himalayan Himalayan Stone Architecture (Katyuri style)',
    constructionEra: '8th Century CE (Restored by Adi Shankaracharya)',
    rituals: [
      { name: 'Maha Abhishek Aarti', timing: '04:00 AM - 07:00 AM', description: 'Holy ritual bath with milk, honey, ghee, and curd.' },
      { name: 'Evening Sandhya Aarti', timing: '06:30 PM - 07:30 PM', description: 'Enchanting evening prayers recited with traditional mantras against the Himalayan backdrop.' }
    ],
    darshanTimings: [
      { title: 'Morning Darshan', timing: '06:00 AM - 03:00 PM', note: 'Temple opens early morning; sanctum touch allowed during specific slots.' },
      { title: 'Evening Darshan', timing: '05:00 PM - 07:30 PM', note: 'Temple closes at 08:00 PM for night' }
    ],
    festivals: [
      { name: 'Temple Opening Ceremony (Kapat Uthan)', month: 'April / May (Akshaya Tritiya)', description: 'Grand ceremonial re-opening after 6 months of winter closure.' },
      { name: 'Temple Closing Ceremony (Kapat Bandh)', month: 'October / November (Bhai Dooj)', description: 'Holy deity moves to Uchimath for winter worship.' }
    ],
    dressCode: 'Heavy woolen clothes, sturdy trekking shoes, thermals, and rain gear are essential due to cold Himalayan weather.',
    entryFee: 'Free Entry (Biometric Registration compulsory for pilgrims)',
    cameraPolicy: 'Photography allowed outside temple complex; strictly forbidden inside sanctum.',
    guidelines: [
      'Complete mandatory Char Dham Yatri Registration before starting trek.',
      'High altitude trekking involved (16 km trek from Gaurikund). Helicopter and pony service available.',
      'Carry emergency medicines, warm clothes, and cash.'
    ],
    nearbyFacilities: {
      accommodation: 'GMVN tourist rest houses, tents, and pilgrims huts in Kedarnath base camp.',
      transport: 'Trek starts from Gaurikund (16 km). Nearest airport is Jolly Grant Dehradun (238 km).',
      parking: 'Parking available at Sonprayag (5 km before Gaurikund).',
      food: 'Basic vegetarian meals, tea stalls, and GMVN food canteens along the trekking route.'
    },
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['12 Jyotirlinga', 'Char Dham', 'Chhota Char Dham', 'Panch Kedar'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000003',
    name: 'Meenakshi Amman Temple',
    slug: 'meenakshi-amman-temple',
    state: 'Tamil Nadu',
    city: 'Madurai',
    address: 'Madurai Main, Madurai, Tamil Nadu 625001',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    deity: {
      name: 'Goddess Meenakshi (Parvati) & Sundareswarar (Shiva)',
      category: 'Shaktism / Shaivism',
      significance: 'Historic architectural marvel with 14 gopurams (gateway towers) housing 33,000 sculptures.',
    },
    history:
      'Mentions of Madurai Meenakshi date back to Tamil Sangam literature from the 6th century BCE. The current complex was rebuilt and greatly expanded under the Nayak dynasty of Madurai in the 16th-17th centuries. It features the famous Hall of 1,000 Pillars and sacred Golden Lotus Tank (Porthamarai Kulam).',
    architecturalStyle: 'Classic Dravidian Architecture',
    constructionEra: '16th - 17th Century CE (Rebuilt by Madurai Nayaks)',
    rituals: [
      { name: 'Thiruvanandal Aarti', timing: '05:00 AM', description: 'Dawn awakening ritual.' },
      { name: 'Uchikala Pooja', timing: '11:00 AM - 12:00 PM', description: 'Midday holy offering.' },
      { name: 'Palliyarai Pooja', timing: '09:30 PM', description: 'Sacred night ritual carrying Lord Sundareswarar to Goddess Meenakshi’s chamber.' }
    ],
    darshanTimings: [
      { title: 'Morning Timings', timing: '05:00 AM - 12:30 PM', note: 'Less crowded early morning' },
      { title: 'Evening Timings', timing: '04:00 PM - 10:00 PM', note: 'Illuminated Gopurams view' }
    ],
    festivals: [
      { name: 'Meenakshi Thirukalyanam', month: 'April / May (Chithirai)', description: '10-day divine celestial marriage celebration attracting over 1 million devotees.' }
    ],
    dressCode: 'Strict traditional dress code: Men must wear Dhoti/Vesti or trousers; Women must wear Saree or Salwar Kameez. Jeans and shorts prohibited.',
    entryFee: 'Free entry (Rs 50 / Rs 100 fast track queues available)',
    cameraPolicy: 'Mobile phones and electronic gadgets are strictly banned inside the entire complex.',
    guidelines: [
      'Store mobile phones in locker facilities at temple gates.',
      'Pass through multi-tier security checking.'
    ],
    nearbyFacilities: {
      accommodation: 'Vast selection of hotels and lodges within 1 km radius of temple gates.',
      transport: '2 km from Madurai Junction Railway Station; 12 km from Madurai Airport.',
      parking: 'Multi-level vehicle parking near East Tower gate.',
      food: 'Authentic South Indian tiffin centers serving Jigarthanda, Idli, Dosa, and Temple Prasadam.'
    },
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['South India Temple Circuit', 'Tamil Nadu Heritage', 'Shakti Peeth'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000004',
    name: 'Sri Venkateswara Swamy Temple (Tirupati Balaji)',
    slug: 'tirupati-balaji-temple',
    state: 'Andhra Pradesh',
    city: 'Tirupati (Tirumala)',
    address: 'S.V. Museum Road, Tirumala, Tirupati, Andhra Pradesh 517504',
    coordinates: { lat: 13.6833, lng: 79.35 },
    deity: {
      name: 'Lord Venkateswara (Balaji / Vishnu)',
      category: 'Vaishnavism',
      significance: 'Known as Kaliyuga Vaikuntam; most visited and wealthiest shrine in the world.',
    },
    history:
      'Tirumala temple has ancient patronage dating back to Pallavas, Cholas, Hoysalas, and Vijayanagara emperors. Emperor Krishnadevaraya visited 7 times and gifted gold and jewels. The shrine is managed by Tirumala Tirupati Devasthanams (TTD).',
    architecturalStyle: 'Dravidian Architecture with Ananda Nilayam Golden Vimana',
    constructionEra: '300 CE onwards',
    rituals: [
      { name: 'Suprabhatam', timing: '03:00 AM - 03:30 AM', description: 'Early morning hymns recited to wake up Lord Venkateswara.' },
      { name: 'Thomala Seva', timing: '03:30 AM - 04:00 AM', description: 'Adornment of deity with fresh flower garlands.' },
      { name: 'Ekantha Seva', timing: '01:30 AM (Midnight)', description: 'Final lullaby ritual.' }
    ],
    darshanTimings: [
      { title: 'Sarvadarsanam (Free Queue)', timing: '08:00 AM - 11:00 PM', note: 'May take 4-12 hours depending on rush' },
      { title: 'Special Entry Darshan (Rs 300)', timing: '09:00 AM - 06:00 PM', note: 'Requires advance online slot booking on TTD official portal' }
    ],
    festivals: [
      { name: 'Srivari Brahmotsavam', month: 'September / October', description: '9-day grand chariot procession of Lord Malayappa Swamy.' }
    ],
    dressCode: 'Men: White Dhoti / Pyjama with Kurta or Uttariyam. Women: Saree or Half Saree or Chudidhar with Dupatta.',
    entryFee: 'Free Sarvadarsanam; Rs 300 Special Entry Ticket',
    cameraPolicy: 'Strictly prohibited inside Tirumala temple zone.',
    guidelines: [
      'Original Aadhaar card or Passport mandatory for entry verification.',
      'Tonsuring (hair donation) and bathing in Swami Pushkarini lake is customary before darshan.'
    ],
    nearbyFacilities: {
      accommodation: 'TTD free Choultries, Cottages, and private star hotels in Tirumala & Tirupati.',
      transport: '22 km from Tirupati Railway Station; 40 km from Tirupati Airport.',
      parking: 'Large TTD multi-tiered parking lots at Alipiri and Tirumala.',
      food: 'Free TTD Nitya Annadanam complex feeding 100,000+ pilgrims daily; GI-tagged world famous Tirupati Laddu.'
    },
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['South India Temple Circuit', 'Vaishnavism Sacred Trail'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000005',
    name: 'Sri Harmandir Sahib (Golden Temple)',
    slug: 'golden-temple-amritsar',
    state: 'Punjab',
    city: 'Amritsar',
    address: 'Golden Temple Road, Amritsar, Punjab 143006',
    coordinates: { lat: 31.62, lng: 74.8765 },
    deity: {
      name: 'Guru Granth Sahib Ji (Eternal Holy Scripture)',
      category: 'Sikhism',
      significance: 'Spiritual capital of Sikhism, open to people of all faiths, backgrounds, and gender.',
    },
    history:
      'Designed by Guru Arjan Dev Ji (5th Sikh Guru) in the late 16th century around a holy amrit pool (Amrit Sarovar). Maharaja Ranjit Singh covered the upper floors in 750 kg of pure gold leaf in 1830, giving it the world-famous name Golden Temple.',
    architecturalStyle: 'Sikh Architecture (Unique blend of Hindu & Islamic elements)',
    constructionEra: '1589 CE (Gold leaf added 1830 CE)',
    rituals: [
      { name: 'Prakash Ceremony', timing: '03:00 AM - 04:30 AM', description: 'Carrying Guru Granth Sahib Ji from Akal Takht to sanctum.' },
      { name: 'Sukhasan Ceremony', timing: '10:00 PM - 10:30 PM', description: 'Solemn night procession returning scripture to Akal Takht.' }
    ],
    darshanTimings: [
      { title: '24 Hours Open', timing: 'Open round the clock 365 days', note: 'Kirtan reverberates continuously' }
    ],
    festivals: [
      { name: 'Vaisakhi', month: 'April', description: 'Marks the creation of Khalsa by Guru Gobind Singh Ji in 1699.' },
      { name: 'Gurpurab', month: 'November', description: 'Birth anniversary of Guru Nanak Dev Ji with grand fireworks and illuminations.' }
    ],
    dressCode: 'Modest clothing. Head must remain covered (bandanas/scarves provided free at entrance). Shoes must be removed.',
    entryFee: 'Free Entry for all',
    cameraPolicy: 'Photography allowed in outer circumambulation (Parkarma); restricted near sanctum.',
    guidelines: [
      'Wash feet in foot-bath before stepping on marble Parkarma.',
      'Do not carry tobacco, alcohol, or meat products anywhere near premise.'
    ],
    nearbyFacilities: {
      accommodation: 'Free Sarais (pilgrim hostels) accommodating thousands daily; luxury hotels in Heritage Street.',
      transport: '2 km from Amritsar Railway Station; 13 km from Sri Guru Ram Dass Jee International Airport.',
      parking: 'Multi-level parking facility at Heritage Street entrance.',
      food: 'Langar Sahib - World’s largest free community kitchen serving over 100,000 hot vegetarian meals every single day.'
    },
    heroImage: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['Spiritual Heritage Circuit', 'Punjab Sacred Trail'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000006',
    name: 'Konark Sun Temple',
    slug: 'konark-sun-temple',
    state: 'Odisha',
    city: 'Konark',
    address: 'Konark, Puri District, Odisha 752111',
    coordinates: { lat: 19.8876, lng: 86.0945 },
    deity: {
      name: 'Surya (Sun God)',
      category: 'Surya / Vedic',
      significance: 'UNESCO World Heritage Site; built as a colossal 24-wheeled stone chariot pulled by 7 horses.',
    },
    history:
      'Built in the 13th century CE by King Narasimhadeva I of the Eastern Ganga Dynasty. The entire temple complex is designed as a celestial chariot for Sun God Surya. The 24 carved stone wheels act as accurate sundials telling time down to minutes.',
    architecturalStyle: 'Classic Kalinga Architecture',
    constructionEra: '1250 CE (Eastern Ganga Dynasty)',
    rituals: [
      { name: 'Monument Museum & Heritage Walk', timing: '06:00 AM - 08:00 PM', description: 'Active worship paused; preserved as national monument.' }
    ],
    darshanTimings: [
      { title: 'Monument Visiting Hours', timing: '06:00 AM - 08:00 PM', note: 'Son-et-Lumiere (Light & Sound Show) in evening' }
    ],
    festivals: [
      { name: 'Konark Dance Festival', month: 'December 1 - 5', description: 'International classical dance festival against illuminated temple backdrop.' },
      { name: 'Magha Saptami', month: 'February', description: 'Thousands gather at Chandrabhaga beach for holy sun worship dip.' }
    ],
    dressCode: 'Comfortable casual/tourist attire recommended.',
    entryFee: 'Rs 40 for Indian Nationals; Rs 600 for Foreign Tourists (ASI Ticket)',
    cameraPolicy: 'Photography permitted; commercial video equipment requires permission.',
    guidelines: [
      'Hire verified ASI audio guide or local guide to understand astronomical carving math.',
      'Best visited early morning or late afternoon to avoid harsh sun.'
    ],
    nearbyFacilities: {
      accommodation: 'OTDC Panthanivas and eco-resorts near Chandrabhaga beach.',
      transport: '35 km from Puri; 65 km from Biju Patnaik Airport Bhubaneswar.',
      parking: 'Spacious ASI parking lot outside main complex.',
      food: 'Local Odisha thali restaurants, fresh seafood, and coconut water stalls.'
    },
    heroImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['UNESCO World Heritage', 'East India Cultural Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000007',
    name: 'Somnath Temple',
    slug: 'somnath-temple',
    state: 'Gujarat',
    city: 'Veraval',
    address: 'Somnath Mandir Road, Prabhas Patan, Veraval, Gujarat 362268',
    coordinates: { lat: 20.888, lng: 70.4012 },
    deity: {
      name: 'Lord Shiva (Somnath / Lord of Moon)',
      category: 'Shaivism',
      significance: 'First among the 12 sacred Jyotirlinga shrines of Lord Shiva in India.',
    },
    history:
      'Located on the western coast of Gujarat at Prabhas Patan, Somnath stands at a point where there is no land in a straight line between Somnath seashore and Antarctica. Rebuilt seven times throughout history, the current Kailash Mahameru Prasad temple was restored by Sardar Vallabhbhai Patel in 1951.',
    architecturalStyle: 'Chalukya / Solanki Style Architecture',
    constructionEra: '1951 CE (Modern Reconstruction)',
    rituals: [
      { name: 'Morning Aarti', timing: '07:00 AM', description: 'Grand morning prayer with shankha and dhol.' },
      { name: 'Noon Aarti', timing: '12:00 PM', description: 'Midday holy worship.' },
      { name: 'Evening Aarti', timing: '07:00 PM', description: 'Evening divine light offering accompanied by sea waves sound.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '06:00 AM - 10:00 PM', note: 'Light & Sound show "Jay Somnath" at 08:00 PM daily' }
    ],
    festivals: [
      { name: 'Kartik Purnima Fair', month: 'November', description: '5-day grand carnival and sea worship.' },
      { name: 'Mahashivratri', month: 'February / March', description: 'All night worship and classical music events.' }
    ],
    dressCode: 'Decent attire covering shoulders and knees.',
    entryFee: 'Free entry',
    cameraPolicy: 'Electronics and mobile phones strictly prohibited inside temple complex.',
    guidelines: [
      'Deposit phones, smartwatches, and electronic devices at free security counter.'
    ],
    nearbyFacilities: {
      accommodation: 'Shree Somnath Trust Sagar Darshan guest house and VIP accommodations.',
      transport: '7 km from Veraval Railway Station; 55 km from Diu Airport.',
      parking: 'Huge dedicated parking square in front of Somnath Trust office.',
      food: 'Somnath Trust Prasadam canteen offering pure Gujarati Thali.'
    },
    heroImage: 'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['12 Jyotirlinga', 'Gujarat Coastal Pilgrimage'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000008',
    name: 'Jagannath Temple (Puri)',
    slug: 'jagannath-temple-puri',
    state: 'Odisha',
    city: 'Puri',
    address: 'Grand Road, Puri, Odisha 752001',
    coordinates: { lat: 19.8135, lng: 85.8312 },
    deity: {
      name: 'Lord Jagannath, Balabhadra & Subhadra',
      category: 'Vaishnavism',
      significance: 'Major Char Dham pilgrimage site famous for Ratha Yatra and sacred Mahaprasad.',
    },
    history:
      'Constructed in the 12th century by King Anantavarman Chodaganga Deva of Eastern Ganga Dynasty. The temple is world-famous for its unique wooden deities that are ceremonially recreated during Nabakalebara ritual every 12 to 19 years.',
    architecturalStyle: 'Kalinga Architecture with Rekha Deula spire',
    constructionEra: '12th Century CE',
    rituals: [
      { name: 'Mangala Alati', timing: '05:00 AM', description: 'Early morning lamp ritual.' },
      { name: 'Abakasha Pooja', timing: '06:00 AM - 07:30 AM', description: 'Teeth brushing and bathing ritual of deities.' },
      { name: 'Dhupa & Mahaprasad Offering', timing: '01:00 PM & 08:00 PM', description: 'Offering 56 delicacies cooked in earthen pots on fire.' }
    ],
    darshanTimings: [
      { title: 'General Darshan', timing: '06:00 AM - 09:00 PM', note: 'Entry through Singhadwara (Lion Gate)' }
    ],
    festivals: [
      { name: 'Ratha Yatra (Chariot Festival)', month: 'June / July', description: 'World-renowned procession of giant 45-foot wooden chariots drawn by millions.' }
    ],
    dressCode: 'Traditional Indian clothing compulsory. Non-Hindus permitted up to main gate height.',
    entryFee: 'Free entry',
    cameraPolicy: 'No cameras, mobile phones, or leather goods allowed past inner courtyard.',
    guidelines: [
      'Taste Anandbazar Mahaprasad (cooked in 7 earthen pots stacked vertically).'
    ],
    nearbyFacilities: {
      accommodation: 'OTDC hotels, dharamshalas, and beach resorts along Puri sea beach.',
      transport: '3 km from Puri Railway Station; 60 km from Bhubaneswar Airport.',
      parking: 'Parking at Jagannath Ballav parking area.',
      food: 'Ananda Bazar Mahaprasad - The largest open-air food market in the world.'
    },
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
    ],
    circuitTags: ['Char Dham', 'East India Cultural Circuit'],
    isFeatured: true,
    isApproved: true,
  }
];

export const sampleCircuits = [
  {
    _id: '64f8c1230000000000000001',
    name: '12 Jyotirlinga Yatra',
    slug: '12-jyotirlinga-yatra',
    region: 'Pan-India',
    description: 'The ultimate Shaivite sacred pilgrimage connecting the 12 divine light manifestations of Lord Shiva across India (Somnath, Mallikarjuna, Mahakaleshwar, Omkareshwar, Kedarnath, Bhimashankar, Kashi Vishwanath, Trimbakeshwar, Vaidyanath, Nageshwar, Ramanathaswamy, and Grishneshwar).',
    significance: 'Spiritual liberation and divine blessings of supreme light.',
    totalDistance: '~8,500 km',
    recommendedDays: '15-21 Days',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    templeIds: ['64f8a1230000000000000001', '64f8a1230000000000000002', '64f8a1230000000000000007']
  },
  {
    _id: '64f8c1230000000000000002',
    name: 'Char Dham Yatra (Pan-India)',
    slug: 'char-dham-yatra',
    region: 'Four Corners of India',
    description: 'Established by Adi Shankaracharya in the 8th century, covering Badrinath (North), Dwarka (West), Puri Jagannath (East), and Rameswaram (South).',
    significance: 'Completing the Char Dham is believed to grant Moksha (salvation) in Hindu tradition.',
    totalDistance: '~6,000 km',
    recommendedDays: '12-16 Days',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    templeIds: ['64f8a1230000000000000002', '64f8a1230000000000000008']
  },
  {
    _id: '64f8c1230000000000000003',
    name: 'South India Golden Heritage Circuit',
    slug: 'south-india-golden-circuit',
    region: 'Tamil Nadu & Andhra Pradesh',
    description: 'Immerse in grand Dravidian temple architecture, soaring gopurams, ancient bronze sculptures, and rich musical traditions spanning Madurai Meenakshi, Tirupati Balaji, Brihadeeswarar, and Rameswaram.',
    significance: 'Explore living ancient architectural wonders.',
    totalDistance: '~1,200 km',
    recommendedDays: '7-10 Days',
    image: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80',
    templeIds: ['64f8a1230000000000000003', '64f8a1230000000000000004']
  }
];

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Seeding sample temples, circuits, and admin account...');

    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@travelbharat.gov.in' });
    if (!adminExists) {
      await User.create({
        name: 'Travel Bharat Admin',
        email: 'admin@travelbharat.gov.in',
        password: process.env.ADMIN_PASSWORD, // Will be hashed by user model pre-save hook
        role: 'admin',
      });
      console.log('[Seed] Admin user created: admin@travelbharat.gov.in / ' + process.env.ADMIN_PASSWORD);
    }

    // Seed Temples
    await Temple.deleteMany({});
    const insertedTemples = await Temple.insertMany(
      sampleTemples.map((t) => {
        const { _id, ...rest } = t;
        return rest;
      })
    );
    console.log(`[Seed] Successfully inserted ${insertedTemples.length} temples.`);

    // Seed Circuits
    await Circuit.deleteMany({});
    const templesMap = {};
    insertedTemples.forEach((t) => {
      templesMap[t.slug] = t._id;
    });

    const circuitsToInsert = sampleCircuits.map((c) => {
      const { _id, ...rest } = c;
      return {
        ...rest,
        templeIds: insertedTemples.slice(0, 3).map((t) => t._id),
      };
    });

    await Circuit.insertMany(circuitsToInsert);
    console.log(`[Seed] Successfully inserted ${circuitsToInsert.length} pilgrimage circuits.`);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
  }
};

// Start the seeding process
const startSeeding = async () => {
  try {
    console.log("[Seed] Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("[Seed] MongoDB Atlas connected!");

    await seedDatabase();

    console.log("[Seed] Database seeding completed!");

    await mongoose.connection.close();

    console.log("[Seed] MongoDB connection closed.");
  } catch (error) {
    console.error("[Seed Error]", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

startSeeding();