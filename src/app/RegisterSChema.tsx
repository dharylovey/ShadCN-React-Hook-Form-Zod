import {z} from 'zod'

export const schema = z.object({
    name: z.string().min(2, {message: 'Name is required'}).trim(),
    last: z.string().min(2, {message: 'Last name is required'}).trim(),
    email: z.string().min(1, {message: 'Email is required'}).trim().email({message: 'Please enter a valid email'}),
})