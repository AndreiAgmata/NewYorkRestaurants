import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const perPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");

    if (borough) {
      fetch(
        `https://damp-taiga-51735.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`
      )
        .then(response => {
          return response.json();
        })
        .then(restaurants => {
          setLoading(false);
          setRestaurants(restaurants);
        });
    } else {
      fetch(
        `https://damp-taiga-51735.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
      )
        .then(response => {
          return response.json();
        })
        .then(restaurants => {
          setLoading(false);
          setRestaurants(restaurants);
        });
    }
  }, [location, page]);

  function previousPage() {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }

  function nextPage() {
    setPage(prev => prev + 1);
  }

  if (!loading) {
    if (restaurants && restaurants.length > 0) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Restaurants</Card.Title>
              <Card.Text>
                Full list of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(restaurant => (
                <tr
                  key={restaurant._id}
                  onClick={() => {
                    navigate(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>No Restaurants Found</Card.Text>
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
            <Card.Text>Loading Restaurants...</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }

  /*
  if (restaurants && restaurants.length > 0) {
   
    );
  } else if (restaurants == null) {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Restaurants</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Body>
        </Card>

        <br />
       
      </div>
    );
  } else if (restaurants.length === 0) {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Restaurants</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>No Restaurants Found</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  */
}
