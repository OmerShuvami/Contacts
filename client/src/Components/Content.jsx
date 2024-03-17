import React, { useState } from "react";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import Favorites from "./Favorites";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";

function Content({
  contacts,
  setContacts,
  favorites,
  setFavorites,
  setSearchQuery,
  setHeader,
  setCurrentlyEditing,
  currentlyEditing,
  selectedContact,
  setSelectedContact,
}) {
  return (
    <div>
      <div className="content-container">
        <Routes>
          <Route
            index
            element={
              <Contacts
                contacts={contacts}
                favorites={favorites}
                setFavorites={setFavorites}
                setHeader={setHeader}
                setContacts={setContacts}
                currentlyEditing={currentlyEditing}
                setCurrentlyEditing={setCurrentlyEditing}
                setSelectedContact={setSelectedContact}
                selectedContact={selectedContact}
              />
            }
          />
          <Route
            path="/add-contact"
            element={
              <AddContact
                setHeader={setHeader}
                setContacts={setContacts}
                contacts={contacts}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                setHeader={setHeader}
                currentlyEditing={currentlyEditing}
                setCurrentlyEditing={setCurrentlyEditing}
                setSelectedContact={setSelectedContact}
                selectedContact={selectedContact}
                setContacts={setContacts}
              />
            }
          />
        </Routes>
      </div>
      <Menu currentlyEditing={currentlyEditing}/>
    </div>
  );
}

export default Content;
