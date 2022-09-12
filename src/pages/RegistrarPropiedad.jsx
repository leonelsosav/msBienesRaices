import React, { useEffect, useState } from "react";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import DAO from "../components/logic/DAO";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "../components/style/registrarPropiedadStyle.css";
import { Link } from "react-router-dom";

const RegistrarPropiedad = () => {
  //TODO: Checar si ya existen las opciones, sino agregarlas a la DB
  const [structure, setStructure] = useState([]);
  const [inputs, setInputs] = useState([]);

  const { getById, createItem, updateItem } = DAO();

  useEffect(() => {
    const retrieveStructure = async () => {
      let opcionesCall = await getById("registrar", "opciones");
      let estructuraCall = await getById("registrar", "estructura-nuevo");
      estructuraCall = estructuraCall.estructura;
      estructuraCall = estructuraCall.map((v) =>
        Object.keys(opcionesCall).includes(v.nombre)
          ? { ...v, opciones: opcionesCall[v.nombre], showTxt: false }
          : v
      );
      setInputs(
        estructuraCall.map((v) =>
          v.tipo === "number" ? 0 : v.tipo === "option" ? v.opciones[0] : ""
        )
      );
      setStructure(estructuraCall);
    };

    retrieveStructure();
  }, []);

  const saveProperty = async (e) => {
    try {
      e.preventDefault();
      //check there are no empty inputs
      if (inputs.includes("")) {
        alertify.alert(
          "MS Bienes Raices",
          "No puede haber campos vacios!",
          function () {
            alertify.success("Ok");
          }
        );
        return;
      }
      //check there are no empty inputs
      if (inputs.includes(0)) {
        alertify.alert(
          "MS Bienes Raices",
          "No puede haber campos con valor 0!",
          function () {
            alertify.success("Ok");
          }
        );
        return;
      }
      //check there are no empty inputs
      if (inputs.includes("Otro")) {
        alertify.alert(
          "MS Bienes Raices",
          'No puede haber campos con valor "Otro"!',
          function () {
            alertify.success("Ok");
          }
        );
      }
      let idStruct = 0;
      for (let struct of structure) {
        if (
          struct.tipo === "option" &&
          !struct.opciones.includes(inputs[idStruct])
        ) {
          await updateItem("registrar", "opciones", {
            [struct.nombre]: [...struct.opciones, inputs[idStruct]],
          });
          console.log(struct, idStruct, inputs[idStruct]);
        }
        console.log(idStruct);
        ++idStruct;
      }
      await createItem(
        "propiedad",
        structure.reduce((prev, curr, idx) => {
          return {
            ...prev,
            [curr.nombre]:
              curr.nombre === "Imagenes"
                ? inputs[idx].split(" ").filter((v) => v !== "")
                : curr.nombre === "Caracteristicas"
                ? inputs[idx].split(",").map((v) => v.trim()).filter((v) => v !== "")
                : inputs[idx],
          };
        }, {})
      );
      alertify.alert("MS Bienes Raices", "Registro exitoso!", function () {
        alertify.success("Ok");
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form-registrar" onSubmit={saveProperty}>
        {structure.length > 0 &&
          structure.map((feature, idx) => {
            return feature.tipo === "array" ? (
              <div key={idx}>
                <label className="label-registrar" htmlFor={feature.nombre}>
                  {feature.nombre}:
                </label>
                <input
                  className="input-registrar imagenes"
                  type="text"
                  id={feature.nombre}
                  value={inputs[idx]}
                  onChange={(e) =>
                    setInputs(
                      inputs.map((v, i) => (i === idx ? e.target.value : v))
                    )
                  }
                />
              </div>
            ) : feature.tipo === "option" ? (
              <div key={idx}>
                <label className="label-registrar" htmlFor={feature.nombre}>
                  {feature.nombre}:
                </label>
                <select
                  className="input-registrar"
                  name={feature.nombre}
                  id={feature.nombre}
                  value={inputs[idx]}
                  onChange={(e) => {
                    if (e.target.value === "Otro") {
                      setStructure(
                        structure.map((v, i) =>
                          i === idx ? { ...v, showTxt: true } : v
                        )
                      );
                      setInputs(inputs.map((v, i) => (i === idx ? "Otro" : v)));
                    } else {
                      setStructure(
                        structure.map((v, i) =>
                          i === idx ? { ...v, showTxt: false } : v
                        )
                      );
                      setInputs(
                        inputs.map((v, i) => (i === idx ? e.target.value : v))
                      );
                    }
                  }}
                >
                  {feature.opciones.map((opcion, index) => (
                    <option key={index} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                  <option value={"Otro"}>Otro</option>
                </select>
                {feature.showTxt && (
                  <input
                    type="text"
                    name={feature.nombre + "txt"}
                    id={feature.nombre + "txt"}
                    value={inputs[idx]}
                    onChange={(e) =>
                      setInputs(
                        inputs.map((v, i) => (i === idx ? e.target.value : v))
                      )
                    }
                  />
                )}
              </div>
            ) : (
              <div key={idx} className="form-group">
                <label className="label-registrar" htmlFor={feature.nombre}>
                  {feature.nombre}:
                </label>
                <input
                  className="input-registrar"
                  type={feature.tipo}
                  id={feature.nombre}
                  value={inputs[idx]}
                  onChange={(e) =>
                    setInputs(
                      inputs.map((v, i) =>
                        i === idx
                          ? feature.tipo === "number"
                            ? Number(e.target.value)
                            : e.target.value
                          : v
                      )
                    )
                  }
                />
              </div>
            );
          })}

        <button className="btn-registrar" type="submit">
          Registrar
        </button>
      </form>
      <Link to="/">
        <button className="btn-regresar">Regresar</button>
      </Link>
    </div>
  );
};

export default RegistrarPropiedad;
