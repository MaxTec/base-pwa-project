import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.less";
import axios from "axios";
import DB from "./store";
import { Button } from "antd";
import { Form, Input, InputNumber, Checkbox } from "formik-antd";
import { Formik } from "formik";

function App() {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    price: 0,
    image: null,
  });

  useEffect(() => {
    console.log(process.env.REACT_APP_IMGUR_CLIENT_ID);
    const url = "https://5cec507b77d47900143b930b.mockapi.io/vcm/";
    axios
      .get(url + "tours")
      .then((res) => {
        DB.setItem("tours", res.data)
          .then(function () {
            return DB.getItem("tours");
          })
          .then(function (value) {
            setData(value);
          })
          .catch(function (err) {
            // we got an error
          });
      })
      .catch(function (err) {
        DB.getItem("tours")
          .then(function (value) {
            console.log(value);
            setData(value);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
  }, []);
  const onChangeInput = (e, name) => {
    const { value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // Mandar todo como Form Data // para enviar distintas imagenes
    // y guardarlo asi en el BackgroundSync
    // y solamnete refrescar los datos de los datos usado con IndexedDB (catalogos y listas de nuevas auditorias)
    // axios.post("https://5cec507b77d47900143b930b.mockapi.io/vcm/tours", inputs).then((res) => {
    //   console.log(res);
    // });
    // setInputs({
    //   name: "",
    //   price: 0,
    //   image: null,
    // });
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <Button type='primary'>Button</Button>
        </p>
        <ul>
          {data.map((ele) => {
            return <li>{ele.name}</li>;
          })}
        </ul>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Formik
          onSubmit={(e) => {
            console.log(e);
          }}
          initialValues={{ firstName: "", age: 20, newsletter: false }}
          render={() => (
            <Form>
              {/* every formik-antd component must have the 'name' prop set: */}
              <Input name='firstName' placeholder='First Name' />
              {/* the rest of the api stays as is */}
              <InputNumber name='age' min={0} />
              <Checkbox name='newsletter'>Newsletter</Checkbox>
              <Button htmlType='submit'>SEND</Button>
            </Form>
          )}
        />
      </header>
    </div>
  );
}

export default App;
