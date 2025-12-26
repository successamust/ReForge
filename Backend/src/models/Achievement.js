import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        enum: [
            'STREAK_7',
            'STREAK_30',
            'LANGUAGE_COMPLETE',
            'ALL_COMPLETE',
            'POINTS_100',
            'POINTS_1000',
        ],
    },
    metadata: {
        language: String,
        day: Number,
        points: Number,
    },
    unlockedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// User should only have one of each type (or one per language for LANGUAGE_COMPLETE)
achievementSchema.index({ userId: 1, type: 1, 'metadata.language': 1 }, { unique: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
