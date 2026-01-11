import { useState } from "react";
import { Upload, FileText, Copy, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function ConvertPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [markdown, setMarkdown] = useState<string>("");
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (uploadFile: File) => {
            const formData = new FormData();
            formData.append("file", uploadFile);
            const res = await fetch("/api/convert-pdf", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                throw new Error("Failed to convert");
            }
            return res.json();
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
        <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col items-center">
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
        </div>
    );
}
