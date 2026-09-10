import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
          Conditions Générales d'Utilisation (CGU)
        </h1>
        <p className="text-sm text-slate-500 mb-12 font-medium">En vigueur au : 2 Juillet 2026</p>
        
        <div className="space-y-10 text-slate-600 leading-relaxed text-base">
          <p>
            Les présentes Conditions Générales d’Utilisation (ci-après « CGU ») ont pour objet de définir les modalités d'accès et d'utilisation du site Internet House of Style (ci-après « le Site »).
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">1. Mentions Légales</h2>
            <p className="mb-2">Le Site est édité par <strong>Charbel Mahougnon</strong></p>
            <p className="mb-2">Hébergement du site : <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133 Covina, CA 91723.</p>
            <p>Contact : <strong>contact@houseofstyle.com</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">2. Accès au Site</h2>
            <p className="mb-3">
              Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, connexion internet) sont à sa charge.
            </p>
            <p>
              L'éditeur met en œuvre tous les moyens mis à sa disposition pour assurer un accès de qualité au Site, mais n'est tenu à aucune obligation d'y parvenir en cas de force majeure ou de panne réseau.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">3. Propriété Intellectuelle</h2>
            <p>
              Les marques, logos, visuels, photographies, textes et l'architecture du site House of Style sont protégés par le droit d'auteur et la propriété intellectuelle. Toute reproduction, copie, publication ou adaptation, totale ou partielle, des différents contenus est strictement interdite sans l'accord écrit préalable de l'éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">4. Responsabilité</h2>
            <p className="mb-3">
              Les sources des informations diffusées sur le Site sont réputées fiables. Toutefois, le Site ne garantit pas qu'il soit exempt de défauts, d’erreurs ou d’omissions. Les photos des produits de prêt-à-porter n'ont qu'une valeur indicative et non contractuelle.
            </p>
            <p>
              Le Site ne peut être tenu responsable de l’utilisation et de l’interprétation de l’information contenue dans ses pages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">5. Évolution des CGU</h2>
            <p>
              L'éditeur du Site se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU afin de les adapter aux évolutions du Site ou de la législation.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
