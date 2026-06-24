import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Map, Users, Globe2, HeartHandshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const events = await prisma.event.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/mount.jpeg" 
            alt="Kazakhstan mountains"
            fill
            className="object-cover object-center brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-background) via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-md px-4 py-1.5 text-sm font-medium">
            #1 Safe Community in Kazakhstan
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-lg">
            Safe Holiday Kazakhstan <br className="hidden md:block"/>
            <span className="text-(--color-accent)">Trusted Local Friends</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-100 mb-10 drop-shadow-md leading-relaxed">
            Join verified locals and expats for meaningful experiences, cultural exchange, and unforgettable weekends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg px-8 shadow-xl shadow-black/20">
                Join as Expat
              </Button>
            </Link>
            <Link href="/host" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg px-8 bg-white/10 text-white border-white/50 hover:bg-white/20 backdrop-blur-md">
                Become a Local Host
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHY SAFE HOLIDAY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary) mb-4">Why Safe Holiday</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Curated experiences with verified locals, ensuring safety and cultural exchange.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Verified Identity", desc: "ID-checks, reviews, and ratings for a secure environment." },
              { icon: Star, title: "Curated by Admins", desc: "We personally match expat interests with trusted Local Hosts." },
              { icon: Users, title: "Mutual Benefit", desc: "Genuine cultural exchange, language practice, and new friends." },
              { icon: Map, title: "Local Expertise", desc: "Discover the Steppe, Burabay, and authentic local cuisine." },
              { icon: HeartHandshake, title: "Safety Protocol", desc: "Escrow payments, group-only first meetings, and an active SOS system." },
              { icon: Globe2, title: "Insurance Included", desc: "All our events include basic accident insurance for peace of mind." }
            ].map((feature, i) => (
              <div key={i} className="bg-(--color-background) p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-(--color-secondary)" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS */}
      <section className="py-24 bg-(--color-background)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary) mb-4">Upcoming Experiences</h2>
              <p className="text-gray-500 text-lg">Curated activities to make your weekend unforgettable.</p>
            </div>
            <Link href="/events" className="hidden sm:block text-(--color-secondary) font-semibold hover:text-(--color-primary) transition-colors">
              View all events &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-(--color-primary) backdrop-blur-sm shadow-sm">{event.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold text-(--color-accent) mb-2">{event.date}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-(--color-primary) transition-colors">{event.title}</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="font-medium text-gray-900">{event.price}</span>
                    <Button variant="ghost" className="text-(--color-secondary) hover:text-(--color-primary) p-0 h-auto font-semibold" asChild>
                      <Link href={`/events/${event.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEMBERSHIP TIERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary) mb-4">Choose Your Plan</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Join our community and start exploring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Explorer Plan */}
            <div className="rounded-3xl border border-gray-200 p-8 flex flex-col hover:border-(--color-primary)/30 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Explorer Subscription</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">9 900 ₸</span>
                <span className="text-gray-500 font-medium">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Unlimited standard events</li>
                <li className="flex items-center gap-3 text-gray-600"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Priority waitlist for premium events</li>
                <li className="flex items-center gap-3 text-gray-600"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Access to verified community</li>
              </ul>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full rounded-xl h-12 text-lg">Get Started</Button>
              </Link>
            </div>

            {/* Corporate Plan */}
            <div className="rounded-3xl border-2 border-(--color-primary) bg-(--color-primary) p-8 flex flex-col relative shadow-2xl shadow-(--color-primary)/20">
              <Badge className="absolute -top-3 right-8 bg-(--color-accent) text-white border-none px-3 py-1">For B2B</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Corporate Package</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">Custom</span>
                <span className="text-white/80 font-medium">pricing</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-white/90"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Expat adaptation packages</li>
                <li className="flex items-center gap-3 text-white/90"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Custom team-building events</li>
                <li className="flex items-center gap-3 text-white/90"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Dedicated Admin support</li>
                <li className="flex items-center gap-3 text-white/90"><ShieldCheck className="w-5 h-5 text-(--color-accent)" /> Verified local hosts</li>
              </ul>
              <Link href="/contact" className="w-full">
                <Button className="w-full rounded-xl h-12 text-lg bg-white text-(--color-primary) hover:bg-gray-50">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

