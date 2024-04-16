import mongoose from 'mongoose';
import {log} from './log4jsConfig.js';

async function connectToDB(): Promise<void> {
    try {
        await mongoose.connect(String(process.env.DB_CONNECTION_STRING));
        log.info('Connected to the database');
    } catch (error) {
        log.error('Error connecting to the database', error);
        throw error;
    }
}

export default connectToDB;
