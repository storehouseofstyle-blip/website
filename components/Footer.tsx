import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#111111] pt-20 text-white">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-20">
          
          {/* Left Section */}
          <div className="flex flex-col justify-between">
            <div>
              <img src="/logo3.png" alt="" className="w-[170px] h-[150px]"/>
              <p className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug max-w-md mb-8">
                Que vous cherchiez à renouveler votre garde-robe, affirmer votre style, ou trouver des pièces uniques, nous sommes là pour vous aider.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-16 lg:ml-auto w-full lg:max-w-md">
            <div>
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Téléphone</span>
                <span className="font-medium text-sm">+229 01 67 91 79 24 / 01 65 02 66 55</span>
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Adresse</span>
                <span className="font-medium text-sm">Porto-Novo, Bénin</span>
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Horaire</span>
                <span className="font-medium text-sm"> Ouvert du Lundi au Samedi de 9h à 22h</span>
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Email</span>
                <a href="mailto:contact@houseofstyle.com" className="text-xl sm:text-2xl font-bold flex items-center gap-3 hover:opacity-70 transition-opacity">
                  <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
                  <span className="underline decoration-2 underline-offset-4">store.houseofstyle@gmail.com</span>
                </a>
              </div>
            </div>
            
            <div className="flex gap-16 w-full">
              <div className="flex flex-col gap-3">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Navigation</span>
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">Accueil</Link>
                <Link href="#collection" className="text-sm font-medium hover:underline underline-offset-4">Nouveautés</Link>
                <Link href="#categories" className="text-sm font-medium hover:underline underline-offset-4">Catégories</Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Notre histoire</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Réseaux</span>
                <a href="#" className="text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4 group">
                  Facebook <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                </a>
                <a href="#" className="text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4 group">
                  Instagram <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                </a>
                <a href="#" className="text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4 group">
                  TikTok <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Big Typography */}
        <div className="w-full flex flex-col mb-12 select-none pointer-events-none">
          <div className="flex items-start">
            <h1 className="text-[15vw] leading-none font-bold tracking-tighter">
              houseofstyle
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Black Bar */}
      <div className="border-t border-white/10 bg-[#111111] px-4 py-5 text-[10px] text-white sm:px-6 lg:px-8">
        <div className="max-w-[80%] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 flex items-center gap-2">
            © {currentYear} House of Style. Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-slate-400">
            <a href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="/conditions-generales" className="hover:text-white transition-colors">Conditions générales</a>
            Le Site est édité par : 
           <Link href="mailto:charbelmahougnon87@gmail.com" className="hover:text-white transition-colors ml-[-20px]">
            Charbel Mahougnon
           </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
