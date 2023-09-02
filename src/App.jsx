/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import SinglePerson from "./component/SinglePerson";
import Rechart from "./component/Rechart";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const [closeName, setCloseName] = useState(false);
  const [closeProjectLink, setCloseProjectLink] = useState(false);
  const [projectBudget, setProjectBudget] = useState(false);
  const [bidValue, setBidValue] = useState(false);
  const [rechart, setRechart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://seopage1erp.website/api/leads");
      const jsonData = await response.json();
      setData(jsonData?.data);
      setRechart(jsonData?.data.slice(-100));
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const button = Array.from({
    length: Math.ceil(data.length / itemsPerPage),
  });

  const lastInput = currentPage + 9;
  const fastInput = currentPage - 1;

  const HnadleDropDwonMenu = (e) => {
    setOpenMenu(e.target.checked);
  };
  // const handleBlue = () => {
  //   setOpenMenu(false);
  // };

  if (loading) {
    return <h4>Loading.....</h4>;
  }
  return (
    <>
      <div className="menu">
        <h2>{openMenu ? "UnMarked" : "FILTER"}</h2>
        <input
          type="checkbox"
          onChange={HnadleDropDwonMenu}
          className="openDropDown"
        />

        {openMenu && (
          <div className="dropdown">
            <div>
              <input
                onChange={(e) => setCloseName(e.target.value)}
                type="checkbox"
                id="name"
                name="name"
                value="Bike"
              />
              <label htmlFor="name"> name</label>
            </div>
            <div>
              <input
                onChange={(e) => setCloseProjectLink(e.target.value)}
                type="checkbox"
                id="name"
                name="name"
                value="Bike"
              />
              <label htmlFor="name"> Project Link</label>
            </div>
            <div>
              <input
                onChange={(e) => setProjectBudget(e.target.value)}
                type="checkbox"
                id="name"
                name="name"
                value="Bike"
              />
              <label htmlFor="name"> Project Budget</label>
            </div>
            <div>
              <input
                onChange={(e) => setBidValue(e.target.value)}
                type="checkbox"
                id="name"
                name="name"
                value="Bike"
              />
              <label htmlFor="name"> bid value</label>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />#
                </label>
              </th>
              {!closeName ? <th>Name</th> : ""}
              {!closeProjectLink ? <th>Project Link</th> : ""}
              {!projectBudget ? <th>Project Budget</th> : ""}
              {!bidValue ? (
                <th>
                  <th>bid value</th>
                </th>
              ) : (
                ""
              )}

              <th>created</th>
              <th>created By</th>
              <th>bidding daily time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((d, i) => (
              <SinglePerson
                key={i}
                closeName={closeName}
                d={d}
                length={i}
                currentPage={currentPage}
                closeProjectLink={closeProjectLink}
                projectBudget={projectBudget}
                bidValue={bidValue}
              ></SinglePerson>
            ))}
          </tbody>
        </table>

        <div>
          {button.slice(fastInput, lastInput).map((_, index) => (
            <button
              className={`${
                currentPage == index + 1 ? "activeButton" : "deActiveButton"
              }`}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Rechart rechart={rechart}></Rechart>
      </div>
    </>
  );
}

export default App;
