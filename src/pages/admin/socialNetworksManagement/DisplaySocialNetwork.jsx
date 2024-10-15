import { useQuery } from "react-query";
import SocialNetworkCard from "../../../components/admin/SocialNetworkCard";
import AdminAddSocialNetwork from "./AddSocialNetwork";
import AdminNavigation from "../AdminNavigation";
import { getSocialNetwork } from "../../../api/socialNetworkApi"; // Ensure correct API import

const DisplaySocialNetwork = () => {

  // Fetch social networks from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["socialNetworks"],  // The unique query key to identify this query
    queryFn: getSocialNetwork,    // The function responsible for fetching the social networks
  });
  
  // If there is data and it contains social networks, use it, otherwise return an empty array
  const socialNetworkList = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return `An error occurred: ${error.message}`;

  return (
    <div className="admin-container">
      <AdminNavigation />  
      <main className="admin-container__content">
        <h1>Social Networks</h1>  
        <AdminAddSocialNetwork /> 
        <section className="table">
          <h2>List of Social Networks</h2>  
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Platform</th>
                  <th scope="col">URL</th>
                  <th scope="col" colSpan={2} className="action-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* If the list has items, render each as a row */}
                {socialNetworkList ? (
                  socialNetworkList.map((socialNetwork) => (
                    <SocialNetworkCard
                      key={socialNetwork.id}
                      socialNetwork={socialNetwork}
                    />
                  ))
                ) : (
                  // If no social networks are available, display a message
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }} role="alert">
                      No social networks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DisplaySocialNetwork;
