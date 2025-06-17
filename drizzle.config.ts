import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/lib/schema.ts",
  out: "./drizzle",
          
  dialect: "postgresql",          // ✅ required
  dbCredentials: {
    host: "localhost",            // 🔁 update this if needed
    port: 5432,
    user: "postgres",        // 🔁 replace with your actual Postgres username
    password: "srijita",    // 🔁 replace with your Postgres password
    database: "event_manager",    // 🔁 replace with your Postgres database name
  },
});
