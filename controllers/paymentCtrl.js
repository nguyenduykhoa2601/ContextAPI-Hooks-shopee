const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại" })

            const { cart, address, phone, time, enabletime, requirement,total } = req.body;

            const { _id, name, email } = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, address, time, phone, enabletime, requirement,total
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })


            await newPayment.save()
            res.json({ msg: "Đặt hàng thành công" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePayment: async(req, res) =>{
        try {
            await Payments.findByIdAndDelete(req.params.id)
            res.json({msg: "Đã xóa đơn hàng"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePayment: async(req,res)=>{
        try {
            const {confirm} = req.body;
    
            await Payments.findOneAndUpdate({_id: req.params.id}, {
                confirm: !confirm
            })

            res.json({msg: "Cập nhật đơn hàng thành công"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
