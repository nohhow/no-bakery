import americano from "../images/beverage/americano.jpg";
import sangria from "../images/beverage/sangria.jpg";
import milktea from "../images/beverage/milktea.jpg";

function Beverages() {
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
      return beverages;
}

export default Beverages