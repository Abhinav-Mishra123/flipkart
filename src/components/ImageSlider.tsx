"use client";
import { useEffect, useState } from "react";

interface ImageSliderProps {
  images: {
    image_url: string;
    alt_text: string;
  }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

const openModal = () =>{
    setIsModalOpen(true)
}

const closeModal = () =>{
    setIsModalOpen(false);
}
 useEffect(()=>{
    const handleEscapeKey = (e: KeyboardEvent)=>{
        if(e.key === "Escape"){
            closeModal()
        }
    }
    if(isModalOpen){
        window.addEventListener("keydown", handleEscapeKey);
    }
    return ()=> window.removeEventListener("keydown", handleEscapeKey); 
 },[isModalOpen])


  return (
    <>
        <div className="relative">
        {images.length > 1 ? (
            <>
        <button className="absolute left-0 top-1/2 rounded-r-lg transform -translate-y-1/2 bg-stone-200 text-black px-1 md:p-2 py-2 md:py-3" onClick={prevSlide}>&#10094;</button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-lg bg-stone-200 text-black px-1 md:p-2 py-2 md:py-3" onClick={nextSlide}>&#10095;</button>
            </>
        ) : " " 
        }
        <div className="image-container w-full h-52 md:w-full md:h-full bg-white rounded-lg">
            <img src={images[currentIndex].image_url} alt={images[currentIndex].alt_text}
             onClick={openModal} 
             className="w-full h-52 md:h-96 p-4 md:p-8 object-contain object-center rounded-md cursor-pointer"/>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
            {images.map((_, index) => (
            <span
                key={index}
                className={`w-full bg-white rounded-full ${
                index === currentIndex ? "bg-opacity-100" : "bg-opacity-50"
                }`}
                onClick={() => setCurrentIndex(index)}
            ></span>
            ))}
        </div>
        </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="relative w-full md:w-2/4 h-1/2 md:h-3/4 bg-white rounded-xl p-7">
            <button className="absolute top-1 right-2 text-white bg-black px-2 md:px-2 w-7 md:w-7 rounded-full text-lg flex justify-center items-center" onClick={closeModal}>&#10005;</button>
            {images.length > 1 ? (
            <>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-r-lg bg-black text-white py-4 px-2 md:p-3 md:py-5" onClick={prevSlide}>&#10094;</button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-lg bg-black text-white py-4 px-2 md:p-3 md:py-5" onClick={nextSlide}>&#10095;</button>
            </>
            ): " "
    }
            <img src={images[currentIndex].image_url} alt={images[currentIndex].alt_text} className="w-full h-full object-contain object-center"/>
        </div>
        </div>
        )}
    </>

  );
};

export default ImageSlider;
