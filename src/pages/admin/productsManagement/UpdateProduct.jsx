import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../../api/productApi";
import { getProductCategories } from "../../../api/categoryApi";
import { getSection } from "../../../api/sectionApi";
import AdminNavigation from "../AdminNavigation";
import { toast } from "react-toastify";
import { API_URL } from "../../../api/serverRequest";
import "../../../assets/styles/components/_form-admin.scss";

const UpdateProduct = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const { productId } = useParams();  // Retrieve product ID from URL params
  const queryClient = useQueryClient(); 

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSection, setProductSection] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");  

  // Fetch product data by id when the component mounts
  const { isLoading: loadingProduct, error: productError } = useQuery({
    queryKey: ['products', productId], // Unique query key for the product
    queryFn: () => getProductById(productId), // Api call to fetch the product details
    onSuccess: (data) => {
      if (data) {
       // Populate the state with the fetched product data
        setProductName(data.name || "");
        setProductDescription(data.description || "");
        setProductCategory(data.categorie_id || "");
        setProductSection(data.section_id || "");
        setCurrentImage(data.path || "");
      }
    },
    // Display an error toast if the Api call fails
    onError: (error) => {
      toast.error("Error fetching product: " + error.message);
    }
  });

  // Fetch categories for product selection
  const { data: categories, isLoading: loadingCategories, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: getProductCategories
  });

  // Fetch sections for product selection
  const { data: sections, isLoading: loadingSections, error: sectionsError } = useQuery({
    queryKey: ["sections"],
    queryFn: getSection
  });

  // Mutation to update the product
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries("products");  // Invalidate the cache to refetch updated data
      if (data.success) {
        toast.success(data.message || "Product updated successfully!");
      } else {
        toast.error(data.message || "Error updating product!");
      }
    },
    // Display an error toast if the mutation fails
    onError: (error) => {
      toast.error("Error updating product: " + error.message);
    }
  });

  // Form submission handler to update product
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data to send to the server
    const formData = new FormData(); 
    formData.append("productId", productId);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productSection", productSection);
    // Append new image if uploaded
    if (productImage) {
      formData.append("productImage", productImage);  
    }

    // Trigger the mutation
    mutation.mutate(formData);
  };

  if (loadingCategories || loadingSections || loadingProduct) return <p>Loading...</p>;
  if (categoriesError || sectionsError || productError) return <p>Error: {categoriesError?.message || sectionsError?.message || productError?.message}</p>;

  return (
    <div className="navigation-and-content">
      <AdminNavigation />  
      <div className="content-wrapper">
        <h2>Modify the product</h2>
        <form onSubmit={handleSubmit} className="form">

    
              <label htmlFor="productName">Name of product:</label> 
              <input
                id="productName"
                type="text"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
  

  
              <label htmlFor="productDescription">Description:</label> 
              <textarea
                id="productDescription"
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
      

        
              <label htmlFor="productCategory">Category:</label>  
              <select
                id="productCategory"
                name="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
      

      
              <label htmlFor="productSection">Section:</label>  
              <select
                id="productSection"
                name="productSection"
                value={productSection}
                onChange={(e) => setProductSection(e.target.value)}
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>

              <label htmlFor="productImage">Current image:</label> 
              <div className="form__image-upload">
                {currentImage && (
                  <img
                    src={`${API_URL}assets/img/${currentImage}`}
                    alt={`Image of ${productName}`}
                    loading="lazy" 
                    width={120}
                  />
                )}
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
      
    
              <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Updating..." : "Update"}
                </button>  
        
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
