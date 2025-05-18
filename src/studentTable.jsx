import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate(`/student/view/${id}`);
  };

  const EditDetails = (id) => {
    navigate(`/student/edit/${id}`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to permanently remove this data?")) {
      fetch(`http://localhost:3001/students/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Removed student data successfully");
          // Optionally re-fetch instead of reloading the entire page
          setStudents(prev => prev.filter(student => student.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn">
          Add new Student
        </Link>

        <table>
          <thead>
            <tr>
              <th>S NO</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1 }</td>
                <td>{item.name}</td>
                <td>{item.place}</td>
                <td>{item.phone}</td>
                <td>
                  <div className="actions-container">
                    <button onClick={() => DisplayDetails(item.id)} className="btn-view">View</button>
                    <button onClick={() => EditDetails(item.id)} className="btn-edit">Edit</button>
                    <button onClick={() => RemoveDetails(item.id)} className="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
