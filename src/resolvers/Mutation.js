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
    }
};

module.exports = Mutations;
