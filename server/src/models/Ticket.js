import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  
  accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.ObjectId, ref: 'TowerEvent', required: true },
  
}, { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('profile', {
  localField: 'accountId', 
  foreignField: '_id', 
  ref: 'Account', 
  justOne: true,
  options: { select: 'name picture'}
})

TicketSchema.virtual('event', {
  localField: 'eventId', 
  foreignField: '_id', 
  ref: 'TowerEvent', 
  justOne: true,
})