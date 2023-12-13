"use client";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/src/types/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FavouriteWidget from "./FavouriteWidget";
import Delivery from "@/appIcons/landing/delivery.svg";
import Clock from "@/appIcons/landing/clock.svg";

type Props = {
  vendor: User;
  lang: Locale["lang"];
  country: countriesList;
};

export default function VendorWidget({ vendor, lang, country }: Props) {
  return (
    <div className="relative rtl:text-right ltr:text-left">
      <Image
        alt={vendor.name || ""}
        src={vendor.image}
        width={1000}
        height={1000}
        className="w-full h-auto aspect-[2/1] object-cover rounded-lg"
      />
      <div className="w-full h-auto aspect-[2/1] absolute bg-black bg-opacity-20 top-0 bottom-0 left-0 right-0 rounded-lg py-3 px-2">
        <div className="flex justify-between items-center">
          <Link
            href={appLinks.offer(
              lang,
              country,
              vendor.id.toString(),
              vendor.name
            )}
          >
            {vendor.status ? (
              vendor.status === "open" ? (
                <p className="rounded-xl px-2 py-1 bg-picks-dark h-fit text-xs font-light text-white">
                  Open Now
                </p>
              ) : vendor.status === "closed" ? (
                <p className="rounded-xl px-2 py-1 bg-[#F04438] h-fit text-xs font-light text-white">
                  Closes Now
                </p>
              ) : (
                <p className="rounded-xl px-2 py-1 bg-[#FF8A59] h-fit text-xs font-light text-white">
                  Not Available
                </p>
              )
            ) : null}
          </Link>
          <FavouriteWidget isFav={vendor.favorite} />
        </div>
      </div>
      <Link
        href={appLinks.offer(lang, country, vendor.id.toString(), vendor.name)}
        className="mt-2 space-y-1 "
      >
        <p className="font-extrabold mt-2">
          {vendor.store_name} <span>{vendor.percentage}</span>
        </p>
        <p className="truncate text-sm text-picks-text-gray">
          {vendor.description}
        </p>
        {vendor.delivery_time || vendor.delivery_fees ? (
          <div className="flex flex-wrap gap-x-2 text-sm text-picks-text-gray">
            {vendor.delivery_time ? (
              <div className="flex gap-x-1">
                <Clock />
                <p>{vendor.delivery_time}</p>
              </div>
            ) : null}

            {vendor.delivery_fees ? (
              <div className="flex gap-x-1">
                <Delivery />
                <p>{vendor.delivery_fees}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Link>
    </div>
  );
}
