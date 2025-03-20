const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();

  // Map b2b_menu to category
  formDataToSend.append("category", formData.b2b_menu);

  for (let key in formData) {
    if (key === "price_per_piece") {
      formDataToSend.append(
        `price_per_piece[20-199]`,
        formData.price_per_piece["20-199"]
      );
      formDataToSend.append(
        `price_per_piece[200-999]`,
        formData.price_per_piece["200-999"]
      );
      formDataToSend.append(
        `price_per_piece[1000+]`,
        formData.price_per_piece["1000+"]
      );
    } else if (key === "supplier") {
      formDataToSend.append("supplier_name", formData.supplier.name);
      formDataToSend.append("supplier_location", formData.supplier.location);
    } else if (key === "shipping") {
      formDataToSend.append(
        "free_shipping_above",
        formData.shipping.free_shipping_above
      );
      formDataToSend.append("shipping_cost", formData.shipping.cost);
    } else if (key === "images" && formData.images[0] instanceof File) {
      formDataToSend.append("image", formData.images[0]);
    } else if (key !== "b2b_menu") {
      formDataToSend.append(key, formData[key]);
    }
  }

  try {
    await axios.post("http://localhost:5000/api/items", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Item added successfully!");
    // Reset the form after successful submission
    setFormData({
      id: "",
      name: "",
      category: "",
      product_category: "",
      price_per_piece: { "20-199": 0, "200-999": 0, "1000+": 0 },
      MOQ: "",
      specifications: {},
      images: [""],
      supplier: { name: "", location: "" },
      shipping: { free_shipping_above: 0, cost: 0 },
      b2b_menu: "",
    });
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item.");
  }
};
