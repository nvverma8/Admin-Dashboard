import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Loader";

const App = () => {
  // State variables initialization
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Holds the fetched data
  const [selectedRows, setSelectedRows] = useState([]); // Holds the IDs of selected rows
  const [selectAll, setSelectAll] = useState(false); // Tracks if all rows are selected
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page number
  const [editingId, setEditingId] = useState(null); // Tracks the ID of the row being edited
  const [editedData, setEditedData] = useState({}); // Tracks the edited data
  const appClassName = darkMode ? "App dark-mode" : "App";
  const itemsPerPage = 10; // Number of items displayed per page

  // Calculate the range of items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //filter date using search term
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // const displayedItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // const displayedItems = searchTerm ? filteredData : currentItems;
  const currentItems = searchTerm
    ? filteredData
    : data.slice(indexOfFirstItem, indexOfLastItem);

  // Handles clicking a row to select/deselect
  const handleRowClick = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    let updatedSelection = [];
    if (isSelected) {
      updatedSelection = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedSelection = [...selectedRows, rowId];
    }

    setSelectedRows(updatedSelection);
  };

  // Handles editing a row
  const handleEditRow = (rowId) => {
    setEditingId(rowId);
    const rowToEdit = data.find((item) => item.id === rowId);
    setEditedData(rowToEdit);
  };

  // Handles saving edited data
  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editingId ? editedData : item
    );
    setData(updatedData);
    setEditingId(null);
    setEditedData({});
  };

  // Handles changing the state of checkboxes
  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    let updatedSelection = [];

    if (isSelected) {
      updatedSelection = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedSelection = [...selectedRows, rowId];
    }

    setSelectedRows(updatedSelection);
  };

  // Handles selecting/deselecting all rows
  const handleSelectAll = () => {
    if (!selectAll) {
      const allRowIdsOnCurrentPage = currentItems.map((item) => item.id);
      setSelectedRows(allRowIdsOnCurrentPage);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  // Handles deleting a single row
  const handleDeleteRow = (rowId) => {
    const updatedData = data.filter((item) => item.id !== rowId);
    setData(updatedData);
  };

  // Handles deleting multiple selected rows
  const deleteMultipleRows = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
    setSelectAll(false);
  };

  // Fetches data from the API on component mount
  // eslint-disable-next-line 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array to execute only once on component mount
  

  useEffect(() => {
    // Simulate loading delay (Replace this with your actual data fetching or loading logic)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after some delay (simulating data loading)
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount (optional)
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handles pagination - sets the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectAll(false);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={appClassName}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="header">
            <div className="search__bar">
              <label htmlFor="search">
                <b>Search:</b>
                <input
                  type="search"
                  name=""
                  className="search"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />{" "}
              </label>
            </div>

            <button onClick={deleteMultipleRows} className="delete">
              Delete Selected
            </button>
            <button onClick={toggleDarkMode} className="toggle__button">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      name=""
                      className="check__box"
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    style={{
                      background: selectedRows.includes(item.id)
                        ? "#f0f0f0"
                        : "white",
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        name=""
                        id={`check-box-${item.id}`}
                        className="check__box"
                      />
                    </td>

                    <td>
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editedData.name || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editedData.email || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editedData.role || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              role: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.role
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <button onClick={handleSaveEdit} className="save">
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditRow(item.id)}
                          className="edit"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRow(item.id)}
                        className="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footer">
              {filteredData.length} row found . . . .
              <div className="footer__right">
                {filteredData.length > 10 ? (
                  <ul type="none" className="pagination">
                    <li>
                      <button
                        onClick={() => paginate(1)}
                        className="first-page"
                      >
                        &lt;&lt;
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="previous-page"
                      >
                        &lt;
                      </button>
                    </li>
                    {pageNumbers.map((number) => (
                      <li key={number}>
                        <button
                          onClick={() => paginate(number)}
                          className={number === currentPage ? "active" : ""}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                        className="next-page"
                      >
                        &gt;
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => paginate(pageNumbers.length)}
                        className="last-page"
                      >
                        &gt;&gt;
                      </button>
                    </li>
                  </ul>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
