export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const MESSAGES = {
  NOT_FOUND: "[NOT_FOUND] => The requested resource does not exist!",
  CAST_ERROR: "[CAST ERROR] => The ID is not a valid ObjectId",
  BAD_REQUEST: "[BAD_REQUEST] => Check the paramteters you sent",
  CART_NOT_FOUND: "[NOT_FOUND] => The Cart does not exist!",
  PRODUCT_NOT_FOUND: "[NOT_FOUND] => The Product does not exist!",
  UNAUTHORIZE: "[UNAUTHORIZE ACCES] => The access to this route is private",
  UNAUTHORIZE_TOKEN: "[UNAUTHORIZE TOKEN] => The access to this route is private",
  UNAUTHORIZE_ADMIN: "[ADMIN ROUTE] => The access to this route is admin protected"
}
