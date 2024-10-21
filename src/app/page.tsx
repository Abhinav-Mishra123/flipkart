"use client"
import { Hero } from "@/components/Hero";
import Productcomponent from "@/components/Productcomponent";
import Shimmer from "./utils/Shimmer";

export default function Home() {
  
  return (
    <div className="Homepage">
     <Hero/>
     {/* <Shimmer/> */}
     <Productcomponent/>
    </div>
  );
}
