import React from 'react'
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import { useFavouriteListState } from '@/store'
import { favouritesAtom } from '@/store'
import { useAtom } from 'jotai'

const favourite = () => {
    const [favouriteLists, setFavouriteLists] = useAtom(favouritesAtom)

    if (!favouriteLists) return null;
    return (
        <>

            {favouriteLists && favouriteLists.length > 0 ?
                <Container>
                    <Row>
                        {favouriteLists && favouriteLists.map((data) => (

                            <Col lg={3} key={data}><ArtworkCard objectID={data} /></Col>

                        ))}
                    </Row>
                </Container>
                :

                <>
                    <br />

                    <Card className='mt-5 w-full'>
                        <Card.Body>
                            <Card.Text style={{ fontWeight: 'semi-bold', fontSize: "1.5rem", margin: 0 }}>
                                Nothing Here
                            </Card.Text>
                            <Card.Text style={{ fontSize: "1.2rem", margin: 0 }}>
                                Try searching for something else
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </>

            }


        </>

    )


}
export default favourite