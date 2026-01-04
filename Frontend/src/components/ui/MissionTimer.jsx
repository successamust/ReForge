import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Clock } from 'lucide-react';

const MissionTimer = ({ mini = false }) => {
    const { user } = useContext(AppContext);
    const [timeLeft, setTimeLeft] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            try {
                const now = new Date();
                const timezone = user?.timezone || 'UTC';

                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });

                const parts = formatter.formatToParts(now);
                const dateParts = {};
                parts.forEach(p => dateParts[p.type] = p.value);

                const year = parseInt(dateParts.year);
                const month = parseInt(dateParts.month) - 1;
                const day = parseInt(dateParts.day);

                const tomorrow = new Date(Date.UTC(year, month, day + 1));

                const utcDate = new Date(tomorrow.toLocaleString('en-US', { timeZone: 'UTC' }));
                const tzDate = new Date(tomorrow.toLocaleString('en-US', { timeZone: timezone }));
                const offset = utcDate.getTime() - tzDate.getTime();

                const resetTime = new Date(tomorrow.getTime() + offset);
                const diff = resetTime.getTime() - now.getTime();

                if (diff <= 0) {
                    setTimeLeft('RESETING...');
                    return;
                }

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setIsUrgent(hours < 1);
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            } catch (e) {
                setTimeLeft('--:--:--');
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [user?.timezone]);

    if (mini) {
        return (
            <div className={`px-4 py-1.5 border border-white/10 bg-white/[0.02] flex items-center gap-3 transition-colors ${isUrgent ? 'border-red-500/50 bg-red-500/10' : ''}`}>
                <div className="flex items-center gap-1.5">
                    <Clock size={10} className={isUrgent ? 'text-red-500 animate-pulse' : 'text-white/40'} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Reset</span>
                </div>
                <div className={`font-mono text-xs font-black tracking-tighter ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                    {timeLeft}
                </div>
            </div>
        );
    }

    return (
        <div className={`p-4 border border-white/10 bg-white/[0.02] flex flex-col gap-2 transition-colors ${isUrgent ? 'border-red-500/50 bg-red-500/5' : ''}`}>
            <div className="flex items-center gap-2 text-white/40 mb-1">
                <Clock size={12} className={isUrgent ? 'text-red-500 animate-pulse' : ''} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Next Reset</span>
            </div>
            <div className={`font-mono text-xl font-black tracking-tighter transition-colors ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                {timeLeft}
            </div>
            <div className="w-full h-1 bg-white/5 mt-1 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${isUrgent ? 'bg-red-500' : 'bg-white/40'}`}
                    style={{ width: `${(1 - (parseInt(timeLeft.split(':')[0]) / 24)) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default MissionTimer;
