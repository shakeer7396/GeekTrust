import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/Appcontext";
import styles from "../ProductPage/ProductPage.module.css";
import { FcClearFilters } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
const ProductPage = () => {
  const { cartData, setCartData, getData, productData, loading } =
    useContext(Appcontext);

  const [colors, setColors] = useState([]);
  const [gender, setGender] = useState([]);
  const [type, setType] = useState([]);

  const [priceRanges, setPriceRanges] = useState("all");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // for rendering data on display
  useEffect(() => {
    getData();
    const storedColors = sessionStorage.getItem("colors");
    if (storedColors) {
      setColors(JSON.parse(storedColors));
    }
  }, []);

  // for price range
  const handleFilterChange = (newRange) => {
    setPriceRanges(newRange);
  };

  // for color filter
  const filteredItems = productData.filter((item) => {
    if (colors.length > 0 && !colors.includes(item.color)) {
      return false;
    }
    if (gender.length > 0 && !gender.includes(item.gender)) {
      return false;
    }
    if (type.length > 0 && !type.includes(item.type)) {
      return false;
    }

    if (priceRanges === "all") return true;
    if (priceRanges === "0-250") return item.price >= 0 && item.price <= 250;
    if (priceRanges === "251-450") return item.price > 251 && item.price <= 450;
    if (priceRanges === "above450") return item.price > 450;

    return true;
  });
  const handleColorChange = (e) => {
    if (e.target.checked) {
      setColors([...colors, e.target.value]);
    } else {
      setColors(colors.filter((color) => color !== e.target.value));
    }
  };

  // for gender filter
  const handleGenderChange = (e) => {
    if (e.target.checked) {
      setGender([...gender, e.target.value]);
    } else {
      setGender(gender.filter((gender) => gender !== e.target.value));
    }
  };

  // for type filter
  const handleTypeChange = (e) => {
    if (e.target.checked) {
      setType([...type, e.target.value]);
    } else {
      setType(type.filter((type) => type !== e.target.value));
    }
  };

  // for adding to cart and checking quantity
  let existingItem;
  const AddToCart = (item) => {
    existingItem = cartData.find((el) => el.id === item.id);
    if (existingItem && existingItem.quantity >= item.quantity) {
      alert("Quantity not available");
      return;
    }
    if (existingItem) {
      existingItem.quantity += 1;

      alert("Added To Cart");
    } else {
      const newItem = { ...item, quantity: 1 };
      setCartData([...cartData, newItem]);
      alert("Added To Cart ");
    }
  };

  // for loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.input_div}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here..."
        />
      </div>
      <div className={styles.maindiv}>
        <div className={styles.input_search}>
          <button className={styles.open_button} onClick={() => toggleDrawer()}>
            {isOpen ? <GrClose /> : <FcClearFilters size={15} />}
          </button>
          {/* <input
            type={"search"}
            
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>
        <div
          className={
            isOpen === false ? styles.child_div1 : styles.child_divopen
          }
        >
          <div className={styles.filter_divs}>
            <label>
              <p>Color</p>
              <div style={{ width: 100 }}>
                <input
                  type="checkbox"
                  value="Red"
                  onChange={handleColorChange}
                />{" "}
                Red
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Blue"
                  onChange={handleColorChange}
                />{" "}
                Blue
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Green"
                  onChange={handleColorChange}
                />{" "}
                Green
              </div>
            </label>
          </div>
          <div className={styles.filter_divs}>
            <label>
              <p>Gender</p>
              <div>
                <input
                  type="checkbox"
                  value="Men"
                  onChange={handleGenderChange}
                />{" "}
                Men
              </div>
              <div style={{ width: 100 }}>
                <input
                  type="checkbox"
                  value="Women"
                  onChange={handleGenderChange}
                />{" "}
                Women
              </div>
            </label>
          </div>
          <div className={styles.filter_divs}>
            <label>
              <p>Price</p>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("all")}
                />{" "}
                All
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("0-250")}
                />{" "}
                0-250
              </div>
              <div style={{ width: 100 }}>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("251-450")}
                />{" "}
                251-450
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("above450")}
                />{" "}
                Above 450
              </div>
            </label>
          </div>
          <div className={styles.filter_divs}>
            <label>
              <p>Type </p>
              <div>
                <input
                  type="checkbox"
                  value="Polo"
                  onChange={handleTypeChange}
                />{" "}
                Polo
              </div>
              <div style={{ width: 100 }}>
                <input
                  type="checkbox"
                  value="Hoodie"
                  onChange={handleTypeChange}
                />{" "}
                Hoodie
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Basic"
                  onChange={handleTypeChange}
                />{" "}
                Basic
              </div>
            </label>
          </div>
        </div>

        <div className={styles.child_div2}>
          <div className={styles.product_div}>
            {filteredItems
              .filter((el) =>
                Object.values(el).some(
                  (val) =>
                    typeof val === "string" &&
                    val.toLowerCase().includes(search.toLowerCase())
                )
              )
              ?.map((el, i) => (
                <div key={el.id} className={styles.product_card}>
                  <div className={styles.image}>
                    <img width="200px" src={el.imageURL} alt="error" />
                  </div>
                  <div>
                    <h4>{el.name}</h4>
                  </div>
                  <div>
                    <p>Type:</p>
                    <p>{el.type}</p>
                  </div>
                  <div>
                    <p>Color:</p>
                    <p>{el.color}</p>
                  </div>
                  <div>
                    <p>Gender</p>
                    <p>{el.gender}</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <h5>MRP: ₹ {el.price}</h5>
                  </div>
                  <div>
                    <button onClick={() => AddToCart(el)}>Add To Cart</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
