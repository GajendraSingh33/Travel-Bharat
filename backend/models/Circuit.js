import mongoose from 'mongoose';

const circuitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    region: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    significance: {
      type: String,
    },
    templeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
      },
    ],
    totalDistance: {
      type: String,
      default: 'Variable depending on starting point',
    },
    recommendedDays: {
      type: String,
      default: '3-7 Days',
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Circuit = mongoose.model('Circuit', circuitSchema);
export default Circuit;
