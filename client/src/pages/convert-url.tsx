
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Code2, Copy, Loader2, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const seoData = {
    title: "Free Webpage to Markdown Converter | InstantSiteBuilders",
    description: "Convert any webpage to Markdown instantly. Extract content from URLs to cleaner Markdown format. Free online tool, no sign-up required.",
    canonical: "https://instantsitebuilders.com/convert-webpage-to-markdown",
    keywords: "webpage to markdown, url to markdown, html to markdown, site converter, content extractor, free online tool",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Webpage to Markdown Converter",
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
        "Instant URL conversion",
        "Content extraction",
        "Copy to clipboard support"
    ]
};

export default function ConvertUrl() {
    const [url, setUrl] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (inputUrl: string) => {
            const res = await fetch("/api/convert-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: inputUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to convert webpage");
            }
            return data;
        },
        onSuccess: (data) => {
            setMarkdown(data.markdown);
            toast({
                title: "Conversion successful",
                description: "Webpage has been converted to Markdown.",
            });
        },
        onError: (error) => {
            toast({
                title: "Conversion failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleReset = () => {
        setUrl("");
        setMarkdown("");
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
                                Convert Webpage to Markdown
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Enter a URL to extract its content and convert it to clean Markdown.
                                Perfect for archiving, reading, or migrating content.
                            </p>
                        </div>

                        <Card className="border-2 border-border bg-card/50">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <LinkIcon className="w-5 h-5" />
                                    <span className="font-medium">Enter Webpage URL</span>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="https://example.com/article"
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
                                    <span>Only public http/https URLs are supported. Some dynamic sites may not convert correctly.</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={handleReset} disabled={!url && !markdown}>Reset</Button>
                            <Button
                                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[180px]"
                                disabled={!url.trim() || mutation.isPending}
                                onClick={() => mutation.mutate(url)}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Fetching & Converting...
                                    </>
                                ) : (
                                    "Convert URL"
                                )}
                            </Button>
                        </div>

                        {markdown && (
                            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                                        <h3 className="font-medium">Result</h3>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => {
                                                navigator.clipboard.writeText(markdown);
                                                toast({ title: "Copied to clipboard" });
                                            }}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy
                                        </Button>
                                    </div>
                                    <div className="p-6 max-h-[500px] overflow-y-auto">
                                        <pre className="whitespace-pre-wrap font-mono text-sm">
                                            {markdown}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
