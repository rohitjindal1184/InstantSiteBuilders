import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Loader2, Link as LinkIcon, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuggestedTools } from "@/components/SuggestedTools";

const seoData = {
    title: "Free XML Sitemap Validator Online | InstantSiteBuilders",
    description: "Validate your XML sitemap instantly. Check for errors, broken links, and structural issues. Free online tool for SEO optimization.",
    canonical: "https://instantsitebuilders.com/sitemap-validator",
    keywords: "sitemap validator, check sitemap, validate xml sitemap, seo tool, free sitemap checker, site map test",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sitemap Validator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "description": seoData.description,
    "url": seoData.canonical,
    "provider": {
        "@type": "Organization",
        "name": "InstantSiteBuilders",
        "url": "https://instantsitebuilders.com"
    },
    "featureList": [
        "Free to use",
        "No sign-up required",
        "Instant validation",
        "Error detection",
        "URL count"
    ]
};

interface ValidationResult {
    valid: boolean;
    urlCount: number;
    errors: string[];
}

export default function SitemapValidator() {
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState<ValidationResult | null>(null);
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (inputUrl: string) => {
            const res = await fetch("/api/validate-sitemap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: inputUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to validate sitemap");
            }
            return data;
        },
        onSuccess: (data) => {
            setResult(data);
            toast({
                title: "Validation complete",
                description: data.valid ? "Sitemap is valid." : "Issues found in sitemap.",
                variant: data.valid ? "default" : "destructive",
            });
        },
        onError: (error) => {
            toast({
                title: "Validation failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleReset = () => {
        setUrl("");
        setResult(null);
    };

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />

                {/* OpenGraph Tags */}
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:site_name" content="InstantSiteBuilders" />

                {/* Schema.org Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-grow p-6 md:p-12 flex flex-col items-center">
                    <div className="max-w-4xl w-full space-y-8">
                        <div className="text-center space-y-4">
                            <div className="text-primary font-medium tracking-wide uppercase text-sm">Tools</div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                                Sitemap Validator
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Enter your XML Sitemap URL to validate its structure and check for common errors.
                                Ensure your site is properly indexed by search engines.
                            </p>
                        </div>

                        <Card className="border-2 border-border bg-card/50">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <LinkIcon className="w-5 h-5" />
                                    <span className="font-medium">Enter Sitemap URL</span>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="https://example.com/sitemap.xml"
                                        className="flex-1 font-mono text-sm"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && url && !mutation.isPending) {
                                                mutation.mutate(url);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Supports standard XML sitemaps and sitemap indexes.</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={handleReset} disabled={!url && !result}>Reset</Button>
                            <Button
                                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[180px]"
                                disabled={!url.trim() || mutation.isPending}
                                onClick={() => mutation.mutate(url)}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Validating...
                                    </>
                                ) : (
                                    "Validate Sitemap"
                                )}
                            </Button>
                        </div>

                        {result && (
                            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center gap-4">
                                        {result.valid ? (
                                            <CheckCircle className="w-12 h-12 text-green-500" />
                                        ) : (
                                            <XCircle className="w-12 h-12 text-destructive" />
                                        )}
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                {result.valid ? "Sitemap is Valid" : "Sitemap has Issues"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Found {result.urlCount} URLs in the sitemap.
                                            </p>
                                        </div>
                                    </div>

                                    {result.errors.length > 0 && (
                                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                                            <h4 className="font-semibold text-destructive mb-2">Errors Found:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-destructive/90">
                                                {result.errors.map((error, idx) => (
                                                    <li key={idx}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {result.valid && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-green-700 text-sm">
                                                Great job! Your sitemap follows standard formatting and should be accepted by search engines.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <SuggestedTools currentToolPath="/sitemap-validator" />
                </main>
                <Footer />
            </div>
        </>
    );
}
