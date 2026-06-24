import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const COMMUNITY_MEMBERS = [
  { name: "Thomas", from: "Germany", role: "Software Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2500&auto=format&fit=crop" },
  { name: "Emma", from: "UK", role: "English Teacher", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2500&auto=format&fit=crop" },
  { name: "Aibek", from: "Kazakhstan", role: "Local Ambassador", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2500&auto=format&fit=crop" },
  { name: "Lucia", from: "Spain", role: "Digital Nomad", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2500&auto=format&fit=crop" },
  { name: "Nurlan", from: "Kazakhstan", role: "History Guide", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2500&auto=format&fit=crop" },
  { name: "Sophie", from: "France", role: "Photographer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2500&auto=format&fit=crop" },
  { name: "Mark", from: "Netherlands", role: "Entrepreneur", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2500&auto=format&fit=crop" },
  { name: "Zarina", from: "Kazakhstan", role: "Event Organizer", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2500&auto=format&fit=crop" },
];

export default function CommunityPage() {
  return (
    <div className="bg-(--color-background) min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2500&auto=format&fit=crop" 
            alt="Community gathering"
            fill
            className="object-cover object-center brightness-[0.75]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-background) via-transparent to-black/30" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <Badge className="bg-(--color-accent) text-white border-none px-4 py-1.5 text-sm font-medium w-fit mb-4 shadow-lg">
            Global Network
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg max-w-3xl">
            Meet the World in Kazakhstan
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-100 drop-shadow-md leading-relaxed">
            A trusted network of over 5,000 verified expats and locals. Find people who share your passions, practice languages, and explore together.
          </p>
        </div>
      </section>

      {/* Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:ring-(--color-primary) focus:border-(--color-primary) text-gray-900 shadow-sm"
              placeholder="Search members by name, country, or interests..."
            />
          </div>
          <Button className="h-12 px-8 rounded-xl shrink-0">Search Network</Button>
        </div>

        {/* Demographics Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Members", value: "5,200+" },
            { label: "Countries Represented", value: "45" },
            { label: "Local Hosts", value: "350+" },
            { label: "Events Hosted", value: "1,200+" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-(--color-primary) mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Member Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Members</h2>
            <Link href="/dashboard" className="text-(--color-secondary) font-semibold hover:text-(--color-primary) transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {COMMUNITY_MEMBERS.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative h-64 w-full">
                  <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/90 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{member.from}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{member.role}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-50 hover:bg-(--color-primary) hover:text-white transition-colors text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-(--color-primary) rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl shadow-(--color-primary)/20 mb-12">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Want to connect with them?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
              Join Local Bridge today to start messaging members, attending private events, and exploring Kazakhstan together.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-(--color-primary) hover:bg-gray-100 rounded-xl px-8 h-14 text-lg">
                Create Free Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
