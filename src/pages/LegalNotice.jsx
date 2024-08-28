import { useEffect } from "react";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { isEmpty } from "../components/utils/isEmpty";
import { Link } from "react-router-dom";

const LegalNotice = () => {

    const information = useSelector((state) => state.information.information);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInformation());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const info = !isEmpty(information) ? information[0] : null;

    return (
        <>
            <main className="legal-information">
                    <h1>Mentions Légales</h1>
                <article>
                    <section>
                        <h2>1. Éditeur du site</h2>
                        <p><strong>Nom de l'entreprise :</strong> Kaela Couture</p>
                        <p><strong>Adresse :</strong> {info &&info.address}</p>
                      
                        <p><strong>Téléphone :</strong>+{info &&info.mobile}</p>
                        <p><strong>Email :</strong>{info &&info.email}</p>
                        <p><strong>Directrice de la publication :</strong> Esin Baser</p>

                    </section>

                    <section>
                        <h2>2. Hébergement du site</h2>
                        <p><strong>Nom de l'hébergeur :</strong> Netlify</p>
                        <address>
                            <p><strong>Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA</p>
                            <p><strong>Téléphone :</strong> Non applicable</p>
                            <p><strong>Email :</strong> <a href="mailto:support@netlify.com">support@netlify.com</a></p>
                        </address>
                    </section>

                    <section>
                        <h2>3. Propriété intellectuelle</h2>
                        <p>
                            Le site et chacun des éléments qui le composent, notamment mais non exclusivement, les textes, images, vidéos, photographies, marques, logos, sont la propriété exclusive de Kaela Couture. Toute reproduction, représentation, diffusion ou rediffusion, totale ou partielle, du contenu de ce site sur quelque support ou par tout procédé que ce soit sans l’autorisation expresse et préalable de Kaela Couture est interdite.
                        </p>
                    </section>

                    <section>
                        <h2>4. Protection des données personnelles</h2>
                        <p><strong>Responsable du traitement des données :</strong> Kaela Demirci</p>
                        <p><strong>Email :</strong> { info && info.email}</p>
                        <p>
                            Lorsque vous créez un compte auprès de Kaela Couture, nous collectons des informations qui vous identifient, telles que votre nom, votre nom d'utilisateur, votre adresse e-mail et votre mot de passe. Ces données sont collectées et traitées conformément aux lois en vigueur. Pour plus de détails sur la gestion de vos données, veuillez consulter notre <Link to="https://www.notion.so/lien-vers-politique">Politique de Confidentialité</Link>.
                        </p>
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression des données personnelles vous concernant. Pour exercer ces droits, veuillez contacter Kaela Couture à l'adresse email mentionnée ci-dessus. Pour plus d'informations sur la protection de vos données personnelles, vous pouvez consulter le site officiel de la CNIL : <a href="https://www.cnil.fr">www.cnil.fr</a>.
                        </p>
                    </section>

                    <section>
                        <h2>5. Conditions d'utilisation</h2>
                        <p>
                            L'utilisation de ce site est régie par les lois en vigueur en France. En accédant à ce site, l'utilisateur accepte les présentes conditions d'utilisation. Kaela Couture se réserve le droit de modifier ces conditions à tout moment sans préavis.
                        </p>
                    </section>

                    <section>
                        <h2>6. Limitation de responsabilité</h2>
                        <p>
                            Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse <Link to="mailto:kaelacouture@gmail.com"> {info &&info.email}</Link>.
                        </p>
                    </section>

                    <section>
                        <h2>7. Conservation des données</h2>
                        <p>
                            Nous conservons vos données personnelles pendant une période nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées ou pour satisfaire à nos obligations légales. La durée de conservation est déterminée en fonction de la nature des données, des besoins opérationnels, et des exigences légales applicables. Après l'expiration de cette période, vos données personnelles seront supprimées de manière sécurisée. Si une suppression complète n'est pas possible pour des raisons techniques, nous mettrons en œuvre des mesures appropriées pour empêcher toute utilisation ultérieure de ces données.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact</h2>
                        <p>
                            Pour toute question concernant les mentions légales du site, vous pouvez nous contacter à : <Link to="mailto:kaelacouture@gmail.com">{info &&info.email}</Link>.
                        </p>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default LegalNotice;
