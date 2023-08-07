import React from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-bootstrap'
import ArtworkCardDetail from '../../components/ArtworkCardDetail'

const Artwork = () => {
    const router = useRouter()
    const { objectID } = router.query
    return (
        <Container fluid>
            <Row>
                <Col><ArtworkCardDetail objectID={objectID} /></Col>
            </Row>
        </Container>
    )
}

export default Artwork