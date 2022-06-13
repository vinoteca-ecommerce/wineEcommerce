import React, { useState } from "react";
import style from "./CardProduct.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  deleteFav,
  getShoppingCar,
  getWineName,
  getWines,
  getWinesCopy,
  postPurchase,
  setShoppingCar,
  updateCart,
} from "../../redux/actions/actions";
import swal from "sweetalert";
import { useEffect } from "react";

export const CardProduct = ({
  id,
  name,
  price,
  img,
  category,
  year,
  description,
  strain,
  producer,
  country,
  stock,
}) => {
  const dispatch = useDispatch();

  const [arr, setArr] = useState(localStorage.getItem("favorites"));
  const winesCopy = useSelector((state) => state.winesCopy);
  let store = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((state) => state.Cart);

  useEffect(() => {
    if (!store) {
      dispatch(getWinesCopy());
    } else {
      dispatch(getWinesCopy());
      dispatch(getShoppingCar());
    }
  }, []);

  const handleFavs = (
    name,
    year,
    description,
    img,
    strain,
    producer,
    id,
    price,
    country
  ) => {
    const input = {
      id: id,
      name: name,
      price: price,
      img: img,
      category: category,
      year: year,
      description: description,
      strain: strain,
      producer: producer,
      country: country,
    };

    if (!localStorage.getItem("favorites")?.includes(id)) {
      store && store.user && dispatch(addFavorites(input));

      let state = JSON.parse(localStorage.getItem("favorites"));

      if (state === null) state = [id];
      else state.push(id);

      localStorage.setItem("favorites", JSON.stringify(state));

      setArr(state);
      swal({
        title: "Vino Añadido",
        text: `${name} agregado a Favoritos`,
        icon: "success",
        button: "Aceptar",
      });
    } else {
      dispatch(deleteFav(id));

      let state = JSON.parse(localStorage.getItem("favorites"));
      state = state.filter((fav) => fav !== id);

      localStorage.setItem("favorites", JSON.stringify(state));

      setArr(state);
      swal({
        title: "Vino Eliminado",
        text: `${name} eliminado de Favoritos`,
        icon: "success",
        button: "Aceptar",
      });
    }
  };

  const email = store?.user?.email;

  const handleClickShopping = (id) => {
    if (!store) {
      let products = JSON.parse(localStorage.getItem("productsInCart") || "[]");
      let wineActual = winesCopy.result.find((e) => e._id === id);

      let vinoSum = products.find((e) => e.wineActual._id === wineActual._id);
     
     
      if(wineActual.stock <= 0){
        return swal({
          title: "Fuera de stock",
          text: `${name} fuera de stock`,
          icon: "error",
          button: "Aceptar",
        });
      }
      if (vinoSum ) {
        vinoSum.cant += 1;

        localStorage.setItem("productsInCart", JSON.stringify(products));
        return swal({
          title: "Vino Añadido",
          text: `${name} agregado a carrito`,
          icon: "success",
          button: "Aceptar",
        });
      }
      if (wineActual && !vinoSum) {
        let data = {
          wineActual,
          cant: 1,
        };
        products.push(data);
        localStorage.setItem("productsInCart", JSON.stringify(products));
        return swal({
          title: "Vino Añadido",
          text: `${name} agregado a carrito`,
          icon: "success",
          button: "Aceptar",
        });
      }
    } else {
      let wineActual = winesCopy.result.find((e) => e._id === id);

      let wineStockcarro = cart.find((e) => e.wineActual._id === id);

      if (wineActual.stock <= 0) {
        return swal({
          title: "Fuera de stock",
          text: `${name} fuera de stock`,
          icon: "error",
          button: "Aceptar",
        });
      }
      if (!wineStockcarro) {
        let data = {
          wineActual,
          cant: 1,
        };

        dispatch(updateCart(data));
        dispatch(setShoppingCar(cart));
        return swal({
          title: "Vino Añadido",
          text: `${name} agregado a carrito`,
          icon: "success",
          button: "Aceptar",
        });
      } else if (wineStockcarro.cant < wineActual.stock) {
        let data = {
          wineActual,
          cant: 1,
        };
        dispatch(updateCart(data));
        dispatch(setShoppingCar(cart));
        return swal({
          title: "Vino Añadido",
          text: `${name} agregado a carrito`,
          icon: "success",
          button: "Aceptar",
        });
      } else {
        return swal({
          title: "Fuera de stock",
          text: `${name} fuera de stock`,
          icon: "error",
          button: "Aceptar",
        });
      }
    }
  };

  return (
    /*  name, year, description, img, strain, producer,  ID  de category, price, country */
    <div className={style.card}>
      <Link
        to={`/cardDetail/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img className={style.cardImg} src={img} alt={name} />
        <div className={style.cardInfo}>
          <p className={style.textTitle}>{name}</p>
          <p className={style.textBody}>{category}</p>
        </div>
      </Link>
      <div className={style.cardFooter}>
        <span className={style.textTitle}>${price}.00</span>
        {store && store.user && store.user.role && (
          <div
            className={
              arr?.includes(id) ? style.cardButtonFav : style.cardButton
            }
          >
            <FavoriteBorderIcon
              className={style.svgIcon}
              onClick={() =>
                handleFavs(
                  name,
                  year,
                  description,
                  img,
                  strain,
                  producer,
                  id,
                  price,
                  country
                )
              }
            />
          </div>
        )}

        <div className={style.cardButton}>
          <AddShoppingCartIcon
            className={style.svgIcon}
            onClick={() => handleClickShopping(id)}
          />
        </div>
      </div>
    </div>
  );
};
