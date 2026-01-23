import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const lessonSchema = new mongoose.Schema({
    language: String,
    day: Number
});
const Lesson = mongoose.model('Lesson', lessonSchema);

async function checkLessons() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const languages = ['javascript', 'python', 'java', 'go', 'csharp'];
        for (const lang of languages) {
            const count = await Lesson.countDocuments({ language: lang });
            console.log(`${lang}: ${count} lessons`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error checking lessons:', err);
        process.exit(1);
    }
}

checkLessons();
