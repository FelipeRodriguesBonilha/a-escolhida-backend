-- CreateTable
CREATE TABLE "State" (
    "uuid_state" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("uuid_state")
);

-- CreateTable
CREATE TABLE "City" (
    "uuid_city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uuid_state" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("uuid_city")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uuid_city" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid_user")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "uuid_supplier" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("uuid_supplier")
);

-- CreateTable
CREATE TABLE "Category" (
    "uuid_category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("uuid_category")
);

-- CreateTable
CREATE TABLE "Product" (
    "uuid_product" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "sold_amount" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT NOT NULL,
    "uuid_category" TEXT NOT NULL,
    "uuid_supplier" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid_product")
);

-- CreateTable
CREATE TABLE "Cart" (
    "uuid_cart" TEXT NOT NULL,
    "uuid_user" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("uuid_cart")
);

-- CreateTable
CREATE TABLE "CartProduct" (
    "uuid_cart_product" TEXT NOT NULL,
    "uuid_product" TEXT NOT NULL,
    "uuid_cart" TEXT NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("uuid_cart_product")
);

-- CreateTable
CREATE TABLE "Order" (
    "uuid_order" TEXT NOT NULL,
    "uuid_cart" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("uuid_order")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_cnpj_key" ON "Supplier"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_phone_key" ON "Supplier"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_uuid_state_fkey" FOREIGN KEY ("uuid_state") REFERENCES "State"("uuid_state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uuid_city_fkey" FOREIGN KEY ("uuid_city") REFERENCES "City"("uuid_city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_uuid_category_fkey" FOREIGN KEY ("uuid_category") REFERENCES "Category"("uuid_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_uuid_supplier_fkey" FOREIGN KEY ("uuid_supplier") REFERENCES "Supplier"("uuid_supplier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_uuid_user_fkey" FOREIGN KEY ("uuid_user") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_uuid_product_fkey" FOREIGN KEY ("uuid_product") REFERENCES "Product"("uuid_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_uuid_cart_fkey" FOREIGN KEY ("uuid_cart") REFERENCES "Cart"("uuid_cart") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_uuid_cart_fkey" FOREIGN KEY ("uuid_cart") REFERENCES "Cart"("uuid_cart") ON DELETE RESTRICT ON UPDATE CASCADE;
