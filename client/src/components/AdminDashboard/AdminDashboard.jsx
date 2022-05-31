import React, { useState, useEffect } from "react";
import Link from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postWine } from "../../redux/actions/actions";


export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    year: "",
    description: "",
    img: "",
    category: [],
    price: "",
    country: "",
  });
  let category = useSelector((state) => state.categories);

useEffect(()=>{
    dispatch(getCategories())
},[dispatch])

  return (
    <div>
      <form>
        <ul>
          <li>
            <label>NOMBRE:</label>
            <input type="text" placeholder="NOMBRE" />
          </li>
          <li>
            <label>AÑO:</label>
            <input type="text" placeholder="AÑO" />
          </li>
          <li>
            <label>DESCRIPCION:</label>
            <input type="text" placeholder="DESCRIPCION" />
          </li>
          <li>
            <label>CATEGORIA:</label>
            <select type="text" placeholder="CATEGORIA" />
          </li>
          <li>
            <label>PRECIO:</label>
            <select type="text" placeholder="PRECIO" />
          </li>
        </ul>
      </form>
    </div>
  );
};
