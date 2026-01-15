import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Loader2, Link as LinkIcon, FileText, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuggestedTools } from "@/components/SuggestedTools";

const seoData = {
    title: "Free XML Sitemap Generator | InstantSiteBuilders",
    description: "Generate XML sitemaps for your website instantly. Crawl your URL or paste links to create a Google-compatible sitemap. Free online SEO tool.",
    canonical: "https://instantsitebuilders.com/sitemap-generator",
    keywords: "sitemap generator, create xml sitemap, free sitemap maker, seo tool, google sitemap generator, site crawler",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XML Sitemap Generator",
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
        "Crawl website URLs",
        "Paste URL lists",
        "Instant generation",
        "Download XML file"
    ]
};

export default function SitemapGenerator() {
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [urlList, setUrlList] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("monthly");
    const [priority, setPriority] = useState<string>("0.8");
    const [generatedXml, setGeneratedXml] = useState<string>("");
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (data: { type: 'url' | 'text', input: string, frequency: string, priority: string }) => {
            const res = await fetch("/api/generate-sitemap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || result.error || "Failed to generate sitemap");
            }
            return result;
        },
        onSuccess: (data) => {
            setGeneratedXml(data.xml);
            toast({
                title: "Sitemap Generated",
                description: `Successfully created sitemap with ${data.count} URLs.`,
            });
        },
        onError: (error) => {
            toast({
                title: "Generation failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleDownload = () => {
        if (!generatedXml) return;
        const blob = new Blob([generatedXml], { type: "text/xml" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sitemap.xml";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleCopy = () => {
        if (!generatedXml) return;
        navigator.clipboard.writeText(generatedXml);
        toast({ title: "Copied to clipboard" });
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
                                XML Sitemap Generator
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Create a standard XML sitemap for your website. Crawl your homepage or paste a list of links to get started.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="md:col-span-2 border-2 border-border bg-card/50">
                                <CardContent className="p-6">
                                    <Tabs defaultValue="scan" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2 mb-6">
                                            <TabsTrigger value="scan">Scan Website</TabsTrigger>
                                            <TabsTrigger value="text">Paste URLs</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="scan" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="url-input">Homepage URL</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        id="url-input"
                                                        placeholder="https://example.com"
                                                        value={baseUrl}
                                                        onChange={(e) => setBaseUrl(e.target.value)}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    We will scan this page for internal links (shallow scan).
                                                </p>
                                            </div>
                                            <Button
                                                className="w-full bg-primary hover:bg-primary/90"
                                                onClick={() => mutation.mutate({ type: 'url', input: baseUrl, frequency, priority })}
                                                disabled={!baseUrl || mutation.isPending}
                                            >
                                                {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...</> : "Generate Sitemap"}
                                            </Button>
                                        </TabsContent>

                                        <TabsContent value="text" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="text-input">List of URLs (one per line)</Label>
                                                <Textarea
                                                    id="text-input"
                                                    placeholder="https://example.com/page1&#10;https://example.com/page2"
                                                    rows={8}
                                                    value={urlList}
                                                    onChange={(e) => setUrlList(e.target.value)}
                                                    className="font-mono text-sm"
                                                />
                                            </div>
                                            <Button
                                                className="w-full bg-primary hover:bg-primary/90"
                                                onClick={() => mutation.mutate({ type: 'text', input: urlList, frequency, priority })}
                                                disabled={!urlList || mutation.isPending}
                                            >
                                                {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Sitemap"}
                                            </Button>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            <Card className="h-fit">
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold border-b pb-2">Options</h3>

                                    <div className="space-y-2">
                                        <Label>Change Frequency</Label>
                                        <Select value={frequency} onValueChange={setFrequency}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="always">Always</SelectItem>
                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Priority</Label>
                                        <Select value={priority} onValueChange={setPriority}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                                                <SelectItem value="0.9">0.9</SelectItem>
                                                <SelectItem value="0.8">0.8</SelectItem>
                                                <SelectItem value="0.7">0.7</SelectItem>
                                                <SelectItem value="0.6">0.6</SelectItem>
                                                <SelectItem value="0.5">0.5 (Normal)</SelectItem>
                                                <SelectItem value="0.4">0.4</SelectItem>
                                                <SelectItem value="0.3">0.3</SelectItem>
                                                <SelectItem value="0.2">0.2</SelectItem>
                                                <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {generatedXml && (
                            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                                        <h3 className="font-medium flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Result
                                        </h3>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={handleDownload}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download XML
                                            </Button>
                                            <Button size="sm" variant="secondary" onClick={handleCopy}>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-6 max-h-[500px] overflow-y-auto">
                                        <pre className="whitespace-pre-wrap font-mono text-sm">
                                            {generatedXml}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <SuggestedTools currentToolPath="/sitemap-generator" />
                </main>
                <Footer />
            </div>
        </>
    );
}
