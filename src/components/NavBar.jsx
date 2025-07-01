import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiP2pFill } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import { TbTargetArrow } from 'react-icons/tb';
import {
	MdOutlineCurrencyExchange,
	MdScreenSearchDesktop,
} from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice'; // ✅ Update path as needed

import UserDropdown from './navbar/UserDropdown';

import QrDropdown from './navbar/QrDropdown';
import toast from 'react-hot-toast';
import UserMobileDrawer from './navbar/UserMobileDrawer';
import MobileNavDrawer from './navbar/MobileNavDrawer';
import SearchWrapper from './navbar/SearchWrapper';
import AssetsDropdown from './navbar/AssetsDropdown';
import NotificationDropdown from './navbar/NotificationDropdown';
import MobileUserTrigger from './navbar/MobileUserTrigger';
import { fetchLoggedInUser } from '../redux/user/userThunk';
import useFetchLoggedInUser from '../hooks/useFetchedLoggedInUser';
import LanguageCurrencyTrigger from './navbar/LanguageCurrencyTrigger';

const Navbar = () => {
	const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
  const uid = fetchedUser?.message?.userDetails.uid ?? ''
  const email = fetchedUser?.message?.userDetails.email ?? ''
	const [showUID, setShowUID] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(uid);
		toast.success('UID copied!');
	};
	const [notifications] = useState([
		{
			id: 1,
			type: 'New Listings',
			title: '🔥 Civic (CVC) Gets Listed on Bitunix!',
			content:
				'The CVC/USDT trading pair will be available on both the spot and perpetual futures markets…',
			date: '2025-05-16 10:32:30',
		},
		{
			id: 2,
			type: 'Latest',
			title: 'Notice on Adjustment to Risk Limits of BABY/USDT Perpetual…',
			content:
				'Bitunix will update the risk limits for BABY/USDT perpetual futures trading pair at 10:00 on May 16, 2025 (UTC). This applies to all open and new positions…',
			date: '2025-05-16 08:58:55',
		},
		{
			id: 3,
			type: 'New Listings',
			title: '🚀 NEXPACE (NXPC) Gets Listed on Bitunix!',
			content:
				'The NXPC/USDT trading pair will be available on both the spot and perpetual futures markets…',
			date: '2025-05-15 08:54:55',
		},
		{
			id: 4,
			type: 'New Listings',
			title: '📢 Privasea AI (PRAI) Gets Listed on Bitunix!',
			content:
				'Privasea AI (PRAI) is getting listed with the PRAI/USDT trading pair on the spot market…',
			date: '2025-05-15 08:37:52',
		},
		{
			id: 5,
			type: 'Price Alert',
			title: '🔔 BTC crossed $70,000!',
			content: 'Bitcoin price surged past $70,000. Check your portfolio now!',
			date: '2025-05-15 07:25:00',
		},
	]);

	const dispatch = useDispatch();
	const user = localStorage.getItem('accessToken');
	const isAuthenticated = !!user;
	// const isAuthenticated = true;
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout()); // 🔁 Reset state and remove token
		navigate('/login'); // 🔁 Redirect to login or landing
	};

	// console.log(fetchedUser);

	const [isOpen, setIsOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);
	// const [isAuthenticated] = useState(true); // toggle this for testing
	const [showBalance, setShowBalance] = useState(true);
	const dropdownRef = useRef(null);
	const [dropdowns, setDropdowns] = useState({
		notifications: false,
		user: false,
		assets: false,
	});
	const [unread, setUnread] = useState(notifications.length);
	const [selectedCurrency, setSelectedCurrency] = useState('USDT');

	const markAllAsRead = () => {
		setUnread(0);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdowns({ notifications: false, user: false, assets: false });
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const [activeTab, setActiveTab] = useState('All');

	const filteredNotifications =
		activeTab === 'All'
			? notifications
			: notifications.filter((n) => n.type === activeTab);

	const navLinks = [
		{
			name: 'Buy Crypto',
			dropdown: true,
			dropdownItems: [
				{
					text: 'P2P Trading',
					path: '/p2p/p2p-trading',
					icon: <RiP2pFill size={20} />,
				},
				{
					text: 'Third Party',
					path: '/trade/third-party',
					icon: <BsWallet size={20} />,
				},
			],
		},
		{
			name: 'Markets',
			dropdown: true,
			dropdownItems: [
				{
					text: 'Opportunities',
					path: '/markets/opportunities',
					icon: <TbTargetArrow size={20} />,
				},
				{
					text: 'Marketplace',
					path: '/markets',
					icon: <MdScreenSearchDesktop size={20} />,
				},
			],
		},
		{ name: 'Futures', path: '/contract-trade/BTC-USDT', dropdown: false },
		{
			name: 'Convert',
			dropdown: true,
			dropdownItems: [
				// { text: 'Spot', path: '/spot', icon: <GiTargeting size={20} /> },
				{
					text: 'Convert',
					path: '/flash-exchange',
					icon: <MdOutlineCurrencyExchange size={20} />,
				},
			],
		},
		{
			name: 'Earn',
			dropdown: true,
			dropdownItems: [
				{
					text: 'Flexible/Fixed Term',
					path: '/earn/financial-management',
					icon: <MdOutlineCurrencyExchange size={20} />,
				},
			],
			badge: 'NEW',
		},
		{ name: 'Copy Trading', path: '/copy-trading/square' },
		{ name: 'Campaign Center', path: '/activity/act-center', badge: 'NEW' },
		{ name: 'Task Center', path: '/activity/task-center', badge: 'NEW' },
		{ name: 'Referral', path: '/referral' },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 flex items-center justify-between border-b border-white/10'>
			{/* Left */}
			<div className='flex items-center gap-4'>
				<Link
					to='/'
					className='text-lime-400 font-bold text-xl italic flex items-center gap-1'>
					<div className='bg-lime-400 rounded-full p-1'></div> Bitunix
				</Link>
				<div className='hidden lg:flex items-center gap-3'>
					{navLinks.map((link, index) => (
						<div
							className='dropdown dropdown-hover'
							key={index}>
							<div className='relative'>
								{link.dropdown ? (
									<button className='btn btn-ghost btn-sm cursor-pointer hover:bg-transparent text-[11px] rounded-btn flex items-center gap-1 px-2'>
										{link.name}
										<ChevronDown size={16} />
										{link.badge && (
											<span className='bg-lime-400 absolute -top-1 -right-3 text-black text-[6px] px-1 py-0.5 rounded'>
												{link.badge}
											</span>
										)}
									</button>
								) : (
									<Link
										to={link.path}
										className='btn btn-ghost btn-xs cursor-pointer hover:bg-transparent px-2 rounded-btn relative flex items-center gap-1 text-[11px]'>
										{link.name}
										{link.badge && (
											<span className='bg-lime-400 absolute -top-1 -right-3 text-black text-[6px] px-1 py-0.5 rounded'>
												{link.badge}
											</span>
										)}
									</Link>
								)}
							</div>
							{link.dropdown && (
								<ul className='dropdown-content gap-5 menu px-4 py-6 rounded-lg shadow bg-[#0D0D0D] text-white w-52'>
									{link.dropdownItems.map((item) => (
										<Link
											key={item.path}
											to={item.path}
											className='flex gap-3 items-center cursor-pointer'>
											<span className='text-lime-400'>{item.icon}</span>
											<span>{item.text}</span>
										</Link>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Right */}
			<div className='flex items-center gap-2'>
				{isAuthenticated ? (
					<>
						<SearchWrapper />
						<AssetsDropdown
							showBalance={showBalance}
							setShowBalance={setShowBalance}
							selectedCurrency={selectedCurrency}
							setSelectedCurrency={setSelectedCurrency}
						/>

						<UserDropdown
							email={email}
							uid={uid}
							showUID={showUID}
							setShowUID={setShowUID}
							handleCopy={handleCopy}
							handleLogout={handleLogout}
						/>

						<QrDropdown />

						<NotificationDropdown
							unread={unread}
							dropdowns={dropdowns}
							setDropdowns={setDropdowns}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							filteredNotifications={filteredNotifications}
							markAllAsRead={markAllAsRead}
						/>

						<LanguageCurrencyTrigger />

						<MobileUserTrigger setIsUserOpen={setIsUserOpen} />
					</>
				) : (
					<>
						<Link
							to='/login'
							className='hidden lg:block'>
							Log in
						</Link>
						<Link
							to='/register'
							className='px-6 py-2 rounded-md hover:bg-lime-300 transition-colors bg-lime-400 text-black'>
							Sign Up
						</Link>
					</>
				)}

				<button
					className='md:hidden'
					onClick={() => setIsOpen(true)}>
					<Menu size={24} />
				</button>
			</div>

			<UserMobileDrawer
				isUserOpen={isUserOpen}
				setIsUserOpen={setIsUserOpen}
				isAuthenticated={isAuthenticated}
				uid={uid}
				showUID={showUID}
				email={email}
				setShowUID={setShowUID}
				showBalance={showBalance}
				setShowBalance={setShowBalance}
				selectedCurrency={selectedCurrency}
				setSelectedCurrency={setSelectedCurrency}
				handleCopy={handleCopy}
				handleLogout={handleLogout}
			/>

			<MobileNavDrawer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				navLinks={navLinks}
			/>
		</nav>
	);
};

export default Navbar;
