import americano from "../images/beverage/americano.jpg";
import sangria from "../images/beverage/sangria.jpg";
import milktea from "../images/beverage/milktea.jpg";

function Beverages() {
  const beverages = [
    {
      id:101,
      name: "아메리카노",
      img: `${americano}`,
      category: "beverage",
    },
    {
      id:102,
      name: "샹그리아",
      img: `${sangria}`,
      category: "beverage",
    },
    {
      id:103,
      name: "밀크티",
      img: `${milktea}`,
      category: "beverage",
    },
  ];
  return beverages;
}

export default Beverages;
