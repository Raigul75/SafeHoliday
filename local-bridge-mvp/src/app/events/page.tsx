import Image from "next/image";
import Link from "next/link";
import { Filter, Search, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || "All";
  
  const whereClause: any = { status: "APPROVED" };
  if (selectedCategory !== "All") {
    whereClause.category = selectedCategory;
  }
  
  const events = await prisma.event.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="bg-(--color-background) min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-(--color-primary) mb-6">Explore Experiences</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:ring-(--color-primary) focus:border-(--color-primary) text-gray-900 shadow-sm"
                placeholder="Search events, cities, or categories..."
              />
            </div>
            <div className="flex gap-4">
              <div className="relative flex-grow md:w-48">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select className="block w-full pl-11 pr-10 py-3 rounded-xl border-gray-200 bg-gray-50 focus:ring-(--color-primary) focus:border-(--color-primary) text-gray-900 shadow-sm appearance-none">
                  <option>All Cities</option>
                  <option>Astana</option>
                  <option>Almaty</option>
                </select>
              </div>
              <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200 text-gray-700 bg-white shadow-sm flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </Button>
            </div>
          </div>

          {/* Quick Category Tags */}
          <div className="flex flex-wrap gap-2">
            {["All", "Real Family Event", "Weekend Trip", "Meetup", "Culture & Food", "Active"].map((tag) => (
              <Link key={tag} href={tag === "All" ? "/events" : `/events?category=${tag}`}>
                <Badge 
                  variant={selectedCategory === tag ? "default" : "outline"} 
                  className="px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="block group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-(--color-primary) backdrop-blur-sm shadow-sm">{event.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-semibold text-(--color-accent)">{event.date}</p>
                      <span className="font-bold text-gray-900">{event.price}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-(--color-primary) transition-colors">{event.title}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      Hosted by <span className="font-medium text-gray-700">{(event as any).host?.name || "Verified Local"}</span>
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No events found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
