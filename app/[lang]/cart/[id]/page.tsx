import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import NavHeader from "@/components/header/NavHeader";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { getMembership, getMemberships } from "@/utils/membership";
import { setMembership } from "@/redux/slices/cartSlice";
import { Membership } from "@/types/queries";
import MembershipCard from "@/components/membership/MembershipCard";
import { getCountries } from "@/utils/country";
import { isNull } from "lodash";
import CartContent from "@/components/cart/CartContent";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function ({ params: { lang, id }, searchParams }: Props) {
  const [{ trans }, membership, country, setting] = await Promise.all([
    getDictionary(lang),
    getMembership(id, lang),
    getCountries(`lang=${lang}&limit=1`, lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <h1>subscriptions</h1>
      <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        <CartContent membership={membership} country={country[0]} lang={lang} />
      </div>
    </MainContextLayout>
  );
}
