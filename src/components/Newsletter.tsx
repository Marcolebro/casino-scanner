"use client"

import { useState, FormEvent } from "react"
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterProps {
  className?: string
  variant?: "full" | "compact"
}

export const Newsletter = ({ className, variant = "full" }: NewsletterProps) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Merci ! Votre inscription a bien été prise en compte.")
        setEmail("")
      } else {
        throw new Error("Une erreur est survenue")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Oups ! Une erreur s'est produite. Veuillez réessayer.")
    }
  }

  return (
    <section 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-slate-900 p-8 md:p-12",
        variant === "compact" && "p-6 md:p-8",
        className
      )}
    >
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
          <Mail className="h-8 w-8" />
        </div>

        <h2 className={cn(
          "mb-4 font-bold tracking-tight text-white",
          variant === "full" ? "text-3xl md:text-4xl" : "text-2xl"
        )}>
          Ne manquez aucun <span className="text-blue-400">bonus exclusif</span>
        </h2>
        
        <p className="mb-8 text-lg text-slate-400">
          Rejoignez plus de 5,000 joueurs et recevez chaque semaine les meilleures offres, codes promos et nouveaux casinos testés.
        </p>

        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-800/50 px-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-70 disabled:hover:bg-blue-600 disabled:active:scale-100 whitespace-nowrap"
            >
              {status === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "S'inscrire gratuitement"
              )}
            </button>
          </div>

          {status === "success" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}
        </form>

        <p className="mt-6 text-xs text-slate-500">
          En vous inscrivant, vous acceptez notre politique de confidentialité. 
          Aucun spam, désinscription en un clic possible.
        </p>
      </div>
    </section>
  )
}