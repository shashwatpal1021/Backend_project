import { Customer } from "../models/customer.model.js";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCustomer = asyncHandler(async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, isGold, phone } = req.body;

  // if ([name, isGold, phone].some((field) => field?.trim() === "")) {
  //   throw new ApiError(400, "All fields are required");
  // }

  const existedUser = await Customer.findOne({
    $or: [{ name }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "customer with name or phone already exists");
  }


  // let customer = await Customer.findOne({
  //   name: req.body.name,
  //   isGold: req.body.isGold,
  //   phone: req.body.phone,
  // });
  // if (customer) return res.status(400).send("User already registered.");

  const createCustomer = await Customer.create({
    name,
    isGold,
    phone,
  });
  if (!createCustomer) {
    throw new ApiError(
      500,
      "something went wrong while registering the customer"
    );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, createCustomer, "Customer register Successfully")
  );
  
  // const customer = new Customer({
  //   name: req.body.name,
  //   isGold: req.body.isGold,
  //   phone: req.body.phone,
  // });
  // customer = await customer.save();
  // res.send(customer);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

export { getCustomer, createCustomer, updateCustomer };
