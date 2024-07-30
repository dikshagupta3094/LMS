import React from "react";

function CrasoulSlider({image,description,title,slidenumber,totalslide }) {
  return (
    <div id={`slide${slidenumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
        <img
          src={image}
          className="w-40 rounded-full border-2 border-gray-400"
        />
        <h1 className="text-3xl text-white font-semibold">{title}</h1>
        <p className=" text-gray-400 text-xl">
          {description}
        </p>
        <div className="absolute w-[50%] flex -translate-y-1/2 transform justify-between">
          <a href={`#slide${(slidenumber == 1 ? totalslide:(slidenumber-1))}`} className="btn btn-circle">
            ❮
          </a>
          <a href={`#slide${(slidenumber) % totalslide + 1}`} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default CrasoulSlider;
