
// Client-side service stub for Relapse. 
// Ideally would call API endpoints
import api from './api';

export const relapseService = {
    getDetoxDrills: async () => {
        // return api.get('/relapse/detox/drills');
        return [
            { id: 1, code: 'for (let i = 0; i < 10; i++) { console.log(i); }' },
            { id: 2, code: 'const sum = (a, b) => a + b;' },
            { id: 3, code: 'import React, { useState } from "react";' },
        ];
    },

    completeDetox: async () => {
        const response = await api.post('/relapse/detox/complete');
        const data = response?.data || response;
        if (data?.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return response;
    }
};
