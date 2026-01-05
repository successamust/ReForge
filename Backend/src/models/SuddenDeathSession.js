import mongoose from 'mongoose';
import config from '../config/index.js';

const suddenDeathSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    language: {
        type: String,
        enum: config.supportedLanguages,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'failed', 'expired'],
        default: 'active',
        index: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    problemPool: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    }],
    timeLimits: [Number], // Seconds per problem
    currentProblemIndex: {
        type: Number,
        default: 0,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    score: {
        type: Number,
        default: 0,
    },
    livesRemaining: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true,
});

// Calculate if session is expired (e.g., 2 hours max session or per-level timer)
suddenDeathSessionSchema.methods.isExpired = function () {
    // Basic session expiry - 2 hours
    const expiryTime = 2 * 60 * 60 * 1000;
    return (Date.now() - this.startTime.getTime()) > expiryTime;
};

const SuddenDeathSession = mongoose.model('SuddenDeathSession', suddenDeathSessionSchema);

export default SuddenDeathSession;
