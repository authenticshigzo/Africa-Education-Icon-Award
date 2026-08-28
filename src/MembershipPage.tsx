import { useState } from "react"
import type { SubmitEvent } from 'react'

type FormStatus = "idle" | "loading" | "success" | "declined" | "expired"
type AuthMode = "signup" | "signin"

type DemoAccount = {
    firstName: string
    lastName: string
    email: string
    password: string
    membership: string
}

function MembershipPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [membership, setMembership] = useState("")
    const [error, setError] = useState("")
    const [status, setStatus] = useState<FormStatus>("idle")
    const [authMode, setAuthMode] = useState<AuthMode>("signup")

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")

        if (authMode === "signup" && (!firstName || !lastName || !membership)) {
            setError("Please complete your name and choose a membership.")
            return
        }

        if (!email || !password) {
            setError("Please complete all required fields.")
            return
        }

        if (authMode === "signup" && password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.")
            return
        }

        setStatus("loading")

        setTimeout(() => {
            if (authMode === "signup") {
                const account: DemoAccount = {
                    firstName,
                    lastName,
                    email,
                    password,
                    membership,
                }

                localStorage.setItem("demoAccount", JSON.stringify(account))
                setStatus("success")
                return
            }

            const savedAccount = localStorage.getItem("demoAccount")
            const account = savedAccount
                ? JSON.parse(savedAccount) as DemoAccount
                : null

            if (account?.email === email && account.password === password) {
                setStatus("success")
            } else {
                setStatus("declined")
            }
        }, 1500)
    }

    function switchAuthMode(mode: AuthMode) {
        setAuthMode(mode)
        setError("")
        setStatus("idle")
    }
    return (
        <>
            <div className="flex flex-col items-center w-full min-h-screen pt-32 justify-center bg-[#0F0E0C] text-white">
                <h1 className="text-3xl text-[#EDAE1D] w-[50%] text-center justify-center font-bold">Welcome to the Membership Page!</h1>
                <div className="flex gap-4 mt-4">
                    <button type="button" onClick={() => switchAuthMode("signup")} className={authMode === "signup" ? "font-bold text-[#EDAE1D]" : "text-white"}>
                        Sign up
                    </button>
                    <button type="button" onClick={() => switchAuthMode("signin")} className={authMode === "signin" ? "font-bold text-[#EDAE1D]" : "text-white"}>
                        Sign in
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-4 bg-[#2B2824] p-6 rounded-2xl">
                    {authMode === "signup" && <>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter your First Name" className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]" />
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter your Last Name" className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]" />
                    </>}
                    <label>Email:</label>
                    <input type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your Email" className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]" />
                    {authMode === "signup" && <>
                        <label>Select Membership:</label>
                        <select value={membership} onChange={(event) => setMembership(event.target.value)} className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]">
                            <option value="">Choose an option</option>
                            <option value="basic">Basic-free</option>
                            <option value="standard">Standard - $200</option>
                            <option value="premium">Premium-$1000</option>
                        </select>
                    </>}
                    <label>Password:</label>
                    <input type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your Password" className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]" />
                    {authMode === "signup" && <>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your Password" className="border border-y border-x border-white rounded-lg p-2 bg-[#797e86]" />
                    </>}
                    <button
                        className="bg-[#EDAE1D] text-black font-bold py-2 px-4 rounded"
                        type="submit"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Processing..." : authMode === "signup" ? "Create account" : "Sign in"}
                    </button>
                </form>
                {error && <p className="text-red-400">{error}</p>}
                {status === "loading" && (
                    <p className="text-yellow-400">Processing...</p>
                )}

                {status === "success" && (
                    <p className="text-green-400">{authMode === "signup" ? "Account created successfully!" : "Signed in successfully!"}</p>
                )}

                {status === "declined" && (
                    <p className="text-red-400">Payment declined.</p>
                )}

                {status === "expired" && (
                    <p className="text-yellow-400">Your session has expired.</p>
                )}
            </div>
        </>
    )
}

export default MembershipPage