import { useState,useEffect } from "react";
// Overflow

function App() {
  let total = document.getElementById("total");
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [Counter, setCounter] = useState(0);
  const [Price, setPrice] = useState(0);
  const [Taxes, setTaxes] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [Total, setTotal] = useState(0);
  const [update, setUpdate] = useState(false);
  const [index, setIndex] = useState();
  const [search, setSearch] = useState('');

  const getTotal = () => {
    if (Price > 0) {
      setTotal(Price + Taxes - Discount);
      total.style.background = "#005c2596";
    } else {
      setTotal(0);
      total.style.background = "rgba(226, 10, 10, 0.751)";
    }
  };
  const [deletebtn, setDeletebtn] = useState(null);
  useEffect(() => {
    if (localStorage.Products != null) {
      setDeletebtn([])
    }
},deletebtn);
  let data;
  if (localStorage.Products != null) {
    data = JSON.parse(localStorage.Products);
  } else {
    data = [];
  }

  const [Products, setProducts] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  let Product = {
    title: Title,
    price: Price,
    taxes: Taxes,
    discount: Discount,
    total: Total,
    counter: Counter,
    category: Category,
  };
  let newProduct = () => {
    setProducts([...Products, Product]);
    localStorage.setItem("Products", JSON.stringify(Products));
    setTitle("");
    setCategory("");
    setCounter(0);
    setPrice(0);
    setTaxes(0);
    setDiscount(0);
    setTotal(0);
  };
  let updatePro = () => {
    Products[index] = Product;
    setProducts([...Products]);
    localStorage.setItem("Products", JSON.stringify(Products));
    setTitle("");
    setCategory("");
    setCounter(0);
    setPrice(0);
    setTaxes(0);
    setDiscount(0);
    setTotal(0);
    setUpdate(false);
    total.style.background = "rgba(226, 10, 10, 0.751)";
    document.getElementById("createbtn").innerHTML = "Create";
  };
  let deleteProduct = (index, e) => {
    let rows = [...Products];
    rows.splice(index, 1);
    setProducts([...rows]);
  };
  let updateProduct = (index, e) => {
    setTitle(Products[index].title);
    setCategory(Products[index].category);
    setCounter(Products[index].counter);
    setPrice(Products[index].price);
    setTaxes(Products[index].taxes);
    setDiscount(Products[index].discount);
    setTotal(Products[index].total);
    total.style.background = "#005c2596";
    document.getElementById("createbtn").innerHTML = "Update";
    setUpdate(true);
    setIndex(index);
  };

  let deleteAll = () => {
    setProducts([]);
    localStorage.clear();
  };

  useEffect(() => {

    setFilteredData(Products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())))
},[filteredData]);

  return (
    <div className="crud">
      <div className="head">
        <h2>crud</h2>
        <p>
          <b>mobile shop management system</b>
        </p>
      </div>
      <div className="inputs">
        <input
          value={Title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title.."
          type={"tenxt"}
          id="title"
        />
        <div className="price">
          <input
            value={Price}
            onChange={(ev) => setPrice(+ev.target.value)}
            onKeyUp={getTotal}
            placeholder="price.."
            type={"number"}
          />
          <input
            value={Taxes}
            onChange={(ev) => setTaxes(+ev.target.value)}
            onKeyUp={getTotal}
            placeholder="taxes.."
            type={"number"}
          />
          <input
            value={Discount}
            onChange={(ev) => setDiscount(+ev.target.value)}
            onKeyUp={getTotal}
            placeholder="dicount.."
            type={"number"}
          />
          <small id="total">{Total}</small>
        </div>
        <input
          value={Counter}
          onChange={(ev) => setCounter(+ev.target.value)}
          placeholder="count.."
          type={"number"}
          id="count"
        />
        <input
          value={Category}
          onChange={(ev) => setCategory(ev.target.value)}
          placeholder="category.."
          type={"tenxt"}
          id="category"
        />
        <button id="createbtn" onClick={update ? updatePro : newProduct}>
          Create
        </button>
      </div>
      <div className="outputs">
        <div className="searchBlock">
          <input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="search.."
            type={"tenxt"}
            id="search"
          />
        </div>

        {/*     <div className="btnsearch">
          <button onClick={ searchTitle } id="searchTitle">Search By Title</button>
          <button onClick={searchCategory} id="searchCategory ">Search By Category</button>
        </div> */}
        {deletebtn!=null?<button onClick={deleteAll}>Delete All <b>{Products.length}</b> </button>:<></>}

        <table>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>taxes</th>
            <th>dicount</th>
            <th>Total</th>
            <th>category</th>
            <th>Quantity</th>
            <th>update</th>
            <th>delete</th>
          </tr>
          <tbody>
            {search!=''
              ? filteredData.map((Product, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{Product.title}</td>
                    <td>{Product.price}</td>
                    <td>{Product.taxes}</td>
                    <td>{Product.discount}</td>
                    <td>{Product.total}</td>
                    <td>{Product.category}</td>
                    <td>{Product.counter}</td>
                    <td>
                      <button onClick={(e) => updateProduct(index, e)}>
                        update
                      </button>
                    </td>
                    <td>
                      <button onClick={(e) => deleteProduct(index, e)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              : Products.map((Product, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{Product.title}</td>
                    <td>{Product.price}</td>
                    <td>{Product.taxes}</td>
                    <td>{Product.discount}</td>
                    <td>{Product.total}</td>
                    <td>{Product.category}</td>
                    <td>{Product.counter}</td>
                    <td>
                      <button onClick={(e) => updateProduct(index, e)}>
                        update
                      </button>
                    </td>
                    <td>
                      <button onClick={(e) => deleteProduct(index, e)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
