import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import NavbarAboutDropDown from './NavbarAboutDropDown'
import NavbarIconDropDown from './NavbarIconDropDown'
import NavbarRecognitionDropDown from './NavbarRecognitionDropDown'
import NavbarNomineesDropDown from './NavbarNomineesDropDown'
import NavbarEducationImpactDropDown from './NavbarEducationImpactDropDown'
import NavbarParticipateDropDown from './NavbarParticipateDropDown'
import nesa from '../assets/images/nesa-logo.png'
import arrowup from '../assets/images/arrow-up.png'
import arrowdown from '../assets/images/arrow-down.png'
import search from '../assets/images/search_icon.png'
import globe from '../assets/images/globe_icon.png'
import profile from '../assets/images/profile_icon.png'
import close from '../assets/images/close-icon.png'

const messages = [
    'Explore Education Enablers, Across Africa',
    'NESA-Africa 2026 Recognition Gala · 13 December 2026 · Lagos, Nigeria',
]

function Navbar() {
    const blocker = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alert("This Page is currently not available!");
  }
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [messageIndex, setMessageIndex] = useState(0)
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true)
    const [memberName, setMemberName] = useState("")
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
        const savedAccount = localStorage.getItem("demoAccount")
        if (savedAccount) {
            const account = JSON.parse(savedAccount) as { firstName?: string; lastName?: string }
            setMemberName(`${account.firstName || ""} ${account.lastName || ""}`.trim())
        }

        const handleMemberSignedIn = (event: Event) => {
            const customEvent = event as CustomEvent<{ name: string }>
            setMemberName(customEvent.detail.name)
        }
        window.addEventListener("member-signed-in", handleMemberSignedIn)
        const intervalId = window.setInterval(() => {
            setMessageIndex((currentIndex) => (currentIndex + 1) % messages.length)
        }, 5000)

        return () => {
            window.clearInterval(intervalId)
            window.removeEventListener("member-signed-in", handleMemberSignedIn)
        }
    }, [])

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">

                {isAnnouncementVisible && (
                    <div className="bg-[#EDAE1D] px-12 h-9 flex items-center justify-center whitespace-nowrap">
                        <p className="message text-[#0F0E0C] text-sm font-semibold">
                            <a className="text-[#0F0E0C] hover:text-[#0F0E0C] hover:underline hover:decoration-1 hover:underline-offset-4" href={messageIndex === 0 ? 'https://nesa.africa/education-enablers' : 'https://nesa.africa/events#gala-2026'}>
                                {messages[messageIndex]}
                            </a>
                        </p>
                        <img src={close} alt="Close" className="h-6 w-6 ml-3 p-1 cursor-pointer hover:bg-[#cba006] rounded" onClick={() => setIsAnnouncementVisible(false)} />
                    </div>
                )}

                <div className=" bg-[#0F0E0C] px-12 h-9 whitespace-nowrap flex items-center justify-center transition-all duration-500ms" >
                    <Link to="/nrc" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>NRC</Link>
                    <Link to="/judges" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Judges</Link>
                    <Link to="/buy_award_gala_ticket" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Buy Award Gala Ticket</Link>
                    <Link to="/merchandise" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Merchandise</Link>
                    <Link to="/webinar" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Webinar</Link>
                    <Link to="/join_podcast" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Join Podcast</Link>
                    <Link to="/watch_award_tv_show" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Watch Award TV Show</Link>
                    <Link to="/membership" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center">Join Our Team</Link>
                    <Link to="/meet-our-global-volunteer-team" className="text-white text-xs hover:text-[#EDAE1D] px-2 py-3 items-center justify-center" onClick={blocker}>Meet Our Global Volunteer Team</Link>
                </div>
                <div className="bg-[#0F0E0C] border-t border-b border-gray-700 px-20 py-7 h-12 flex items-center justify-center gap-5 px-20">
                    <Link to="/" className="flex gap-2 items-center justify-center">
                        <img src={nesa} alt="NESA Logo" className="h-10 w-10 object-contain" />
                        <p className="text-[#EDAE1D] text-2xl font-bold whitespace-nowrap">NESA-Africa</p>

                    </Link>
                    <div className="text-white text-sm font-semibold whitespace-nowrap px-2 flex items-center justify-center gap-2">
                        <div className="relative" onMouseEnter={() => openMenu('about')} onMouseLeave={closeMenu}>
                            <Link to="/about" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>About<img src={activeMenu === 'about' ? arrowup : arrowdown} alt={activeMenu === 'about' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarAboutDropDown isOpen={activeMenu === 'about'} onMouseEnter={() => openMenu('about')} />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('icon')} onMouseLeave={closeMenu}>
                            <Link to="/icon" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Icon<img src={activeMenu === 'icon' ? arrowup : arrowdown} alt={activeMenu === 'icon' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarIconDropDown isOpen={activeMenu === 'icon'} onMouseEnter={() => openMenu('icon')} />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('recognition')} onMouseLeave={closeMenu}>
                            <Link to="/recognition" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Recognition<img src={activeMenu === 'recognition' ? arrowup : arrowdown} alt={activeMenu === 'recognition' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarRecognitionDropDown isOpen={activeMenu === 'recognition'} onMouseEnter={() => openMenu('recognition')} />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('nominees')} onMouseLeave={closeMenu}>
                            <Link to="/nominees" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Nominees<img src={activeMenu === 'nominees' ? arrowup : arrowdown} alt={activeMenu === 'nominees' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarNomineesDropDown isOpen={activeMenu === 'nominees'} onMouseEnter={() => openMenu('nominees')} />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('education-impact')} onMouseLeave={closeMenu}>
                            <Link to="/education-impact" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Education Impact<img src={activeMenu === 'education-impact' ? arrowup : arrowdown} alt={activeMenu === 'education-impact' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarEducationImpactDropDown isOpen={activeMenu === 'education-impact'} onMouseEnter={() => openMenu('education-impact')} />
                        </div>
                        <div className="relative" onMouseEnter={() => openMenu('participate')} onMouseLeave={closeMenu}>
                            <Link to="/participate" className=" hover:bg-[#3B301C] flex items-center justify-center gap-2 hover:text-[#EDAE1D] px-4 py-3 rounded" onClick={blocker}>Participate<img src={activeMenu === 'participate' ? arrowup : arrowdown} alt={activeMenu === 'participate' ? "Arrow Up" : "Arrow Down"} className="h-3 w-3 object-contain" /></Link>
                            <NavbarParticipateDropDown isOpen={activeMenu === 'participate'} onMouseEnter={() => openMenu('participate')} />
                        </div>
                    </div>
                    <div className="flex gap-4 whitespace-nowrap items-center justify-center">
                        <img src={search} alt="Search" className="h-8 w-8 px-2 py2 object-contain cursor-pointer rounded-sm hover:bg-[#3B301C]" />
                        <Link to="/nominate" className="bg-[#EDAE1D] text-black flex items-center justify-center gap-2 hover:scale-105 px-4 py-3 rounded">Nominate Now</Link>
                        <Link to="/membership" className="bg-[#0F0E0C] flex border border-x border-y border-[#EDAE1D] text-[#EDAE1D] font-normal items-center justify-center gap-2 hover:scale-105 px-4 py-3 rounded">Become A Member</Link>
                        <div className="text-white flex items-center justify-center gap-2 hover:bg-[#3B301C] px-6 py-3 rounded-3">
                            <img src={globe} alt="Globe" className="h-5 w-5 object-contain cursor-pointer items-center justify-center gap-2" />
                            <p className="text-xs">GB</p>
                            <p>ENG</p>
                        </div>
                        <img src={profile} alt="Profile" className="h-5 w-5 object-contain cursor-pointer" />
                        <Link to="/membership" title={memberName || "Sign In"} className="max-w-20 truncate text-white hover:text-[#EDAE1D] cursor-pointer">{memberName.split(" ")[0] || "Sign In"}</Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Navbar