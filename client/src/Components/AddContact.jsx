import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TbTrash } from "react-icons/tb";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

function AddContact({ setHeader, contacts, setContacts }) {
  const [numbers, setNumbers] = useState([{ type: "", number: "" }]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { register, control, handleSubmit } = useForm();
  let navigate = useNavigate();
  setHeader("Add Contact");

  const handleImageDelete = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSelectedImage("");
    setValue("image", "");
  };

  const onSubmit = (data) => {
    data.numbers = numbers;
    data.isFavorite = false;
    data.image = selectedImage;
    console.log(data);
    axios
      .post("http://localhost:5001/api/contacts/create", data)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddNumber = () => {
    setNumbers([...numbers, { type: "", number: "" }]);
  };
  const handleRemoveNumber = (index) => {
    let temp = [...numbers];
    temp.splice(index, 1);
    setNumbers(temp);
  };
  const handleType = (e, index) => {
    let temp = numbers;
    temp[index].type = e.target.value;
    setNumbers(temp);
  };

  const handleNumber = (e, index) => {
    let temp = numbers;
    temp[index].number = e.target.value;
    setNumbers(temp);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="addcontact-container">
      <div className="profile-image-container">
        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="profile-image-input">
          {selectedImage ? (
            <img src={selectedImage} alt="Profile" className="profile-image" />
          ) : (
            <MdAccountCircle className="profile-icon" />
          )}
        </label>
        <button className="trash can" onClick={handleImageDelete}>
          Delete Profile Image
        </button>
      </div>
      <div className="name-container">
        <input
          className="input"
          type="text"
          {...register("firstName")}
          placeholder="First Name"
        />
        <input
          className="input"
          type="text"
          {...register("lastName")}
          placeholder="Last Name"
        />
      </div>
      <div className="numbers-container">
        {numbers.map((number, index) => (
          <div key={index} className="numbers">
            <select
              className="input"
              {...register(`numbers[${index}].type`)}
              onChange={(e) => handleType(e, index)}
            >
              <option value="">Select Type</option>
              <option value="Mobile">Mobile</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
            <input
              className="input"
              {...register(`numbers[${index}].number`)}
              placeholder="Number"
              onChange={(e) => handleNumber(e, index)}
            />

            <div className="joined-button">
              <button type="button" onClick={handleAddNumber}>
                <AiOutlinePlusCircle />
              </button>
              {index > 0 ? (
                <button type="button" onClick={() => handleRemoveNumber(index)}>
                  <TbTrash />
                </button>
              ) : (
                <button type="button" className="disabled-button">
                  <TbTrash />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <input
        className="input"
        type="email"
        {...register("email")}
        placeholder="E-mail"
      />
      <button type="submit" className="button">
        Add Contact
      </button>
    </form>
  );
}

export default AddContact;
