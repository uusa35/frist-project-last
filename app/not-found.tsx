import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { getCountryNameCookie } from "./actions";
import NotFoundImg from "@/appImages/not_found.svg";
export default async function NotFound() {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <div className='min-h-fit flex flex-col my-[10%] justify-start items-center '>
        <NotFoundImg className='w-[300px] h-auto' />
        <div className='flex flex-col gap-y-8'>
          <p>{trans.not_found}</p>
          <p>{trans.not_found}</p>
          <Link href={`/${lang}`} className='btn-gray'>
            browse picks
          </Link>
        </div>
      </div>
    </MainContextLayout>
  );
}
