import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  FormGroup,
  Form,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };

    // Add Item via addItem action
    this.props.addItem(newItem);

    // close Modal
    this.toggle();
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color="danger"
            onClick={this.toggle}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mt-5 ml-3">Please login to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Todo List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Add Item</Label>
                <Input
                  id="item"
                  name="name"
                  type="text"
                  placeholder="Add new Item"
                  onChange={this.onChange}
                />
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
