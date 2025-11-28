'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    // Function to check if performance cookies are accepted
    const checkCookieConsent = () => {
      const cookieYesConsent = getCookie('cookieyes-consent');

      if (cookieYesConsent) {
        try {
          // Parse the comma-separated key:value pairs
          const consentPairs = cookieYesConsent.split(',');
          const consentObj: Record<string, string> = {};

          consentPairs.forEach((pair) => {
            const [key, value] = pair.split(':');
            if (key && value) {
              consentObj[key] = value;
            }
          });

          // Check if performance is accepted
          return consentObj.performance === 'yes';
        } catch (e) {
          console.error('Error parsing CookieYes consent:', e);
          return false;
        }
      }
      return false;
    };

    // Initialize PostHog only if consent is given
    if (checkCookieConsent()) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'identified_only',
        defaults: '2025-05-24',
      });
    }

    // Listen for consent changes
    const handleConsentUpdate = () => {
      if (checkCookieConsent() && !posthog.__loaded) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
          person_profiles: 'identified_only',
          defaults: '2025-05-24',
        });
      } else if (!checkCookieConsent() && posthog.__loaded) {
        posthog.opt_out_capturing();
      }
    };

    // CookieYes fires a custom event when consent is updated
    window.addEventListener('cookieyes_consent_update', handleConsentUpdate);

    return () => {
      window.removeEventListener('cookieyes_consent_update', handleConsentUpdate);
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
