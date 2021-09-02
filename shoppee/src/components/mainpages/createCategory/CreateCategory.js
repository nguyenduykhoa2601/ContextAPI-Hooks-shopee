import axios from 'axios';
import React, { useContext, useState,useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './createCategory.css'
const CreateCategory = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')
    useEffect(() => {
        AOS.init({duration: 1000})
    }, []);
    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="grid">
            <div className="category" data-aos="zoom-in-down">
                <div className="create__category">
                    <h1 className="create__category-heading">Tạo loại sản phẩm</h1>
                    <form className="create__category-body" onSubmit={createCategory}>
                        <input
                            className="create__category-input"
                            type="text"
                            name="category"
                            value={category}
                            required
                            onChange={e => setCategory(e.target.value)}
                            placeholder="Nhập"
                        /> <br /> <br />
                        <button type="submit" className="create__category-submit">{onEdit ? "Cập nhật" : "Tạo"}</button>
                    </form>
                </div>
                <div className="update__category">
                    <h1 className="update__category-heading">Thông tin chi tiết loại sản phẩm</h1>
                    <table className="detail__category">
                        <thead className="detail__table-title">
                            <tr>
                                <th>STT</th>
                                <th>Tên loại sản phẩm</th>
                                <th>Thời gian tạo</th>
                                <th>Thời gian cập nhật</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>

                            {categories.map((category, index) => {
                                return (
                                    <tr className="category__item" key={index}>
                                        <td className="category__item-ordinal">{index + 1}</td>
                                        <td className="category__item-name">{category.name}</td>
                                        <td className="category__item-create">{category.createdAt}</td>
                                        <td className="category__item-update">{category.updatedAt}</td>
                                        <td className="category__item-action">
                                            <button className="category__item-fix" onClick={() => editCategory(category._id, category.name)}>Sửa</button>
                                            <button className="category__item-delete" onClick={() => deleteCategory(category._id)}>Xóa</button>

                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}

export default CreateCategory;
