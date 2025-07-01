import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function NewListingsCarousel() {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);
	const isMobile = useMediaQuery({ maxWidth: 764 });

	const listings = [
		{ image: '/listings/ept.webp' },
		{ image: '/listings/fis.webp' },
		{ image: '/listings/hyper.webp' },
		{ image: '/listings/memefi.webp' },
		{ image: '/listings/ozk.webp' },
		{ image: '/listings/tg.webp' },
		{ image: '/listings/zora.webp' },
	];

	useEffect(() => {
		if (
			swiperRef.current &&
			swiperRef.current.params &&
			swiperRef.current.params.navigation
		) {
			swiperRef.current.params.navigation.prevEl = prevRef.current;
			swiperRef.current.params.navigation.nextEl = nextRef.current;

			// Re-init navigation
			swiperRef.current.navigation.destroy();
			swiperRef.current.navigation.init();
			swiperRef.current.navigation.update();
		}
	}, []);

	return (
		<section
			className={`${
				isMobile ? 'w-[200px]' : ''
			} relative bg-black p-4 md:p-6 rounded-lg mb-0 md:mb-24`}>
			{/* Top Section */}
			<div className='hidden md:flex justify-between items-center mb-4'>
				<div className='text-white flex items-center gap-2'>
					<span>📢</span>
					<p className='text-xs md:text-sm leading-tight'>
						MemeFi (MEMEFI) Gets Listed on Cashtradepro Futures Trading!
					</p>
				</div>
				<a
					href='#'
					className='text-xs md:text-sm text-white hover:underline'>
					View More
				</a>
			</div>

			{/* Swiper */}
			<Swiper
				modules={[Navigation, Autoplay]}
				loop
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
				}}
				slidesPerView={1}
				spaceBetween={10}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
				}}>
				{listings.map((item, idx) => (
					<SwiperSlide key={idx}>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={item.image}
								alt={`listing ${idx}`}
								className='w-full h-24 md:h-32 object-cover'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Custom Navigation */}
			<div className='hidden absolute -bottom-8 right-4 md:flex items-center gap-2'>
				<button
					ref={prevRef}
					className='bg-[#1b1b1b] p-2 rounded-md text-white hover:bg-gray-700'>
					<ChevronLeft />
				</button>
				<button
					ref={nextRef}
					className='bg-[#1b1b1b] p-2 rounded-md text-white hover:bg-gray-700'>
					<ChevronRight />
				</button>
			</div>
		</section>
	);
}
