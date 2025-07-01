import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTelegramPlane,
  FaLinkedinIn,
  FaMediumM,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Footer = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <footer className='bg-black text-gray-400 pt-12 pb-20 md:pb-6 px-4 relative overflow-hidden'>
      {/* Top Section */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-10'>
        {/* Logo and Slogan */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-lime-400 rounded-full' />
            <h1 className='text-lime-400 text-lg font-bold'>Bitunix</h1>
          </div>
          <p className='text-sm text-white'>Better Liquidity, Better Trading</p>
        </div>

        {/* Links Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 w-full'>
          {/* About */}
          <div className='flex flex-col gap-2'>
            <h4 className='text-white font-semibold mb-2'>About</h4>
            <Link to='#' className='hover:text-white text-sm'>
              About Bitunix
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Announcements
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Proof of Reserves
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Blog
            </Link>
          </div>

          {/* Laws */}
          <div className='flex flex-col gap-2'>
            <h4 className='text-white font-semibold mb-2'>Laws</h4>
            <Link to='#' className='hover:text-white text-sm'>
              User Agreement
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Privacy Policy
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Legal Statement
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              AML Policies
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Risk Disclosure
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Regulatory & Law Enforcement
            </Link>
          </div>

          {/* Services */}
          <div className='flex flex-col gap-2'>
            <h4 className='text-white font-semibold mb-2'>Services</h4>
            <Link to='#' className='hover:text-white text-sm'>
              Fees
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              VIP Service
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Listing Application
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Sitemap
            </Link>
          </div>

          {/* Support */}
          <div className='flex flex-col gap-2'>
            <h4 className='text-white font-semibold mb-2'>Support</h4>
            <Link to='#' className='hover:text-white text-sm'>
              Official Verification
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Help Center
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Contact Bitunix
            </Link>
            <Link to='#' className='hover:text-white text-sm'>
              Feedback & Suggestions
            </Link>
          </div>

          {/* Partners */}
          <div className='flex flex-col gap-2'>
            <h4 className='text-white font-semibold mb-2'>Partners</h4>
            <Link to='/referral' className='hover:text-white text-sm'>
              Referral
            </Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className='flex items-center gap-4 mt-8 md:mt-0 md:ml-4'>
          <FaTelegramPlane
            className='text-white hover:text-lime-400 cursor-pointer'
            size={18}
          />
          <FaLinkedinIn
            className='text-white hover:text-lime-400 cursor-pointer'
            size={18}
          />
          <FaMediumM
            className='text-white hover:text-lime-400 cursor-pointer'
            size={18}
          />
          <FaFacebookF
            className='text-white hover:text-lime-400 cursor-pointer'
            size={18}
          />
          <FaInstagram
            className='text-white hover:text-lime-400 cursor-pointer'
            size={18}
          />
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700 my-6' />

      {/* Bottom Copyright */}
      <div className='text-center text-xs text-gray-500'>
        © 2022 - 2025 Bitunix.com. All rights reserved
      </div>

      {/* Floating Support Icon */}
      <div
        onClick={() => setChatOpen(true)}
        className='fixed bottom-20 md:bottom-6 right-6 z-50 animate-pulse hover:animate-none cursor-pointer'
      >
        <div className='bg-lime-400 rounded-full p-3 hover:bg-lime-500 transition-transform transform hover:scale-110'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-black'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M18.364 5.636a9 9 0 11-12.728 0m12.728 0L12 12m6.364-6.364L12 12m0 0l-6.364-6.364'
            />
          </svg>
        </div>
      </div>

      {/* Chatbot Modal */}
      {chatOpen && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-[#1E1E1E] w-full max-w-md mx-auto rounded-xl p-6 relative animate-fadeInUp'>
            <button
              onClick={() => setChatOpen(false)}
              className='absolute top-4 right-4 text-gray-400 hover:text-white transition'
            >
              <img src='/favicon.ico' alt='' />
            </button>
            <h2 className='text-white text-xl font-bold mb-4 text-center'>
              Chat with Bitunix Support
            </h2>
            <p className='text-gray-400 text-center text-sm'>
              Hi 👋 How can we help you today? <br /> (This is a demo chat
              placeholder.)
            </p>
            {/* You can replace this later with real chatbot iframe or embedded system */}
          </div>
        </div>
      )}

      {/* Simple fade-in-up animation */}
      <style
        jsx={`
				@keyframes fadeInUp {
					0% {
						opacity: 0;
						transform: translateY(20px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeInUp {
					animation: fadeInUp 0.5s ease-out;
				}
			`}
      ></style>
    </footer>
  );
};

export default Footer;
