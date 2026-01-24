import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

export interface ImagesCarouselProps {
	images: string[]
}

export function ImagesCarousel({ images }: ImagesCarouselProps) {
	return (
		<Carousel opts={{ loop: true }} className="xl:w-full md:w-11/12 w-7/10">
			<CarouselContent>
				{images.map((src, index) => (
					<CarouselItem key={index} className="relative h-96 w-full">
						<Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
