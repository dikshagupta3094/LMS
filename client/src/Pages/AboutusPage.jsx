import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from "../assets/aboutMainImage.png";
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
        <div id="slide1" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3WMJ4pfutQp05lmnuEeBjYYl55D9TlrLAAB9XThhkkiY2eBCwvFGku8T8MYbkQALJP2mh69lvMO6MQ_sj535jNWh7HNABJ5tYktL1JA"
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <h1 className="text-3xl text-white font-semibold">Nelson Mandela</h1>
            <p className=" text-gray-400 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, illo.</p>
            <div className="absolute w-[50%] flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src="https://www.drishtiias.com/images/uploads/1634380807_image4.jpg"
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <div className="absolute w-[50%] flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src="https://www.bamboobridge.com.au/wp-content/uploads/2022/03/nelson_mandela_picture_3.jpg"
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <div className="absolute w-[50%] flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">
                {" "}
                ❮{" "}
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src="https://i.pinimg.com/originals/29/b2/38/29b23817f0156bae5a8204948a27663e.jpg"
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <div className="absolute w-[50%] flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutusPage;
