import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
const router = express.Router()

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin') 
       return res.status(400).json({err: "Authentication is not valid"})

        const users = await Users.find().select('-password')
        res.json({users})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}




const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {userName, balance} = req.body
        const newUser = await Users.findOneAndUpdate({_id: result.id}, {userName, balance})
        res.json({
            msg: "Update Success!",
            user: {
                userName,
                role: newUser.role,
                balance: newUser.balance
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}