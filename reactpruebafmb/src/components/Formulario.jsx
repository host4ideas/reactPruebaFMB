import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import TablaDoctores from "./TablaDoctores";

export default class Formulario extends Component {
    state = {
        especialidades: [],
        especialidad: "cardiologia",
        reload: true,
    };

    inputAumento = React.createRef();

    /**
     * Funcion para recoger las especialidades de la API y mostarlas como <option></option> en el select
     */
    getEspecialidades = () => {
        const request = Global.urlDoctores + "/api/Doctores/Especialidades";
        axios.get(request).then((response) => {
            this.setState({
                especialidades: response.data,
            });
        });
    };

    /**
     * Funcion llamada en el evento change al cambiarse el valor del elemento <element></element>,
     * la utilizaremos para setear el valor de la especialidad actual y actualizar la tabla de
     * doctores de acuerdo a la especialidad escogida.
     * @param {Event} ev Evento del onChange asociado al elemento <select></select>
     */
    handleSelect = (ev) => {
        this.setState({
            especialidad: ev.target.value,
        });
    };

    /**
     * Se llamará a esta funcion al ejecutar un submit dentro del form
     * @param {Event} ev Utilizamos el event para prevenir el comportamiento por defecto
     */
    handleForm = (ev) => {
        ev.preventDefault();

        // Actualizamos la tabla
        this.setState({ reload: !this.state.reload }, function () {
            console.log(this.state.reload);
        });

        const aumento = this.inputAumento.current.value;

        const request =
            Global.urlDoctores +
            `/api/Doctores/${this.state.especialidad}/${aumento}`;

        axios
            .put(request)
            .then(() => {
                console.log("Aumento realizado");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        // Cargamos las especialidades al cargar el componente/pagina
        this.getEspecialidades();
    }

    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>
                <label htmlFor="selectEspecialidad">
                    Seleccione una especialidad
                </label>
                <select
                    name="selectEspecialidad"
                    id="selectEspecialidad"
                    onChange={this.handleSelect}
                >
                    {this.state.especialidades.map((especialidad, index) => {
                        return (
                            <option key={index} value={especialidad}>
                                {especialidad}
                            </option>
                        );
                    })}
                </select>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="inputAumento">Incremento salarial</label>
                    <input
                        ref={this.inputAumento}
                        type="text"
                        id="inputAumento"
                    />
                    <button type="submit">Incrementar salarios</button>
                </form>
                <TablaDoctores
                    reload={this.state.reload}
                    especialidad={this.state.especialidad}
                />
            </div>
        );
    }
}
