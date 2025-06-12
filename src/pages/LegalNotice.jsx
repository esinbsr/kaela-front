import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getInformation } from "../api/informationApi";
import { useQuery } from "react-query";
import { useEffect } from "react";
import "../assets/styles/pages/_legal-information.scss";

const LegalNotice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch informations from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["informations"], // The unique query key to identify this query
    queryFn: getInformation, // The function responsible for fetching the products
  });

  // If there is data and it contains informations, use the first information, otherwise return an empty array.
  const info = data?.length > 0 ? data[0] : null;

  if (isLoading) return <p role="status">Loading...</p>;
  if (error) return <p role="alert">An error occurred: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Legal Information | Kaela Couture</title>
        <meta
          name="description"
          content="Review Kaela Couture's legal information, including terms of service, user agreements, and policies to ensure transparency and customer trust."
        />
      </Helmet>
      <main className="legal-information">
        <h1>Legal Notice</h1>
        <article>
          <section>
            <h2>1. Website Publisher</h2>
            <div className="line"></div>
            <p>
              <strong>Company Name:</strong> Kaela Couture
            </p>
            <p>
              <strong>Address:</strong> {info && info.address}
            </p>
            <p>
              <strong>Phone:</strong> {info && info.mobile}
            </p>
            <p>
              <strong>Email:</strong> {info && info.email}
            </p>
            <p>
              <strong>Publication Director:</strong> Kaela Couture
            </p>
          </section>

          <section>
            <h2>2. Website Hosting</h2>
            <div className="line"></div>
            <p>
              <strong>Hosting Provider:</strong> OVHcloud
            </p>
            <address>
              <p>
                <strong>Address:</strong> 2 rue Kellermann, 59100 Roubaix,
                France
              </p>
              <p>
                <strong>Phone:</strong> +33 9 72 10 10 07
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@ovh.com">support@ovh.com</a>
              </p>
            </address>
          </section>

          <section>
            <h2>3. Intellectual Property</h2>
            <div className="line"></div>
            <p>
              The website and each of its elements, including but not limited to
              texts, images, videos, photographs, <strong>trademarks</strong>,
              and <strong>logos</strong>, are the exclusive property of
              <strong>Kaela Couture</strong>. Any reproduction, representation,
              distribution, or redistribution, in whole or in part, of the
              content of this site on any medium or by any process whatsoever,
              without the express prior authorization of Kaela Couture, is
              prohibited.
            </p>
          </section>

          <section>
            <h2>4. Personal Data Protection</h2>
            <div className="line"></div>
            <p>
              <strong>Data Controller:</strong> <strong>Kaela Demirci</strong>
            </p>
            <p>
              <strong>Email:</strong> {info && <strong>{info.email}</strong>}
            </p>
            <p>
              When you create an account with Kaela Couture, we collect
              information that identifies you, such as your name, username,
              email address, and password. These data are collected and
              processed in accordance with applicable laws. For more details on
              how we manage your data, please consult our{" "}
              <Link to="/privacyPolicy">Privacy Policy</Link>.
            </p>
            <p>
              In accordance with the General Data Protection Regulation (GDPR),
              you have the right to access, rectify, oppose, and delete{" "}
              <strong>personal data</strong> concerning you. To exercise these
              rights, please contact Kaela Couture at the email address
              mentioned above. For more information on the protection of your
              personal data, you can visit the official CNIL website:{" "}
              <a href="https://www.cnil.fr">www.cnil.fr</a>.
            </p>
          </section>

          <section>
            <h2>5. Terms of Use</h2>
            <div className="line"></div>
            <p>
              The use of this site is governed by the laws in force in France.
              By accessing this site, the user accepts the present terms of use.{" "}
              <strong>Kaela Couture</strong> reserves the right to modify these
              conditions at any time without notice.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <div className="line"></div>
            <p>
              The information contained on this site is as accurate as possible,
              and the site is periodically updated, but it may still contain
              inaccuracies, omissions, or gaps. If you notice any missing
              information, error, or what appears to be a malfunction, please
              report it by email to{" "}
              <Link to="mailto:kaelacouture@gmail.com">
                {" "}
                {info && info.email}
              </Link>
              .
            </p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <div className="line"></div>
            <p>
              We retain your personal data for as long as necessary to achieve
              the purposes for which they were collected or to meet our legal
              obligations. The retention period is determined based on the
              nature of the data, operational needs, and applicable legal
              requirements. After the expiration of this period, your personal
              data will be securely deleted. If complete deletion is not
              technically possible, we will implement appropriate measures to
              prevent any further use of this data.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <div className="line"></div>
            <p>
              For any questions regarding the legal notices of the site, you can
              contact us at:{" "}
              <Link to="mailto:kaelacouture@gmail.com">
                {info && info.email}
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default LegalNotice;
