const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async createItem(parent, args, ctx, info) {
        // To do: check if they're logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        console.log(item);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        // First take a copy of the updates
        const updates = { ...args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            }
        },
        info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where =  { id: args.id };
        // Find the item
        const item = await ctx.db.query.item({ where }, `{ id title }`);
        // Check if they own that item or have permissions
        // TODO
        // if so, delete it
        return ctx.db.mutation.deleteItem({ where }, info)
    },
    async signup(parent, args, ctx, info) {
        // Lowercase the user's email
        args.email = args.email.toLowerCase();
        // Hash their password
        const password = await bcrypt.hash(args.password, 10);
        // Create the user in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER']}
            }
        }, info);
        // Create the JWT token for them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // We set the JWT as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });

        return user;
    },
    async signin(parent, { email, password }, ctx, info) {
        // 1. Check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email: email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        
        // 3. generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        // 5. Return the user
        return user;
    }
};

module.exports = Mutations;
