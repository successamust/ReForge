import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const { MONGODB_URI } = process.env;

async function checkStatuses() {
    console.log('Connecting to:', MONGODB_URI);
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');
        const Submission = mongoose.model('Submission', new mongoose.Schema({}, { strict: false }));
        
        const statuses = await Submission.distinct('status');
        console.log('Unique statuses:', statuses);
        
        const counts = await Submission.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        console.log('Status counts:', counts);
        
        process.exit(0);
    } catch (err) {
        console.error('Error during check:', err);
        process.exit(1);
    }
}

checkStatuses();
