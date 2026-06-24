import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Banknote, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HostPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2500&auto=format&fit=crop" 
            alt="Host smiling"
            fill
            className="object-cover object-center brightness-[0.7]"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Share Your Kazakhstan <br /> With the World
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Become a Local Host, meet inspiring expats, and earn money doing what you love. Join a community of verified ambassadors.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto text-lg px-12 h-14 bg-(--color-accent) hover:bg-(--color-accent)/90 border-none shadow-xl shadow-(--color-accent)/30">
              Apply to Host
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary) mb-4">Why host with us?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-(--color-background) rounded-2xl flex items-center justify-center mb-6">
              <Banknote className="w-8 h-8 text-(--color-secondary)" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Income</h3>
            <p className="text-gray-500 leading-relaxed">Set your own price for your experiences. Whether it's a coffee walk or a weekend hike, get paid for your time.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-(--color-background) rounded-2xl flex items-center justify-center mb-6">
              <HeartHandshake className="w-8 h-8 text-(--color-secondary)" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Make Global Friends</h3>
            <p className="text-gray-500 leading-relaxed">Connect with expats from Germany, UK, France, and all over the world. Practice languages and share cultures.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-(--color-background) rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-(--color-secondary)" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Moderated</h3>
            <p className="text-gray-500 leading-relaxed">You only meet verified members. Our team provides 24/7 support for all hosted events to ensure peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-(--color-background)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2500&auto=format&fit=crop" alt="Group laughing" fill className="object-cover" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-(--color-primary) mb-6">What it takes to be a Host</h2>
            <p className="text-gray-600 mb-8 text-lg">We maintain a high standard to ensure every experience on Local Bridge is unforgettable.</p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Must be 21+ years old</h4>
                  <p className="text-gray-500 text-sm">For maturity and responsibility during events.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Identity Verification</h4>
                  <p className="text-gray-500 text-sm">All hosts must pass a background check and ID verification.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Passionate about Kazakhstan</h4>
                  <p className="text-gray-500 text-sm">Ready to show the best hidden gems and share local traditions.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Conversational English</h4>
                  <p className="text-gray-500 text-sm">Ability to communicate effectively with international guests.</p>
                </div>
              </li>
            </ul>

            <Link href="/dashboard" className="inline-block mt-10">
              <Button size="lg" className="rounded-xl px-8 shadow-md">
                Start Verification Process
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
