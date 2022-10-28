import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class TablaDoctores extends Component {
    state = {
        doctores: [],
    };

    /**
     * Introduce uno a uno todos los doctores en el array doctores que se utilizara para mostarlos en la TablaDoctores
     * @param {String} especialidad Cadena de texto que representa la especialidad escogida en el select
     */
    getDoctores = () => {
        const request =
            Global.urlDoctores +
            `/api/Doctores/DoctoresEspecialidad/${this.props.especialidad}`;
        axios
            .get(request)
            .then((response) => {
                const doctores = [];

                response.data.forEach((doctor, index) => {
                    doctores.push(
                        <tr key={index}>
                            <td>{doctor.apellido}</td>
                            <td>{doctor.especialidad}</td>
                            <td>{doctor.salario}</td>
                        </tr>
                    );
                });
                console.log(doctores);

                this.setState({
                    doctores: doctores,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.getDoctores();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.especialidad !== this.props.especialidad) {
            this.getDoctores();
        }

        if (oldProps.reload !== this.props.reload) {
            this.getDoctores();
        }
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.doctores}</tbody>
                </table>
            </div>
        );
    }
}
