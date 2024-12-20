import React, { useEffect, useRef } from 'react';

const ThemeNetwork = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!theme) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 4;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw center theme
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
        ctx.fillStyle = '#60A5FA';
        ctx.fill();

        // Draw center text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Word wrap for center text
        const words = theme.theme.split(' ');
        let y = centerY - 10;
        words.forEach(word => {
            ctx.fillText(word, centerX, y);
            y += 20;
        });

        // Draw keywords in a circle
        const angleStep = (2 * Math.PI) / theme.keywords.length;
        theme.keywords.forEach((keyword, i) => {
            const angle = i * angleStep;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(
                centerX + 60 * Math.cos(angle),
                centerY + 60 * Math.sin(angle)
            );
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#94A3B8';
            ctx.stroke();

            // Draw keyword bubble
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = '#475569';
            ctx.fill();

            // Draw keyword text
            ctx.fillStyle = '#E2E8F0';
            ctx.font = '12px Inter';
            ctx.fillText(keyword, x, y);
        });
    }, [theme]);

    return (
        <div className="flex justify-center items-center p-4">
            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="max-w-4xl h-auto"
            />
        </div>
    );
};

export default ThemeNetwork;