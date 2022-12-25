import { Component } from "react";
// import "./App.css";
import { UserList } from "./UserList/UserList";
import { Button } from "./Button/Button";
import { AddUserForm } from "./AddUserForm/AddUserForm";
import { Modal } from "./Modal/Modal";
import { data } from "../data/user";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    users: data,
    isFormShown: false,
    currentAvatar: null,
  };
  
  deleteUser = (userId) => {
    this.setState((prevState) => ({
      users: prevState.users.filter(({ id }) => id !== userId)
    }))
  }
  
  addUser = (userData) => {
    const id = nanoid();
    const newUser = { id, hasJob: false, ...userData };
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
      isFormShown: false,
    }))
  }

  openForm = () => {
    this.setState({ isFormShown: true })
  }

  toggleJobStatus = (userId) => {
    this.setState(prevState => ({
      users: prevState.users.map(user => {
        if (user.id === userId) {
          return { ...user, hasJob: !user.hasJob };
        }
        return user;
      }),
    }))
  }

  openModal = (avatar) => {
    this.setState({ currentAvatar: avatar })
  }

  closeModal = (avatar) => {
    this.setState({ currentAvatar: null })
  }

  render() {
    const { users, isFormShown, currentAvatar } = this.state;

    return (
      <>
        {currentAvatar && <Modal avatar={currentAvatar} onClose={this.closeModal} />}
        <UserList
          users={users}
          onDelete={this.deleteUser}
          changeUserJobStatus={this.toggleJobStatus}
          openModal={this.openModal}
        />
        
        {isFormShown ?
          (<AddUserForm addUser={this.addUser} />)
          :
          (<Button text="Add User" clickHandler={this.openForm} />)
        }
      </ >
    );
  }
};

export default App;