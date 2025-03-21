import React from "react";

interface Place {
  id: string;
  city: string;
  country: string;
  countryCode: string;
}

interface TableProps {
  data: Place[];
  loading: boolean;
  query: string;
}

const Table: React.FC<TableProps> = ({ data, loading, query }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={3}>Loading...</td>
          </tr>
        ) : data.length > 0 ? (
          data.map((place, index) => (
            <tr key={place.id}>
              <td>
                <strong>{index + 1}</strong>
              </td>{" "}
              {/* Bold ID number */}
              <td>{place.city}</td>
              <td>
                <img
                  src={`https://flagsapi.com/${place.countryCode}/flat/24.png`}
                  alt={place.country}
                />{" "}
                {place.country}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>
              {query.trim() === "" ? "Start searching" : "No result found"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
