
/**
 * Service to record and compress user keystroke telemetry.
 * Used for Anti-Cheat verification ("The Black Box").
 */
class TelemetryService {
    constructor() {
        this.events = [];
        this.startTime = null;
        this.pasteCount = 0;
        this.isRecording = false;
    }

    /**
     * Start a new recording session
     */
    startSession() {
        if (this.isRecording) return; // Prevent multiple starts in same component lifecycle

        this.events = [];
        this.startTime = Date.now();
        this.pasteCount = 0;
        this.isRecording = true;
        console.log('[Telemetry] Session started');
    }

    /**
     * Stop recording
     */
    stopSession() {
        this.isRecording = false;
    }

    /**
     * Log a keystroke or event
     * @param {string} type - 'keydown', 'paste', 'focus', 'blur'
     * @param {object} data - Additional data (e.g. keyCode)
     */
    logEvent(type, data = {}) {
        if (!this.isRecording) return;

        const timestamp = Date.now();
        const timeDelta = timestamp - this.startTime;

        // Simplify event log to save space
        const eventLog = {
            t: timeDelta,           // Time since start (ms)
            e: type,               // Event type
            k: data.key || null,   // Key (if applicable)
        };

        this.events.push(eventLog);

        if (type === 'paste') {
            this.pasteCount++;
        }
    }

    /**
     * Get compressed telemetry data string
     * We use a simple delta encoding + JSON stringify -> Base64
     * Schema: [startTime, pasteCount, ...events]
     */
    getCompressedData() {
        const payload = {
            start: this.startTime,
            pastes: this.pasteCount,
            log: this.events.map(e => [e.t, e.e, e.k]) // Minify array
        };

        try {
            const jsonString = JSON.stringify(payload);
            // In a real app we might use LZString here, but Base64 is fine for V1
            return btoa(jsonString);
        } catch (err) {
            console.error('[Telemetry] Compression failed:', err);
            return null;
        }
    }

    /**
     * Reset service
     */
    reset() {
        this.events = [];
        this.startTime = null;
        this.pasteCount = 0;
        this.isRecording = false;
    }
}

export const telemetryService = new TelemetryService();
