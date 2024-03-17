import React, { useEffect } from "react";
import Contact from "./Contact";
import EditContact from "./EditContact";
import axios from "axios";

function Favorites({
  favorites,
  setFavorites,
  setHeader,
  selectedContact,
  currentlyEditing,
  setCurrentlyEditing,
  setSelectedContact,
  setContacts,
}) {
  setHeader("Favorites");

  useEffect(() => {
    //gets all of the contacts
    axios
      .get("http://localhost:5001/api/contacts")
      .then((response) => {
        console.log(response.data);
        const sortedContacts = response.data.sort((a, b) => {
          const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
          const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        setContacts(sortedContacts);
      })
      .catch((err) => {
        console.error(err);
      });

    //gets the favorite contacts
    axios
      .get("http://localhost:5001/api/contacts/favorites")
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    //sort contacts by name
  }, []);

  return (
    <div className="favorites-container">
      {currentlyEditing ? (
        <EditContact
        setHeader={setHeader}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        setContacts={setContacts}
        setFavorites={setFavorites}
        />
      ) : (
        favorites &&
        favorites.map((element, index) => {
          return (
            <Contact
              key={index}
              element={element}
              index={index}
              setFavorites={setFavorites}
              currentlyEditing={currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}
              setSelectedContact={setSelectedContact}
              selectedContact={selectedContact}
            />
          );
        })
      )}
    </div>
  );
}

export default Favorites;
