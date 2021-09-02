import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { GlobalState } from '../../../GlobalState';
import './static.css';


const Static = () => {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [categories] = state.categoriesAPI.categories
    const [token] = state.token
    const [history, setHistory] = useState([])
    const [soldPerCategory] = useState([])
    const [productsPerCategory] = useState([])
    const [categoriesName] = useState([])
    const [colorSold] = useState([])
    const [colorNum] = useState([])
    const [colorPie] = useState([])
    const [paymentDay] = useState([])
    const [totalPerDay,setTotalPerDay] = useState([])
    const [totalOrderPerDay,setTotalOrderPerDay] = useState([])
    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                }
                else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    }, [token, isAdmin])

    useEffect(() => {

        //Add Products to category
        categories.forEach(category => {
            category.products = []
        })
        categories.forEach(category => {
            products.forEach(product => {
                if (category._id === product.category) category.products.push(product)
            })
        })
        if (categoriesName.length === 0) {
            categories.filter(category => categoriesName.push(category.name))
        }

        //get SOLD per Category

        categories.forEach(category => {

            if (category.products.length !== 0) {
                const sold = category.products.reduce((prev, item) => {
                    return prev + item.sold
                }, 0)
                soldPerCategory.push(sold)
                productsPerCategory.push(category.products.length)
                colorSold.push('rgba(255,99,132,0.6)')
                colorNum.push('rgba(53,254,132,0.6)')
                colorPie.push(`rgba(${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0})`)
            }


        })



    }, [categories, products, categoriesName, colorSold, colorNum, colorPie, productsPerCategory, soldPerCategory])

    const addDays = (dateObj, numDays) => {
        dateObj.setDate(dateObj.getDate() - numDays);
        return dateObj;
    }


    const sevenDays = () => {
        const getSevenDays = []
        for (var i = 0; i < 7; i++) {
            const getDay = addDays(new Date(), i)
            var month = getDay.getUTCMonth() + 1; //months from 1-12
            var day = getDay.getUTCDate();
            var year = getDay.getUTCFullYear();
            const currentDay = day + "/" + month + "/" + year;

            getSevenDays.push(currentDay)
        }
        return getSevenDays
    }
    useEffect(() => {
        const getTotalWeek = async () => {
            const sevendays = sevenDays()
            var arrTotalQuantity = []
            var arrTotalOrder = []
            await sevendays.forEach(sevenday => {
                const sameDay = history.filter(his => {
                    const date = new Date(his.createdAt)
                    var month = date.getUTCMonth() + 1; //months from 1-12
                    var day = date.getUTCDate();
                    var year = date.getUTCFullYear();
                    const currentDay = day + "/" + month + "/" + year;
                    paymentDay.push(currentDay)
                    return currentDay === sevenday
                })
                
                arrTotalOrder.push(sameDay.length)
                var totalPerDay = 0
                
                if (sameDay.length !== 0) {
                    totalPerDay = sameDay.reduce((prev,     item) => {
                        var totalPerPay = item.cart.reduce((prevCart, itemCart) => {
                            return prevCart + itemCart.quantity
                        }, 0)
                        return prev + totalPerPay
                    }, 0)
                }
                arrTotalQuantity.push(totalPerDay)
                
            })
            setTotalPerDay(arrTotalQuantity)
            setTotalOrderPerDay(arrTotalOrder)
        }
        getTotalWeek()

    }, [history])


    const soldData = {
        labels: categoriesName,
        datasets: [
            {
                label: 'Đã bán',
                data: soldPerCategory,
                backgroundColor: colorSold,

            },
            {
                label: 'Tổng số lượng',
                data: productsPerCategory,
                backgroundColor: colorNum,
            }
        ],
    }
    const staticQuantityWeekly = {
        labels: sevenDays(),
        datasets: [
            {
                label: 'Đã bán',
                data: totalPerDay,
                backgroundColor: colorPie,

            },
        ],
    }
    const staticOrderWeekly = {
        labels: sevenDays(),
        datasets: [
            {
                label: 'Đã bán',
                data: totalOrderPerDay,
                backgroundColor: colorPie,

            },
        ],
    }
    return (
        <div className="grid">
            <div className="static">
                <h1>Thống kê trang web</h1>
                <div className="title__bar">Biểu đồ thống kê theo số lượng và doanh số</div>
                <Bar
                    data={soldData}
                    width={80}
                    height={40}

                />
                <div className="title__line">Biểu đồ thống kê theo số lượng sản phẩm bán theo tuần </div>
                <Line
                    data={staticQuantityWeekly}
                    width={80}
                    height={40}
                />
                 <div className="title__line">Biểu đồ thống kê theo số lượng đơn hàng theo tuần </div>
                <Line
                    data={staticOrderWeekly}
                    width={80}
                    height={40}
                />

            </div>

        </div>
    );
}

export default Static;
