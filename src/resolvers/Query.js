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
    }
};

module.exports = Query;
