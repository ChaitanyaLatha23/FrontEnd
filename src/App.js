import './App.css';
import react, { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'


function App() {

  const [responseData, setResponseData] = useState();


  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    axios.post('http://127.0.0.1:8000/asa-change', formJson)
      .then(function (response) {
        setResponseData(response?.data["1"]?.table_data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const columns = [
    {
      name: 'Residue',
      selector: row => row.residue_id,
    },
    {
      name: 'ASA',
      selector: row => row.asa_change,
    },
  ];

  const data = responseData?.map((ele) => {
    return {
      residue_id: ele[0],
      asa_change: ele[3]
    }
  })

  return (
    <div className="App" >
      <form className='formFields' method="post" onSubmit={handleSubmit}>
        <div>
          <div className='formField'>
            <label>
              Entry Id: <input name="entry_id" />
            </label>
          </div>

          <div className='formField'>
            <label>
              Assembly Id: <input name="assembly_id" />
            </label>
          </div>

          <div className='formField'>
            <label>
              Interface Id: <input name="interface_id" />
            </label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className='dataTables'>
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}

export default App;
