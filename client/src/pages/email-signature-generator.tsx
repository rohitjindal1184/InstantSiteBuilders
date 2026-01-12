import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, RefreshCw, CheckCircle, Mail, Phone, MapPin, Globe, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuggestedTools } from "@/components/SuggestedTools";

const seoData = {
    title: "Free Email Signature Generator | InstantSiteBuilders",
    description: "Create a professional email signature for free. Customize your design with our easy-to-use editor and copy to Gmail, Outlook, or Apple Mail.",
    canonical: "https://instantsitebuilders.com/email-signature-generator",
    keywords: "email signature generator, free email signature, gmail signature, outlook signature, professional email footer, email signature maker",
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Email Signature Generator",
    "applicationCategory": "DesignApplication",
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
        "Real-time preview",
        "Multiple tabs for organization",
        "Social media icons",
        "One-click copy"
    ]
};

interface SignatureData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    department: string;
    company: string;
    website: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    photoUrl: string;
    logoUrl: string;
    color: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
}

const initialData: SignatureData = {
    firstName: "John",
    lastName: "Smith",
    jobTitle: "Customer Success Lead",
    department: "",
    company: "SiteGPT",
    website: "https://sitegpt.ai",
    email: "john@sitegpt.ai",
    phone: "(555) 123-4567",
    mobile: "",
    address: "123 Main St, Anytown, USA 12345",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    logoUrl: "",
    color: "#2563EB",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
};

