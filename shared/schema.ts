import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("active"), // active, remote, offline
  skills: jsonb("skills").notNull().default([]),
  avatar: text("avatar"),
  bio: text("bio"),
  location: text("location"),
  apiSources: jsonb("api_sources").notNull().default({}), // {twitter: 'success', imdb: 'error', wikipedia: 'success'}
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const apiMetrics = pgTable("api_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tti: text("tti").notNull().default("1.2s"),
  previousTti: text("previous_tti").notNull().default("2.1s"),
  improvement: text("improvement").notNull().default("44%"),
  apiSourcesCount: text("api_sources_count").notNull().default("3"),
  searchSpeedMultiplier: text("search_speed_multiplier").notNull().default("2x"),
  wcagCompliant: boolean("wcag_compliant").notNull().default(true),
  lastUpdated: timestamp("last_updated").default(sql`now()`),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertApiMetricsSchema = createInsertSchema(apiMetrics).omit({
  id: true,
  lastUpdated: true,
});

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;
export type InsertApiMetrics = z.infer<typeof insertApiMetricsSchema>;
export type ApiMetrics = typeof apiMetrics.$inferSelect;
