import React from "react";
import { RiContactsLine } from "react-icons/ri";
import { RiContactsFill } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function Menu({ currentlyEditing }) {
  return currentlyEditing ? null : (
    <div className="menu-icons">
      <div>
        <NavLink to="" end className="menu-icon">
          <RiContactsLine />
          <RiContactsFill />
        </NavLink>
      </div>
      <div>
        <NavLink to="add-contact" className="menu-icon">
          <AiOutlinePlusCircle />
          <AiFillPlusCircle />
        </NavLink>
      </div>
      <div>
        <NavLink to="favorites" className="menu-icon">
          <AiOutlineStar />
          <AiFillStar />
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
