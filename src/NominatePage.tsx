function NominatePage() {
    
    return (
        <>
            <div className="flex flex-col items-center w-full min-h-screen pt-24 sm:pt-32 justify-center bg-[#0F0E0C] text-white px-4 sm:px-6 lg:px-10 gap-5">
                <h1 className="text-2xl sm:text-3xl text-[#EDAE1D] w-full sm:w-[50%] text-center justify-center font-bold">Nominate your Education Icon Here!</h1>
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg">Tier 1</div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg">Tier 2</div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg">Tier 3</div>
                    <div className="bg-[#EDAE1D] min-h-[300px] sm:h-[500px] p-4 rounded-lg">Tier 4</div>
                </div>
            </div>
        </>
    )
}

export default NominatePage