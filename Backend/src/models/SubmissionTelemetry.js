
import mongoose from 'mongoose';

const submissionTelemetrySchema = new mongoose.Schema({
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    raw: {
        type: String, // Compressed base64 string
        required: true
    },
    pasteCount: {
        type: Number,
        default: 0
    },
    typingSpeed: {
        type: Number, // CPM
        default: 0
    },
    variance: {
        type: Number, // Statistical variance of key flight time
        default: 0
    },
    isSuspicious: {
        type: Boolean,
        default: false
    },
    flags: [{
        type: String // e.g., 'PASTE_DETECTED', 'ZERO_VARIANCE'
    }]
}, {
    timestamps: true
});

const SubmissionTelemetry = mongoose.model('SubmissionTelemetry', submissionTelemetrySchema);

export default SubmissionTelemetry;
