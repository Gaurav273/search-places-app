import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import "./app.css";

const API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const API_KEY = "e0ee32860cmsh9d1b5174d36343dp140b58jsn28317a4782db";

interface Place {
  id: string;
  city: string;
  country: string;
  countryCode: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchData();
    } else {
      setData([]);
      setTotalPages(1);
    }
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          namePrefix: query,
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      });

      setData(response.data.data);
      setTotalPages(
        Math.ceil(response.data.metadata.totalCount / itemsPerPage)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      fetchData();
    }
  };

  return (
    <div className="main-container">
      <h2>Search Places</h2>
      <SearchBox query={query} onChange={setQuery} onSearch={handleSearch} />
      <Table data={data} loading={loading} query={query} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default App;
