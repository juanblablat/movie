import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Modal } from "./Modal";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export function Hackflix() {
   const [movies, setMovies] = useState([]);
   const [rating, setRating] = useState(0);
   const [showModal, setShowModal] = useState(false);
   const [selMovie, setSelMovie] = useState(null);

   useEffect(() => {
      axios
         .get(
            "https://gist.githubusercontent.com/SuecoMarcus/173c4d9949345a19657775594dc52cbf/raw/344075bdfd7bfa48e05753caa3c043a588cabb20/movies.json",
            { responseType: "json" }
         )
         .then((response) => {
            setMovies(
               response.data.filter((e) => e.vote_average >= rating * 2 - 2)
            );
         });
   }, [rating]);

   // modal, transition scale
   const ratingChanged = (newRating) => {
      setRating(newRating);
   };

   const handleModal = (movie) => {
      setSelMovie(movie);
      showModal ? setShowModal(false) : setShowModal(true);
   };

   return (
      <Container className="bg-secondary-subtle">
         <Row>
            <Col className="d-flex justify-content-center">
               <span className="my-auto fw-bold">Filtrar por rating</span>
               <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
               />
               <span className="my-auto fw-bold"> & mas</span>
            </Col>
         </Row>
         <Row>
            {console.log(movies.length)}
            {movies.length === 0 ? (
               <Col className="d-flex justify-content-center">
                  <span className="my-auto h3 mt-4">
                     Lo sentimos, no se encontraron películas con el rating
                     solicitado
                  </span>
               </Col>
            ) : (
               movies.map((movie) => (
                  <Col className="col-3" key={movie.id}>
                     <Image
                        src={movie.poster_path}
                        alt={movie.title}
                        rounded
                        fluid
                        className="mt-3"
                        onClick={() => handleModal(movie)}
                     />
                  </Col>
               ))
            )}
            {showModal && (
               <Modal
                  movie={selMovie}
                  show={showModal}
                  handleModal={handleModal}
               />
            )}
         </Row>
      </Container>
   );
}
