import { useQuery } from "react-query";
import SocialNetworkCard from "../../../components/admin/SocialNetworkCard";
import { getSocialNetwork } from "../../../api/socialNetworkApi"; // Ensure correct API import

const DisplaySocialNetwork = () => {
  // Fetch social networks from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["socialNetworks"], // The unique query key to identify this query
    queryFn: getSocialNetwork, // The function responsible for fetching the social networks
    staleTime: 1000 * 60 * 60, // Time in milliseconds (1 hour) during which the data is considered fresh and won't be re-fetched
    cacheTime: 1000 * 60 * 60 * 24, // Time in milliseconds (24 hours) that the data will remain in cache even if it's stale
  });

  // If there is data and it contains social networks, use it, otherwise return an empty array
  const socialNetworkList = data?.length > 0 ? data : [];

  return (
    <>
      <h2>List of Social Networks</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Platform</th>
              <th scope="col">URL</th>
              <th scope="col" colSpan={2} className="action-header">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* If the list has items, render each as a row */}
            {socialNetworkList.length > 0 ? (
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
                  {isLoading && <p>Loading...</p>}
                  {error && error.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplaySocialNetwork;
