## User requests

### Fetch all users
GET localhost:4200/users/get-all

### Get user with email id
GET localhost:4200/users/get-user-with-email/:email \
Ex: localhost:4200/users/get-user-with-email/naruto@gmail.com

### Verify user with email and password
GET localhost:4200/users/verify-user/:email/:password \
Ex: localhost:4200/users/verify-user/naruto@gmail.com/Naruto@123

### Insert new user
POST localhost:4200/users/insert-user \
body = {
    firstName: "first name",
    lastName: "last name",
    email: "email@gmail.com",
    password: "password"
    }

## Products request

### Get all products
GET localhost:4200/products/get-all

### Search product with product name
GET localhost:4200/products/search/:productName \
Ex: localhost:4200/products/search/shirt

### Get product with product Id
GET localhost:4200/products/product/:productId \
Ex: localhost:4200/products/product/64913dcc014a99336746d7bf

## Cart requests

### Get all carts
GET localhost:4200/carts/get-all

### Get user cart with user Id
GET localhost:4200/carts/user/:userId \
Ex: localhost:4200/carts/user/648f8e9bb5a6af192fff241c

### Get cart with cart Id
GET localhost:4200/carts/cart/:cartId \
Ex: localhost:4200/carts/cart/64924d95f38c102c75ca3378

### Update cart
POST localhost:4200/carts \
body = {
    userId: "userId",
    productId: "productId",
    quantity: 1,
  }

### Change quantity of product in user cart
POST localhost:4200/carts/change-quantity \
body = {
    userId: "userId",
    productId: "productId",
    quantity: 3,
  }

### Remove product form the user cart
POST localhost:4200/carts/remove-product-from-cart \
body = {
    userId: "userId",
    productId: "productId",
  }
