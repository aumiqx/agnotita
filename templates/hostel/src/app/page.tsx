import { sampleHostel } from "@/data/sample";
import { Hero } from "@/components/sections/01-Hero";
import { Vibe } from "@/components/sections/02-Vibe";
import { Story } from "@/components/sections/03-Story";
import { Gallery } from "@/components/sections/04-Gallery";
import { Rooms } from "@/components/sections/05-Rooms";
import { TravelerStories } from "@/components/sections/06-TravelerStories";
import { ADayHere } from "@/components/sections/07-ADayHere";
import { Amenities } from "@/components/sections/08-Amenities";
import { WhatsAround } from "@/components/sections/09-WhatsAround";
import { WeatherMood } from "@/components/sections/10-WeatherMood";
import { TheDrift } from "@/components/sections/11-TheDrift";
import { PeakTimes } from "@/components/sections/12-PeakTimes";
import { HowToReach } from "@/components/sections/13-HowToReach";
import { HouseRules } from "@/components/sections/14-HouseRules";
import { MeetTheHost } from "@/components/sections/15-MeetTheHost";
import { FAQ } from "@/components/sections/16-FAQ";
import { HonestReview } from "@/components/sections/17-HonestReview";
import { BookNow } from "@/components/sections/18-BookNow";
import { Agnotita } from "@/components/sections/19-Agnotita";
import { Footer } from "@/components/sections/20-Footer";

export default function HomePage() {
  const d = sampleHostel;

  return (
    <main>
      <Hero
        name={d.name}
        city={d.city}
        rating={d.rating}
        reviewCount={d.reviewCount}
        heroImage={d.heroImage}
        tagline={d.tagline}
        bookingUrl={d.bookingUrl}
      />
      <Vibe vibeWords={d.vibeWords} />
      <Story longDescription={d.longDescription} photos={d.photos} />
      <Gallery photos={d.photos} />
      <Rooms rooms={d.rooms} />
      <TravelerStories reviews={d.reviews} />
      <ADayHere timeline={d.timeline} city={d.city} />
      <Amenities amenities={d.amenities} />
      <WhatsAround nearbyPlaces={d.nearbyPlaces} hostelName={d.name} />
      <WeatherMood weatherMood={d.weatherMood} city={d.city} />
      <TheDrift driftImage={d.driftImage} />
      <PeakTimes monthlyData={d.monthlyData} />
      <HowToReach howToReach={d.howToReach} hostelName={d.name} />
      <HouseRules houseRules={d.houseRules} />
      <MeetTheHost
        hostName={d.hostName}
        hostPhoto={d.hostPhoto}
        hostQuote={d.hostQuote}
      />
      <FAQ faq={d.faq} />
      <HonestReview honestReviews={d.honestReviews} />
      <BookNow
        bookingUrl={d.bookingUrl}
        whatsappNumber={d.whatsappNumber}
        hostelName={d.name}
      />
      <Agnotita hostelName={d.name} />
      <Footer
        name={d.name}
        address={d.address}
        phone={d.phone}
        email={d.email}
        social={d.social}
        coordinates={d.coordinates}
      />
    </main>
  );
}
