import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    action: {
        type: String,
        required: true,
        enum: [
            // Progress actions
            'PROGRESS_ADVANCE',
            'PROGRESS_ROLLBACK',
            'PROGRESS_FAIL',
            'PROGRESS_COMPLETE',
            'PROGRESS_ADMIN_OVERRIDE',

            // Submission actions
            'SUBMISSION_CREATE',
            'SUBMISSION_GRADE',
            'SUBMISSION_RERUN',

            // Account actions
            'ACCOUNT_REGISTER',
            'ACCOUNT_LOGIN',
            'ACCOUNT_UPDATE',
            'EMAIL_VERIFIED',
            'PASSWORD_RESET_REQUESTED',
            'PASSWORD_RESET',

            // Admin actions
            'ADMIN_LESSON_CREATE',
            'ADMIN_LESSON_UPDATE',
            'ADMIN_LESSON_DELETE',
            'ADMIN_USER_UPDATE',

            // Certificate actions
            'CERTIFICATE_GENERATE',
        ],
        index: true,
    },
    payload: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    // Who performed the action (null for system/scheduler)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    // Whether this was a system action (scheduler, etc.)
    isSystem: {
        type: Boolean,
        default: false,
    },
    // IP address for security auditing
    ipAddress: {
        type: String,
        default: null,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false },
});

// Index for time-based queries
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });

// Static method to log an action
auditLogSchema.statics.log = async function (data) {
    const log = new this({
        userId: data.userId,
        action: data.action,
        payload: data.payload || {},
        createdBy: data.createdBy || null,
        isSystem: data.isSystem || false,
        ipAddress: data.ipAddress || null,
    });

    return log.save();
};

// Static method to get user's audit history
auditLogSchema.statics.getUserHistory = function (userId, options = {}) {
    const query = { userId };

    if (options.action) {
        query.action = Array.isArray(options.action)
            ? { $in: options.action }
            : options.action;
    }

    if (options.startDate || options.endDate) {
        query.createdAt = {};
        if (options.startDate) {
            query.createdAt.$gte = options.startDate;
        }
        if (options.endDate) {
            query.createdAt.$lte = options.endDate;
        }
    }

    return this.find(query)
        .sort({ createdAt: -1 })
        .limit(options.limit || 100)
        .populate('createdBy', 'email');
};

// Static method for progress-related logs
auditLogSchema.statics.logProgress = async function (data) {
    return this.log({
        ...data,
        action: data.action,
    });
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
