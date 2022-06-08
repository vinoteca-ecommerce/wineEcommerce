import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getUserAddress } from "../../redux/actions/actions";
import UserAddressCard from '../UserProfile/UserAddressCard'



export const UserAddress = () => {
const dispatch = useDispatch()
const userAddress = useSelector((state) => state.userAddress);

 useEffect(() => {
   dispatch(getUserAddress())
 }, [dispatch])

//  return (
//    <div>
//      <UserAddressCard/>
//    </div>
//  );

{userAddress?.map((a) => {
return (
      <UserAddressCard
        key={a.name}
        name={a.name}
        address={a.address}
        city={a.city}
        province={a.province}
        phone_number={a.phone_number}
        notes={a.notes}
      />
  );
})}
  
}


