import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'

//star rating
export const StarRating: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/recipe/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch rating');
        }
        return response.json();
      })
      .then(data => {
        console.log('star rating data', data)
        setRating(data.data.calculatedRating);
      })
      .catch(error => {
        console.error('Error fetching rating:', error);
      });
  }, []);

  const handleRatingClick = (ratingValue: number) => {
    console.log('User rated:', ratingValue);
    setRating(ratingValue);
  
    if (!submitted) {
      fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/rating/new', {
        method: 'POST',
        body: JSON.stringify({ "recipe_id": 1, "rating": ratingValue }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('changed star rating',data);
        setSubmitted(true);
      })
      .catch(error => console.error('Error:', error));
    }
  };  

  const handleMouseOver = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          filled={i <= (hoverRating || rating)}
          onClick={() => handleRatingClick(i)}
          onMouseOver={() => handleMouseOver(i)}
          onMouseLeave={handleMouseLeave}
        >
          &#9733;
        </Star>
      );
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
      {submitted && (
        <SubmitButton onClick={() => setSubmitted(false)}>Confirm Rating</SubmitButton>
      )}
    </div>
  );
}

const RatingContainer = styled.div`
  display: flex;
`
const Star = styled.span`
  font-size: 50px;
  color: ${props => (props.filled ? "#ffc107" : "#e4e5e9")};
  transition: color 0.2s;
  &:hover {
    color: #ff5733;
  }
`
const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  width: 40%;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`
