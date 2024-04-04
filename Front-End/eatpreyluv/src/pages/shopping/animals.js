import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Navbar from "../navbar";
import Grid from "../../components/Grid";
import "../../components/Animals.css";
import Loading from "../../components/loading";

const TestShopPage = () => {
  const [items, setItems] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { animal } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const fetchItemsFromDatabase = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/items/animal/${animal}`
      ); // Replace with your actual API endpoint
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch items from database:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await fetchItemsFromDatabase();
      setItems(fetchedItems);
    };
    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    // Update search term state when search input changes
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredItems = items
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Filter items based on search term
    })
    .sort((a, b) => {
      // Sort items based on sort criteria and sort order
      if (sortCriteria === "price") {
        // Sort by price
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      } else if (sortCriteria === "name") {
        // Sort by name (default)
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else {
        if (sortOrder === "asc") {
          return a.stock - b.stock;
        } else {
          return b.stock - a.stock;
        }
      }
    });

  return (
    <div>
      <PageHeader />
      <Navbar />
      <h1 className="TitleHeader">{animal}</h1>
      <input
        type="text"
        placeholder="Search for item..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <label className="SortSelection" htmlFor="sortCriteria">
          Sort by:
        </label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={handleSortChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <label className="SortSelection" htmlFor="sortOrder">
          Sort order:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <Grid items={filteredItems} />
    </div>
  );
};

export default TestShopPage;
