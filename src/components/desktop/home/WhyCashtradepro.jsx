import React from 'react';

const features = [
	{
		title: 'Secure',
		description:
			'We offer industry-leading secure cryptocurrency trading platform, maintaining a robust reserve fund that exceeds 1:1 ratio against user holdings.',
		icon: (
			<img
				className='w-24'
				src='/whoisusing-icons/secure.svg'
				alt=''
			/>
		),
	},
	{
		title: 'Seamless',
		description:
			'Enjoy the benefits of efficient and real-time online trading. Start your crypto journey with just $10 investment.',
		icon: (
			<img
				className='w-24'
				src='/whoisusing-icons/seamlesss.svg'
				alt=''
			/>
		),
	},
	{
		title: 'Insights',
		description:
			'Get real-time updates and sharp insights about the cryptocurrency market.',
		icon: (
			<img
				className='w-24'
				src='/whoisusing-icons/insights.svg'
				alt=''
			/>
		),
	},
	{
		title: 'Service',
		description:
			'Experience unparalleled assistance with multilingual 24/7 customer support. Ensuring a seamless and satisfying trading experience.',
		icon: (
			<img
				className='w-24'
				src='/whoisusing-icons/service.svg'
				alt=''
			/>
		),
	},
];

const WhyCashtradepro = () => {
	return (
		<section className='bg-black flex flex-col items-center justify-center mt-16 py-10 px-4'>
			<h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-12 md:mb-24 text-left md:text-center'>
				Why Cashtradepro?
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl w-full'>
				{features.map((feature, index) => (
					<div
						key={index}
						className='flex flex-row gap-4 md:flex-col items-center lg:transition-all lg:duration-500 group lg:hover:bg-lime-400 lg:hover:text-black lg:hover:-translate-y-3 lg:rounded-lg lg:p-4'>
						<div className='transition duration-500 lg:hover:rotate-12'>
							{feature.icon}
						</div>
						<div>
							<h3 className='text-white lg:hover:text-black text-left md:text-center font-semibold text-lg mb-4 transition-colors duration-300'>
								{feature.title}
							</h3>
							<p className='text-gray-400 lg:group-hover:text-black text-left md:text-center text-sm leading-relaxed max-w-xs transition-colors duration-300'>
								{feature.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default WhyCashtradepro;
