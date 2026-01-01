/**
 * Validates password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (@$!%*?&)
 */
export const validatePassword = (password) => {
    const errors = [];
    
    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (password && password.length > 128) {
        errors.push('Password must not exceed 128 characters');
    }
    
    if (password && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (password && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (password && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (password && !/[@$!%*?&]/.test(password)) {
        errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Get password strength indicator
 */
export const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return {
        strength: Math.min(strength, 4),
        label: labels[Math.min(strength, 4)]
    };
};

