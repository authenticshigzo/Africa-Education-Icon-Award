import { Link } from "react-router-dom";
import twinklestar from '../assets/images/twinkle_star.png'
import backgroundImage from '../assets/images/nesa-stage-backdrop.jpg'
import arrow from '../assets/images/arrow.png'

function Body() {
    const blocker = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        alert("This link is currently blocked.");
    }
    return (
        <>
            <div className="relative h-screen overflow-hidden">
                <div className="absolute top-28 left-7 z-10 flex h-full w-[calc(100%-3.5rem)] flex-col items-start gap-4 text-left md:top-28 md:left-10 md:w-[min(calc(100%-5rem),700px)] lg:left-60 lg:top-33 lg:w-[60%]">
                    <p className="flex h-auto min-h-12 w-full max-w-[600px] items-center justify-center gap-2 rounded-2xl border-y border-x border-[#EDAE1D] bg-[#3B301C] px-2 py-2 text-center text-sm font-semibold text-[#EDAE1D]">
                        <img src={twinklestar} alt="Twinkle Star" className="w-6 h-6" />
                        NOMINATIONS OPEN 6 SEPTEMBER 2026 · NESA-AFRICA 2026

                    </p>
                    <p className="w-full max-w-[700px] px-0 py-2 font-['Fraunces']">
                        <span className="text-4xl font-bold text-[#E8C468] sm:text-5xl">NESA-</span><span className="text-4xl font-bold text-white sm:text-5xl">Africa</span><br />
                        <span className="font-base text-yellow-400 font-bold text-sm"> &#34;The African Blue&#8211;Garnet Awards for Education&#34;</span><br />
                        <span className="text-5xl font-bold text-white sm:text-6xl">Africa's Education Enablers</span><br />
                        <span className="text-5xl font-bold text-[#E8C468] sm:text-6xl">Deserve to Be Recognised.</span><br />
                        <span className="text-white font-['arial']">
                            Celebrating the people and organisations helping advance Education for All across Africa.
                        </span>
                    </p>
                    <div className="z-10 flex w-full max-w-[700px] flex-col items-start justify-center gap-4 sm:flex-row sm:items-center lg:justify-start">
                        <Link to="/nominate" className="flex min-h-16 w-full max-w-[360px] items-center justify-center gap-2 rounded bg-[#EDAE1D] px-4 py-3 text-center text-black hover:scale-102">Nominate an Education Enabler</Link>
                        <Link to="/about" onClick={blocker} className="flex min-h-16 w-full max-w-[325px] items-center justify-center gap-2 rounded border-y border-x border-white bg-[#0F0E0C] px-4 py-3 text-center text-white hover:scale-102">Explore Existing Nominees <img src={arrow} alt="Arrow" className="w-5 h-5" /></Link>
                    </div>
                </div>
                <img src={backgroundImage} alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover opacity-30" />

            </div>

        </>
    )
}

export default Body

