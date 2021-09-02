import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './createProduct.css';

import { useHistory, useParams } from 'react-router';
const initialState = {
    product_id: '',
    title: '',
    description: '',
    content: '',
    price: 0,
    category: '',
    origin: '',
    brand: '',
    sale: '0'

}
const CreateProduct = () => {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const params = useParams()
    const history=useHistory()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback
    useEffect(()=>{
        AOS.init({duration: 1000})
    },[])
    useEffect(()=>{
        if(params.id){
            setOnEdit(true)
            products.forEach(product=>{
                if (product._id === params.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }
        else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[params.id,products])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Bạn không phải AD")
            const file = e.target.files[0]

            if (!file) return alert("Chưa chọn file")

            if (file.size > 1024 * 1024)
                return alert("Kích cỡ ảnh vượt quá 1024*1024")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("Chỉ được upload ảnh dạng png hoặc jpeg")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy = async () => {
        try {
            if (!isAdmin) alert('Bạn không phải là AD')
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }

    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) alert('Bạn không phải AD')
            if (!images) alert('Thêm ảnh trước khi tạo sản phẩm')
            if (onEdit){
                await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers: {Authorization : token}
                })
            }
            else{
                await axios.post('/api/products',{...product,images},{
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    console.log(images)
    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="grid">
            <div className="create__product">
                <h1 data-aos="fade-in">Thông tin sản phẩm</h1>
                <form className="product__form" onSubmit={submitForm}>

                    <div className="input__detail">
                        <div className="input__detail-product"  data-aos="fade-in">
                            ID- Sản phấm

                            <input name="product_id" value={product.product_id} required onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product"  data-aos="fade-in">
                            Tiêu đề sản phẩm (tên sản phẩm)
                            <input name="title" value={product.title} required onChange={handleChangeInput} />
                        </div >
                        <div className="input__detail-product"  data-aos="fade-in">
                            Tóm tắt sản phẩm
                            <textarea className="input__detail-desc" name="description" value={product.description} onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product"  data-aos="fade-in">
                            Nội dung chi tiết sản phẩm
                            <textarea className="input__detail-content" name="content" value={product.content} onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product"  data-aos="fade-in">
                            Giá sản phẩm
                            <input type="number" name="price" value={product.price} onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product"  data-aos="fade-up">
                            Phân loại sản phẩm
                            <select name="category" value={product.category} onChange={handleChangeInput}>
                                <option>Chọn loại sản phẩm</option>
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category._id}>{category.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="input__detail-product" data-aos="fade-up">
                            Thương hiệu
                            <input name="brand" value={product.brand} onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product" data-aos="fade-up">
                            Nguồn gốc
                            <input name="origin" value={product.origin} onChange={handleChangeInput} />
                        </div>
                        <div className="input__detail-product" data-aos="fade-up">
                            Giảm giá
                            <input type="number" name="sale" value={product.sale} onChange={handleChangeInput} placeholder="Đơn vị (%)" />
                        </div>
                        <div className="input__detail-product" data-aos="fade-up">
                            <button type="submit" className="product__form-submit">{onEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</button>
                        </div>

                    </div>
                    <div className="form__img" data-aos="fade-in">
                        <input type="file" name="file" className="input__img" onChange={handleUpload}  />
                        {
                            loading ? <div className="file_img"><Loading /></div>

                                : <div className="file_img" style={styleUpload}>
                                    <img src={images ? images.url : ''} alt="" />
                                    <span onClick={handleDestroy}>X</span>
                                </div>
                        }
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
