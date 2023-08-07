/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: __Yukti Manoj Mulani____________________ Student ID: __161393210____________ Date: ____6th August 2023____________
*
*  Vercel App (Deployed) Link: ______________https://assignment-kuhngithub.vercel.app/_______________________________________
*
********************************************************************************/ 


import React from 'react'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard'
import { Card } from 'react-bootstrap'
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12
const index = () => {
 
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const [artworkList, setArtworkList] = useState()
  const [page, setPage] = useState(1)
  const fetcher = (url) => fetch(url).then(response => response.json())
  /** Use swr */
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher)

  /** decrease the value of page by 1 (page > 1) */
  function previousPage() {
    if (page > 1) {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }
 
  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    const results = []
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results)
      setPage(1)
      
    }



  }, [data])


  if (error) {
    return <Error statusCode={404} />
  }

  else if (artworkList) {
    return (
      <>

        {artworkList && artworkList.length > 0 ?
          <Container>
            <Row>
              {artworkList && artworkList[page - 1].map((data) => (

                <Col lg={3} key={data}><ArtworkCard objectID={data} /></Col>

              ))}
            </Row>
          </Container>
          :
          
          <>
          <br/>
          
            <Card className='mt-5 w-full'>
              <Card.Body>
                <Card.Text style={{fontWeight:'semi-bold', fontSize: "1.5rem", margin: 0 }}>
                  Nothing Here
                </Card.Text>
                <Card.Text style={{ fontSize: "1.2rem", margin: 0 }}>
                  Try searching for something else
                </Card.Text>
              </Card.Body>
            </Card>
          </>
          
        }


        {artworkList && artworkList.length > 0 && <Container>
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </Container>}



      </>

    )


  }
  else {
    return null
  }







}

export default index