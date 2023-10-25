"use client";
import { FC, createContext } from "react";
import NavHeader from "./header/NavHeader";
import { Locale } from "@/types/index";
import AppFooter from "./footer/AppFooter";
import { usePathname } from "next/navigation";
import { Setting } from "@/types/queries";

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string } | any;
  lang: Locale["lang"];
  searchParams: { [key: string]: string } | string;
  setting: Setting;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  searchParams = ``,
  setting,
}) => {
  const pathName = usePathname();
  const navigation = [
    { name: trans.home, href: `/${lang}`, label: `home` },
    {
      name: trans.subscribers,
      href: `/${lang}/user?membership=subscription`,
      label: "subscription",
    },
    {
      name: trans.sponsors,
      href: `/${lang}/user?membership=sponsorship`,
      label: "sponsorship",
    },
    { name: trans.posts, href: `/${lang}/post`, label: "post" },
    { name: trans.aboutus, href: `/${lang}/aboutus`, label: "aboutus" },
    { name: trans.contactus, href: `/${lang}/contactus`, label: "contactus" },
  ];
  return (
    <MainContext.Provider value={trans}>
      {/* nav & slider */}
      <NavHeader
        lang={lang}
        searchParams={searchParams}
        mainPages={navigation}
        setting={setting}
      />
      <div>{children}</div>
      {!pathName?.includes("login") && !pathName?.includes("register") && (
        <AppFooter
          mainPages={navigation}
          lang={lang}
          trans={trans}
          setting={setting}
        />
      )}
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
