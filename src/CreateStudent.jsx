import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(true);

    if (!id || !name || !place || !phone) {
      return; // Stop if any field is empty
    }

    fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, place, phone }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save student");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        alert("Student data saved successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("An error occurred while saving the data.");
      });
  };

  return (
    <div className="container-main">
      <h2>Add New Student</h2>

      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onMouseDown={()=>setValidation(true)}
          />
          {id.length === 0 && validation && (
            <span className="errorMsg">Please enter your ID</span>
          )}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseDown={()=>setValidation(true)}
          />
          {name.length === 0 && validation && (
            <span className="errorMsg">Please enter your name</span>
          )}

          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onMouseDown={()=>setValidation(true)}
          />
          {place.length === 0 && validation && (
            <span className="errorMsg">Please enter your place</span>
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onMouseDown={()=>setValidation(true)}
          />
          {phone.length === 0 && validation && (
            <span className="errorMsg">Please enter your mobile number</span>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-save">
              Save
            </button>
            <Link to="/" className="btn-btn-back">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
