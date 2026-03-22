import { sampleData } from "@/data/sample";
import { Hero } from "@/components/sections/01-Hero";
import { Welcome } from "@/components/sections/02-Welcome";
import { Experience } from "@/components/sections/03-Experience";
import { Gallery } from "@/components/sections/04-Gallery";
import { Rooms } from "@/components/sections/05-Rooms";
import { Dining } from "@/components/sections/06-Dining";
import { GuestExperiences } from "@/components/sections/07-GuestExperiences";
import { Surroundings } from "@/components/sections/08-Surroundings";
import { Wellness } from "@/components/sections/09-Wellness";
import { ADayHere } from "@/components/sections/10-ADayHere";
import { Seasons } from "@/components/sections/11-Seasons";
import { GettingHere } from "@/components/sections/12-GettingHere";
import { Amenities } from "@/components/sections/13-Amenities";
import { Policies } from "@/components/sections/14-Policies";
import { FAQ } from "@/components/sections/15-FAQ";
import { Events } from "@/components/sections/16-Events";
import { TestimonialHighlight } from "@/components/sections/17-Testimonial";
import { Reserve } from "@/components/sections/18-Reserve";
import { Agnotita } from "@/components/sections/19-Agnotita";
import { Footer } from "@/components/sections/20-Footer";

export default function Home() {
  const data = sampleData;

  return (
    <main>
      <Hero
        name={data.name}
        tagline={data.tagline}
        city={data.city}
        state={data.state}
        stars={data.stars}
        heroImage={data.heroImage}
        bookingUrl={data.bookingUrl}
      />
      <Welcome message={data.welcomeMessage} />
      <Experience items={data.experience} />
      <Gallery images={data.gallery} name={data.name} />
      <Rooms rooms={data.rooms} />
      <Dining restaurant={data.dining} />
      <GuestExperiences reviews={data.reviews} />
      <Surroundings attractions={data.nearbyAttractions} city={data.city} />
      <Wellness spa={data.spa} />
      <ADayHere itinerary={data.dayItinerary} name={data.name} />
      <Seasons seasons={data.seasons} city={data.city} />
      <GettingHere options={data.gettingHere} name={data.name} />
      <Amenities amenities={data.amenities} />
      <Policies policies={data.policies} />
      <FAQ faqs={data.faqs} />
      <Events events={data.events} />
      <TestimonialHighlight review={data.testimonialHighlight} />
      <Reserve
        name={data.name}
        bookingUrl={data.bookingUrl}
        phone={data.phone}
        whatsapp={data.whatsapp}
      />
      <Agnotita message={data.agnotitaMessage} name={data.name} />
      <Footer
        name={data.name}
        address={data.address}
        phone={data.phone}
        email={data.email}
        socialLinks={data.socialLinks}
        mapEmbedUrl={data.mapEmbedUrl}
      />
    </main>
  );
}
