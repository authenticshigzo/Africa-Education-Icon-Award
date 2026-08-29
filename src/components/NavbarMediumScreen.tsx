import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import NavbarAboutDropDown from './NavbarAboutDropDown'
import NavbarIconDropDown from './NavbarIconDropDown'
import NavbarRecognitionDropDown from './NavbarRecognitionDropDown'
import NavbarNomineesDropDown from './NavbarNomineesDropDown'
import NavbarEducationImpactDropDown from './NavbarEducationImpactDropDown'
import NavbarParticipateDropDown from './NavbarParticipateDropDown'
import nesa from '../assets/images/nesa-logo.png'
import arrow from '../assets/images/arrow.png'
import arrowup from '../assets/images/arrow-up.png'
import arrowdown from '../assets/images/arrow-down.png'
import search from '../assets/images/search_icon.png'
import globe from '../assets/images/globe_icon.png'
import profile from '../assets/images/profile_icon.png'
import menu from '../assets/images/menu-icon.png'
import close from '../assets/images/close-icon.png'

const messages = [
    'Explore Education Enablers, Across Africa',
    'NESA-Africa 2026 Recognition Gala · 13 December 2026 · Lagos, Nigeria',
]

function NavbarMediumScreen() {
    const blocker = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        alert("This Page is currently not available!");
    }
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [messageIndex, setMessageIndex] = useState(0)
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const closeMenuTimeout = useRef<number | undefined>(undefined)

    const openMenu = (menu: string) => {
        if (closeMenuTimeout.current !== undefined) {
            window.clearTimeout(closeMenuTimeout.current)
        }
        setActiveMenu(menu)
    }

    const closeMenu = () => {
        closeMenuTimeout.current = window.setTimeout(() => setActiveMenu(null), 700)
    }

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setMessageIndex((currentIndex) => (currentIndex + 1) % messages.length)
        }, 5000)

        return () => window.clearInterval(intervalId)
    }, [])

    const openSideMenu = () => {
        setIsSideMenuOpen(true)
    }

    const closeSideMenu = () => {
        setIsSideMenuOpen(false)
        setActiveMenu(null)
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-40 flex items-center justify-center">
                {isAnnouncementVisible && (
                    <div className="bg-[#EDAE1D] md:w-full px-12 h-9 flex items-center justify-center whitespace-nowrap">
                        <p className="message sm:text-[#0F0E0C] font-semibold">
                            <a className="text-[#0F0E0C] hover:text-[#0F0E0C] hover:underline hover:decoration-1 hover:underline-offset-4" href={messageIndex === 0 ? 'https://nesa.africa/education-enablers' : 'https://nesa.africa/events#gala-2026'}>
                                {messages[messageIndex]}
                            </a>
                            <img src={close} alt="Close" className="h-6 w-6 ml-3 p-1 cursor-pointer hover:bg-[#cba006] rounded" onClick={() => setIsAnnouncementVisible(false)} />
                        </p>
                    </div>
                )}
            </div>

            <div className="fixed top-9 left-0 w-full h-16 px-4 bg-[#0F0E0C] z-50 flex items-center justify-between">
                <Link to="/" className="flex gap-2 items-center justify-center">
                    <img src={nesa} alt="NESA Logo" className="h-10 w-10 object-contain" />
                    <p className="sr-only">NESA-Africa</p>
                </Link>
                <div className="flex items-center justify-center gap-2">
                    <Link to="/membership" className=" bg-[#EDAE1D] text-black flex items-center justify-center gap-2 hover:scale-105 px-4 py-3 rounded">Become A Member Now!</Link>
                    <img src={menu} alt="Menu" className="h-8 w-8 px-2 py2 object-contain cursor-pointer rounded-sm hover:bg-[#3B301C]" onClick={openSideMenu} />
                </div>
            </div>

            {isSideMenuOpen && <div className="fixed top-0 right-0 h-screen w-[calc(100%-2rem)] max-w-[553px] overflow-y-auto bg-[#0F0E0C] px-4 py-4 whitespace-normal flex flex-col border-l border-[#EDAE1D] text-white shadow-2xl items-center justify-start z-[70]">
                <div className="bg-[#0F0E0C] w-full px-4 py-4 min-h-16 flex border-b border-[#EDAE1D] items-center justify-between gap-2">
                    <p className="text-[#E8C468] font-bold text-lg font-['Fraunces']">NESA-Africa 2026</p>
                    <img src={close} alt="Menu" className="hover:bg-[#E8C468] h-8 w-8 px-2 py2 object-contain cursor-pointer rounded-sm" onClick={closeSideMenu} />
                </div>

                <div className="bg-[#0F0E0C] w-full px-4 py-6 flex flex-col border-b border-[#EDAE1D] items-center justify-center">
                    <img src={search} alt="Search" className="bg-[#0F0E0C] h-8 w-8 px-2 py2 object-contain cursor-pointer rounded-sm hover:bg-[#3B301C]" />
                    <div className="w-full flex flex-col items-stretch justify-center gap-3 z-10">
                        <Link to="/about" onClick={blocker} className="bg-[#EDAE1D] text-black flex items-center justify-center gap-2 px-4 py-3 rounded">Nominate an Education Enabler</Link>
                        <Link to="/about" onClick={blocker} className="bg-[#0F0E0C] text-white border-y border-x border-white flex items-center justify-center gap-2 px-4 py-3 rounded">Explore Existing Nominees <img src={arrow} alt="Arrow" className="w-5 h-5" /></Link>
                    </div>
                </div>

                <div className="bg-[#0F0E0C] w-full px-0 py-2 flex flex-col items-stretch justify-center">
                    <div className="bg-[#0F0E0C] w-full px-0 py-2 flex flex-col items-stretch justify-center">
                        <div className="relative" onMouseEnter={() => openMenu('about')} onMouseLeave={closeMenu}>
                            <Link to="/about" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>About<img src={activeMenu === 'about' ? arrowup : arrowdown} alt={activeMenu === 'about' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarAboutDropDown isOpen={activeMenu === 'about'} onMouseEnter={() => openMenu('about')} isMobile />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('icon')} onMouseLeave={closeMenu}>
                            <Link to="/icon" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Icon<img src={activeMenu === 'icon' ? arrowup : arrowdown} alt={activeMenu === 'icon' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarIconDropDown isOpen={activeMenu === 'icon'} onMouseEnter={() => openMenu('icon')} isMobile />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('recognition')} onMouseLeave={closeMenu}>
                            <Link to="/recognition" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Recognition<img src={activeMenu === 'recognition' ? arrowup : arrowdown} alt={activeMenu === 'recognition' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarRecognitionDropDown isOpen={activeMenu === 'recognition'} onMouseEnter={() => openMenu('recognition')} isMobile />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('nominees')} onMouseLeave={closeMenu}>
                            <Link to="/nominees" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Nominees<img src={activeMenu === 'nominees' ? arrowup : arrowdown} alt={activeMenu === 'nominees' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarNomineesDropDown isOpen={activeMenu === 'nominees'} onMouseEnter={() => openMenu('nominees')} isMobile />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('education-impact')} onMouseLeave={closeMenu}>
                            <Link to="/education-impact" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Education Impact<img src={activeMenu === 'education-impact' ? arrowup : arrowdown} alt={activeMenu === 'education-impact' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarEducationImpactDropDown isOpen={activeMenu === 'education-impact'} onMouseEnter={() => openMenu('education-impact')} isMobile />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('participate')} onMouseLeave={closeMenu}>
                            <Link to="/participate" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Participate<img src={activeMenu === 'participate' ? arrowup : arrowdown} alt={activeMenu === 'participate' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarParticipateDropDown isOpen={activeMenu === 'participate'} onMouseEnter={() => openMenu('participate')} isMobile />
                        </div>
                    </div>

                    <div className="bg-[#0F0E0C] w-full px-0 py-4 flex flex-col items-stretch justify-center" >
                        <p className="text-[#EDAE1D] font-bold text-lg font-['Arial'] w-full py-2 px-2">QUICK LINKS</p>
                        <Link to="/nrc" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>NRC</Link>
                        <Link to="/judges" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Judges</Link>
                        <Link to="/buy_award_gala_ticket" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Buy Award Gala Ticket</Link>
                        <Link to="/merchandise" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Merchandise</Link>
                        <Link to="/webinar" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Webinar</Link>
                        <Link to="/join_podcast" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Join Podcast</Link>
                        <Link to="/watch_award_tv_show" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Watch Award TV Show</Link>
                        <Link to="/membership" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Join Our Team</Link>
                        <Link to="/meet-our-global-volunteer-team" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Meet Our Global Volunteer Team</Link>
                    </div>

                    <div className="w-full flex flex-col gap-4 items-center justify-center py-4">
                        <img src={globe} alt="Globe" className=" h-5 sm:w-full object-contain cursor-pointer hover:bg-[#3B301C] px-6 py-3 rounded-3 items-center justify-center gap-2" />
                        <img src={profile} alt="Profile" className="h-5 w-5 object-contain cursor-pointer" />
                        <Link to="/membership" className="text-white hover:text-[#EDAE1D] cursor-pointer">Sign In</Link>
                    </div>

                </div>
            </div>}
        </>
    );
}

export default NavbarMediumScreen