'use server'

import User, { IUser } from "@/database/user.model"
import { connectToDataBase } from "../mongoose"

export async function getUserById({ userId }: { userId: string }) {
    try {
        connectToDataBase()
        const user = await User.findOne<IUser>(
            { clerkId: userId }
        )

        if (!user) console.log('cant found')

        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}