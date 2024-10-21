
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, Component, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { carousalImg } from "@/app/utils/img";

function NextArrow (props:any){
    const { className, style, onClick } = props;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
        const handleResize = ()=> setIsMobile(window.innerWidth <=768);
        window.addEventListener("resize", handleResize);
        handleResize();
        return ()=> window.removeEventListener("resize", handleResize);
    },[])
    const arrowStyleDesktop = {
        ...style,
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        width:30, 
        borderRadius:"5px 0px 0px 5px", 
        background:"#f36e6e", 
        height:65, 
        right:0
    }

    const arrowStyleMobile = {
        ...style,
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        width:25, 
        borderRadius:"5px 0px 0px 5px", 
        background:"#f36e6e", 
        height:45, 
        right:0
    }

    return (
        <div className={className} 
        style={ isMobile ? arrowStyleMobile : arrowStyleDesktop}
        onClick={onClick}>
        </div>
    )
}

function PrevArrow (props:any){
    const { className, style, onClick } = props;
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        const handleResize = ()=> setIsMobile(window.innerWidth <=768);
        window.addEventListener("resize", handleResize);
        handleResize();
        return ()=> window.removeEventListener("resize", handleResize);
    },[])
    const arrowStyleDesktop = {
        ...style,
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        width:30, 
        borderRadius:"0px 5px 5px 0px", 
        background:"#f36e6e", 
        height:65, 
        left:0, 
        zIndex:9
    }

    const arrowStyleMobile = {
        ...style,
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        width:25, 
        borderRadius:"0px 5px 5px 0px", 
        background:"#f36e6e", 
        height:45, 
        left:0, 
        zIndex:9
    }
    return (
        <div className={className} 
        style={ isMobile ? arrowStyleMobile : arrowStyleDesktop}
        onClick={onClick}>
        </div>
    )
}

export const Hero =() =>{
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        cssEase: "linear",
        fade: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
      };

      interface imgDataType {
        "id":string,
        "url":string
      }


    return (
        <div className="slider-container hero-section mt-3 mb-3">
            <Slider {...settings}>
                {carousalImg.map((images, keys)=>(
                    <div className="carousal-item" key={keys}>
                        <div className="carousal-inner">
                            <Link href={"/"}>
                                <div className="car-img md:h-full h-48">
                                    <img src={images.url} className="rounded-md md:h-full h-48 object-cover"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                    )
                )}      
            </Slider>
        </div>
    )
}