import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({


        username: {
            type: String,
            required: true
        },

        email: {

            type: String,
            required: true
        },

        auth: {

                    password: {

                        type: String,
                        required: true,
                        select: false
                    },

                    sessionToken: {

                        type: String,
                        select: false
                    }
        }
   
}, {

    timestamps: true
})




export const UserModel = mongoose.model("SiteUser", UserSchema)

// actions
export const getUsers = () => UserModel.find();
export const getUserById = (id: String) => UserModel.findById(id)
export const getUserByEmail = (email: String) => UserModel.findOne({ email: email })
export const getUserBySessionId = (sessionToken: String) => UserModel.findOne({ "auth.sessionToken": sessionToken})
export const create_user = (values: Record<string, any>) => new UserModel(values).save().then(user => user.toObject())
export const update_user = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
export const delete_user = (id: String) => UserModel.findOneAndDelete({ _id: id})
