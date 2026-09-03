import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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
      name: 'Lord Shiva (Vishweshwara)',
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
    architecturalStyle: 'Ancient Himalayan Stone Architecture (Katyuri style)',
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
    circuitTags: ['South India Golden Circuit', 'South India Temple Circuit', 'Tamil Nadu Heritage', 'Shakti Peeth'],
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
      name: 'Lord Venkateswara',
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
    circuitTags: ['South India Golden Circuit', 'South India Temple Circuit', 'Vaishnavism Sacred Trail'],
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
      name: 'Shree Guru Granth Sahib Ji',
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
      name: 'Surya bhagwan',
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
    name: 'Jagannath Temple',
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
  },
  {
    _id: '64f8a1230000000000000009',
    name: 'Mallikarjuna Temple',
    slug: 'mallikarjuna-temple',
    state: 'Andhra Pradesh',
    city: 'Srisailam',
    address: 'Srisailam, Kurnool District, Andhra Pradesh 518101',
    coordinates: { lat: 16.0748, lng: 78.8687 },
    deity: {
      name: 'Lord Shiva (Mallikarjuna Swamy) & Goddess Bhramaramba',
      category: 'Shaivism / Shaktism',
      significance: 'One of the 12 Jyotirlingas and also one of the 18 Maha Shakti Peethas.',
    },
    history:
      'Situated on the flat top of Nallamala Hills along Krishna River, Sri Bhramaramba Mallikarjuna Temple dates back to the Satavahana era with major patronage from Kakatiya and Vijayanagara kings.',
    architecturalStyle: 'Dravidian style with massive sculptured stone walls',
    constructionEra: '2nd Century CE onwards',
    rituals: [
      { name: 'Suprabhatam', timing: '04:30 AM', description: 'Morning awakening hymns.' },
      { name: 'Maha Mangala Aarti', timing: '05:30 AM', description: 'Divine morning light offering.' },
      { name: 'Ekantha Seva', timing: '09:30 PM', description: 'Night bedtime prayer.' }
    ],
    darshanTimings: [
      { title: 'General Darshan', timing: '06:00 AM - 03:30 PM & 06:00 PM - 10:00 PM', note: 'Free line queue available' }
    ],
    festivals: [
      { name: 'Mahashivratri Brahmotsavam', month: 'February / March', description: '7-day grand festival attracting lakhs of devotees.' }
    ],
    dressCode: 'Traditional South Indian attire required. Men must remove shirts for Abhishekam.',
    entryFee: 'Free entry; Rs 200/Rs 500 Special Darshan tickets available',
    cameraPolicy: 'Prohibited inside sanctum.',
    guidelines: ['Obtain online darshan token during festival rush.'],
    nearbyFacilities: {
      accommodation: 'Devasthanam Choultries and Haritha Resorts.',
      transport: '180 km from Kurnool; 230 km from Rajiv Gandhi International Airport Hyderabad.',
      parking: 'Ample parking at Srisailam Devasthanam parking grounds.',
      food: 'Free Annadanam hall by shrine board.'
    },
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'South India Temple Circuit', 'Shakti Peeth'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000010',
    name: 'Mahakaleshwar Temple',
    slug: 'mahakaleshwar-temple',
    state: 'Madhya Pradesh',
    city: 'Ujjain',
    address: 'Jaisinghpura, Ujjain, Madhya Pradesh 456006',
    coordinates: { lat: 23.1827, lng: 75.7682 },
    deity: {
      name: 'Lord Shiva (Mahakaleshwar)',
      category: 'Shaivism',
      significance: 'Sole South-facing (Dakshinmukhi) Jyotirlinga famous for world-renowned Bhasma Aarti.',
    },
    history:
      'Located on the banks of Shipra River in the ancient holy city of Avantika (Ujjain). The Mahakal Lok Corridor inaugurated in 2022 restored the grandeur of this ancient cosmic energy center.',
    architecturalStyle: 'Bhumija & Maru-Gurjara Temple Architecture',
    constructionEra: 'Ancient (Rebuilt by Maratha Generals in 1734 CE)',
    rituals: [
      { name: 'Bhasma Aarti', timing: '04:00 AM - 06:00 AM', description: 'Sacred ash ritual performed before dawn.' },
      { name: 'Sandhya Aarti', timing: '07:00 PM', description: 'Evening light offering.' }
    ],
    darshanTimings: [
      { title: 'General Darshan', timing: '06:00 AM - 11:00 PM', note: 'Bhasma Aarti requires prior registration' }
    ],
    festivals: [
      { name: 'Simhastha Kumbh Mela', month: 'Every 12 Years', description: 'One of the largest religious gatherings on Earth.' }
    ],
    dressCode: 'Traditional attire mandatory for Bhasma Aarti (Men in Dhoti-Sola, Women in Saree).',
    entryFee: 'Free entry; VIP protocol queue available',
    cameraPolicy: 'Strictly banned inside sanctum.',
    guidelines: ['Book Bhasma Aarti 30 days in advance on Mahakal official app.'],
    nearbyFacilities: {
      accommodation: 'Mahakal Bhakt Niwas, MP Tourism hotels, and dharamshalas.',
      transport: '2 km from Ujjain Junction; 55 km from Devi Ahilya Bai Holkar Airport Indore.',
      parking: 'Multi-level parking at Mahakal Lok entrance.',
      food: 'Free Annakshetra prasadam and local Malwa street delicacies.'
    },
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Madhya Pradesh Sacred Trail'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000011',
    name: 'Omkareshwar Temple',
    slug: 'omkareshwar-temple',
    state: 'Madhya Pradesh',
    city: 'Khandwa',
    address: 'Omkareshwar Mandir Road, Mandhata, Madhya Pradesh 450554',
    coordinates: { lat: 22.2463, lng: 76.1514 },
    deity: {
      name: 'Lord Shiva (Omkareshwar & Amaleshwar)',
      category: 'Shaivism',
      significance: 'Situated on Mandhata island shaped in the sacred Om (🕉️) symbol in Narmada River.',
    },
    history:
      'Omkareshwar is situated on the sacred Narmada island. Pilgrims perform Parikrama (circumambulation) of the Om-shaped island.',
    architecturalStyle: 'Nagara Architecture with multi-storied stone pillars',
    constructionEra: '11th Century CE',
    rituals: [
      { name: 'Mangala Aarti', timing: '05:00 AM', description: 'Dawn prayer.' },
      { name: 'Shayan Aarti', timing: '08:30 PM', description: 'Night bedtime offering.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '05:00 AM - 09:30 PM', note: 'Boating across Narmada river is popular' }
    ],
    festivals: [
      { name: 'Narmada Jayanti', month: 'January / February', description: 'Grand lamp floating festival on Narmada ghats.' }
    ],
    dressCode: 'Modest traditional Indian clothing.',
    entryFee: 'Free entry',
    cameraPolicy: 'Restricted near main deity.',
    guidelines: ['Take boat ride across Narmada or walk over suspension bridge.'],
    nearbyFacilities: {
      accommodation: 'MP Tourism Narmada Resort and Yatri Nivas.',
      transport: '70 km from Indore; 12 km from Omkareshwar Road Station.',
      parking: 'Parking at river bank before bridge.',
      food: 'Pure vegetarian thalis and Narmada riverbank snacks.'
    },
    heroImage: 'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Madhya Pradesh Sacred Trail'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000012',
    name: 'Bhimashankar Temple',
    slug: 'bhimashankar-temple',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'Bhimashankar, Khed Taluka, Pune District, Maharashtra 410509',
    coordinates: { lat: 19.072, lng: 73.5358 },
    deity: {
      name: 'Lord Shiva (Bhimashankar)',
      category: 'Shaivism',
      significance: 'Origin of River Bhima nestled amidst Western Ghats wildlife sanctuary.',
    },
    history:
      'Constructed in Nagara style with wooden Nagarkhana, renovated by Chimaji Appa and Nana Phadnavis in the 18th century.',
    architecturalStyle: 'Nagera style with Hemadpanthi influence',
    constructionEra: '18th Century CE (Renovated by Marathas)',
    rituals: [
      { name: 'Kakar Aarti', timing: '04:30 AM', description: 'Early morning prayer.' },
      { name: 'Maha Pooja', timing: '12:00 PM', description: 'Midday holy abhishek.' }
    ],
    darshanTimings: [
      { title: 'General Darshan', timing: '05:00 AM - 09:30 PM', note: 'Monsoon season offers scenic lush green views' }
    ],
    festivals: [
      { name: 'Mahashivratri', month: 'February / March', description: 'Fair held in dense forest sanctuary.' }
    ],
    dressCode: 'Traditional clothing; comfortable footwear for stone steps.',
    entryFee: 'Free entry',
    cameraPolicy: 'Allowed outside main sanctum.',
    guidelines: ['Rain gear recommended during monsoon season.'],
    nearbyFacilities: {
      accommodation: 'MTDC Resort and local Dharamshalas.',
      transport: '110 km from Pune; 210 km from Mumbai.',
      parking: 'Bus stand parking 1 km from temple.',
      food: 'Local Maharashtrian vegetarian food and Pithla Bhakri.'
    },
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Maharashtra Jyotirlinga Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000013',
    name: 'Trimbakeshwar Shiva Temple',
    slug: 'trimbakeshwar-temple',
    state: 'Maharashtra',
    city: 'Nashik',
    address: 'Trimbak, Nashik District, Maharashtra 422212',
    coordinates: { lat: 19.9322, lng: 73.5307 },
    deity: {
      name: 'Lord Shiva (Trimbakeshwar - Three-faced Linga)',
      category: 'Shaivism',
      significance: 'Features unique three-faced linga embodying Brahma, Vishnu, and Shiva.',
    },
    history:
      'Located near Brahmagiri mountain, origin of Godavari river. Rebuilt by Peshwa Balaji Baji Rao in the 18th century using black stone.',
    architecturalStyle: 'Black stone Nagara architecture',
    constructionEra: '1755 CE (Peshwa Balaji Baji Rao)',
    rituals: [
      { name: 'Morning Aarti', timing: '05:30 AM', description: 'Dawn prayer.' },
      { name: 'Kushavarta Kund Snan', timing: 'All Day', description: 'Holy dip in sacred Godavari origin tank.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '05:30 AM - 09:00 PM', note: 'Kumbh Mela venue every 12 years' }
    ],
    festivals: [
      { name: 'Nashik-Trimbakeshwar Kumbh Mela', month: 'Every 12 Years', description: 'Sacred river bathing festival.' }
    ],
    dressCode: 'Dhoti required for entering inner sanctum during Pooja.',
    entryFee: 'Free entry; VIP ticket available',
    cameraPolicy: 'Banned inside main complex.',
    guidelines: ['Visit Kushavarta Kund nearby.'],
    nearbyFacilities: {
      accommodation: 'MTDC Trimbakeshwar and numerous pilgrim trusts.',
      transport: '28 km from Nashik City; 170 km from Mumbai Airport.',
      parking: 'Parking near Trimbak bus stand.',
      food: 'Authentic Maharashtrian thali and Misal Pav.'
    },
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Maharashtra Jyotirlinga Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000014',
    name: 'Baidyanath Temple (Baba Dham)',
    slug: 'baidyanath-temple',
    state: 'Jharkhand',
    city: 'Deoghar',
    address: 'Shivganga, Deoghar, Jharkhand 814112',
    coordinates: { lat: 24.4926, lng: 86.7001 },
    deity: {
      name: 'Lord Shiva (Vaidyanath / Kamada Linga)',
      category: 'Shaivism',
      significance: 'Famous for the annual Shravani Mela Kanwar Yatra from Sultanganj.',
    },
    history:
      'According to Hindu scriptures, Ravana worshipped Lord Shiva here to obtain boons. The temple complex houses 22 temples dedicated to various deities.',
    architecturalStyle: 'Traditional East Indian Nagara style',
    constructionEra: '1596 CE (King Puran Mal)',
    rituals: [
      { name: 'Kacha Jal Offering', timing: '04:00 AM', description: 'Early morning holy Ganga water bath.' },
      { name: 'Sringar Aarti', timing: '07:30 PM', description: 'Evening flower decoration.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '04:00 AM - 03:30 PM & 06:00 PM - 09:00 PM', note: 'Extremely crowded in Shravan month' }
    ],
    festivals: [
      { name: 'Shravani Mela', month: 'July / August (Shravan)', description: '100+ km foot pilgrimage carrying holy Ganga water.' }
    ],
    dressCode: 'Saffron traditional attire during Shravan month.',
    entryFee: 'Free entry; Fast track pass available',
    cameraPolicy: 'Banned inside main sanctum.',
    guidelines: ['Exercise caution during high density Shravan rush.'],
    nearbyFacilities: {
      accommodation: 'Government Yatri Nivas and dharamshalas in Deoghar.',
      transport: '7 km from Jasidih Junction; Deoghar Airport (DGH) 10 km.',
      parking: 'Dedicated parking at Babadham parking yard.',
      food: 'Famous Deoghar Peda and pure vegetarian eateries.'
    },
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'East India Cultural Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000015',
    name: 'Nageshwar Jyotirlinga Temple',
    slug: 'nageshwar-temple',
    state: 'Gujarat',
    city: 'Dwarka',
    address: 'Nageshwar, Daarukavanam, Dwarka, Gujarat 361335',
    coordinates: { lat: 22.3353, lng: 69.0857 },
    deity: {
      name: 'Lord Shiva (Nageshwar / Lord of Serpents)',
      category: 'Shaivism',
      significance: 'Features a iconic 85-foot giant statue of Lord Shiva in posture of meditation.',
    },
    history:
      'Mentioned in Rudra Samhita as Daarukavanam. Protects devotees from all poisons and negative energies.',
    architecturalStyle: 'Modern Solanki Nagara stone architecture',
    constructionEra: 'Modern renovation by Gulshan Kumar Trust',
    rituals: [
      { name: 'Mangala Aarti', timing: '06:00 AM', description: 'Morning light offering.' },
      { name: 'Sandhya Aarti', timing: '07:00 PM', description: 'Evening prayers.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '06:00 AM - 12:30 PM & 05:00 PM - 09:30 PM', note: 'Abhishekam allowed for devotees wearing Dhoti' }
    ],
    festivals: [
      { name: 'Mahashivratri', month: 'February / March', description: 'Grand illuminations and continuous Abhishekam.' }
    ],
    dressCode: 'Dhoti compulsory for inner sanctum touch.',
    entryFee: 'Free entry',
    cameraPolicy: 'Allowed outside; restricted in inner sanctum.',
    guidelines: ['Combine visit with Bet Dwarka and Dwarkadhish temple.'],
    nearbyFacilities: {
      accommodation: 'Hotels and guest houses in Dwarka city (12 km).',
      transport: '12 km from Dwarka Railway Station; 110 km from Jamnagar Airport.',
      parking: 'Spacious parking lot in front of temple.',
      food: 'Gujarati Thali and Prasad stalls.'
    },
    heroImage: 'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Gujarat Coastal Pilgrimage'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000016',
    name: 'Ramanathaswamy Temple',
    slug: 'ramanathaswamy-temple',
    state: 'Tamil Nadu',
    city: 'Rameswaram',
    address: 'Rameswaram, Ramanathapuram District, Tamil Nadu 623526',
    coordinates: { lat: 9.2881, lng: 79.3174 },
    deity: {
      name: 'Lord Shiva (Ramanathaswamy)',
      category: 'Shaivism',
      significance: 'Built by Lord Rama; features world’s longest temple corridor with 1,212 carved pillars.',
    },
    history:
      'One of the 12 Jyotirlingas AND one of the 4 Char Dham shrines. Lord Rama established the linga to seek absolution after defeating Ravana.',
    architecturalStyle: 'Grand Dravidian Architecture with 1212 pillared corridor',
    constructionEra: '12th Century CE (Expanded by Pandya & Sethupathi Kings)',
    rituals: [
      { name: 'Spatika Linga Darshan', timing: '05:00 AM - 06:00 AM', description: 'Sacred crystal linga morning ritual.' },
      { name: '22 Holy Teertham Bathing', timing: '06:00 AM - 12:00 PM', description: 'Holy bath in 22 sacred wells within complex.' }
    ],
    darshanTimings: [
      { title: 'Daily Timings', timing: '05:00 AM - 01:00 PM & 03:00 PM - 09:00 PM', note: 'Bathing in Agni Theertham sea is customary' }
    ],
    festivals: [
      { name: 'Maha Shivratri & Thirukalyanam', month: 'February & July', description: '10-day grand chariot and sea bath festival.' }
    ],
    dressCode: 'Strict traditional attire: Men in Dhoti/Vesti; Women in Saree/Chudidhar. Wet clothes strictly changed after 22 wells bath.',
    entryFee: 'Free entry; Rs 25 for 22 Teertham bath queue',
    cameraPolicy: 'Strictly banned inside temple corridor.',
    guidelines: ['Change into dry clothes before entering main sanctum after holy well bath.'],
    nearbyFacilities: {
      accommodation: 'TTDC Hotel Tamil Nadu and numerous South Indian Yatri Nivas.',
      transport: '2 km from Rameswaram Railway Station; 175 km from Madurai Airport.',
      parking: 'Dedicated parking near Agni Theertham beach.',
      food: 'Authentic Rameshwaram South Indian breakfast tiffins and Prasadam.'
    },
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Char Dham', 'South India Golden Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000017',
    name: 'Grishneshwar Temple',
    slug: 'grishneshwar-temple',
    state: 'Maharashtra',
    city: 'Chhatrapati Sambhajinagar',
    address: 'Verul, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431102',
    coordinates: { lat: 20.0249, lng: 75.1687 },
    deity: {
      name: 'Lord Shiva (Grishneshwar / Kusumeshwar)',
      category: 'Shaivism',
      significance: 'The 12th and final Jyotirlinga shrine, located right beside UNESCO Ellora Caves.',
    },
    history:
      'Constructed out of red basalt rock by Maharani Ahilyabai Holkar in the 18th century. Features exquisite carvings of 5 tier Nagara spire.',
    architecturalStyle: 'Red Basalt Rock South-Nagara Architecture',
    constructionEra: '18th Century CE (Maharani Ahilyabai Holkar)',
    rituals: [
      { name: 'Mangala Aarti', timing: '05:30 AM', description: 'Early morning prayer.' },
      { name: 'Night Shringar', timing: '09:00 PM', description: 'Night sandal paste adornment.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '05:30 AM - 09:30 PM', note: 'Men must be bare-chested to enter sanctum' }
    ],
    festivals: [
      { name: 'Mahashivratri', month: 'February / March', description: 'Grand fair and palanquin procession.' }
    ],
    dressCode: 'Men must remove upper garments (shirts/vests) to enter inner sanctum.',
    entryFee: 'Free entry',
    cameraPolicy: 'Prohibited inside sanctum.',
    guidelines: ['Combine with Ellora Caves UNESCO heritage walk.'],
    nearbyFacilities: {
      accommodation: 'MTDC Ellora Resort and hotels in Aurangabad city.',
      transport: '30 km from Chhatrapati Sambhajinagar Railway Station & Airport.',
      parking: 'Parking grounds near Ellora road.',
      food: 'Local Maharashtrian thalis and sugarcane juice.'
    },
    heroImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['12 Jyotirlinga', 'Maharashtra Jyotirlinga Circuit'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000018',
    name: 'Badrinath Temple',
    slug: 'badrinath-temple',
    state: 'Uttarakhand',
    city: 'Chamoli',
    address: 'Badrinath, Chamoli District, Uttarakhand 246422',
    coordinates: { lat: 30.7433, lng: 79.4938 },
    deity: {
      name: 'Lord Vishnu (Badrinath / Badri Narayan)',
      category: 'Vaishnavism',
      significance: 'Primary shrine of Char Dham & Chhota Char Dham located beside Alaknanda River.',
    },
    history:
      'Re-established by Adi Shankaracharya in the 8th century CE. Features a colorful wooden facade and 1-meter tall black stone idol of Lord Vishnu in meditative posture.',
    architecturalStyle: 'Garhwal Wooden Cone Architecture with brightly painted facade',
    constructionEra: '8th Century CE (Adi Shankaracharya)',
    rituals: [
      { name: 'Maha Abhishek', timing: '04:30 AM', description: 'Holy bath ritual with Vedic chants.' },
      { name: 'Geeta Govind Recitation', timing: '08:30 PM', description: 'Night musical prayer before closing.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '04:30 AM - 01:00 PM & 04:00 PM - 09:00 PM', note: 'Open for 6 months (May to November)' }
    ],
    festivals: [
      { name: 'Kapat Uthan & Bandh', month: 'May & November', description: 'Ceremonial opening and closing of Himalayan shrine.' }
    ],
    dressCode: 'Heavy woolen thermals and jackets.',
    entryFee: 'Free entry',
    cameraPolicy: 'Banned inside main sanctum.',
    guidelines: ['Take dip in Tapt Kund natural hot sulfur spring before entry.'],
    nearbyFacilities: {
      accommodation: 'GMVN Rest Houses, Parmarth Lok, and private hotels.',
      transport: '300 km from Rishikesh Railway Station; 315 km from Dehradun Airport.',
      parking: 'Badrinath bus stand parking area.',
      food: 'Pure vegetarian north Indian meals and hot tea.'
    },
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['Char Dham', 'Chhota Char Dham', 'Uttarakhand Pilgrimage'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000019',
    name: 'Dwarkadhish Temple',
    slug: 'dwarkadhish-temple',
    state: 'Gujarat',
    city: 'Dwarka',
    address: 'Dwarkadhish Temple Road, Dwarka, Gujarat 361335',
    coordinates: { lat: 22.2376, lng: 68.9674 },
    deity: {
      name: 'Lord Krishna (Dwarkadhish / King of Dwarka)',
      category: 'Vaishnavism',
      significance: 'Major Char Dham pilgrimage site known as Jagat Mandir (World Temple).',
    },
    history:
      'The original temple was built by Krishna’s grandson Vajranabha over 2,200 years ago. The current 5-storied limestone temple rests on 72 pillars overlooking the Arabian Sea.',
    architecturalStyle: '5-Storied Chalukyan Stone Architecture with 52-yard Dhwaja flag',
    constructionEra: '15th - 16th Century CE',
    rituals: [
      { name: 'Mangala Aarti', timing: '06:30 AM', description: 'Morning awakening prayer.' },
      { name: 'Dhwaja Arohan', timing: '5 Times Daily', description: 'Ceremonial changing of 52-yard sacred flag atop 78m spire.' }
    ],
    darshanTimings: [
      { title: 'Daily Darshan', timing: '06:30 AM - 01:00 PM & 05:00 PM - 09:30 PM', note: 'Gomti Ghat snan is customary before darshan' }
    ],
    festivals: [
      { name: 'Janmashtami', month: 'August / September', description: 'Grand midnight birth celebration of Lord Krishna.' }
    ],
    dressCode: 'Modest Indian attire.',
    entryFee: 'Free entry',
    cameraPolicy: 'Strictly prohibited inside entire temple compound.',
    guidelines: ['Deposit all mobile phones and electronics at official locker counter.'],
    nearbyFacilities: {
      accommodation: 'Toran Beach Resort and multi-tier dharamshalas.',
      transport: '2 km from Dwarka Railway Station; 110 km from Jamnagar Airport.',
      parking: 'Parking near Sunset Point and Gomti Ghat.',
      food: 'Pure Gujarati Thalis, Makhan Mishri prasadam, and Kadhi Khichdi.'
    },
    heroImage: 'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['Char Dham', 'Gujarat Coastal Pilgrimage'],
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '64f8a1230000000000000020',
    name: 'Brihadeeswarar Temple',
    slug: 'brihadeeswarar-temple',
    state: 'Tamil Nadu',
    city: 'Thanjavur',
    address: 'Membalam Road, Balaganapathy Nagar, Thanjavur, Tamil Nadu 613007',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    deity: {
      name: 'Lord Shiva (Brihadeeswarar / Peruvudaiyar)',
      category: 'Shaivism',
      significance: 'UNESCO World Heritage Site; grand Chola architectural masterpiece with 216ft Vimana.',
    },
    history:
      'Built in 1010 CE by Emperor Raja Raja Chola I. Entirely constructed from granite, crowned by an 80-ton single stone Kumbam carved from a single granite block.',
    architecturalStyle: 'Pure Dravidian Chola Architecture',
    constructionEra: '1010 CE (Raja Raja Chola I)',
    rituals: [
      { name: 'Morning Abhishekam', timing: '08:30 AM', description: 'Holy bath of giant Nandi idol.' },
      { name: 'Evening Deeparadhana', timing: '06:30 PM', description: 'Illumination of sanctum tower.' }
    ],
    darshanTimings: [
      { title: 'Daily Visiting Hours', timing: '06:00 AM - 12:30 PM & 04:00 PM - 08:30 PM', note: 'Massive monolith Nandi statue in front courtyard' }
    ],
    festivals: [
      { name: 'Raja Raja Chola Sataya Vizha', month: 'October / November', description: 'Grand Chola cultural heritage festival.' }
    ],
    dressCode: 'Traditional Indian attire.',
    entryFee: 'Free entry (ASI Monument)',
    cameraPolicy: 'Photography allowed in outer courtyard; prohibited inside inner sanctum.',
    guidelines: ['Walk around the massive granite fortified walls.'],
    nearbyFacilities: {
      accommodation: 'Hotel Tamil Nadu Thanjavur and heritage hotels.',
      transport: '1 km from Thanjavur Junction; 55 km from Tiruchirappalli International Airport (TRZ).',
      parking: 'Spacious ASI parking lot.',
      food: 'Authentic Tanjore South Indian meals.'
    },
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1200&q=80'],
    circuitTags: ['South India Golden Circuit', 'UNESCO World Heritage', 'Tamil Nadu Heritage'],
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
    image: '/12 jyotirling yatra.png',
    templeIds: [
      '64f8a1230000000000000007',
      '64f8a1230000000000000009',
      '64f8a1230000000000000010',
      '64f8a1230000000000000011',
      '64f8a1230000000000000002',
      '64f8a1230000000000000012',
      '64f8a1230000000000000001',
      '64f8a1230000000000000013',
      '64f8a1230000000000000014',
      '64f8a1230000000000000015',
      '64f8a1230000000000000016',
      '64f8a1230000000000000017'
    ]
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
    image: '/char dham yatra.png',
    templeIds: [
      '64f8a1230000000000000018',
      '64f8a1230000000000000019',
      '64f8a1230000000000000008',
      '64f8a1230000000000000016'
    ]
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
    image: '/South India Golden Heritage Circuit.png',
    templeIds: [
      '64f8a1230000000000000003',
      '64f8a1230000000000000004',
      '64f8a1230000000000000020',
      '64f8a1230000000000000016'
    ]
  }
];

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Seeding sample temples, circuits, and admin account...');

    const adminPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : '';
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD environment variable is missing or empty.');
    }

    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@travelbharat.gov.in' });
    if (!adminExists) {
      await User.create({
        name: 'Travel Bharat Admin',
        email: 'admin@travelbharat.gov.in',
        password: adminPassword,
        role: 'admin',
      });
      console.log('[Seed] Admin user created: admin@travelbharat.gov.in');
    }

    // Seed Temples
    await Temple.deleteMany({});
    const insertedTemples = await Temple.insertMany(
      sampleTemples.map((t) => {
        const { _id, ...rest } = t;
        return rest;
      })
    );
    console.log(`[Seed] Successfully inserted ${insertedTemples.length} temples into MongoDB.`);

    // Map inserted temples by slug
    const templesBySlug = {};
    insertedTemples.forEach((t) => {
      templesBySlug[t.slug] = t._id;
    });

    const circuitMappings = {
      '12-jyotirlinga-yatra': [
        'somnath-temple',
        'mallikarjuna-temple',
        'mahakaleshwar-temple',
        'omkareshwar-temple',
        'kedarnath-temple',
        'bhimashankar-temple',
        'kashi-vishwanath-temple',
        'trimbakeshwar-temple',
        'baidyanath-temple',
        'nageshwar-temple',
        'ramanathaswamy-temple',
        'grishneshwar-temple'
      ],
      'char-dham-yatra': [
        'badrinath-temple',
        'dwarkadhish-temple',
        'jagannath-temple-puri',
        'ramanathaswamy-temple'
      ],
      'south-india-golden-circuit': [
        'meenakshi-amman-temple',
        'tirupati-balaji-temple',
        'brihadeeswarar-temple',
        'ramanathaswamy-temple'
      ]
    };

    // Seed Circuits
    await Circuit.deleteMany({});
    const circuitsToInsert = sampleCircuits.map((c) => {
      const { _id, ...rest } = c;
      const slugs = circuitMappings[c.slug] || [];
      const templeIds = slugs.map((s) => templesBySlug[s]).filter(Boolean);
      return {
        ...rest,
        templeIds,
      };
    });

    await Circuit.insertMany(circuitsToInsert);
    console.log(`[Seed] Successfully inserted ${circuitsToInsert.length} pilgrimage circuits with complete temple relationships.`);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    throw error;
  }
};

// Start the seeding process if script executed directly
const startSeeding = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Seed] MongoDB Atlas connected!');
    await seedDatabase();
    console.log('[Seed] Database seeding completed!');
    await mongoose.connection.close();
    console.log('[Seed] MongoDB connection closed.');
  } catch (error) {
    console.error('[Seed Error]', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

const currentFilePath = fileURLToPath(import.meta.url);
const executedScriptPath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (executedScriptPath === currentFilePath) {
  startSeeding();
}