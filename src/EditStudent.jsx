import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function EditStudent() {
  const { studentid } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((err) => console.log(err.message));
  }, [studentid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(true);

    if (!id || !name || !place || !phone) return;

    const updatedStudent = { id, name, place, phone };

    fetch(`http://localhost:3001/students/${studentid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    })
      .then(() => {
        alert("Student data updated successfully");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container-main">
      <h2>Edit Student Details</h2>

      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            required
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onMouseDown={() => setValidation(true)}
          />
          {id.length === 0 && validation && (
            <span className="errorMsg">Please enter your ID</span>
          )}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            required
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
            required
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
            required
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onMouseDown={()=>setValidation(true)}
          />
          {phone.length === 0 && validation && (
            <span className="errorMsg">Please enter your mobile number</span>
          )}

          <div>
            <button type="submit" className="btn btn-save">
              Update
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

export default EditStudent;
