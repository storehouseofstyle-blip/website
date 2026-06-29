import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Aide",
      links: ["Service client", "Guide des tailles", "Suivre ma commande", "Contact"],
    },
    {
      title: "FAQ",
      links: ["Paiements", "Livraison", "Retours & échanges", "Cartes cadeaux"],
    },
    {
      title: "Ressources",
      links: ["Politique de confidentialité", "Conditions générales", "Paramètres des cookies", "Plan du site"],
    },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-100 text-slate-600 text-sm mt-auto">
      {/* Grille principale des liens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 xl:gap-12">

          {/* Colonne Identité */}
          <div className="flex flex-col gap-4">
            <img src="/logo2.png" alt="House of Style" width={36} height={36} />
            <span className="text-slate-950 font-bold text-lg tracking-wide">House of Style</span>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-xs">
              Expérience vestimentaire minimaliste haut de gamme. Créer des basiques raffinés pour une garde-robe contemporaine et intemporelle.
            </p>
          </div>

          {/* Cartographie dynamique des blocs de navigation */}
          {footerLinks.map((block) => (
            <div key={block.title} className="flex flex-col gap-4">
              <h4 className="text-slate-950 font-bold uppercase tracking-wider text-xs">
                {block.title}
              </h4>
              <ul className="flex flex-col gap-2.5 font-light text-slate-500">
                {block.links.map((link) => {
                  // mapping to known routes for translated pages
                  const routeMap: Record<string, string> = {
                    'Politique de confidentialité': '/politique-de-confidentialite',
                    'Conditions générales': '/conditions-generales',
                    'Paramètres des cookies': '/parametres-des-cookies',
                    'Plan du site': '/plan-du-site',
                    'Service client': '/service-client',
                    'Contact': '/contact',
                    'Guide des tailles': '/guide-des-tailles',
                    'Suivre ma commande': '/suivre-ma-commande',
                  };
                  const href = routeMap[link] || `/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;

                  return (
                    <li key={link}>
                      <Link href={href} className="hover:text-slate-950 transition-colors">
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Colonne Contact (alignée avec les autres) */}
          <div className="flex flex-col gap-2">
            <h4 className="text-slate-950 font-bold uppercase tracking-wider text-xs">Contact</h4>
            <div className="text-slate-600 text-sm">
              <div>Tél : <a href="tel:+33123456789" className="hover:underline">+33 1 23 45 67 89</a></div>
              <div>Email : <a href="mailto:contact@houseofstyle.example" className="hover:underline">contact@houseofstyle.example</a></div>
              <div className="mt-2 text-xs">12 Rue de la Mode, 75001 Paris</div>
              <div className="text-xs">Mar–Sam 10:30–19:00 — Dim 11:00–17:00</div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Facebook</a>
                <a href="#" className="hover:underline">TikTok</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Ligne inférieure : Droits d'auteur & Modes de paiement */}
      <div className=" bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div>
              &copy; {currentYear} <span className="text-slate-600 font-medium">House of Style.</span> Tous droits réservés.
            </div>
            <div className="text-xs text-slate-400">• Réaliser par <a href="/a-propos#realisation" className="hover:underline">Charbel Mahougnon</a></div>
          </div>
          
         
        </div>
      </div>
    </footer>
  );
}
