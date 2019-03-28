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
    }
};

module.exports = Mutations;
