import { Client } from "https://deno.land/x/postgres/mod.ts";

// Set up PostgreSQL client connection
const client = new Client({
  user: "postgres", //tarkista mikä pitää olla, vai onko helikrista vai postgres
  database: "postgres",//tarkista mikä pitää olla, vai onko booking_system_db
  hostname: "localhost",
  password: "Secret1234!",
  port: 5432,
});

await client.connect();

export default client;