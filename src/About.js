import { Card } from "react-bootstrap";
function About() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>All About Me - the developer</Card.Text>
          <Card.Text>
            {" "}
            My name is Andrei Agmata. I am currently studying Computer
            Programming and Analysis at Seneca College.
          </Card.Text>
          <Card.Text>
            Find more projects like this:{" "}
            <Card.Link href="https://github.com/AndreiAgmata">
              github.com/AndreiAgmata
            </Card.Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default About;
