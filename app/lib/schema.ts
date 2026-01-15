import { pgTable, serial, text, timestamp, boolean, integer  } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';



export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  location: text('location'),  // Add if needed
});


// Attendees table
export const attendees = pgTable('attendees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  eventId: integer('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Optional: if you want to define relations (for Drizzle ORM advanced use)
export const eventsRelations = relations(events, ({ many }) => ({
  attendees: many(attendees),
}));

export const attendeesRelations = relations(attendees, ({ one }) => ({
  event: one(events, {
    fields: [attendees.eventId],
    references: [events.id],
  }),
}));

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  eventId: integer('event_id').references(() => events.id).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // Store hashed password
  createdAt: timestamp('created_at').defaultNow(),
});

