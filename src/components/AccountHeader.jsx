import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const tabs = [
	{ name: 'Security', path: 'security' },
	{ name: 'Identity Verification', path: 'identity-verification' },
	{ name: 'Settings', path: 'settings' },
];

const AccountHeader = () => {
	const { pathname } = useLocation();
	const scrollRef = useRef(null);
	const tabRefs = useRef({});

	const scroll = (direction) => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;
		const scrollAmount = 150;
		scrollContainer.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		// Snap active tab into view
		const activeTab = tabs.find(({ path }) => pathname === `/account/${path}`);
		if (activeTab && tabRefs.current[activeTab.path]) {
			tabRefs.current[activeTab.path].scrollIntoView({
				behavior: 'smooth',
				inline: 'start',
			});
		}
	}, [pathname]);

	return (
		<>
			{/* Mobile Scrollable Tabs */}
			<div className='block lg:hidden mt-4.5'>
				<div className='flex items-center gap-2 mb-6'>
					<button
						onClick={() => scroll('left')}
						className='p-1 bg-[#1A1A1A] border border-[#333] rounded-full text-white'>
						<ChevronLeft size={20} />
					</button>

					<div
						ref={scrollRef}
						className='flex whitespace-nowrap gap-2 overflow-x-auto hide-scrollbar scroll-smooth'>
						{tabs.map(({ name, path }) => {
							const isActive = pathname === `/account/${path}`;
							return (
								<NavLink
									to={`/account/${path}`}
									key={path}
									ref={(el) => (tabRefs.current[path] = el)}
									className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap flex items-center ${
										isActive
											? 'bg-lime-400 text-black border-lime-400'
											: 'bg-[#1A1A1A] text-white border-[#333]'
									}`}>
									{name}
								</NavLink>
							);
						})}
					</div>

					<button
						onClick={() => scroll('right')}
						className='p-1 bg-[#1A1A1A] border border-[#333] rounded-full text-white'>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>

			{/* Desktop Sidebar Tabs */}
			<aside className='hidden lg:flex flex-col w-60 shrink-0 pr-6 border-r border-[#333] pt-4'>
				{tabs.map(({ name, path }) => {
					const isActive = pathname === `/account/${path}`;
					return (
						<NavLink
							to={`/account/${path}`}
							key={path}
							className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md mb-1 ${
								isActive
									? 'bg-lime-400 text-black font-semibold'
									: 'text-white hover:bg-[#222]'
							}`}>
							{name}
						</NavLink>
					);
				})}
			</aside>
		</>
	);
};

export default AccountHeader;
