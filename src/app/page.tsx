"use client"
import { Hero } from "@/components/Hero";
import Productcomponent from "@/components/Productcomponent";

export default function Home() {
  
  return (
    <div className="Homepage">
     <Hero/>
     <Productcomponent/>
    </div>
  );
}
