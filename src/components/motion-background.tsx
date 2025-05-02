
'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Simple placeholder for MotionBackground
// Replace with actual implementation (e.g., using particles, gradients, etc.)
export default function MotionBackground() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Avoid rendering anything complex on the server
        return null;
    }

    return (
        <div
            className={cn(
                'fixed inset-0 -z-10 overflow-hidden', // Ensure it's behind content
                'animated-gradient' // Use the existing gradient animation
            )}
        />
    );
}
