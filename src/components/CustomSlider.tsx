import React, { useRef } from "react";
import Slider from "react-slick";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/types/queries";
import VendorWidget from "./widgets/VendorWidget";

type Props = {
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
  title: string;
};

export default function CustomSlider({ vendors, lang, country, title }: Props) {
  const refSlider2 = useRef<Slider | null>(null);

  const settings2 = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const RenderArrows = () => {
    return (
      <div className="slider-arrow flex gap-x-2">
        <button
          className="arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider2?.current?.slickPrev()}
        >
          <KeyboardArrowLeft />
        </button>
        <button
          className="arrow-btn next w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider2?.current?.slickNext()}
        >
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };
  return (
    <div className="my-5">
      <div className="flex justify-between mb-3">
        <p>{title}</p>
        <div className="flex items-center gap-x-3">
          <p>See all</p>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider {...settings2} ref={(c) => (refSlider2.current = c)}>
          {vendors &&
            vendors.map((itm) => (
              <VendorWidget
                vendor={itm}
                key={itm.id}
                lang={lang}
                country={country}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}
