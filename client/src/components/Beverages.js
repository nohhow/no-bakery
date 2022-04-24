import americano from "../images/beverage/americano.jpg";
import sangria from "../images/beverage/sangria.jpg";
import milktea from "../images/beverage/milktea.jpg";

function Beverages() {
  const beverages = [
    {
      name: "아메리카노",
      img: `${americano}`,
      category: "beverage",
    },
    {
      name: "샹그리아",
      img: `${sangria}`,
      category: "beverage",
    },
    {
      name: "밀크티",
      img: `${milktea}`,
      category: "beverage",
    },
  ];
  return beverages;
}

export default Beverages;
