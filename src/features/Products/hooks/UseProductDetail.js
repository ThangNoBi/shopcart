import { useEffect, useState } from "react";
import proDuctAPI from "../../../API/productApi";

export default function useProductDetail(prodID) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await proDuctAPI.get(prodID);
        setProduct(res);
      } catch (error) {
        console.log("Failed to fetch Product Detail", error);
      }

      setLoading(false);
    })();
  }, [prodID]);

  return { product, loading };
}
