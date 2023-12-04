import React from "react";
import { useSelector } from "react-redux";
import '@styles/CreateStyle.css'
import profile from '../../../../assets/profile.svg'

export const InfoProfile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <div>
      <div className="profile_container">
        <h2 className="profile_title">Tu perfil</h2>

        <div className="profile_container_child">
          <figure className="profile_image">
            <img
              src={profile}
              className="profile_img"
            />
          </figure>

          <div className="profile_info">
            <h3>ID: <span>{user.id}</span></h3>
            <h3>Nombre: <span>{user.names}</span></h3>
            <h3>Nombre de usuario: <span>{user.nameUser}</span></h3>
            <h3>Correo electrónico: <span>{user.email}</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
};
