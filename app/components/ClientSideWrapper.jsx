// components/ClientSideWrapper.jsx
'use client';

import React from 'react';

export default function ClientSideWrapper({ children }) {
  return <>{children}</>;
}

// components/LiveVisitorCount.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function LiveVisitorCount() {
  const [visitorCount, setVisitorCount] = useState(147);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => Math.floor(prev + (Math.random() * 2 - 1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex items-center gap-2">
      <Users className="h-4 w-4" />
      {visitorCount} active shoppers
    </span>
  );
}

// components/CountdownTimer.jsx
'use client';

import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ initialHours = 4 }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      • Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}