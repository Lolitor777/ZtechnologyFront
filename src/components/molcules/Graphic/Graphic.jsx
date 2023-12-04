import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "@styles/CreateStyle.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const data = [
  { name: "Computadores", Cantidad: 8 },
  { name: "Teclados", Cantidad: 16 },
  { name: "mouse", Cantidad: 5 },
  { name: "Celulares", Cantidad: 23 },
  { name: "Microfonos", Cantidad: 18 },
  { name: "Monitores", Cantidad: 2 },
];

export const Graphic = () => {

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  if (loading) {
    return <>Cargando...</>;
  }

  if (!user) {
    return navigate("/");
  }

  return (
    <div className="graphic_container">
      <h2 className="title_form">
        Cantidad de productos cotizados en la última semana
      </h2>
      <ResponsiveContainer width="60%" aspect={2}>
        <BarChart data={data} width={300} height={300}>
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cantidad" fill="#0762cac6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
