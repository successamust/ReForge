import mongoose from 'mongoose';
import config from '../config/index.js';

const testSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    input: {
        type: mongoose.Schema.Types.Mixed,
    },
    expectedOutput: {
        type: mongoose.Schema.Types.Mixed,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    weight: {
        type: Number,
        default: 1,
    },
    // Optional hint shown only on failure
    hint: {
        type: String,
        default: null,
    },
}, { _id: false, minimize: false });

const exampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
}, { _id: false, minimize: false });

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    starterCode: {
        type: String,
        default: '',
    },
    hints: {
        type: [String],
        default: [],
        validate: [v => v.length <= 3, 'Maximum 3 hints allowed'],
    },
}, { _id: false, minimize: false });

const lessonSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: true,
        maxlength: 200,
    },
    objectives: {
        type: [String],
        required: true,
        validate: [v => v.length >= 3 && v.length <= 5, 'Must have 3-5 objectives'],
    },
    contentHtml: {
        type: String,
        required: true,
    },
    examples: {
        type: [exampleSchema],
        required: true,
        validate: [v => v.length >= 2, 'Must have at least 2 examples'],
    },
    exercise: {
        type: exerciseSchema,
        required: true,
    },
    tests: {
        type: [testSchema],
        required: true,
        validate: [v => v.length >= 3, 'Must have at least 3 tests'],
    },
    // Canonical solution (admin-only)
    solution: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    estimatedMinutes: {
        type: Number,
        required: true,
        min: 5,
        max: 180,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    minimize: false,
});

// Compound unique index for language + day
lessonSchema.index({ language: 1, day: 1 }, { unique: true });

// Method to get public tests only (hide hidden tests from users)
lessonSchema.methods.getPublicTests = function () {
    return this.tests.filter(t => !t.isHidden);
};

// Method to get all tests for grading
lessonSchema.methods.getAllTests = function () {
    return this.tests;
};

// Method to get user-facing lesson (without solution and hidden tests)
lessonSchema.methods.toUserObject = function () {
    const obj = this.toObject();
    delete obj.solution;
    delete obj.__v;
    // Remove hidden tests and hints from hidden tests
    obj.tests = obj.tests
        .filter(t => !t.isHidden)
        .map(t => {
            delete t.hint;
            return t;
        });
    return obj;
};

// Static method to find lesson by language and day
lessonSchema.statics.findByLanguageAndDay = function (language, day) {
    return this.findOne({ language, day, isPublished: true });
};

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
