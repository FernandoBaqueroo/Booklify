import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';

const Navbar = ({
                     logo,
                     logoAlt = 'Logo',
                     items,
                     className = '',
                     ease = 'power3.out',
                     baseColor = '#fff',
                     menuColor,
                     buttonBgColor,
                     buttonTextColor
                 }) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 280;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        
        if (isMobile || isDesktop) {
            const contentEl = navEl.querySelector('.card-nav-content');
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = isDesktop ? 90 : 80;
                const padding = 12;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 280;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        const initialHeight = isDesktop ? 90 : 80;
        
        gsap.set(navEl, { height: initialHeight, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = i => el => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[85%] sm:w-[88%] md:w-[90%] max-w-[800px] z-99 top-4 sm:top-6 md:top-8 ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[80px] md:h-[90px] p-0 rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden will-change-[height] backdrop-blur-xl`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[80px] md:h-[90px] flex items-center justify-between px-3 sm:px-4 md:pl-6 z-2">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] sm:gap-[7px] px-2 order-2 md:order-0`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[32px] sm:w-[30px] h-[2.5px] sm:h-[2px] bg-current transition-all duration-300 ease-linear origin-center ${
                                isHamburgerOpen ? 'translate-y-[4.5px] sm:translate-y-[4px] rotate-45' : ''
                            } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[32px] sm:w-[30px] h-[2.5px] sm:h-[2px] bg-current transition-all duration-300 ease-linear origin-center ${
                                isHamburgerOpen ? '-translate-y-[4.5px] sm:-translate-y-[4px] -rotate-45' : ''
                            } group-hover:opacity-75`}
                        />
                    </div>

                    <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-0">
                        <img src={logo} alt={logoAlt} className="h-[100px] md:h-[120px] w-auto brightness-0 invert" />
                    </div>

                    <button
                        type="button"
                        className="card-nav-cta-button hidden md:inline-flex border-0 rounded-lg px-4 lg:px-5 items-center h-[44px] font-medium cursor-pointer transition-colors duration-300 text-sm lg:text-base"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                    >
                        Get Started
                    </button>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[80px] md:top-[90px] bottom-0 p-3 sm:p-2 flex flex-col items-stretch gap-3 sm:gap-2 justify-start z-1 ${
                        isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                    } md:flex-row md:items-end md:gap-3 lg:gap-4`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 sm:gap-2 p-4 sm:p-[12px_16px] rounded-lg md:rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[70px] sm:min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label font-medium sm:font-normal tracking-[-0.5px] text-[19px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
                                {item.label}
                            </div>
                            <div className="nav-card-links mt-auto flex flex-col gap-1 sm:gap-[2px]">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link inline-flex items-center gap-2 sm:gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[16px] sm:text-[15px] md:text-[16px]"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon shrink-0 text-lg sm:text-base" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
