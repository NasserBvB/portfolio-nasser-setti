import Link from 'next/link'
import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Card, CardContent } from './ui/card'

interface Props {
  title: string
  content?: React.ReactNode
  viewAll: {
    label?: string
    link: string
  }
}

const FeaturedSection = ({ content, title, viewAll: { label = 'View All', link } }: Props) => {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center gap-3">
        <h2>{title}</h2>
        <Link href={link} title="click here">
          {label}
        </Link>
      </div>
      <div className='flex justify-center'>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

export default FeaturedSection
