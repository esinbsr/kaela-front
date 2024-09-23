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
                    <h1>Legal Notice</h1>
                <article>
                    <section>
                        <h2>1. Website Publisher</h2>
                        <p><strong>Company Name:</strong> Kaela Couture</p>
                        <p><strong>Address:</strong> {info && info.address}</p>
                        <p><strong>Phone:</strong> +{info && info.mobile}</p>
                        <p><strong>Email:</strong> {info && info.email}</p>
                        <p><strong>Publication Director:</strong> Esin Baser</p>
                    </section>

                    <section>
                        <h2>2. Website Hosting</h2>
                        <p><strong>Hosting Provider:</strong> Netlify</p>
                        <address>
                            <p><strong>Address:</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA</p>
                            <p><strong>Phone:</strong> Not applicable</p>
                            <p><strong>Email:</strong> <a href="mailto:support@netlify.com">support@netlify.com</a></p>
                        </address>
                    </section>

                    <section>
                        <h2>3. Intellectual Property</h2>
                        <p>
                            The website and each of its elements, including but not limited to texts, images, videos, photographs, <strong>trademarks</strong>, and <strong>logos</strong>, are the exclusive property of <strong>Kaela Couture</strong>. Any reproduction, representation, distribution, or redistribution, in whole or in part, of the content of this site on any medium or by any process whatsoever, without the express prior authorization of Kaela Couture, is prohibited.
                        </p>
                    </section>

                    <section>
                        <h2>4. Personal Data Protection</h2>
                        <p><strong>Data Controller:</strong> <strong>Kaela Demirci</strong></p>
                        <p><strong>Email:</strong> {info && <strong>{info.email}</strong>}</p>
                        <p>
                            When you create an account with Kaela Couture, we collect information that identifies you, such as your name, username, email address, and password. These data are collected and processed in accordance with applicable laws. For more details on how we manage your data, please consult our <Link to="/privacyPolicy">Privacy Policy</Link>.
                        </p>
                        <p>
                            In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, oppose, and delete <strong>personal data</strong> concerning you. To exercise these rights, please contact Kaela Couture at the email address mentioned above. For more information on the protection of your personal data, you can visit the official CNIL website: <a href="https://www.cnil.fr">www.cnil.fr</a>.
                        </p>
                    </section>

                    <section>
                        <h2>5. Terms of Use</h2>
                        <p>
                            The use of this site is governed by the laws in force in France. By accessing this site, the user accepts the present terms of use. <strong>Kaela Couture</strong> reserves the right to modify these conditions at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2>6. Limitation of Liability</h2>
                        <p>
                            The information contained on this site is as accurate as possible, and the site is periodically updated, but it may still contain inaccuracies, omissions, or gaps. If you notice any missing information, error, or what appears to be a malfunction, please report it by email to <Link to="mailto:kaelacouture@gmail.com"> {info && info.email}</Link>.
                        </p>
                    </section>

                    <section>
                        <h2>7. Data Retention</h2>
                        <p>
                            We retain your personal data for as long as necessary to achieve the purposes for which they were collected or to meet our legal obligations. The retention period is determined based on the nature of the data, operational needs, and applicable legal requirements. After the expiration of this period, your personal data will be securely deleted. If complete deletion is not technically possible, we will implement appropriate measures to prevent any further use of this data.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact</h2>
                        <p>
                            For any questions regarding the legal notices of the site, you can contact us at: <Link to="mailto:kaelacouture@gmail.com">{info && info.email}</Link>.
                        </p>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default LegalNotice;
