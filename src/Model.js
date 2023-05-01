import {useState} from "react";
import {Link} from "react-router-dom";

function Model ({model, onDelete}) {
    const [likes, setLikes] = useState(0);
    const [booked, setBooked] = useState (false);
    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleBook = () => {
        fetch (`http://localhost:4000/Models/${model.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({availability:"unavailable"}),
        })
        .then((response) => response.json())
        .then ((data) => {
            setBooked(true);
        })
    };
    const handleDelete = () => {
        if (window.confirm('Delete model?')) {
          fetch(`http://localhost:4000/Models/${model.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
          })
            .then((response) => response.json())
            .then(() => {
              onDelete(model.id);
            })
            .catch((error) => console.error(error));
        }
      };
      return (
        <div className="card">
          <img className="card-img-top" src={model.poster} alt={model.name} />
          <div className="card-body">
            <h5 className="card-title">{model.name}</h5>
            <p className="card-text">Category: {model.category}</p>
            <p className="card-text">Availability: {model.availability}</p>
            <button className="btn btn-primary mr-3" type="button">
              <Link to={`/models/${model.id}`}>Model details</Link>
            </button>
            <button
              className={`btn btn-primary book-btn${booked ? ' booked' : ''}`}
              type="button"
              onClick={handleBook}
              disabled={booked}
            >
              {booked ? 'Booked' : 'Book model'}
            </button>
            <button className="btn btn-primary like-btn" type="button" onClick={handleLike}>
              👍
            </button>
            <span className="likes">{likes}</span>
            <button className="btn btn-danger delete-btn" type="button" onClick={handleDelete}>
              Delete model
            </button>
          </div>
        </div>
      );
    }
    
    export default Model;
    