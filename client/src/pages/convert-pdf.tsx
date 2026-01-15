import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Upload, FileText, Copy, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuggestedTools } from "@/components/SuggestedTools";

const seoData = {
    title: "Free PDF to Markdown Converter Online | InstantSiteBuilders",
    description: "Convert PDF documents to Markdown instantly. Free online tool, no sign-up required. Perfect for documentation, note-taking, and content migration. Fast, secure, and easy to use.",
    canonical: "https://instantsitebuilders.com/convert-pdf-to-markdown",
    keywords: "pdf to markdown, convert pdf to md, pdf converter, markdown converter, free pdf tool, online pdf converter, document conversion, pdf to text, markdown generator",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF to Markdown Converter",
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
        "Instant conversion",
        "Secure file handling",
        "Copy to clipboard support"
    ]
};

export default function ConvertPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [markdown, setMarkdown] = useState<string>("");
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (uploadFile: File) => {
            // Check file size on client side first
            const MAX_SIZE = 2 * 1024 * 1024; // 2MB
            if (uploadFile.size > MAX_SIZE) {
                throw new Error("File size exceeds 2MB limit. Please upload a smaller file.");
            }

            const formData = new FormData();
            formData.append("file", uploadFile);
            const res = await fetch("/api/convert-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                // Use the server's error message if available
                throw new Error(data.message || data.error || "Failed to convert PDF");
            }
            return data;
        },
        onSuccess: (data) => {
            setMarkdown(data.markdown);
            toast({
                title: "Conversion successful",
                description: "Your PDF has been converted to Markdown.",
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

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile?.type === "application/pdf") {
            setFile(droppedFile);
            setMarkdown("");
        } else {
            toast({
                title: "Invalid file",
                description: "Please upload a PDF file.",
                variant: "destructive",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMarkdown("");
        }
    };

    const handleReset = () => {
        setFile(null);
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
                <meta property="og:image" content="https://instantsitebuilders.com/og-pdf-converter.png" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoData.title} />
                <meta name="twitter:description" content={seoData.description} />
                <meta name="twitter:image" content="https://instantsitebuilders.com/og-pdf-converter.png" />

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
                                Convert PDF to Markdown
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Upload any PDF document and convert it to Markdown instantly. Perfect for
                                documentation, note-taking, and content migration. Free to use. No sign up
                                required.
                            </p>
                        </div>

                        <Card className="border-2 border-dashed border-border bg-card/50">
                            <CardContent
                                className="flex flex-col items-center justify-center p-12 space-y-4 min-h-[300px] transition-colors relative"
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-muted/50'); }}
                                onDragLeave={(e) => { e.currentTarget.classList.remove('bg-muted/50'); }}
                                onDrop={handleDrop}
                            >
                                {!file ? (
                                    <>
                                        <div className="p-4 rounded-full bg-background border shadow-sm">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="font-medium text-lg">Choose a PDF file or drag & drop it here.</h3>
                                            <p className="text-sm text-muted-foreground">.pdf format supported, up to 2 MB.</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            id="file-upload"
                                            onChange={handleChange}
                                        />
                                        <Button variant="outline" asChild>
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                Browse File
                                            </label>
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center space-y-4 w-full">
                                        <FileText className="w-16 h-16 text-primary" />
                                        <div className="text-center">
                                            <p className="font-medium text-lg">{file.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-destructive">
                                            <X className="w-4 h-4 mr-2" /> Remove File
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={handleReset} disabled={!file && !markdown}>Reset</Button>
                            <Button
                                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[180px]"
                                disabled={!file || mutation.isPending}
                                onClick={() => file && mutation.mutate(file)}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    "Convert to Markdown"
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
                    <SuggestedTools currentToolPath="/convert-pdf-to-markdown" />
                </main>
                <Footer />
            </div>
        </>
    );
}
