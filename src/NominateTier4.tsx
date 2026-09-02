import { useEffect, useState } from "react"
import type { SubmitEvent } from "react"

type Tier = "tier1" | "tier2" | "tier3" | "tier4"
type Status = "idle" | "loading" | "success" | "declined"

type MemberAccount = {
    firstName: string
    lastName: string
    email: string
    password: string
    membership: string
}

type Nomination = {
    nomineeFirstName: string
    nomineeLastName: string
    nomineeEmail: string
    tier: Tier
    category: string
    nominerName: string
    nominerEmail: string
    nominerPhoneNumber: string
}

const categories: Record<Tier, string[]> = {
    tier1: [
        "Africa Education Philanthropy Icon",
        "Literary & Curriculum Advocate Icon",
        "Africa Technical Educator Icon",
        "Community Education Impact",
    ],
    tier2: ["Public figures", "Creators", "Athletes", "Musicians"],
    tier3: [
        "Platinum Certificates of Recognition",
        "Education systems access and quality",
        "Education innovation and infrastructure",
        "Inclusion and continental collaboration",
    ],
    tier4: [
        "Organisations",
        "Companies",
        "NGOs",
        "Governments and states",
        "Education programmes",
        "Other education enablers",
    ],
}

const tierLabels: Record<Tier, string> = {
    tier1: "Tier 1 - Lifetime Achievement Recognition",
    tier2: "Tier 2 - Influencer Education Impact Recognition",
    tier3: "Tier 3 - Platinum Certificates of Recognition",
    tier4: "Tier 4 - Gold-Blue Garnet Recognition",
}

function getSavedMemberAccount() {
    const savedAccount = localStorage.getItem("demoAccount")
    return savedAccount ? JSON.parse(savedAccount) as Partial<MemberAccount> : null
}

