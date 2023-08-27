import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import { Modal } from "react-bootstrap";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [pincode, setPincode] = useState("");
  const [cvv, setCVV] = useState("");



  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handlePopupOpen = () => {
    console.log("Opening popup");
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    console.log("Closing popup");
    setShowPopup(false);
  };

  const handleOrderSubmit = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      handlePopupClose();
    }, 3000);
  };

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={3}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: Math.max(1, prod.qty - 1), // Ensure quantity doesn't go below 1
                        },
                      })
                    }>
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{prod.qty}</span>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: prod.qty + 1,
                        },
                      })
                    }>
                    +
                  </Button>

                  <Button
                    type="button"
                    variant="dark"
                    className="ml-4"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }>
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button
          type="button"
          disabled={cart.length === 0}
          onClick={handlePopupOpen}>
          Proceed to Checkout
        </Button>
      </div>

      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderSubmitted ? (
            <div className="sucess-message">
              <p>
                <p>Your order has been Shipped 🎉🎉</p>
              </p>
            </div>
          ) : (
            <Form>
              <Form.Group>
                <div className="card-container">
                  <img
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--ivk3U_7B--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9mom0yonfz5rd4vwk30x.png"
                    alt="Card Image"
                    className="card-image"
                  />
                </div>
                <div className="total">
                  <h3>
                    Total Amount: <span class="total-amount">₹ {total}</span>
                  </h3>
                </div>
                {/* <Form.Label>Name on the Card</Form.Label> */}
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Name on card"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                {/* <Form.Label>Address</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <div className="row">
                <Form.Group className="col-md-6">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="col-md-6">
                  <Form.Label>Enter CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="xxx"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOrderSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
