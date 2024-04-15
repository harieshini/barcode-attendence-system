import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MDBDatatable, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "./App.css";
// import 'mdbreact/dist/css/mdb.css';
// import 'mdbreact/dist/css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CsvDownloadButton from "react-json-to-csv";
import moment from "moment-timezone";

function Report() {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const data = {
    columns: [
      {
        label: "Admission no",
        field: "barcode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Department",
        field: "dept",
        sort: "asc",
        width: 150,
      },
      {
        label: "Semester",
        field: "semester",
        sort: "asc",
        width: 150,
      },
      {
        label: "Entry",
        field: "entryAt",
        sort: "asc",
        width: 150,
      },
    ],
    // rows:[...filteredData],
    rows: [...filteredData].map((row) => {
      return {
        ...row,
        entryAt: row.entryAt.slice(11, 19),
      };
    }),
  };

  const handleFormSubmit = async (event) => {
    console.log("handleform");
    event.preventDefault();
    console.log(selectedDate);

    try {
      const response = await fetch(
        `http://localhost:5000/filter?date=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data.data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const displayResults = () => {
  //   console.log(filteredData);
  //   return filteredData.map((doc) => (
  //     <li key={doc._id}>
  //       {doc.name} - {doc.dept} - {doc.entryAt.slice(11, 19)}
  //     </li>
  //   ));
  // };

  return (
    <div>
      <Link to="/" style={{ color: "aqua" }}>
        Home
      </Link>

      {filteredData.length > 0 && (
        <CsvDownloadButton
          filename={
            moment().tz("Asia/Kolkata").format().slice(0, 10) + "_student_data"
          }
          headers={[
            "_id",
            "Admission_no",
            "Name",
            "Semester",
            "Dept",
            "Course",
            "Section",
            "Register_no",
            "Entry",
            "_v",
          ]}
          delimiter=","
          data={filteredData}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>

      <MDBDataTable
        striped
        bordered
        small
        data={data}
        // paging={false}
      />

      {/* <ul id="resultsList">{displayResults()}</ul> */}
    </div>
  );
}

export default Report;
