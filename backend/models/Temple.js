import mongoose from 'mongoose';

const ritualSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timing: { type: String, required: true },
  description: { type: String },
});

const timingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timing: { type: String, required: true },
  note: { type: String },
});

const festivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  month: { type: String },
  description: { type: String },
});

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Temple name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: { type: Number, default: 20.5937 },
      lng: { type: Number, default: 78.9629 },
    },
    deity: {
      name: { type: String, required: true },
      category: { type: String, default: 'Shaivism' }, // e.g. Shaivism, Vaishnavism, Shaktism, Sikhism, Surya, etc.
      significance: { type: String },
    },
    history: {
      type: String,
      required: true,
    },
    architecturalStyle: {
      type: String,
      default: 'Nagara / Dravidian',
    },
    constructionEra: {
      type: String,
      default: 'Ancient',
    },
    rituals: [ritualSchema],
    darshanTimings: [timingSchema],
    festivals: [festivalSchema],
    dressCode: {
      type: String,
      default: 'Traditional Indian attire recommended. Modest clothing covering shoulders and knees required.',
    },
    entryFee: {
      type: String,
      default: 'Free Entry (Special VIP Darshan tickets available)',
    },
    cameraPolicy: {
      type: String,
      default: 'Mobile phones and cameras are strictly prohibited inside the main sanctum.',
    },
    guidelines: [{ type: String }],
    nearbyFacilities: {
      accommodation: { type: String, default: 'Multiple dharamshalas, budget hotels, and luxury resorts available nearby.' },
      transport: { type: String, default: 'Well-connected by local auto-rickshaws, taxis, and state bus terminals.' },
      parking: { type: String, default: 'Dedicated vehicle parking lot located 300 meters from the temple complex.' },
      food: { type: String, default: 'Free Anna Kshetra (Prasadam hall) and pure vegetarian eateries surrounding the temple.' },
    },
    images: [{ type: String }],
    heroImage: { type: String, required: true },
    circuitTags: [{ type: String }], // e.g., 'Char Dham', '12 Jyotirlinga', '51 Shakti Peeth', etc.
    isFeatured: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

templeSchema.index({ name: 'text', state: 'text', city: 'text', 'deity.name': 'text', circuitTags: 'text' });

const Temple = mongoose.model('Temple', templeSchema);
export default Temple;
