
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, FileText, FileCode, Mail, MessageSquare, Mic } from "lucide-react"; // Import appropriate icons

interface Tool {
    name: string;
    description: string;
    href: string;
    icon: any;
    color: string;
}

const tools: Tool[] = [
    {
        name: "AI Reply Generator",
        description: "Generate professional replies for emails & social media.",
        href: "/ai-reply-generator",
        icon: MessageSquare,
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "AI Prompt Generator",
        description: "Create high-quality AI prompts using proven frameworks.",
        href: "/ai-prompt-generator",
        icon: Mic, // Or a better icon if available
        color: "bg-purple-100 text-purple-600",
    },
    {
        name: "Email Signature Generator",
        description: "Create professional email signatures in seconds.",
        href: "/email-signature-generator",
        icon: Mail,
        color: "bg-green-100 text-green-600"
    },
    {
        name: "PDF to Markdown",
        description: "Convert PDF documents to clean Markdown text.",
        href: "/convert-pdf-to-markdown",
        icon: FileText,
        color: "bg-red-100 text-red-600",
    },
    {
        name: "Webpage to Markdown",
        description: "Extract content from any URL into Markdown.",
        href: "/convert-webpage-to-markdown",
        icon: FileCode,
        color: "bg-orange-100 text-orange-600",
    },
    {
        name: "HTML to Markdown",
        description: "Convert HTML code or files to Markdown.",
        href: "/convert-html-to-markdown",
        icon: FileCode,
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "XML to Markdown",
        description: "Convert XML data structures to Markdown.",
        href: "/convert-xml-to-markdown",
        icon: FileCode,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        name: "JSON to Markdown",
        description: "Convert JSON objects to readable Markdown.",
        href: "/convert-json-to-markdown",
        icon: FileCode,
        color: "bg-cyan-100 text-cyan-600",
    },
    {
        name: "RTF to Markdown",
        description: "Convert Rich Text Format to Markdown.",
        href: "/convert-rtf-to-markdown",
        icon: FileText,
        color: "bg-pink-100 text-pink-600",
    },
    {
        name: "Sitemap Validator",
        description: "Validate your XML sitemap for SEO.",
        href: "/sitemap-validator",
        icon: FileCode,
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        name: "Sitemap Extractor",
        description: "Extract all URLs from an XML sitemap.",
        href: "/sitemap-extractor",
        icon: FileCode,
        color: "bg-teal-100 text-teal-600",
    },
    {
        name: "Sitemap Generator",
        description: "Generate an XML sitemap for your website.",
        href: "/sitemap-generator",
        icon: FileCode,
        color: "bg-violet-100 text-violet-600",
    },
];

interface SuggestedToolsProps {
    currentToolPath?: string;
}

export function SuggestedTools({ currentToolPath }: SuggestedToolsProps) {
    // Filter out the current tool and pick 3 random ones
    const availableTools = tools.filter((tool) => tool.href !== currentToolPath);

    // simple shuffle
    const shuffled = [...availableTools].sort(() => 0.5 - Math.random());
    const selectedTools = shuffled.slice(0, 3);

    return (
        <section className="py-12 bg-white mt-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    More Free Tools
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {selectedTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link key={tool.href} href={tool.href}>
                                <a className="block group h-full">
                                    <Card className="h-full hover:shadow-md transition-all duration-200 border-gray-200 group-hover:border-blue-200">
                                        <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
                                            <div className={`p-2 rounded-lg ${tool.color}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {tool.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {tool.description}
                                            </p>
                                            <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                Try it out <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
