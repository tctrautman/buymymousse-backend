const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // Check if there is a current userId
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: {id: ctx.request.userId},
        }, info);
    },
    async users(parent, args, ctx, info) {
        // 1. Check if they're logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        
        // 2. Check if the user has the permissions to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
        
        // 3. if they do, query all the users
        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        
        // 1. Make sure they are logged in
        if (!ctx.request.userId) {
            throw new Error("You aren't logged in!");
        }

        // 2. Query the current order
        const order = await ctx.db.query.order({
            where: { id: args.id },
        }, info);

        // 3. Check if they have the permissions to see this order
        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');

        if (!ownsOrder || !hasPermissionToSeeOrder) {
            throw new Error("You can't see this!")
        }

        // 4. Return the order
        return order;
    },
    async orders(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) {
            throw new Error('You must be signed in!')
        }
        return ctx.db.query.orders({
            where: {
                user: { id: userId }
            }
        }, info);
    }
};

module.exports = Query;
