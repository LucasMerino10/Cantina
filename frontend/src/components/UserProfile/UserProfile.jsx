import { useState } from "react";
import { useGlobalContext } from "../../context/ChatContext";
import "./userProfile.scss";

function UserProfile() {
  const {
    socket,
    currentUser,
    setCurrentUser,
    avatars,
    colors,
    userProfileDisplay,
    setUserProfileDisplay,
  } = useGlobalContext();
  const [usernameValue, setUsernameValue] = useState(currentUser.username);
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [selectedColor, setSelectedColor] = useState(currentUser.color);
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar);

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedAvatar(e.currentTarget.id);
  };

  const handleSubmit = async () => {
    if (
      usernameValue !== "" &&
      emailValue !== "" &&
      (usernameValue !== currentUser.username ||
        emailValue !== currentUser.email ||
        selectedAvatar !== currentUser.avatar ||
        selectedColor !== currentUser.color)
    ) {
      const updatedUser = {
        username: usernameValue,
        email: emailValue,
        avatar: selectedAvatar,
        color: selectedColor,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.status === 200) {
        updatedUser.id = currentUser.id;
        setCurrentUser(updatedUser);

        socket.emit("user_update");
      }
    }

    setUserProfileDisplay(!userProfileDisplay);
  };

  return (
    <section
      className={userProfileDisplay ? `profile profile--visible` : `profile`}
    >
      <h2 className="profile__title">My profile</h2>

      <ul className="profile__items">
        <li className="profile__item">
          <label htmlFor="username" className="profile__label">
            Username :
          </label>
          <input
            type="text"
            id="username"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            className={`profile__input profile__input--${selectedColor}`}
          />
        </li>
        <li className="profile__item">
          <label htmlFor="email" className="profile__label">
            Email :
          </label>
          <input
            type="text"
            id="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className={`profile__input profile__input--${selectedColor}`}
          />
        </li>
        <li className="profile__item">
          <label htmlFor="color-select" className="profile__label">
            Color selection :
          </label>
          <select
            name="colors"
            id="color-select"
            value={selectedColor}
            onChange={handleChange}
            className={`profile__select profile__select--${selectedColor}`}
          >
            {colors.map((e) => (
              <option key={e} value={e} className={`profile__option--${e}`}>
                {e}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <h3 className="profile__subtitle">Avatar selection : </h3>
      <section className="profile__avatars">
        {avatars &&
          avatars.map((e) => (
            <button
              type="button"
              aria-label="avatar"
              key={e}
              className="profile__avatarButton"
              onClick={handleClick}
              id={e}
            >
              <img
                src={e}
                alt=""
                className={
                  e === selectedAvatar
                    ? `profile__avatar profile__avatar--user`
                    : `profile__avatar profile__avatar--unselected`
                }
              />
            </button>
          ))}
      </section>
      <button type="button" className="profile__button" onClick={handleSubmit}>
        Confirm
      </button>
    </section>
  );
}

export default UserProfile;
