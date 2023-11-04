"use client";
import NewsletterBg from "@/appImages/home/newsletter_bg.jpeg";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/validations";
import { useAppDispatch } from "@/redux/hooks";
import { useLazyNewsletterQuery } from "@/redux/api";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { MainContext } from "@/layouts/MainContentLayout";
import { useContext } from "react";

type InputFields = {
  email: string;
};
export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputFields>({
    resolver: yupResolver(loginSchema.omit(["password"])),
  });
  const [triggerNewsLetterSubscribtion] = useLazyNewsletterQuery();

  const onSubmit: SubmitHandler<InputFields> = async (body: {
    email: string;
  }) => {
    // console.log("body", body);
    await triggerNewsLetterSubscribtion(body).then((r: any) => {
      if (r.isSuccess && r.data && r.data.message) {
        dispatch(showSuccessToastMessage({ content: r.data.message }));
        reset();
      } else {
        dispatch(showErrorToastMessage({ content: r.error?.data?.message }));
      }
    });
  };

  return (
    <div className=' py-12 sm:py-12 capitalize '>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 bg-local'>
        <div
          className='bg-local  relative isolate overflow-hidden  px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32'
          style={{
            backgroundImage: `url(${NewsletterBg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
          <h2 className='mx-auto max-w-3xl line-clamp-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl pb-4'>
            {trans.register_to_receive_latest_expo_news}
          </h2>
          <p className='mx-auto mt-2 max-w-xl  line-clamp-2 text-center text-lg leading-8 text-gray-300'>
            {
              trans.through_this_section_u_can_follow_up_all_news_related_to_this_expo_and_even_more
            }
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex justify-center gap-x-4 mx-auto mt-10 max-w-md'>
            <div className='w-full'>
              <input
                // type="email"
                // autoComplete="email"
                className='min-w-0 w-full flex-auto rounded-md border-0 bg-white/80 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 capitalize'
                placeholder={trans.enter_ur_email}
                {...register("email")}
              />
              {errors?.email?.message && (
                <p className='w-full mt-2 text-red-600'>{`${errors?.email?.message}`}</p>
              )}
            </div>
            <button
              type='submit'
              className='flex-none h-fit rounded-md bg-expo-medium hover:bg-expo-dark px-3.5 py-2.5 text-sm font-semibold text-white capitalize shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
              {trans.notify_me}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
