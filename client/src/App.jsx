import "./App.css";
import Search from "./Components/Search";
import Content from "./Components/Content";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [header, setHeader] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);

  useEffect(() => {
    //gets all of the contacts
    axios
      .get("http://localhost:5001/api/contacts")
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
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
  }, []);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Search
            className="seach-container"
            setSearchQuery={setSearchQuery}
            setContacts={setContacts}
            header={header}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
          />
          <Content
            className="content"
            contacts={contacts}
            setContacts={setContacts}
            favorites={favorites}
            setFavorites={setFavorites}
            setHeader={setHeader}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
            setSelectedContact={setSelectedContact}
            selectedContact={selectedContact}
          />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
