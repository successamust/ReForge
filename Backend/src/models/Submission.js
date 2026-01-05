import mongoose from 'mongoose';
import config from '../config/index.js';

const testResultSchema = new mongoose.Schema({
    testId: {
        type: String,
        required: true,
    },
    passed: {
        type: Boolean,
        required: true,
    },
    stdout: {
        type: String,
        default: '',
    },
    stderr: {
        type: String,
        default: '',
    },
    durationMs: {
        type: Number,
    },
    hint: {
        type: String,
        default: null,
    },
    expected: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    actual: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    // For hidden tests, don't expose details
    isHidden: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const resultDetailsSchema = new mongoose.Schema({
    passed: {
        type: Boolean,
        required: true,
    },
    details: {
        type: [testResultSchema],
        default: [],
    },
    summary: {
        passedCount: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    error: {
        type: String,
        default: null,
    },
    executionTimeMs: {
        type: Number,
    },
}, { _id: false });

const submissionSchema = new mongoose.Schema({
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
        index: true,
    },
    day: {
        type: Number,
        required: true,
        min: 1,
        max: config.maxDays,
        index: true,
    },
    code: {
        type: String,
        required: true,
        maxlength: 50000,
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'completed', 'failed', 'error'],
        default: 'pending',
        index: true,
    },
    resultDetails: {
        type: resultDetailsSchema,
        default: null,
    },
    // Job ID for tracking in the queue
    jobId: {
        type: String,
        default: null,
    },
    newAchievements: {
        type: Array,
        default: [],
    },
    finishedAt: {
        type: Date,
        default: null,
    },
    verification: {
        verified: { type: Boolean, default: true },
        warning: { type: String, default: null }
    },
}, {
    timestamps: true,
});

// Compound indexes for common queries
submissionSchema.index({ userId: 1, language: 1, day: 1 });
submissionSchema.index({ createdAt: -1 });

// Method to get user-facing result (hide details of hidden tests)
submissionSchema.methods.toUserObject = function () {
    const obj = this.toObject();
    delete obj.__v;

    if (obj.resultDetails && obj.resultDetails.details) {
        obj.resultDetails.details = obj.resultDetails.details.map(detail => {
            if (detail.isHidden) {
                return {
                    testId: detail.testId,
                    passed: detail.passed,
                    isHidden: true,
                    // Don't expose stdout/stderr for hidden tests
                };
            }
            return detail;
        });
    }

    return obj;
};

// Static: Get user's submission history for a language
submissionSchema.statics.getHistory = function (userId, language, options = {}) {
    const query = { userId, language };
    if (options.day) {
        query.day = options.day;
    }

    return this.find(query)
        .sort({ createdAt: -1 })
        .limit(options.limit || 50)
        .select('-code'); // Don't return code in history
};

// Static: Get latest submission for a specific day
submissionSchema.statics.getLatest = function (userId, language, day) {
    return this.findOne({ userId, language, day })
        .sort({ createdAt: -1 });
};

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
