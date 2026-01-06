import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';

const progressSchema = new mongoose.Schema({
    language: {
        type: String,
        enum: config.supportedLanguages,
        required: true,
    },
    currentDay: {
        type: Number,
        default: 1,
        min: 1,
        max: config.maxDays,
    },
    lastPassedDay: {
        type: Number,
        default: 0,
        min: 0,
        max: config.maxDays,
    },
    failedDay: {
        type: Number,
        default: null,
        min: 1,
        max: config.maxDays,
    },
    failedAt: {
        type: Date,
        default: null,
    },
    attemptCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    lastAdvancedAt: {
        type: Date,
        default: Date.now,
    },
    points: {
        type: Number,
        default: 0,
    },
    lockedUntil: {
        type: Date,
        default: null,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    arenaLockoutUntil: {
        type: Date,
        default: null,
    },
    adminOverride: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    passwordHash: {
        type: String,
        required: function () { return !this.googleId && !this.githubId; },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    timezone: {
        type: String,
        default: 'UTC',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    progress: {
        type: [progressSchema],
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ['active', 'relapsed', 'banned'],
        default: 'active',
        index: true
    },
    relapsedAt: {
        type: Date,
        default: null
    },
    detoxRequired: {
        type: Number,
        default: 0
    },
    subscription: {
        tier: { type: String, enum: ['free', 'premium'], default: 'free' },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        expiresAt: Date,
    },
    stats: {
        currentStreak: { type: Number, default: 0 },
        maxStreak: { type: Number, default: 0 },
        totalPoints: { type: Number, default: 0 },
        totalArenaWins: { type: Number, default: 0 },
        lastActivityAt: Date,
    },
}, {
    timestamps: true,
});

userSchema.index({ 'progress.failedAt': 1, 'progress.adminOverride': 1 });

userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Method to get progress for a specific language
userSchema.methods.getProgress = function (language) {
    let progress = this.progress.find(p => p.language === language);

    if (!progress) {
        // Initialize progress for this language
        progress = {
            language,
            currentDay: 1,
            lastPassedDay: 0,
            failedDay: null,
            failedAt: null,
            attemptCount: 0,
            lockedUntil: null,
            completedAt: null,
            adminOverride: false,
        };
        this.progress.push(progress);
    }

    return progress;
};

userSchema.methods.toSafeObject = function () {
    const obj = this.toObject();
    delete obj.passwordHash;
    delete obj.__v;
    return obj;
};

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model('User', userSchema);

export default User;
