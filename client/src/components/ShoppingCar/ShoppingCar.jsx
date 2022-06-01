import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const ShoppingCar = () => {

    let store = JSON.parse(localStorage.getItem('ShoppingCar'));

    console.log(store)
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>Nombre</td>
                    <td>Precio</td>
                    <td>Cantidad</td>
                </tr>
            </thead>
            {store?.map((st)=>(
                <tbody>
                    <tr>
                        <td><img src={st.img} alt={st.name} style={{width:'120px',height:'auto'}}/></td>
                        <td>{st.name}</td>
                        <td>{st.price}</td>
                        <td>{st.cont}</td>
                    </tr>
                </tbody>
            ))}
        </table>
    </div>
  )
}
