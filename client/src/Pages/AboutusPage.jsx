import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from "../assets/aboutMainImage.png";
import CrasoulSlider from "../Component/CrasoulSlider";
import {celebrities} from '../Constants/CelebrityData'
function AboutusPage() {
 
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex flex-col md:flex-row items-center gap-8 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affardoable and qualtiy education
            </h1>
            <p className="text-xl text-gray-200 text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius,
              corporis Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Ab, minus?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Maiores, ea.
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px,0px,10px,rgba(0,0,0))",
              }}
              src={aboutMainImage}
              alt="About main Image"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Crasoule */}
      <div className="carousel w-1/2 m-auto my-16 flex items-center">
        {celebrities &&
          celebrities.map((celebrity) => (
            <CrasoulSlider
              {...celebrity}
              key={celebrity.slidenumber}
              totalslide={celebrities.length}
            />
          ))}
      </div>
    </HomeLayout>
  );
}

export default AboutusPage;
