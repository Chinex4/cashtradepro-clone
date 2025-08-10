import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
const faqs = [
	{
		question: 'What are the payment methods Cashtradeprodepro support?',
		answer:
			'Cashtradeprodepro supports VISA, Mastercard, Apple Pay, and other local payment options depending on your region.',
	},
	{
		question:
			'Where can I see my purchased cryptocurrency after I completed the payment?',
		answer:
			'Once payment is confirmed, your purchased crypto will appear in your Cashtradeprodepro wallet under "Assets".',
	},
	{
		question: 'Are there fees for purchasing cryptocurrency?',
		answer:
			'Yes, providers may charge a small service fee depending on the transaction volume and method.',
	},
	{
		question:
			'How much time does it take to receive my purchased cryptocurrency post-payment?',
		answer:
			'Transactions are usually completed within 5-30 minutes, depending on network conditions and payment verification.',
	},
];
const FAQ = ({ showHeader = true }) => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleFAQ = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};
	return (
		<section className='max-w-7xl mx-auto mt-12 px-4 text-sm'>
			{showHeader && (
				<h2 className='mb-4 md:mb-8 text-lg md:text-2xl lg:text-4xl font-bold text-left md:text-center '>
					Frequently Asked Questions
				</h2>
			)}
			{faqs.map((faq, index) => (
				<div
					key={index}
					className='mb-4 border-b border-white/10'>
					<button
						onClick={() => toggleFAQ(index)}
						className='w-full flex justify-between items-center py-4 text-left text-[13px] md:text-base'>
						{faq.question}
						<motion.span
							animate={{ rotate: activeIndex === index ? 180 : 0 }}
							transition={{ duration: 0.3 }}>
							<ChevronDown size={20} />
						</motion.span>
					</button>
					<AnimatePresence>
						{activeIndex === index && (
							<motion.p
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.4 }}
								className='overflow-hidden text-xs text-gray-400 mb-3 px-1'>
								{faq.answer}
							</motion.p>
						)}
					</AnimatePresence>
				</div>
			))}
		</section>
	);
};

export default FAQ;
