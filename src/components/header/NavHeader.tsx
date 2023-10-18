"use client";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MainContext } from "../MainContentLayout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { changePathName, convertSearchParamsToString } from "@/utils/helpers";
import AppLogo from "@/components/header/AppLogo";
import { last, split, toString } from "lodash";
import { setCurrentPath } from "@/redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Setting } from "@/types/queries";

type Props = {
  lang: Locale;
  searchParams: { [key: string]: string } | string;
  mainPages: { href: string; name: string; label: string }[];
  setting: Setting;
};

export default function ({
  lang,
  searchParams = ``,
  mainPages,
  setting,
}: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useAppSelector((state) => state.appSetting);
  const dispatch = useAppDispatch();
  const params = useParams();
  const pathName = usePathname()!;
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 300
        ? setStickyClass(
            "sticky w-full transition-opacity opacity-80 duration-200 border-b border-gray-400 bg-white pb-0 max-w-full"
          )
        : setStickyClass("relative");
    }
  };

  // console.log("pathname", pathName);
  // console.log("router", router);
  // console.log("segment", segment);
  // console.log("segments", segments);
  // console.log("params", params);
  // console.log("searchParams", searchParams);
  // console.log("searchParams ----->", convertSearchParamsToString(searchParams));
  // console.log("url", changePathName(lang, "ar", pathName));
  useEffect(() => {
    if (typeof searchParams === "object") {
      dispatch(setCurrentPath(searchParams.membership));
    } else {
      const url: string = toString(last(split(pathName, "/")));
      if (url === "en" || url === "ar") {
        dispatch(setCurrentPath("home"));
      } else {
        dispatch(setCurrentPath(url));
      }
    }
  }, [pathName]);
  return (
    <header
      className={` top-0 z-50 mx-auto max-w-7xl py-4 px-2  ${stickyClass}`}>
      <nav className={`flex items-center justify-between`} aria-label='Global'>
        <div className=' lg:hidden xl:flex-1'>
          <AppLogo logo={setting.image} name={setting.name} />
        </div>
        {/* top bar */}
        <div className='hidden lg:flex lg:flex-1  gap-x-4 capitalize'>
          <Link
            scroll={true}
            href={`${changePathName(
              lang,
              "ar",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            {trans.ar}
          </Link>
          <Link
            scroll={true}
            href={`${changePathName(
              lang,
              "en",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            {trans.en}
          </Link>
          <Link
            scroll={true}
            href={`${changePathName(
              lang,
              "ru",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            {trans.ru}
          </Link>
        </div>
        <div className='flex lg:hidden capitalize'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        {/* menu */}
        <div className='hidden lg:flex lg:gap-x-8'>
          <AppLogo logo={setting.image} name={setting.name} />
        </div>
        {/* <ActiveLink
          activeClassName='active'
          className='border-4 bg-green-800 active:bg-blue-700'
          href='/'>
          Home
        </ActiveLink> */}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-4 capitalize'>
          <Link
            href={`/${lang}/register/visitor`}
            className='text-sm font-semibold leading-6 text-white p-2 px-4 btn-color-default '>
            {trans.visitors}
          </Link>
          <Link
            href={`/${lang}/register/company`}
            className='text-sm font-semibold leading-6 text-white p-2 px-4 btn-color-default '>
            {trans.subscriptions}
          </Link>
        </div>
      </nav>
      <nav
        className='hidden lg:flex items-center justify-between  capitalize my-8'
        aria-label='Global'>
        <div className='flex lg:flex-1'></div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-8 '>
          {mainPages.map((item, i) => (
            <Link
              onClick={() => dispatch(setCurrentPath(item.label))}
              key={item.label}
              href={item.href}
              className={`${
                currentPath === item.label
                  ? `text-expo-dark text-underline`
                  : `text-gray-900`
              }
              text-sm font-semibold leading-6  hover:text-expo-dark`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-4'>
          <Link
            href={`/${lang}/login`}
            className='text-sm font-semibold text-gray-900 flex flex-row w-30 justify-center items-center '>
            <UserIcon className='w-8 me-2' />
            <span className='flex w-full pt-1'>{trans.login}</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <AppLogo />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}>
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6 capitalize'>
                {mainPages.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6 capitalize'>
                <Link
                  href={`/${lang}/login`}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                  {trans.login}
                </Link>
                <div className='flex flex-row justify-between items-center px-8 ps-12'>
                  <Link
                    href={`${changePathName(
                      lang,
                      "ar",
                      pathName
                    )}?${convertSearchParamsToString(searchParams)}`}
                    className={`${
                      lang === "ar" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.ar}
                  </Link>

                  <Link
                    href={`${changePathName(
                      lang,
                      "en",
                      pathName
                    )}?${convertSearchParamsToString(searchParams)}`}
                    className={`${
                      lang === "en" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.en}
                  </Link>
                  <Link
                    href={`${changePathName(
                      lang,
                      "ru",
                      pathName
                    )}?${convertSearchParamsToString(searchParams)}`}
                    className={`${
                      lang === "ru" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.ru}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
