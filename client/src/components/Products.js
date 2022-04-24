import madeleine from "../images/bread/madeleine.jpg";
import muffin from "../images/bread/muffin.jpg";
import poundCake from "../images/bread/pound-cake.jpg";
import brownie from "../images/dessert/brownie.jpg";
import cookie from "../images/dessert/cookie.jpg";
import smore from "../images/dessert/smore.jpg";

function Products() {
    const products = [
        {
          name: "마들렌",
          img: `${madeleine}`,
          category: "dessert",
        },
        {
          name: "머핀",
          img: `${muffin}`,
          category:"bread",
        },
        {
          name: "파운드케이크",
          img: `${poundCake}`,
          category:"bread",
        },
        {
          name: "브라우니",
          img: `${brownie}`,
          category: "dessert",
        },
        {
          name: "쿠키",
          img: `${cookie}`,
          category: "dessert",
        },
        {
          name: "스모어 쿠키",
          img: `${smore}`,
          category: "dessert",
        },
      ];
    
    return products;
}

export default Products