import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Phone } from "lucide-react";
import {
  insertContactSubmissionSchema,
  type InsertContactSubmission,
} from "@shared/schema";
import { Reveal } from "@/components/motion";

const inputStyles =
  "bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/50";

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactSubmission) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      trackEvent("contact_form_submit", "engagement", "contact_form");
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0B] border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-lime-400/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Get started
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Let's get your business online
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Tell us about your business and we'll send you a free proposal within
            24 hours. No pressure, no jargon — just a clear plan and honest pricing.
          </p>
        </Reveal>

        <Reveal>
          <div className="glass rounded-2xl p-8 md:p-12">
            <Form {...form}>
              {/* noValidate: zod handles validation; native email validation blocks submit inconsistently */}
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-zinc-300">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className={inputStyles}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-zinc-300">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className={inputStyles}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-zinc-300">
                        Business Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your business name"
                          className={inputStyles}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-zinc-300">
                        Tell Us About Your Business *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="What type of business do you run? What services do you offer? Any examples of sites you like?"
                          className={`resize-vertical ${inputStyles}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    size="lg"
                    className="bg-lime-400 text-zinc-950 hover:bg-lime-300 rounded-full px-10 py-6 text-lg font-semibold"
                  >
                    {contactMutation.isPending ? "Sending..." : "Get Started — It's Free"}
                  </Button>
                  <p className="text-zinc-500 text-sm mt-4">
                    <Phone className="w-4 h-4 inline mr-1" />
                    We'll reply within 24 hours with next steps — usually sooner.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
