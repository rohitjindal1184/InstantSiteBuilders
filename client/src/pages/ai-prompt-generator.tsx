
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

type Framework = "APE" | "RACE" | "CREATE" | "SPARK";

export default function AiPromptGenerator() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [generatedPrompt, setGeneratedPrompt] = useState("");
    const [framework, setFramework] = useState<Framework>("APE");

    // Dynamic state for all possible fields
    const [formData, setFormData] = useState<Record<string, string>>({
        // APE
        action: "",
        purpose: "",
        expectation: "",
        // RACE
        role: "",
        context: "",
        // CREATE
        character: "",
        request: "",
        example: "",
        adjustment: "",
        typeOfOutput: "",
        extras: "",
        // SPARK
        situation: "",
        problem: "",
        aspiration: "",
        result: "",
        kismet: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async () => {
        setLoading(true);
        setGeneratedPrompt("");

        try {
            const response = await fetch("/api/generate-prompt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    framework,
                    data: formData
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to generate prompt");
            }

            setGeneratedPrompt(data.prompt);
            toast({
                title: "Prompt Generated",
                description: "Your professional AI prompt is ready!",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to generate prompt",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!generatedPrompt) return;
        navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Prompt copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const renderInputs = () => {
        switch (framework) {
            case "APE":
                return (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="action">Action <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">What specific task should the AI perform? Define the main action clearly.</p>
                            <Textarea
                                id="action"
                                placeholder="Write a product description for our new wireless headphones"
                                className="min-h-[80px]"
                                value={formData.action}
                                onChange={(e) => handleInputChange("action", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">Why is this task important? Explain the purpose or goal behind the action.</p>
                            <Textarea
                                id="purpose"
                                placeholder="To showcase key features and drive sales on our e-commerce website"
                                className="min-h-[80px]"
                                value={formData.purpose}
                                onChange={(e) => handleInputChange("purpose", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expectation">Expectation <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">What should the final output look like? Describe the format, length, style, or specific elements you want.</p>
                            <Textarea
                                id="expectation"
                                placeholder="3 compelling paragraphs with product benefits, technical specs, and call-to-action"
                                className="min-h-[80px]"
                                value={formData.expectation}
                                onChange={(e) => handleInputChange("expectation", e.target.value)}
                            />
                        </div>
                    </>
                );
            case "RACE":
                return (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">What role should the AI adopt?</p>
                            <Textarea placeholder="Expert copywriter" value={formData.role} onChange={(e) => handleInputChange("role", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="action">Action <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">What specific task should the AI perform?</p>
                            <Textarea placeholder="Write a blog post intro" value={formData.action} onChange={(e) => handleInputChange("action", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="context">Context <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">Provide background information or constraints.</p>
                            <Textarea placeholder="For a tech-savvy audience interested in AI trends" value={formData.context} onChange={(e) => handleInputChange("context", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expectation">Expectation <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500">Describe the desired format and style.</p>
                            <Textarea placeholder="Engaging, informative, max 100 words" value={formData.expectation} onChange={(e) => handleInputChange("expectation", e.target.value)} />
                        </div>
                    </>
                );
            case "CREATE":
                return (
                    <>
                        <div className="space-y-2">
                            <Label>Character</Label> <Textarea value={formData.character} onChange={(e) => handleInputChange("character", e.target.value)} placeholder="Who is the AI acting as?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Request</Label> <Textarea value={formData.request} onChange={(e) => handleInputChange("request", e.target.value)} placeholder="What is the task?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Example</Label> <Textarea value={formData.example} onChange={(e) => handleInputChange("example", e.target.value)} placeholder="Provide an example of good output (optional)" />
                        </div>
                        <div className="space-y-2">
                            <Label>Adjustment</Label> <Textarea value={formData.adjustment} onChange={(e) => handleInputChange("adjustment", e.target.value)} placeholder="Any refinements required?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Type of Output</Label> <Textarea value={formData.typeOfOutput} onChange={(e) => handleInputChange("typeOfOutput", e.target.value)} placeholder="Format (e.g., Code, Table, Essay)" />
                        </div>
                        <div className="space-y-2">
                            <Label>Extras</Label> <Textarea value={formData.extras} onChange={(e) => handleInputChange("extras", e.target.value)} placeholder="Anything else?" />
                        </div>
                    </>
                );
            case "SPARK":
                return (
                    <>
                        <div className="space-y-2">
                            <Label>Situation</Label> <Textarea value={formData.situation} onChange={(e) => handleInputChange("situation", e.target.value)} placeholder="What is the context?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Problem</Label> <Textarea value={formData.problem} onChange={(e) => handleInputChange("problem", e.target.value)} placeholder="What needs to be solved?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Aspiration</Label> <Textarea value={formData.aspiration} onChange={(e) => handleInputChange("aspiration", e.target.value)} placeholder="What do you want to achieve?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Result</Label> <Textarea value={formData.result} onChange={(e) => handleInputChange("result", e.target.value)} placeholder="Desired outcome?" />
                        </div>
                        <div className="space-y-2">
                            <Label>Kismet</Label> <Textarea value={formData.kismet} onChange={(e) => handleInputChange("kismet", e.target.value)} placeholder="Unexpected, creative twist?" />
                        </div>
                    </>
                );
            default: return null;
        }
    }

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
                            Best AI Prompt Generator
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Create high-quality AI prompts with proven frameworks like APE, RACE, CREATE, and SPARK.
                        </p>
                    </div>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 space-y-6">

                            <div className="space-y-2">
                                <Label>Prompt Framework <span className="text-red-500">*</span></Label>
                                <Select value={framework} onValueChange={(val) => setFramework(val as Framework)}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select a framework" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="APE">APE - Simple 3-step framework for clear instructions</SelectItem>
                                        <SelectItem value="RACE">RACE - Perfect for advanced context and role-playing</SelectItem>
                                        <SelectItem value="CREATE">CREATE - Detailed framework for creative tasks</SelectItem>
                                        <SelectItem value="SPARK">SPARK - Problem-solving and aspiration focused</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500">
                                    {framework === "APE" && "Action, Purpose, Expectation - Clear and direct prompts"}
                                    {framework === "RACE" && "Role, Action, Context, Expectation - Detailed context"}
                                    {framework === "CREATE" && "Character, Request, Example, Adjustment, Type, Extras"}
                                    {framework === "SPARK" && "Situation, Problem, Aspiration, Result, Kismet"}
                                </p>
                            </div>

                            {renderInputs()}

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setFormData({
                                        action: "", purpose: "", expectation: "",
                                        role: "", context: "",
                                        character: "", request: "", example: "", adjustment: "", typeOfOutput: "", extras: "",
                                        situation: "", problem: "", aspiration: "", result: "", kismet: ""
                                    })}
                                >
                                    Reset
                                </Button>
                                <Button onClick={handleGenerate} disabled={loading} className="min-w-[140px] bg-blue-600 hover:bg-blue-700">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Gener...
                                        </>
                                    ) : (
                                        "Generate Prompt"
                                    )}
                                </Button>
                            </div>

                            {generatedPrompt && (
                                <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-base text-gray-900">Generated Prompt</Label>
                                        <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-gray-500 hover:text-blue-600">
                                            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                                            {copied ? "Copied" : "Copy"}
                                        </Button>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {generatedPrompt}
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