export default function EmailSignatureGenerator() {
    const [data, setData] = useState<SignatureData>(initialData);
    const previewRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const handleChange = (field: keyof SignatureData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleCopy = () => {
        if (!previewRef.current) return;

        try {
            const range = document.createRange();
            range.selectNode(previewRef.current);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
                toast({ title: "Signature copied to clipboard!" });
            }
        } catch (e) {
            toast({ title: "Failed to copy", variant: "destructive" });
        }
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
                    <div className="max-w-6xl w-full space-y-8">
                        <div className="text-center space-y-4">
                            <div className="text-primary font-medium tracking-wide uppercase text-sm">Tools</div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                Email Signature Generator
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Transform your emails with our free, easy-to-use signature generator. Create polished, custom email signatures in minutes.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Input Panel */}
                            <Card className="border-2 border-border bg-card/50 h-fit">
                                <CardContent className="p-6">
                                    <Tabs defaultValue="personal" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3 mb-6">
                                            <TabsTrigger value="personal">Personal</TabsTrigger>
                                            <TabsTrigger value="professional">Professional</TabsTrigger>
                                            <TabsTrigger value="social">Social & Style</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="personal" className="space-y-4 animate-in fade-in-50">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" value={data.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" value={data.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="photoUrl">Photo URL</Label>
                                                <Input id="photoUrl" value={data.photoUrl} onChange={(e) => handleChange("photoUrl", e.target.value)} />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="professional" className="space-y-4 animate-in fade-in-50">
                                            <div className="space-y-2">
                                                <Label htmlFor="jobTitle">Job Title</Label>
                                                <Input id="jobTitle" value={data.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Company</Label>
                                                <Input id="company" value={data.company} onChange={(e) => handleChange("company", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="website">Website</Label>
                                                <Input id="website" value={data.website} onChange={(e) => handleChange("website", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input id="address" value={data.address} onChange={(e) => handleChange("address", e.target.value)} />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="social" className="space-y-4 animate-in fade-in-50">
                                            <div className="space-y-2">
                                                <Label htmlFor="color">Theme Color</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        id="color"
                                                        type="color"
                                                        className="w-12 h-10 p-1 cursor-pointer"
                                                        value={data.color}
                                                        onChange={(e) => handleChange("color", e.target.value)}
                                                    />
                                                    <Input value={data.color} onChange={(e) => handleChange("color", e.target.value)} className="flex-1 font-mono uppercase" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                                                    <Input id="linkedin" placeholder="https://linkedin.com/..." value={data.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="twitter">Twitter/X URL</Label>
                                                    <Input id="twitter" placeholder="https://x.com/..." value={data.twitter} onChange={(e) => handleChange("twitter", e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="facebook">Facebook URL</Label>
                                                    <Input id="facebook" placeholder="https://facebook.com/..." value={data.facebook} onChange={(e) => handleChange("facebook", e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="instagram">Instagram URL</Label>
                                                    <Input id="instagram" placeholder="https://instagram.com/..." value={data.instagram} onChange={(e) => handleChange("instagram", e.target.value)} />
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Preview Panel */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold">Preview</h3>
                                <Card className="border-2 border-border bg-white text-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-8 bg-white" ref={previewRef}>
                                        {/* Inline CSS is crucial for email clients */}
                                        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#333333' }}>
                                            <tbody>
                                                <tr>
                                                    {data.photoUrl && (
                                                        <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                                                            <img
                                                                src={data.photoUrl}
                                                                alt="Profile"
                                                                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                                                            />
                                                        </td>
                                                    )}
                                                    <td style={{ verticalAlign: 'top', borderLeft: `1px solid #e5e7eb`, paddingLeft: data.photoUrl ? '20px' : '0' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827', marginBottom: '2px' }}>
                                                            {data.firstName} {data.lastName}
                                                        </div>
                                                        <div style={{ color: '#6b7280', marginBottom: '12px' }}>
                                                            {data.jobTitle}
                                                        </div>

                                                        {(data.company || data.website) && (
                                                            <div style={{ marginBottom: '8px', color: data.color, fontWeight: 500 }}>
                                                                {data.company} {data.company && data.website && '|'} <a href={data.website} style={{ color: data.color, textDecoration: 'none' }}>{data.website ? new URL(data.website).hostname.replace('www.', '') : ''}</a>
                                                            </div>
                                                        )}

                                                        <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6' }}>
                                                            {data.email && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                    <span style={{ color: data.color }}>✉</span> <a href={`mailto:${data.email}`} style={{ color: '#4b5563', textDecoration: 'none' }}>{data.email}</a>
                                                                </div>
                                                            )}
                                                            {data.phone && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                    <span style={{ color: data.color }}>☎</span> <a href={`tel:${data.phone}`} style={{ color: '#4b5563', textDecoration: 'none' }}>{data.phone}</a>
                                                                </div>
                                                            )}
                                                            {data.address && (
                                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                                                                    {data.address}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Social Icons */}
                                                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                                            {data.linkedin && <a href={data.linkedin} style={{ display: 'inline-block', marginRight: '6px' }}><img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" width="16" height="16" alt="LinkedIn" /></a>}
                                                            {data.twitter && <a href={data.twitter} style={{ display: 'inline-block', marginRight: '6px' }}><img src="https://cdn-icons-png.flaticon.com/32/733/733579.png" width="16" height="16" alt="Twitter" /></a>}
                                                            {data.facebook && <a href={data.facebook} style={{ display: 'inline-block', marginRight: '6px' }}><img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" width="16" height="16" alt="Facebook" /></a>}
                                                            {data.instagram && <a href={data.instagram} style={{ display: 'inline-block', marginRight: '6px' }}><img src="https://cdn-icons-png.flaticon.com/32/733/733558.png" width="16" height="16" alt="Instagram" /></a>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>

                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg" onClick={handleCopy}>
                                        <Copy className="mr-2 h-5 w-5" /> Copy Signature
                                    </Button>
                                    <Button variant="outline" className="py-6" onClick={() => setData(initialData)}>
                                        <RefreshCw className="mr-2 h-5 w-5" /> Reset
                                    </Button>
                                </div>
                                <div className="text-sm text-muted-foreground text-center bg-muted/30 p-4 rounded-lg">
                                    <p><strong>How to use:</strong> Click "Copy Signature" and paste it directly into your email client's signature settings (Gmail, Outlook, Apple Mail, etc.).</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SuggestedTools currentToolPath="/email-signature-generator" />
                </main>
                <Footer />
            </div>
        </>
    );
}
