import { config } from 'dotenv';

config();

import { connectToDatabase } from './database/mongoose';

const testConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');

        const conn = await connectToDatabase();

        console.log('✅ Connected successfully!');
        console.log('Database name:', conn.connection.name);
        console.log('Host:', conn.connection.host);

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
};

testConnection();