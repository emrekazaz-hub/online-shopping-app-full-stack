import React from "react";
import Pagination from "../../Pagination/Pagination";
import { useCart } from "../../../../CartContext/CartContext";

const PaginationSuccess = () => {

    const { handleNavigate } = useCart();

    return(
        <div>
            <h2>Aliseris sonlandi. Bu Alisveris Dokum Sayfasi</h2>
            <div>
                <Pagination />

                <div>

                </div>

            </div>

        </div>
    );
}

export default PaginationSuccess;