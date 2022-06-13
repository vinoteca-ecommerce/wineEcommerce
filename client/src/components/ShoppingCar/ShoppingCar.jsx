import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setShoppingCar,
  getShoppingCar,
  getWinesById,
  getWines,
  updateCart,
  getWinesCopy,
  updateCartSub,
  filterCart,
  deleteCart,
} from "../../redux/actions/actions";
import style from "./ShoppingCar.module.css";
import { ShoppingCarTotal } from "../ShoppingCarTotal/ShoppingCarTotal";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export function ShoppingCar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart);
  const winesCopy = useSelector((state) => state.winesCopy);
  const cartLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
  let userNoId = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userNoId === null) {
      dispatch(getWinesCopy());
    } else {
      dispatch(getShoppingCar());
      dispatch(getWinesCopy());
    }
  }, [cartLocalStorage]);

  const handleClickAdd = (id) => {
    let wineActual = winesCopy.result.find((e) => e._id === id);

    let wineStockcarro = cart.find((e) => e.wineActual._id === id);

    if (!wineStockcarro) {
      let data = {
        wineActual,
        cant: 1,
      };
      dispatch(updateCart(data));
      dispatch(setShoppingCar(cart));
    } else if (wineStockcarro.cant < wineActual.stock) {
      let data = {
        wineActual,
        cant: 1,
      };
      dispatch(updateCart(data));
      dispatch(setShoppingCar(cart));
      dispatch(getShoppingCar());
    } else {
      return swal({
        title: "Fuera de stock",
        text: `fuera de stock`,
        icon: "error",
        button: "Aceptar",
      });
    }
    dispatch(getShoppingCar());
  };

  const handleClickSub = (id) => {
    let wineActual = winesCopy.result.find((e) => e._id === id);
    let wineStockcarro = cart.find((e) => e.wineActual._id === id);

    if (wineStockcarro.cant > 1) {
      let data = {
        wineActual,
        cant: 1,
      };
      dispatch(updateCartSub(data));
      dispatch(setShoppingCar(cart));
      dispatch(getShoppingCar());
    } else {
      return;
    }
    dispatch(getShoppingCar());
  };

  function handleClickThrash(id) {
    let x = cart;
    var xfilter = x.filter((e) => e.wineActual._id !== id);

    dispatch(filterCart(id));

    dispatch(setShoppingCar(xfilter));
  }

  function handleDelete(id) {
    if (cartLocalStorage.length > 1) {
      let filter = cartLocalStorage.filter((e) => e.wineActual._id !== id);
      localStorage.setItem("productsInCart", JSON.stringify(filter));
    } else {
      if (cartLocalStorage.length <= 1) {
        window.localStorage.removeItem("productsInCart");
      }
    }
  }

  return (
    <div className={style.container}>
      {userNoId && cart?.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "4.4em",
          }}
        >
          <h3 className={style.carrito}>
            Carrito vacio, ve a agregar productos!
          </h3>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ mt: "2.1em" }}>
              Ir a Productos
            </Button>
          </Link>
        </div>
      ) : userNoId && cart?.length ? (
        <>
          <table className={style.table}>
            <thead className={style.tableHead}>
              <tr>
                <td></td>
                <td>Producto</td>
                <td>Nombre</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>SubTotal</td>
              </tr>
            </thead>
            {cart?.map((st) => (
              <tbody key={st.wineActual._id} className={style.tableBody}>
                <tr>
                  <td style={{ width: "40px" }}>
                    <Button
                      onClick={() => handleClickThrash(st.wineActual._id)}
                      style={{
                        maxWidth: "35px",
                        maxHeight: "35px",
                        minWidth: "35px",
                        minHeight: "35px",
                        color: "#ff0000",
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </Button>
                  </td>
                  <td>
                    <img
                      src={st.wineActual?.img}
                      alt={st.wineActual?.name}
                      style={{ width: "70px", height: "auto" }}
                    />
                  </td>
                  <td>{st.wineActual.name}</td>
                  <td>${Math.round(st.wineActual.price * (100 - st.wineActual?.discount) / 100)}.00</td>
                  <td>
                    {
                      <div>
                        <Button
                          onClick={() => handleClickSub(st.wineActual._id)}
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            color: "#7f0000",
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <p
                          style={{
                            display: "inline",
                            color: "#7f0000",
                            padding: ".2em .5em",
                            margin: ".5em",
                            border: "2px solid #7f0000",
                            borderRadius: "1em",
                            fontSize: "1em",
                          }}
                        >
                          {st.cant}
                        </p>
                        <Button
                          onClick={() => handleClickAdd(st.wineActual._id)}
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            color: "#7f0000",
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    }
                  </td>
                  <td>${st.cant * (Math.round(st.wineActual.price * (100 - st.wineActual.discount) / 100))}.00</td>
                </tr>
              </tbody>
            ))}
          </table>
          <ShoppingCarTotal />
        </>
      ) : !userNoId && !cartLocalStorage ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "4.4em",
          }}
        >
          <h3 className={style.carrito}>
            Carrito vacio, ve a agregar productos!
          </h3>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ mt: "2.1em" }}>
              Ir a Productos
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <table className={style.table}>
            <thead className={style.tableHead}>
              <tr>
                <td></td>
                <td>Producto</td>
                <td>Nombre</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>SubTotal</td>
              </tr>
            </thead>
            {cartLocalStorage?.map((st) => (
              <tbody key={st.wineActual._id} className={style.tableBody}>
                <tr>
                  <td style={{ width: "40px" }}>
                    <Button
                      onClick={() => handleDelete(st.wineActual._id)}
                      style={{
                        maxWidth: "35px",
                        maxHeight: "35px",
                        minWidth: "35px",
                        minHeight: "35px",
                        color: "#ff0000",
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </Button>
                  </td>
                  <td>
                    <img
                      src={st.wineActual?.img}
                      alt={st.wineActual?.name}
                      style={{ width: "70px", height: "auto" }}
                    />
                  </td>
                  <td>{st.wineActual.name}</td>
                  <td>${Math.round(st.wineActual.price * (100 - st.wineActual.discount) / 100)}.00</td>
                  <td>
                    {
                      <div>
                        <Button
                          onClick={() =>
                            swal({
                              title: "Porfavor ingresa o crea una cuenta",
                              text: `Debes estar resgistrado`,
                              icon: "info",
                              button: "Aceptar",
                            })
                          }
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            color: "#696969",
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <p
                          style={{
                            display: "inline",
                            color: "#7f0000",
                            padding: ".2em .5em",
                            margin: ".5em",
                            border: "2px solid #696969",
                            borderRadius: "1em",
                            fontSize: "1em",
                          }}
                        >
                          {st.cant}
                        </p>
                        <Button
                          onClick={() =>
                            swal({
                              title: "Porfavor ingresa o crea una cuenta",
                              text: `Debes estar resgistrado`,
                              icon: "info",
                              button: "Aceptar",
                            })
                          }
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            color: "#696969",
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    }
                  </td>
                  <td>${st.cant * (Math.round(st.wineActual.price * (100 - st.wineActual.discount) / 100))}.00</td>
                </tr>
              </tbody>
            ))}
          </table>
          <ShoppingCarTotal />
        </>
      )}
    </div>
  );
}
