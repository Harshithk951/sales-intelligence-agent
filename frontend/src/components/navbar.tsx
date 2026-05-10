import Link from "next/link";
import { ButtonPrimary } from "./button-primary";
import { ButtonSecondary } from "./button-secondary";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Zone */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-near-black flex items-center justify-center text-canvas-white font-bold group-hover:bg-cohere-black transition-colors">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">Nexus AI</span>
          </Link>
        </div>

        {/* Links Zone */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#product" className="text-body-default text-ink hover:text-action-blue transition-colors">
            Product
          </Link>
          <Link href="#capabilities" className="text-body-default text-ink hover:text-action-blue transition-colors">
            Capabilities
          </Link>
          <Link href="#research" className="text-body-default text-ink hover:text-action-blue transition-colors">
            Research
          </Link>
          <Link href="/dashboard" className="text-body-default text-ink hover:text-action-blue transition-colors font-medium">
            Dashboard View
          </Link>
        </nav>

        {/* CTA Zone */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ButtonSecondary href="/signin">Sign in</ButtonSecondary>
          </div>
          <ButtonPrimary className="py-2.5" href="/dashboard">Get Started</ButtonPrimary>
        </div>
      </div>
    </header>
  );
}
