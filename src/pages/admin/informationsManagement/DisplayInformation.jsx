import { useQuery } from "react-query";
import InformationCard from "../../../components/admin/InformationCard";
import AdminNavigation from "../AdminNavigation";
import AddInformation from "./AddInformation";
import { getInformation } from "../../../api/informationApi";

const DisplayInformation = () => {

  // Fetch information from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ['informations'],  // The unique query key to identify this query
    queryFn: getInformation,  // The function responsible for fetching the information
  });

  // If there is data and it contains information, use it, otherwise return an empty array
  const informationList = data?.information?.length > 0 ? data.information : [];

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <div className="admin-container">
      <AdminNavigation />  

      <main className="admin-container__content">
        <h1>My Information</h1>  
        <AddInformation /> 

        <section className="table">
          <h2>Information List</h2>  
          <div className="table__container">
            <table className="table__content">
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
                {informationList.length ? (
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
        </section>
      </main>
    </div>
  );
};

export default DisplayInformation;
