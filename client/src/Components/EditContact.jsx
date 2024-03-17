import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbTrash } from "react-icons/tb";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

function EditContact({
  setHeader,
  setCurrentlyEditing,
  currentlyEditing,
  setContacts,
  setFavorites,
}) {
  setHeader("Edit Contact");

  const { register, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      numbers: [],
      isFavorite: false,
      image: "",
    },
  });

  const [numbers, setNumbers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedContact, setEditedContact] = useState();

  //gets the specific user info using the id
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/contacts/${currentlyEditing}`)
      .then((response) => {
        console.log(response.data);
        setEditedContact(response.data);
        setNumbers([...response.data.numbers]);
        setSelectedImage(response.data.image);
        reset({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          numbers: response.data.numbers,
          isFavorite: response.data.isFavorite,
          image: response.data.image,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentlyEditing, setValue]);

  const handleImageDelete = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSelectedImage("");
    setValue("image", "");
  };

  //saves the changes of the user info
  const onSubmit = (data) => {
    data.numbers = numbers;
    data.isFavorite = editedContact.isFavorite;
    data.image = selectedImage;

    console.log(data);
    console.log(currentlyEditing);
    axios
      .patch(
        `http://localhost:5001/api/contacts/update/${currentlyEditing}`,
        data
      )
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
        const tempFavorites = response.data.filter(
          (contact) => contact.isFavorite === true
        );
        setFavorites(tempFavorites);
      })
      .catch((err) => {
        console.error(err);
      });

    setCurrentlyEditing(null);
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
    <div>
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
              <img
                src={selectedImage}
                alt="Profile"
                className="profile-image"
              />
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
                  <button
                    type="button"
                    onClick={() => handleRemoveNumber(index)}
                  >
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditContact;
