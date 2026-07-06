import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

// Delay before navigating away so the tracking beacon has time to fire
const REDIRECT_DELAY_MS = 500;

function getTargetUrl(): string | null {
    const raw = new URLSearchParams(window.location.search).get("url");
    if (!raw) return null;

    try {
        // Accept bare domains like "www.google.com" by defaulting to https
        const parsed = new URL(raw.includes("://") ? raw : `https://${raw}`);
        // Only allow real web destinations (blocks javascript:, data:, etc.)
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return null;
        }
        return parsed.href;
    } catch {
        return null;
    }
}

export default function Redirect() {
    const [target, setTarget] = useState<string | null>(null);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        const url = getTargetUrl();

        if (!url) {
            trackEvent("redirect_invalid", "outbound", window.location.search || "missing_url");
            setInvalid(true);
            return;
        }

        setTarget(url);
        trackEvent("redirect", "outbound", url);

        const timer = setTimeout(() => {
            window.location.replace(url);
        }, REDIRECT_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Helmet>
                <title>Redirecting... | InstantSiteBuilders</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 pb-8 text-center space-y-4">
                        {invalid ? (
                            <>
                                <AlertTriangle className="w-10 h-10 mx-auto text-destructive" />
                                <h1 className="text-xl font-semibold">Invalid redirect link</h1>
                                <p className="text-sm text-muted-foreground">
                                    This link is missing a valid destination URL.
                                </p>
                            </>
                        ) : (
                            <>
                                <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary" />
                                <h1 className="text-xl font-semibold">Redirecting you...</h1>
                                {target && (
                                    <p className="text-sm text-muted-foreground break-all">
                                        If nothing happens,{" "}
                                        <a href={target} className="text-primary underline">
                                            click here to continue
                                        </a>
                                        .
                                    </p>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
