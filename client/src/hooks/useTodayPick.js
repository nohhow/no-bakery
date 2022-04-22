import { useState, useEffect } from "react";
import madeleine from "../images/bread/madeleine.jpg";
import muffin from "../images/bread/muffin.jpg";
import poundCake from "../images/bread/pound-cake.jpg";
import brownie from "../images/dessert/brownie.jpg";
import cookie from "../images/dessert/cookie.jpg";
import smore from "../images/dessert/smore.jpg";
import americano from "../images/beverage/americano.jpg";
import sangria from "../images/beverage/sangria.jpg";
import milktea from "../images/beverage/milktea.jpg";



export const useTodayPick = () => {
  const [todayPick, setTodayPick] = useState({});
  const [todayPick2, setTodayPick2] = useState({});

  const products = [
    {
      name: "마들렌",
      img: `${madeleine}`,
    },
    {
      name: "머핀",
      img: `${muffin}`,
    },
    {
      name: "파운드케이크",
      img: `${poundCake}`,
    },
    {
      name: "브라우니",
      img: `${brownie}`,
    },
    {
      name: "쿠키",
      img: `${cookie}`,
    },
    {
      name: "스모어 쿠키",
      img: `${smore}`,
    },
  ];

  const beverages = [
    {
        name:"아메리카노",
        img: `${americano}`,
    },
    {
        name:"샹그리아",
        img: `${sangria}`
    },
    {
        name:"밀크티",
        img: `${milktea}`
    }

  ];

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * products.length);
    const randomValue2 = Math.floor(Math.random() * beverages.length);

    setTodayPick(products[randomValue]);
    setTodayPick2(beverages[randomValue2]);

  }, [])
  
  return [todayPick, todayPick2];
};
