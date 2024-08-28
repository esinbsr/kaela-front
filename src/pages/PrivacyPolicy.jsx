import { useEffect } from 'react';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation } from '../actions/informationAction';
import { isEmpty } from '../components/utils/isEmpty';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {

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
                <header>
                    <h1>Politique de Confidentialité</h1>
                </header>

                <article>
                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            Kaela Couture s'engage à protéger votre vie privée. Cette politique de confidentialité explique quelles données personnelles nous collectons, comment nous les utilisons, et les mesures que nous prenons pour les protéger.
                        </p>
                    </section>

                    <section>
                        <h2>2. Données collectées</h2>
                        <p>
                            Lorsque vous vous inscrivez sur notre site, nous collectons les informations suivantes :
                        </p>
                        <ul>
                            <li><strong>Pseudo :</strong> Utilisé pour vous identifier sur notre site.</li>
                            <li><strong>Email :</strong> Utilisé pour la gestion de votre compte et pour vous contacter si nécessaire.</li>
                            <li><strong>Mot de passe :</strong> Stocké de manière sécurisée pour protéger votre compte.</li>
                        </ul>
                        <p>
                            Nous générons également un <strong>token de connexion</strong> valable 30 jours, afin de maintenir votre session ouverte et sécurisée.
                        </p>
                    </section>

                    <section>
                        <h2>3. Données collectées lors de l'utilisation du site</h2>
                        <p>
                            Lorsque vous interagissez avec notre site, nous collectons également les informations suivantes :
                        </p>
                        <ul>
                            <li><strong>Commentaires :</strong> Lorsque vous laissez un commentaire sur un produit, nous stockons votre pseudo et le message que vous avez publié.</li>
                            <li><strong>Messages de contact :</strong> Lorsque vous nous contactez via notre formulaire, nous collectons votre adresse email et le message que vous nous envoyez.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Utilisation des données</h2>
                        <p>
                            Les données que nous collectons sont utilisées pour :
                        </p>
                        <ul>
                            <li>Gérer et sécuriser votre compte utilisateur.</li>
                            <li>Vous permettre de publier des commentaires sur les produits.</li>
                            <li>Répondre à vos messages lorsque vous nous contactez.</li>
                            <li>Améliorer l'expérience utilisateur sur notre site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Conservation des données</h2>
                        <p>
                            Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées ou pour satisfaire à nos obligations légales. Après cette période, vos données personnelles seront supprimées de manière sécurisée. Si une suppression complète n'est pas possible pour des raisons techniques, nous mettrons en œuvre des mesures appropriées pour empêcher toute utilisation ultérieure de ces données.
                        </p>
                    </section>

                    <section>
                        <h2>6. Sécurité des données</h2>
                        <p>
                            Nous prenons la sécurité de vos données très au sérieux et mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute perte, utilisation abusive, accès non autorisé, divulgation, altération ou destruction.
                        </p>
                    </section>

                    <section>
                        <h2>7. Vos droits</h2>
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                        </p>
                        <ul>
                            <li>Accéder aux données personnelles que nous détenons sur vous.</li>
                            <li>Demander la rectification de vos données personnelles si elles sont incorrectes.</li>
                            <li>Demander la suppression de vos données personnelles.</li>
                            <li>Vous opposer au traitement de vos données personnelles.</li>
                        </ul>
                        <p>
                            Pour exercer ces droits, veuillez nous contacter à l'adresse email suivante : 
                            {info && 
                            <Link to="mailto:kaelacouture@gmail.com"> {info.email} </Link>
                            }
                        </p>
                    </section>

                    <section>
                        <h2>8. Modifications de la politique de confidentialité</h2>
                        <p>
                            Kaela Couture se réserve le droit de modifier cette politique de confidentialité à tout moment. Nous vous informerons de toute modification par le biais de notre site web ou par d'autres moyens appropriés.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contact</h2>
                        <p>
                            Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse email suivante : 
                            {info && 
                            <Link to="mailto:kaelacouture@gmail.com"> {info.email} </Link>
                            }
                        </p>
                    </section>
                </article>

            </main>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
