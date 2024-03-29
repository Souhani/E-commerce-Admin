import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";
import Spinner from "@/components/Spinner";
export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
          return;
        }
        setIsLoading(false);
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
            setIsLoading(true);
        } );
    }, [id])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {!isLoading && <Spinner/>}
            {productInfo && <ProductForm {...productInfo}/>}
            
        </Layout>
    )
};