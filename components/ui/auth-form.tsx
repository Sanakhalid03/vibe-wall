"use client"

import * as React from "react"
import { Ghost } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useMounted } from "../../app/components/useMounted"

interface AuthFormProps {
  email: string
  setEmail: (value: string) => void
  name: string
  setName: (value: string) => void
  password: string
  setPassword: (value: string) => void
  handleSignin: (e: React.FormEvent) => void
  handleSignup: (e: React.FormEvent) => void
}

const AuthForm: React.FC<AuthFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  setPassword,
  password,
  handleSignin,
  handleSignup,
}) => {
  const [isSignUp, setIsSignUp] = React.useState(false)
  const mounted = useMounted()
  if (!mounted) return null

  return (
    <div className="dark:bg-zinc-950 py-20 text-zinc-800 dark:text-zinc-200 selection:bg-zinc-300 dark:selection:bg-zinc-600 relative">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4 "
      >
        <Logo />
        <Header isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <SocialButtons isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <Divider />
        {isSignUp ? (
          <SignUpForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSignup={handleSignup}
          />
        ) : (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSignin={handleSignin}
          />
        )}
        <TermsAndConditions />
      </motion.div>
      <BackgroundDecoration />
    </div>
  )
}

// ----------------- LOGO -----------------
const Logo: React.FC = () => (
  <div className="mb-6 flex justify-center">
    <Ghost />
    <span className="ml-2 text-xl font-bold">Vibe Wall</span>
  </div>
)

// ----------------- HEADER -----------------
const Header: React.FC<{
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
}> = ({ isSignUp }) => (
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-semibold">
      {isSignUp ? "Create your account" : "Sign in to your account"}
    </h1>
  </div>
)

// ----------------- SOCIAL BUTTONS -----------------
// ----------------- SOCIAL BUTTONS -----------------
interface SocialButtonsProps {
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ isSignUp, setIsSignUp }) => (
  <div className="mb-6 space-y-3">
    <div className="grid grid-cols-2 gap-3">
      {!isSignUp && (
        <SocialButton
          fullWidth
          onClick={() => setIsSignUp(true)}
        >
          Don't have an account? Create one
        </SocialButton>
      )}
      {isSignUp && (
        <SocialButton
          fullWidth
          onClick={() => setIsSignUp(false)}
        >
          Already have an account? Sign in
        </SocialButton>
      )}
    </div>
  </div>
)

const SocialButton: React.FC<{
  icon?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
}> = ({ icon, fullWidth, children, onClick }) => (
  <button
    onClick={onClick}
    className={`relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md 
      border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 
      px-4 py-2 font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-500
      before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
      before:rounded-[100%] before:bg-zinc-800 dark:before:bg-zinc-200 before:transition-transform before:duration-1000 before:content-[""]
      hover:scale-105 hover:text-zinc-100 dark:hover:text-zinc-900 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
      ${fullWidth ? "col-span-2" : ""}`}
  >
    {icon}
    <span>{children}</span>
  </button>
)


// ----------------- DIVIDER -----------------
const Divider: React.FC = () => (
  <div className="my-6 flex items-center gap-3">
    <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700" />
    <span className="text-zinc-500 dark:text-zinc-400">OR</span>
    <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700" />
  </div>
)

// ----------------- LOGIN FORM -----------------
interface LoginProps {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  onSignin: (e: React.FormEvent) => void
}

const LoginForm: React.FC<LoginProps> = ({
  email,
  setEmail,
  setPassword,
  password,
  onSignin,
}) => (
  <form onSubmit={onSignin}>
    <div className="mb-3">
      <label htmlFor="email-input" className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
        Email
      </label>
      <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.email@provider.com"
        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
        placeholder-zinc-400 dark:placeholder-zinc-500 
        ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password-input" className="block text-zinc-500 dark:text-zinc-400 mb-1.5">
        Password
      </label>
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••••••"
        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
        placeholder-zinc-400 dark:placeholder-zinc-500 
        ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <Button type="submit" className="w-full">
      Sign in
    </Button>
  </form>
)

// ----------------- SIGN UP FORM -----------------
interface SignUpProps {
  name: string
  setName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  onSignup: (e: React.FormEvent) => void
}

const SignUpForm: React.FC<SignUpProps> = ({
  name,
  setName,
  email,
  setEmail,
  setPassword,
  password,
  onSignup,
}) => (
  <form onSubmit={onSignup}>
    <div className="mb-3">
      <label htmlFor="name-input-signup" className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
        Name
      </label>
      <input
        id="name-input-signup"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="your name"
        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
        placeholder-zinc-400 dark:placeholder-zinc-500 
        ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email-input-signup" className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
        Email
      </label>
      <input
        id="email-input-signup"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.email@provider.com"
        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
        placeholder-zinc-400 dark:placeholder-zinc-500 
        ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password-input-signup" className="block text-zinc-500 dark:text-zinc-400 mb-1.5">
        Password
      </label>
      <input
        id="password-input-signup"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••••••"
        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
        placeholder-zinc-400 dark:placeholder-zinc-500 
        ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <Button type="submit" className="w-full">
      Create Account
    </Button>
  </form>
)

// ----------------- TERMS -----------------
const TermsAndConditions: React.FC = () => (
  <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-600 dark:text-blue-400">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-600 dark:text-blue-400">
      Privacy Policy.
    </a>
  </p>
)

// ----------------- BACKGROUND -----------------
const BackgroundDecoration: React.FC = () => {
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isDarkTheme
            ? "radial-gradient(circle at top right, rgba(9,9,11,0), rgba(9,9,11,1))"
            : "radial-gradient(circle at top right, rgba(255,255,255,0), rgba(255,255,255,1))",
        }}
      />
    </div>
  )
}

// ----------------- GENERIC BUTTON -----------------
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`rounded-md bg-linear-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 
    ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 
    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default AuthForm
