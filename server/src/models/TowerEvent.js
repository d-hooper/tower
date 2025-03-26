import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 500 },
    location: { type: String, required: true, minLength: 1, maxLength: 500 },
    capacity: { type: Number, required: true, min: 1, max: 5000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] },
  }, 
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'name picture'
  }
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  justOne: true,
  count: true
})