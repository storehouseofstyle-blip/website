import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-slate-500 mb-12 font-medium">En vigueur au : 2 Juillet 2026</p>
        
        <div className="space-y-10 text-slate-600 leading-relaxed text-base">
          <p>
            La protection de votre vie privée est essentielle pour House of Style. La présente Politique de confidentialité a pour but de vous informer en toute transparence sur notre gestion des données.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">1. Site Vitrine et Non-Collecte de Données</h2>
            <p className="mb-3">
              Actuellement, le site <strong>House of Style</strong> fonctionne exclusivement comme un site vitrine permettant aux visiteurs de consulter nos collections et nouveautés.
            </p>
            <p>
              Par conséquent, <strong>nous ne collectons, ne traitons et ne stockons aucune donnée personnelle</strong> relative à nos utilisateurs. Il n'y a pas de création de compte client, de processus de commande en ligne, ni de formulaire de contact ou de newsletter actifs qui nécessiteraient la saisie de vos informations privées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">2. Cookies et Traçage</h2>
            <p className="mb-3">
              Notre site n'utilise actuellement aucun cookie de suivi publicitaire ou analytique intrusif nécessitant votre consentement. Les seuls cookies pouvant être déposés sont des cookies techniques strictement nécessaires au bon fonctionnement de l'affichage du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">3. Partage des Données à des Tiers</h2>
            <p>
              Puisqu'aucune donnée personnelle n'est collectée, House of Style ne vend, n'échange et ne transfère aucune information à des entreprises tierces.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">4. Évolution de la Politique</h2>
            <p>
              Si notre site venait à évoluer pour proposer des ventes en ligne ou la création d'espaces clients, cette politique de confidentialité serait immédiatement mise à jour conformément au Règlement Général sur la Protection des Données (RGPD), et les mesures de sécurité adéquates seraient déployées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">5. Contact</h2>
            <p className="mb-3">
              Pour toute question relative à cette politique ou pour toute autre demande, vous pouvez nous contacter à tout moment :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Par email : <strong>contact@houseofstyle.com</strong></li>
              <li>Par téléphone : <strong>+229 01 67 91 79 24</strong></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
