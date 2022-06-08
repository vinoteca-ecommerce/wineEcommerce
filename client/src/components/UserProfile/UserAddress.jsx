import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserAddress } from "../../redux/actions/actions";
import UserAddressCard from "../UserProfile/UserAddressCard";

export const UserAddress = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.userAddress);

  useEffect(() => {
    dispatch(getUserAddress());
  }, [dispatch]);

  return (
    <div>
      <h1>Mi direccion</h1>
      {userAddress?.map((e) => (
        <UserAddressCard
          address={e.address}
          name={e.name}
          city={e.city}
          province={e.province}
          phone_number={e.phone_number}
          notes={e.notes}
        />
      ))}
    </div>
  );
};
