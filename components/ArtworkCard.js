import React from "react";
import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";


const ArtworkCard = (props) => {
  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`,
    fetcher
  );

  if (error) {

    return <Error statusCode={404} />;
  }
  if (data) {
    return (
      <Card style={{ marginTop: "5rem" }}>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text style={{ marginBottom: 0 }}>
            <strong>Date:</strong> {data.objectDate ? data.objectDate : "N/A"}
          </Card.Text>
          <Card.Text style={{ marginBottom: 0 }}>
            <strong>Classification:</strong>{" "}
            {data.classification ? data.classification : "N/A"}
          </Card.Text>
          <Card.Text>
            <strong>Medium:</strong> {data.medium ? data.medium : "N/A"}
          </Card.Text>

          <Link href={`/artwork/${data.objectID}`} passHref>
            <Button variant="outline-primary">
              <strong>ID: </strong>
              {data.objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
};

export default ArtworkCard;
