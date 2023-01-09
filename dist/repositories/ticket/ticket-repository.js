"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class TicketRepository {
  constructor(database) {
    this.database = database;
  }
  async create(ticket) {
    const saveticket = await this.database.save(ticket);
    if (saveticket) {
      return saveticket;
    }
    return null;
  }
}
exports.default = TicketRepository;