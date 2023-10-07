import { MainContextLayout } from "@/components/MainContentLayout";
import TextTrans from "@/components/TextTrans";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { appLinks, convertSearchParamsToString } from "@/src/constants";
import { getUsers } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { map } from "lodash";
import Link from "next/link";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string };
};
export default async function UserIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, users] = await Promise.all([
    getDictionary(lang),
    getUsers(``, lang),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <div className='container py-24'>
        <h1 className='text-3xl font-bold'>
          {trans.translation} : {trans.users}
        </h1>
        <div className='w-full p-8  bg-orange-500 rounded-md'>
          <h1>From SSR : National Events</h1>
          {users &&
            map(users.data, (u, i) => (
              <Link key={i} href={`/${lang}/user/${u.id}`}>
                <span>{u.id} - </span>
                <TextTrans ar={u.name} en={u.name} />
              </Link>
            ))}
        </div>
      </div>
    </MainContextLayout>
  );
}
