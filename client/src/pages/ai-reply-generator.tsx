
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AiReplyGenerator() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [generatedReply, setGeneratedReply] = useState("");

    const [formData, setFormData] = useState({
        message: "",
        instructions: "",
        context: "",
        source: "Email",
        language: "English",
        style: "Professional",
        length: "Medium",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async () => {
        if (!formData.message || !formData.instructions) {
            toast({
                title: "Missing Information",
                description: "Please provide the message to reply to and instructions.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setGeneratedReply("");

        try {
            const response = await fetch("/api/generate-reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to generate reply");
            }

            setGeneratedReply(data.reply);
            toast({
                title: "Reply Generated",
                description: "Your AI reply uses GPT-4o!",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to generate reply",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!generatedReply) return;
        navigator.clipboard.writeText(generatedReply);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Reply text copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">
                            Tools
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            AI Reply Generator
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Generate thoughtful and contextually appropriate replies to any message.
                            Perfect for social media, emails, texts, and professional communication.
                        </p>
                    </div>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 space-y-6">

                            <div className="space-y-2">
                                <Label htmlFor="message">What's the message you're replying to? <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="message"
                                    placeholder="Hi! I'm interested in adding a chatbot to my e-commerce website. Can you tell me more about pricing and setup time?"
                                    className="min-h-[100px] bg-gray-50/50"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instructions">Reply instructions <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="instructions"
                                    placeholder="Thank you for your interest! Our chatbots can be set up in under 10 minutes. Let me share our pricing options with you."
                                    className="min-h-[80px] bg-gray-50/50"
                                    value={formData.instructions}
                                    onChange={(e) => handleInputChange("instructions", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="context">Additional context (optional)</Label>
                                <Textarea
                                    id="context"
                                    placeholder="Customer seems interested in AI chatbots for business. They have an e-commerce site and want quick implementation. Emphasize our ease of use and fast setup."
                                    className="min-h-[80px] bg-gray-50/50"
                                    value={formData.context}
                                    onChange={(e) => handleInputChange("context", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Source <span className="text-red-500">*</span></Label>
                                    <Select value={formData.source} onValueChange={(val) => handleInputChange("source", val)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Email">Email</SelectItem>
                                            <SelectItem value="Text Message">Text Message</SelectItem>
                                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                            <SelectItem value="Twitter">Twitter</SelectItem>
                                            <SelectItem value="Facebook">Facebook</SelectItem>
                                            <SelectItem value="Slack">Slack</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Language <span className="text-red-500">*</span></Label>
                                    <Select value={formData.language} onValueChange={(val) => handleInputChange("language", val)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                            <SelectItem value="French">French</SelectItem>
                                            <SelectItem value="German">German</SelectItem>
                                            <SelectItem value="Italian">Italian</SelectItem>
                                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                                            <SelectItem value="Chinese">Chinese</SelectItem>
                                            <SelectItem value="Japanese">Japanese</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Writing style <span className="text-red-500">*</span></Label>
                                    <Select value={formData.style} onValueChange={(val) => handleInputChange("style", val)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                            <SelectItem value="Friendly">Friendly</SelectItem>
                                            <SelectItem value="Casual">Casual</SelectItem>
                                            <SelectItem value="Formal">Formal</SelectItem>
                                            <SelectItem value="Persuasive">Persuasive</SelectItem>
                                            <SelectItem value="Empathetic">Empathetic</SelectItem>
                                            <SelectItem value="Witty">Witty</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Reply length <span className="text-red-500">*</span></Label>
                                    <Select value={formData.length} onValueChange={(val) => handleInputChange("length", val)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select length" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Short">Short</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Long">Long</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setFormData({
                                        message: "",
                                        instructions: "",
                                        context: "",
                                        source: "Email",
                                        language: "English",
                                        style: "Professional",
                                        length: "Medium",
                                    })}
                                >
                                    Reset
                                </Button>
                                <Button onClick={handleGenerate} disabled={loading} className="min-w-[140px] bg-blue-600 hover:bg-blue-700">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Generate reply"
                                    )}
                                </Button>
                            </div>

                            {generatedReply && (
                                <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-base text-gray-900">Generated Reply</Label>
                                        <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-gray-500 hover:text-blue-600">
                                            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                                            {copied ? "Copied" : "Copy"}
                                        </Button>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {generatedReply}
                                    </div>
                                </div>
                            )}

                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
