import { useGetAllProductsQuery } from "../features/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";

const Home = () => {
  // Use the `useGetAllProductsQuery` hook from an API slice to fetch product data
  const { data, error, isLoading } = useGetAllProductsQuery();

  // Initialize the Redux dispatch function
  const dispatch = useDispatch();

  // Use the `useNavigate` hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    // Dispatch the "addToCart" action with the selected product
    dispatch(addToCart(product));

    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <div className="container">
      {isLoading ? (
        // Display a loading message while fetching data
        <p>Loading...</p>
      ) : error ? (
        // Display an error message if data fetching fails
        <p>An error occurred...</p>
      ) : (
        // Render the product list when data is available
        <>
          <h2 className="text-center mt-3">New Arrivals</h2>

          <div className="row">
            {data?.map((product) => (
              // Iterate through the product data and display each product card
              <div key={product.id} className="col-6 col-sm-4  mb-4">
                <div className="card h-100 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top w-50"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text">{product.desc}</p>
                      <span className="price">${product.price}</span>
                    </div>

                    {/* Button to add the product to the cart */}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
