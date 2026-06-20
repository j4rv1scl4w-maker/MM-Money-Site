'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[web-vitals] ${metric.name}: ${Math.round(metric.value)}ms`);
    }

    const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
    if (!token || typeof window === 'undefined') return;

    // Send vitals to Cloudflare Web Analytics via the beacon
    const body = JSON.stringify({
      siteToken: token,
      event: 'web-vital',
      name: metric.name,
      value: metric.value,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/cdn-cgi/rum', body);
    }
  });

  return null;
}
