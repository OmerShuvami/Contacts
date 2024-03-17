import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

function Contact({
  element,
  index,
  setFavorites,
  setContacts,
  selectedContact,
  currentlyEditing,
  setCurrentlyEditing,
  setSelectedContact,
}) {
  const [favoriteContact, setFavoriteContact] = useState(element.isFavorite);

  const handleFavoritesToggle = (contactId) => {
    console.log(contactId);
    //toggles a contact's favorite status
    axios
      .post(`http://localhost:5001/api/contacts/favorites/${contactId}`)
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
        setFavoriteContact(!favoriteContact); // Update the state with the fetched data
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/contacts/${element._id}`)
      .then((response) => {
        // console.log(response.data);
        setFavoriteContact(response.data.isFavorite); // Update the state with the fetched data
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleContactEdit = (event, contactId) => {
    event.stopPropagation(); // Stop event propagation
    setCurrentlyEditing(contactId);
  };

  const handleContactDelete = (event, contactId) => {
    event.stopPropagation(); // Stop event propagation

    axios
      .delete(`http://localhost:5001/api/contacts/delete/${contactId}`)
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const toggleIcons = (contactId) => {
    selectedContact == contactId
      ? setSelectedContact(null)
      : setSelectedContact(contactId);
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div key={index} className="contacts">
      <div
        className="contact-container"
        onClick={() => toggleIcons(element._id)}
      >
        <div className="contact-preview">
          <div>
            <h2>
              <span className="picture">
                {element.image ? (
                  <img
                    src={element.image}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <MdAccountCircle className="profile-icon" />
                )}
              </span>{" "}
              <span>{element.firstName}</span>{" "}
              {element.lastName && <span>{element.lastName}</span>}{" "}
            </h2>
          </div>
          <FaPhone
            className="call"
            onClick={(event) => {
              event.stopPropagation(); // Prevents the click event from reaching the parent container
              handleCall(element.numbers[0].number); // Dial the first number
            }}
          />
        </div>
        {selectedContact == element._id && (
          <div className="hidden-info">
            <div className="contact-icons">
              <div
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the click event from reaching the parent container
                  handleFavoritesToggle(element._id);
                }}
              >
                {favoriteContact ? (
                  <AiFillStar style={{ color: "var(--primary)" }} />
                ) : (
                  <AiOutlineStar />
                )}
              </div>
              <div
                className="pen"
                onClick={(event) => handleContactEdit(event, element._id)}
              >
                <MdOutlineModeEdit />
              </div>
              <div
                className="trash"
                onClick={(event) => handleContactDelete(event, element._id)}
              >
                <TbTrash />
              </div>
            </div>
            <div className="contact-info-container">
              <div>
                {element.numbers.map((number, i) => {
                  return (
                    <p
                      className="contact-info"
                      key={i}
                      onClick={(event) => {
                        event.stopPropagation(); // Prevents the click event from reaching the parent container
                        handleCall(number.number); // Call the number
                      }}
                    >
                      <b>
                        {number.type.charAt(0).toUpperCase() +
                          number.type.slice(1)}
                      </b>{" "}
                      <b>&middot;</b> <span>{number.number}</span>
                    </p>
                  );
                })}
              </div>
              {element.email && (
                <div>
                  <hr className="hr" style={{ margin: 0 }} />
                  <p
                    className="contact-info email"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents the click event from reaching the parent container
                      handleEmail(element.email); // Open email client
                    }}
                  >
                    {element.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <hr className="hr" />
    </div>
  );
}

export default Contact;
