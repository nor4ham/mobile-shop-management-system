import { useState } from "react";

function App() {
  let title=document.getElementById('title');

  let count=document.getElementById('count');
  let category=document.getElementById('category');
  let submit=document.getElementById('submit');
  let total=document.getElementById('total');

  const [Price, setPrice] = useState(0);
  const [Taxes, setTaxes] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [Total, setTotal] = useState(0);
  const getTotal=()=>{
    if (Price!=0){setTotal((Price+Taxes)-Discount)}
  }

 
  return (
    <div className="crud">
      <div className="head">
        <h2>crud</h2>
        <p><b>mobile shop management  system</b></p>
      </div>
      <div className="inputs">
        <input placeholder="title.."type={'tenxt'} id="title"/>
        <div className="price">
          <input value={Price}onChange={(ev) => setPrice(+ev.target.value)}  onKeyUp={getTotal}  placeholder="price.." type={'number'} />
          <input value={Taxes} onChange={(ev) => setTaxes(+ev.target.value)} onKeyUp={getTotal}  placeholder="taxes.."type={'number'} />
          <input value={Discount} onChange={(ev) => setDiscount(+ev.target.value)} onKeyUp={getTotal}  placeholder="dicount.."type={'number'} />
          <small id="total">{Total}</small>
        </div>
        <input  placeholder="count.." type={'number'} id="count"/>
        <input  placeholder="category.."type={'number'} id="category"/>
        <button id="submit">Create</button>

      </div>
      <div className="outputs">
        <div className="searchBlock">
        <input placeholder="search.."type={'tenxt'} id="search"/>
        </div>
        <div className="btnsearch">
          <button id="searchTitle">Search By Title</button>
          <button id="searchCategory ">Search By Category</button>
        </div>
        <table>
         <tr>
          <th>id</th>
          <th>title</th>
          <th>price</th>
          <th>dicount</th>
          <th>Total</th>
          <th>category</th>
          <th>update</th>
          <th>delete</th>
         </tr>
         <tbody>

         </tbody>
        </table>
      </div>
       
    </div>
  );
}

export default App;
