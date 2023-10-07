import { Carousel, Typography, Button } from "@/components/MainContentLayout";
import Image from "next/image";

type Props = {
  slides: any;
};
export default async function ({ slides }: Props) {
  return (
    <Carousel className={"border-4"}>
      {slides.map((s: any, i: number) => (
        <div className='relative h-full w-full' key={i}>
          <Image
            width='1000'
            height='500'
            src={s.image}
            alt='image 2'
            className='h-full w-full object-cover'
          />
          <div className='absolute -bottom-40 rtl:right-20 ltr:left-20  grid h-full w-full items-center main-green/15'>
            <div className='w-3/4 ps-12 md:w-2/4 md:ps-20 lg:ps-32'>
              <Typography
                variant='h1'
                color='white'
                className='mb-4 text-3xl md:text-4xl lg:text-5xl'>
                {s.name}
              </Typography>
              <Typography
                variant='lead'
                color='white'
                className='mb-12 opacity-80'>
                {s.description}
              </Typography>
              <div className='flex gap-2 hidden'>
                <Button size='lg' color='white'>
                  Explore
                </Button>
                <Button size='lg' color='white' variant='text'>
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
