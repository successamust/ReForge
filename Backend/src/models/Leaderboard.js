import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    firstName: String,
    lastName: String,
    passedDays: {
        type: Number,
        default: 0,
        index: -1, // Descending order
    },
    totalCompletionTimeMs: {
        type: Number,
        default: 0,
        index: 1, // Ascending order (tie-breaker)
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Composite index for efficient sorting
leaderboardSchema.index({ passedDays: -1, totalCompletionTimeMs: 1 });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
