import { Client } from 'pg';

const client = new Client({
  connectionString:
    'postgresql://ks573696:7y9rkTzoFZpA@ep-lingering-violet-a15uo5u4.ap-southeast-1.aws.neon.tech/test?sslmode=require',
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    `);

  console.log(result);

  const res = await client.query(`CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    `);
  console.log(res);
}

// Async function to fetch user data and their address together
async function getUserDetailsWithAddress(userId: string) {
  try {
    await client.connect();
    const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
    const result = await client.query(query, [userId]);

    if (result.rows.length > 0) {
      console.log('User and address found:', result.rows[0]);
      return result.rows[0];
    } else {
      console.log('No user or address found with the given ID.');
      return null;
    }
  } catch (err) {
    console.error('Error during fetching user and address:', err);
    throw err;
  } finally {
    await client.end();
  }
}
// getUserDetailsWithAddress("1");
