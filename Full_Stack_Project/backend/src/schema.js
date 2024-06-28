const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

module.exports = users