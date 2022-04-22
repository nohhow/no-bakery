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
    
    return products;
}

export default Products