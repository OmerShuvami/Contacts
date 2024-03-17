import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";


function Search({
  setSearchQuery,
  setContacts,
  header,
  setCurrentlyEditing,
  currentlyEditing,
}) {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data.searchQuery.length > 0
      ? axios
          .get(`http://localhost:5001/api/contacts/search/${data.searchQuery}`)
          .then((response) => {
            console.log(response.data);
            setContacts(response.data);
          })
          .catch((err) => {
            console.error(err);
          })
      : axios
          .get(`http://localhost:5001/api/contacts/`)
          .then((response) => {
            console.log(response.data);
            setContacts(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-container">
     <div style={{width: "100%" , height:"100%" ,display:"grid" , placeItems:"center"}}>
        {header == "Search" ? (
          <label className="search-bar">
            <input
              className="input"
              type="text"
              {...register("searchQuery")}
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-icon">
              <AiOutlineSearch />
            </button>
          </label>
        ) : header == "Edit Contact" ? (
          <h1><span className="arrow-back" onClick={()=>setCurrentlyEditing(null)}> <IoMdArrowRoundBack /></span>{header}</h1>
        ) : (
          <h1>{header}</h1>
        )}
     </div>
    </form>
  );
}

export default Search;
