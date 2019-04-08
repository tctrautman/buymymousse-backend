# Back-end for BuyMyMousse

## Summary

This is the back-end of an e-commerce app, called Buy My Mousse, which I built in a tutorial as a way to use GraphQL for the first time, and refamiliarize myself with React's JavaScript syntax, after a year of using Reagent (a ClojureScript interface for React.)  You can find the back-end repo for this app [here](https://github.com/tctrautman/buymymousse-backend).

## What it does

With Buy My Mousse users buy and sell the best drink of all time (Pamplemousse La Croix) and less-good drinks like lime, lemon, and coconut La Croixs (referred to as green mousses, yellow mousses, and white mousses, respectively.)  To facilitate this, the app handles the following user flows:

### Signing up

![signup gif](https://res.cloudinary.com/dna5twsdm/image/upload/v1554747946/signup-gif.gif)

### Putting items in their cart, checking out via Stripe

![checkout gif](https://res.cloudinary.com/dna5twsdm/image/upload/v1554747948/checkout-gif.gif)

### Selling items

![selling gif](https://res.cloudinary.com/dna5twsdm/image/upload/v1554747947/selling-gif.gif)

### Viewing past orders

![orders gif](https://res.cloudinary.com/dna5twsdm/image/upload/v1554747946/orders-page-gif.gif)

## Technologies Used

The back-end of this app was built using:
-  [GraphQL](https://graphql.org/) for my database query language
- [Yoga](https://github.com/prisma/graphql-yoga), a Node / Express server that's purpose-built for GraphQL
- [Prisma](https://www.prisma.io/) for managing my GraphQL database and generating Query and Mutation code based on my data model
