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
            'FIRST_BLOOD',
            'SPEED_DEMON',
            'SHARPSHOOTER',
            'POLYGLOT',
            // Javascript
            'JAVASCRIPT_INITIATE', 'JAVASCRIPT_7', 'JAVASCRIPT_15', 'JAVASCRIPT_30',
            // Python
            'PYTHON_INITIATE', 'PYTHON_7', 'PYTHON_15', 'PYTHON_30',
            // Java
            'JAVA_INITIATE', 'JAVA_7', 'JAVA_15', 'JAVA_30',
            // Go
            'GO_INITIATE', 'GO_7', 'GO_15', 'GO_30',
            // C#
            'CSHARP_INITIATE', 'CSHARP_7', 'CSHARP_15', 'CSHARP_30',
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
