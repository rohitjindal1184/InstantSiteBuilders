import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Loader2, Link as LinkIcon, Download, FileText, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuggestedTools } from "@/components/SuggestedTools";
import { Textarea } from "@/components/ui/textarea";

const seoData = {
    title: "Free Sitemap URL Extractor | InstantSiteBuilders",
    description: "Extract all URLs from any XML sitemap instantly. Get a clean list of links from sitemaps or sitemap indexes. Free online SEO tool.",
    canonical: "https://instantsitebuilders.com/sitemap-extractor",
    keywords: "sitemap extractor, extract urls from sitemap, sitemap to list, xml sitemap parser, get urls from xml, sitemap link extract",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sitemap URL Extractor",
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
        "Extract from XML Sitemap",
        "Support for Sitemap Indices",
        "Export to Text File",
        "One-click Copy"
    ]
};

interface ExtractorResult {
    count: number;
    urls: string[];
    isIndex: boolean;
}

export default function SitemapExtractor() {
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState<ExtractorResult | null>(null);
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (inputUrl: string) => {
            const res = await fetch("/api/extract-sitemap-urls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: inputUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to extract URLs");
            }
            return data;
        },
        onSuccess: (data) => {
            setResult(data);
            toast({
                title: "Extraction complete",
                description: `Found ${data.count} URLs in the sitemap.`,
            });
        },
        onError: (error) => {
            toast({
                title: "Extraction failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.urls.join('\n'));
        toast({ title: "Copied to clipboard" });
    };

    const handleDownload = () => {
        if (!result) return;
        const blob = new Blob([result.urls.join('\n')], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sitemap-urls.txt";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:site_name" content="InstantSiteBuilders" />
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
                                Sitemap URL Extractor
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Convert any XML sitemap into a clean list of URLs. Supports both standard sitemaps and sitemap indexes.
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
                                    <Button
                                        className="bg-primary hover:bg-primary/90 min-w-[120px]"
                                        disabled={!url.trim() || mutation.isPending}
                                        onClick={() => mutation.mutate(url)}
                                    >
                                        {mutation.isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing
                                            </>
                                        ) : (
                                            "Extract URLs"
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {result && (
                            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                                        <div className="flex items-center gap-2">
                                            <List className="w-4 h-4 text-primary" />
                                            <span className="font-medium">
                                                Found {result.count} URLs
                                                {result.isIndex && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-100">Sitemap Index</span>}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={handleDownload}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download .txt
                                            </Button>
                                            <Button size="sm" variant="secondary" onClick={handleCopy}>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy List
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-0">
                                        <Textarea
                                            readOnly
                                            value={result.urls.join('\n')}
                                            className="min-h-[300px] font-mono text-sm border-0 rounded-none focus-visible:ring-0 resize-y p-4"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <SuggestedTools currentToolPath="/sitemap-extractor" />
                </main>
                <Footer />
            </div>
        </>
    );
}
