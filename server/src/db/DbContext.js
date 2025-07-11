import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { TowerEventSchema } from '../models/TowerEvent.js';
import { TicketSchema } from '../models/Ticket.js';
import { TowerCommentSchema } from '../models/TowerComment.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);

  Tickets = mongoose.model('Ticket', TicketSchema)
  
  TowerComments = mongoose.model('TowerComment', TowerCommentSchema)
}

export const dbContext = new DbContext()
