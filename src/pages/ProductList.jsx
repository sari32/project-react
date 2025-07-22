import React, { useState, useEffect } from 'react';
import { httpGetAllProducts, httpGetTotalPagesCount } from '../api/productService';
import Product from './Product';
import { httpRemoveProdutc } from '../api/productService';
import { Pagination, Stack, Box } from '@mui/material';

export default function ProductList() {
    let [arr, setArr] = useState([]);
    let [pagesCnt, setPagesCnt] = useState(1);
    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fromServer(currentPage);
    }, [currentPage]);

    function fromServer(page) {
        httpGetAllProducts(page)
            .then(res => {
                console.log(res);
                setArr(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Error fetching products");
            });

        httpGetTotalPagesCount()
            .then(res => {
                console.log(res.data);
                setPagesCnt(res.data.pages);
            })
            .catch(err => {
                console.log(err);
                alert("Error fetching page numbers");
            });
    }

    function removeProduct(product) {
        httpRemoveProdutc(product);
        let newArr = arr.filter(item => item._id !== product._id);
        setArr(newArr);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* רשימת מוצרים */}
            <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {arr.map(item => (
                    <Product key={item._id} product={item} removeProduct={removeProduct} />
                ))}
            </div>

            {/* דפדוף עם MUI */}
            <Stack spacing={2} sx={{ mt: 3 }}>
                <Pagination 
                    count={pagesCnt} 
                    page={currentPage} 
                    onChange={(event, value) => setCurrentPage(value)} 
                    color="primary" 
                    size="large"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                />
            </Stack>
        </Box>
    );
}
