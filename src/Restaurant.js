import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck } from "react-bootstrap";

export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://damp-taiga-51735.herokuapp.com/api/restaurants/${id}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        setLoading(false);
        if (res.hasOwnProperty("_id")) {
          setRestaurant(res);
        } else {
          setRestaurant(null);
        }
      });
  }, [id]);

  if (!loading) {
    if (restaurant) {
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <h2>Ratings</h2>
          <hr />
          <CardDeck>
            {restaurant.grades.map(grade => (
              <Card>
                <Card.Header>Grade: {grade.grade}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Completed: {new Date(grade.date).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
          <br />
        </>
      );
    } else {
      return (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>Unable to find Restaurant with id: {id}</Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }
  } else {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>Loading Restaurant...</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

/*

 
      
*/
