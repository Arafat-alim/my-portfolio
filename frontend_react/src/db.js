// db.js

import { neon } from "@neondatabase/serverless";

// Initialize Neon with the database URL (use environment variable or hardcoded URL)
const sql = neon(
  process.env.REACT_APP_DATABASE_URL ||
    "postgresql://portfolio_v1_owner:fPpL8Iy6zVkv@ep-divine-scene-a1sws4t0.ap-southeast-1.aws.neon.tech/portfolio_v1?sslmode=require"
);

// Function to fetch data from the database
export const getVisitors = async () => {
  try {
    const result = await sql`SELECT * FROM visitor_infov1`; // Use tagged template for queries
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from Neon:", error);
    throw error;
  }
};

export const postVisitor = async (visitorInfo) => {
  const { ip_address, country, state, city, isp, user_agent, country_code } =
    visitorInfo;

  try {
    // Insert visitor data into the database
    await sql`
      INSERT INTO visitor_infov1 (ip_address, country, country_code, state, city, isp, user_agent, visit_time)
      VALUES (${ip_address}, ${country}, ${country_code}, ${state}, ${city}, ${isp}, ${user_agent}, CURRENT_TIMESTAMP)
    `;
  } catch (error) {
    console.error("Error occurred while posting data: ", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
