import { useQuery } from "react-query";
import InformationCard from "../../../components/admin/InformationCard";
import { getInformation } from "../../../api/informationApi";

const DisplayInformation = () => {
  // Fetch information from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["informations"], // The unique query key to identify this query
    queryFn: getInformation, // The function responsible for fetching the information
    staleTime: 1000 * 60 * 60, // Time in milliseconds (1 hour) during which the data is considered fresh and won't be re-fetched
    cacheTime: 1000 * 60 * 60 * 24, // Time in milliseconds (24 hours) that the data will remain in cache even if it's stale
  });

  // If there is data and it contains information, use it, otherwise return an empty array
  const informationList = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <>
      <h2>Information List</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col" className="action-header" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* If the list has items, render each as a row */}
            {informationList.length > 0 ? (
              informationList.map((info) => (
                <InformationCard key={info.id} infos={info} />
              ))
            ) : (
              // If no information is available, display a message
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }} role="alert">
                  There is no information available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayInformation;