function NominateTier4() {
    const savedAccount = getSavedMemberAccount()
    const savedMemberName = `${savedAccount?.firstName || ""} ${savedAccount?.lastName || ""}`.trim() || "Member"
    const hasSavedMembership = Boolean(savedAccount?.email && savedAccount.password && savedAccount.membership)
    const [memberEmail, setMemberEmail] = useState(savedAccount?.email || "")
    const [memberPassword, setMemberPassword] = useState("")
    const [isMember, setIsMember] = useState(hasSavedMembership)
    const [nomineeFirstName, setNomineeFirstName] = useState("")
    const [nomineeLastName, setNomineeLastName] = useState("")
    const [nomineeEmail, setNomineeEmail] = useState("")
    const [tier, setTier] = useState<Tier>("tier1")
    const [category, setCategory] = useState("")
    const [nominerPhoneNumber, setNominerPhoneNumber] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<Status>("idle")
    const [statusMessage, setStatusMessage] = useState("")
    const [memberName, setMemberName] = useState(hasSavedMembership ? savedMemberName : "")

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    function handleMemberSignIn(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setMessage("")
        setStatus("loading")
        setStatusMessage("Loading...")

        const savedAccount = localStorage.getItem("demoAccount")
        const account = savedAccount ? JSON.parse(savedAccount) as Partial<MemberAccount> : null

        window.setTimeout(() => {
            if (account?.email !== memberEmail || account.password !== memberPassword || !account.membership) {
                setStatus("declined")
                setStatusMessage("Sign in declined. Please check your membership details.")
                return
            }

            const signedInName = `${account.firstName || ""} ${account.lastName || ""}`.trim() || "Member"
            setIsMember(true)
            setMemberName(signedInName)
            setStatus("success")
            setStatusMessage(`You have successfully signed in, ${signedInName}.`)
            window.dispatchEvent(new CustomEvent("member-signed-in", { detail: { name: signedInName } }))
        }, 700)
    }

    function handleTierChange(value: Tier) {
        setTier(value)
        setCategory("")
    }

    function handleNominationSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setMessage("")

        if (!nomineeFirstName || !nomineeLastName || !nomineeEmail || !category || !nominerPhoneNumber) {
            setError("Please complete every required nomination field.")
            return
        }

        setStatus("loading")
        setStatusMessage("Loading...")

        const savedAccount = JSON.parse(localStorage.getItem("demoAccount") || "null") as MemberAccount | null
        const nomination: Nomination = {
            nomineeFirstName,
            nomineeLastName,
            nomineeEmail,
            tier,
            category,
            nominerName: `${savedAccount?.firstName || ""} ${savedAccount?.lastName || ""}`.trim(),
            nominerEmail: memberEmail,
            nominerPhoneNumber,
        }

        window.setTimeout(() => {
            const nominations = JSON.parse(localStorage.getItem("nominations") || "[]") as Nomination[]
            localStorage.setItem("nominations", JSON.stringify([...nominations, nomination]))
            setStatus("success")
            setStatusMessage("You have successfully submitted the nomination.")
            setNomineeFirstName("")
            setNomineeLastName("")
            setNomineeEmail("")
            setCategory("")
            setNominerPhoneNumber("")
        }, 700)
    }

    const inputClass = "border border-white rounded-lg p-3 bg-[#797e86] text-white placeholder:text-gray-200"

    return (
        <main className="flex flex-col items-center w-full min-h-screen mt-[120px] pt-10 sm:mt-[125px] sm:pt-12 pb-12 px-4 sm:px-6 bg-[#0F0E0C] text-white">
            <h1 className="text-2xl sm:text-3xl text-[#EDAE1D] max-w-3xl text-center font-bold">Nominate an Africa Education Icon</h1>
            <p className="mt-3 text-center max-w-2xl text-gray-300">{tierLabels.tier1}. Members can nominate a person or organisation in any recognition tier.</p>
            {isMember && <p className="mt-4 text-[#EDAE1D] font-semibold">Signed in as {memberName}</p>}

            {!isMember ? (
                <form onSubmit={handleMemberSignIn} className="flex flex-col gap-4 w-full max-w-xl mt-8 bg-[#2B2824] p-5 sm:p-7 rounded-2xl">
                    <h2 className="text-xl font-bold text-[#EDAE1D]">Member sign in required</h2>
                    <label htmlFor="member-email">Member email</label>
                    <input id="member-email" type="email" required value={memberEmail} onChange={(event) => setMemberEmail(event.target.value)} className={inputClass} placeholder="Enter your membership email" />
                    <label htmlFor="member-password">Password</label>
                    <input id="member-password" type="password" required value={memberPassword} onChange={(event) => setMemberPassword(event.target.value)} className={inputClass} placeholder="Enter your password" />
                    <button type="submit" className="bg-[#EDAE1D] text-black font-bold py-3 px-4 rounded-lg">Sign in to nominate</button>
                </form>
            ) : (
                <form onSubmit={handleNominationSubmit} className="flex flex-col gap-4 w-full max-w-xl mt-8 bg-[#2B2824] p-5 sm:p-7 rounded-2xl">
                    <h2 className="text-xl font-bold text-[#EDAE1D]">Nominee details</h2>
                    <label htmlFor="nominee-first-name">Nominee first name</label>
                    <input id="nominee-first-name" required value={nomineeFirstName} onChange={(event) => setNomineeFirstName(event.target.value)} className={inputClass} />
                    <label htmlFor="nominee-last-name">Nominee last name</label>
                    <input id="nominee-last-name" required value={nomineeLastName} onChange={(event) => setNomineeLastName(event.target.value)} className={inputClass} />
                    <label htmlFor="nominee-email">Nominee email</label>
                    <input id="nominee-email" type="email" required value={nomineeEmail} onChange={(event) => setNomineeEmail(event.target.value)} className={inputClass} />
                    <label htmlFor="nominer-phone">Your phone number</label>
                    <input id="nominer-phone" type="tel" required value={nominerPhoneNumber} onChange={(event) => setNominerPhoneNumber(event.target.value)} className={inputClass} />
                    <label htmlFor="tier">Recognition tier</label>
                    <select id="tier" value={tier} onChange={(event) => handleTierChange(event.target.value as Tier)} className={inputClass}>
                        {Object.entries(tierLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                    <label htmlFor="category">Category</label>
                    <select id="category" required value={category} onChange={(event) => setCategory(event.target.value)} className={inputClass}>
                        <option value="">Choose a category</option>
                        {categories[tier].map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <button type="submit" className="bg-[#EDAE1D] text-black font-bold py-3 px-4 rounded-lg">Submit nomination</button>
                </form>
            )}

            {error && <p className="mt-4 text-red-400 text-center max-w-xl">{error}</p>}
            {message && <p className="mt-4 text-green-400 text-center max-w-xl">{message}</p>}
            {status !== "idle" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4" role="dialog" aria-live="polite" aria-modal="true">
                    <div className={`w-full max-w-md rounded-2xl border p-8 text-center shadow-2xl ${status === "declined" ? "border-red-400 bg-[#211515]" : status === "loading" ? "border-[#EDAE1D] bg-[#211e16]" : "border-green-400 bg-[#142116]"}`}>
                        <p className={`text-xl font-bold ${status === "declined" ? "text-red-400" : status === "loading" ? "text-[#EDAE1D]" : "text-green-400"}`}>{statusMessage}</p>
                        {status !== "loading" && <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-lg bg-[#EDAE1D] px-6 py-3 font-bold text-black">Close</button>}
                    </div>
                </div>
            )}
        </main>
    )
}

export default NominateTier4