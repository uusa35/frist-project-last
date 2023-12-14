import React, { useRef } from "react";
import Slider from "react-slick";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Flash3 from "@/appIcons/landing/picks_flash.svg";
import Flash2 from "@/appIcons/landing/orange_flash.svg";
import Flash1 from "@/appIcons/landing/yellow_flash.svg";
import { Product } from "@/src/types/queries";
import OfferWidget from "../widgets/OfferWidget";

type Props = {
  products: Product[];
};

export default function FlashOffers({ products }: Props) {
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
          className="arrow-btn prev w-8 h-8 rounded-full bg-white"
          onClick={() => refSlider2?.current?.slickPrev()}
        >
          <KeyboardArrowLeft />
        </button>
        <button
          className="arrow-btn next w-8 h-8 rounded-full bg-white"
          onClick={() => refSlider2?.current?.slickNext()}
        >
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };
  return (
    <div className="bg-picks-gray p-5 rounded-lg my-10">
      <div className="flex gap-x-2 justify-between">
        <div className="flex gap-x-1 items-center">
          <Flash1 className="w-8 h-8" />
          <p className="text-lg font-semibold">️Flash Offers</p>
        </div>
        <RenderArrows />
      </div>

      <div className="my-5">
        <Slider {...settings2} ref={(c) => (refSlider2.current = c)}>
          {products &&
            products.map((itm) => (
              <OfferWidget product={itm} key={itm.id} />
            ))}
        </Slider>
      </div>

      <div className="flex justify-between">
        <Flash3 className="w-10 h-10" />
        <Flash2 className="w-10 h-10" />
      </div>
    </div>
  );
}