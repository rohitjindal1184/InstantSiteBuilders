import { Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const testimonials = [
  {
    text: "I kept putting off a website because I thought it would cost thousands. They built our bakery site for free and we were taking online orders within two days. Our walk-in traffic went up because people finally found us on Google.",
    author: "Sarah Johnson",
    role: "Owner, Sweet Rise Bakery",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    text: "As a one-person plumbing business, I didn't have time to figure out websites. They asked the right questions, built exactly what I needed, and now I get 3–4 new job calls a week from the site alone.",
    author: "Mike Chen",
    role: "Owner, Chen Plumbing Co.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    text: "Other agencies wanted $5,000 just for a basic site. Here I got a beautiful boutique website that matches my brand, works perfectly on phones, and didn't break my startup budget.",
    author: "Emily Rodriguez",
    role: "Owner, Luna Lane Boutique",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
] as const;

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Success stories
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Real results from real business owners
          </h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            These aren't tech companies — they're local shops, trades, and
            service businesses just like yours.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <div className="glass rounded-2xl p-8 h-full flex flex-col">
                <div className="flex text-lime-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed flex-1">
                  “{testimonial.text}”
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    loading="lazy"
                    className="w-11 h-11 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {testimonial.author}
                    </h4>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
