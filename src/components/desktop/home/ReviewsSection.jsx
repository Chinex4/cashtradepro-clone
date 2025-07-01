import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
	{
		title: 'Cashtradepro Records All-Time Highest Trading Volume In October',
		media: 'BENZINGA Pro',
		bgColor: 'bg-[#1E1E1E]',
	},
	{
		title: 'Cashtradepro Exchange Now Supports Visa and Mastercard Payments',
		media: 'THENEWSCRYPTO',
		bgColor: 'bg-[#00B8F0]',
	},
	{
		title: 'Slater Says "Cashtradepro Prioritizes Compliance and User Education"',
		media: 'yahoo! finance',
		bgColor: 'bg-[#A855F7]',
	},
	{
		title:
			'Cashtradepro at Blockchain Economy Summit Dubai 2023: Highlights of First Exhibit',
		media: 'NEWSBTC',
		bgColor: 'bg-[#00B8F0]',
	},
	{
		title:
			'Cashtradepro at Blockchain Economy Summit Dubai 2023: Highlights of First Exhibit',
		media: 'NEWSBTC',
		bgColor: 'bg-[#00B8F0]',
	},
];

const ReviewsSection = () => {
	return (
		<section className='bg-black flex flex-col items-center justify-center py-16 px-4 overflow-hidden'>
			<h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-12 lg:mb-8 text-left md:text-center leading-tight'>
				Reviews of Cashtradepro from Worldwide Media
			</h2>

			<div className='w-full max-w-6xl'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={4}
					breakpoints={{
						0: { slidesPerView: 1.2 },
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 4 },
					}}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					loop>
					{reviews.map((review, index) => (
						<SwiperSlide key={index} className='lg:py-12'>
							<div className='group flex flex-col h-72 rounded-xl overflow-hidden bg-[#121212] border border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
								{/* Top (Media logo) */}
								<div
									className={`flex items-center justify-center p-6 ${review.bgColor} h-1/2`}>
									<h3 className='text-white text-lg font-bold'>
										{review.media}
									</h3>
								</div>

								{/* Middle (Review Text) */}
								<div className='flex flex-col justify-between flex-1 p-4'>
									<p className='text-white text-sm mb-4'>{review.title}</p>

									{/* Bottom (Details link with hover effect) */}
									<div className='flex items-center justify-between px-4 py-2 border-t border-white/10 rounded-md transition-all duration-300 group-hover:bg-lime-400 group-hover:text-black'>
										<span className='text-xs'>Details</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='size-6 transition-transform duration-300 group-hover:-rotate-45'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
											/>
										</svg>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default ReviewsSection;
