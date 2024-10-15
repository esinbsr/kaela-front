
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getInformation } from "../api/informationApi";
import { useQuery } from "react-query";

const PrivacyPolicy = () => {

  // Fetch informations from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["informations"],  // The unique query key to identify this query
    queryFn: getInformation,     // The function responsible for fetching the products
  });

  // If there is data and it contains informations, use the first information, otherwise return an empty array.
  const info = data?.length > 0 ? data[0] : null;

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Kaela Couture</title>
        <meta
          name="description"
          content="Learn how Kaela Couture collects, uses, and protects your personal information. Read our privacy policy for detailed information about data protection."
        />
      </Helmet>
      <main className="legal-information">
        <header>
          <h1>Privacy Policy</h1>
        </header>

        <article>
          <section>
            <h2>1. Introduction</h2>
            <p>
              <strong>Kaela Couture</strong> is committed to protecting your
              privacy. This privacy policy explains what{" "}
              <strong>personal data</strong> we collect, how we use it, and the
              measures we take to protect it.
            </p>
          </section>

          <section>
            <h2>2. Data Collected</h2>
            <p>
              When you register on our site, we collect the following
              information:
            </p>
            <ul>
              <li>
                <strong>Username:</strong> Used to identify you on our site.
              </li>
              <li>
                <strong>Email:</strong> Used for managing your account and
                contacting you if necessary.
              </li>
              <li>
                <strong>Password:</strong> Stored securely to protect your
                account.
              </li>
            </ul>
            <p>
              We also generate a <strong>login token</strong> valid for 30 days,
              in order to keep your session open and secure.
            </p>
          </section>

          <section>
            <h2>3. Data Collected During Site Usage</h2>
            <p>
              When you interact with our site, we also collect the following
              information:
            </p>
            <ul>
              <li>
                <strong>Comments:</strong> When you leave a comment on a
                product, we store your username and the message you posted.
              </li>
              <li>
                <strong>Contact Messages:</strong> When you contact us via our
                form, we collect your email address and the message you send us.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Data Usage</h2>
            <p>The data we collect is used to:</p>
            <ul>
              <li>Manage and secure your user account.</li>
              <li>Allow you to post comments on products.</li>
              <li>Respond to your messages when you contact us.</li>
              <li>Improve the user experience on our site.</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <ul>
              <li>
                We retain your personal data for as long as necessary to achieve
                the purposes for which they were collected or to meet our legal
                obligations.
              </li>
              <li>
                <strong>User accounts inactive for more than 3 years</strong>{" "}
                are automatically deleted, and{" "}
                <strong>comments left by these users are anonymized</strong> to
                preserve their confidentiality.
              </li>
              <li>
                Data related to user accounts is therefore deleted or anonymized
                3 years after the last activity. Likewise, sessions and other
                technical data related to these accounts are deleted.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We take the <strong>security of your data</strong> very seriously
              and implement appropriate technical and organizational measures to
              protect your
              <strong>personal data</strong> against loss, misuse, unauthorized
              access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>
              In accordance with the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong>, you
              have the following rights:
            </p>
            <ul>
              <li>
                <strong>Access</strong> to the personal data we hold about you.
              </li>
              <li>
                Request the <strong>rectification</strong> of your personal data
                if it is incorrect.
              </li>
              <li>
                Request the <strong>deletion</strong> of your personal data.
              </li>
              <li>
                Object to the <strong>processing</strong> of your personal data.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at the following email
              address:
              {info && (
                <Link to="mailto:kaelacouture@gmail.com"> {info.email} </Link>
              )}
            </p>
          </section>

          <section>
            <h2>8. Modifications to the Privacy Policy</h2>
            <p>
              Kaela Couture reserves the right to modify this privacy policy at
              any time. We will inform you of any changes via our website or
              other appropriate means.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              For any questions regarding this privacy policy, you can contact
              us at the following email address:
              {info && (
                <Link to="mailto:kaelacouture@gmail.com"> {info.email} </Link>
              )}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
