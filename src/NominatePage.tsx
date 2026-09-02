import { Link } from "react-router-dom";
function NominatePage() {

    return (
        <>
            <div className="flex flex-col items-center w-full min-h-screen pt-24 sm:pt-32 justify-center bg-[#0F0E0C] text-white px-4 sm:px-6 lg:px-10 gap-5">
                <h1 className="text-2xl sm:text-3xl text-[#EDAE1D] w-full sm:w-[50%] text-center justify-center font-bold">Nominate your Education Icon Here!</h1>
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg flex flex-col gap-3 text-[#0F0E0C]">
                        <p className="bg-[#0F0E0C] text-[#EDAE1D] p-3 rounded-2xl text-center font-bold">Tier 1</p>
                        <p className="text-lg font-bold">Africa Education Icon Award
                                        Lifetime Achievement Recognition</p>
                        <ul className="list-disc pl-5 text-sm leading-relaxed font-medium">
                            <li>Africa Education Philanthropy Icon</li>
                            <li>Funding, scholarships, institution-building</li>
                            <li>Literary & Curriculum Advocate Icon</li>
                            <li>Books, literacy, education advocacy</li>
                            <li>Africa Technical Educator Icon</li>
                            <li>STEM, ICT, digital skills, TVET</li>
                            <li>Community Education Impact</li>
                            <li>Grassroots learning and youth development</li>
                        </ul>
                        <Link to="/nominate/tier1" className="bg-[#2B2824] text-[#E8C468] text-center rounded-2xl text-sm hover:bg-[#0F0E0C] hover:text-[#EDAE1D] px-2 py-3 items-center justify-center">Nominate</Link>
                    </div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg flex flex-col gap-3 text-[#0F0E0C]">
                        <p className="bg-[#0F0E0C] text-[#EDAE1D] p-3 rounded-2xl text-center font-bold">Tier 2</p>
                        <p className="text-lg font-bold">Influencer Education Impact Recognition</p>
                        <ul className="list-disc pl-5 text-sm leading-relaxed font-medium">
                            <li>Public figures</li>
                            <li>Creators</li>
                            <li>Athletes</li>
                            <li>Musicians</li>
                            <li>Influential personalities</li>
                        </ul>
                        <p className="text-[11px] font-semibold leading-relaxed mt-3">
                            whose verified programmes, campaigns or personal interventions have advanced education.<br />
                            Impact is measured by evidence — not follower count or celebrity status.
                        </p>
                        <Link to="/nominate/tier2" className="bg-[#2B2824] text-[#E8C468] text-center rounded-2xl text-sm hover:bg-[#0F0E0C] hover:text-[#EDAE1D] px-2 py-3 items-center justify-center">Nominate</Link>
                    </div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg flex flex-col gap-3 text-[#0F0E0C]">
                        <p className="bg-[#0F0E0C] text-[#EDAE1D] p-3 rounded-2xl text-center font-bold">Tier 3</p>
                        <p className="text-lg font-bold">Platinum Certificates of Recognition</p>
                        <ul className="list-disc pl-5 text-sm leading-relaxed font-medium">
                            <li>Educational systems</li>
                            <li>Access</li>
                            <li>Quality</li>
                            <li>Innovation</li>
                            <li>Infrastructure</li>
                            <li>Inclusion</li>
                            <li>Continental collaboration</li>
                        </ul>
                        <p className="text-[11px] font-semibold leading-relaxed mt-3">
                            whose verified programmes, campaigns or personal interventions have advanced education.<br />
                            Impact is measured by evidence — not follower count or celebrity status.
                        </p>
                        <Link to="/nominate/tier3" className="bg-[#2B2824] text-[#E8C468] text-center rounded-2xl text-sm hover:bg-[#0F0E0C] hover:text-[#EDAE1D] px-2 py-3 items-center justify-center">Nominate</Link>
                    </div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg flex flex-col gap-3 text-[#0F0E0C]">
                        <p className="bg-[#0F0E0C] text-[#EDAE1D] p-3 rounded-2xl text-center font-bold">Tier 4</p>
                        <p className="text-lg font-bold">Gold-Blue Garnet Recognition</p>
                        <ul className="list-disc pl-5 text-sm leading-relaxed font-medium">
                            <li>Organisations</li>
                            <li>Companies</li>
                            <li>NGOs</li>
                            <li>Governments</li>
                            <li>States</li>
                            <li>education programmes</li>
                            <li>other sector or regional Education Enablers</li>
                        </ul>
                        <p className="text-[11px] font-semibold leading-relaxed mt-3">
                            whose verified interventions are advancing Education for All.
                        </p>
                        <Link to="/nominate/tier4" className="bg-[#2B2824] text-[#E8C468] text-center rounded-2xl text-sm hover:bg-[#0F0E0C] hover:text-[#EDAE1D] px-2 py-3 items-center justify-center">Nominate</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NominatePage