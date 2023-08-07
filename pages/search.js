import { useRouter } from 'next/router'
import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { addToHistory } from '@/lib/userData'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'



const search = () => {
    const router = useRouter()
    const[searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const { register, handleSubmit, setValue, formState: {errors} } = useForm();
    const submitForm = async function (data) {
        let queryString = ''
        
        
        queryString += `${data.searchBy + '=' + true}${data.geoLocation && '&geoLocation' + '=' + data.geoLocation}${data.medium && '&medium' + '=' + data.medium}${'&isOnView' + '=' + data.isOnView}${'&isHighlight' + '=' + data.isHighlight}${data.q && '&q' + '=' + data.q}`

        router.push(`/artwork?${queryString}`)
        setSearchHistory(await addToHistory(queryString));

    }
   
    

  return (
    <>
        
         <Container fluid style={{marginTop: '5rem'}}>
              <Form onSubmit={handleSubmit(submitForm)}>
                  <Row>
                      <Col>
                          <Form.Group className="mb-3">
                              <Form.Label>Search Query</Form.Label>
                              <Form.Control type="text" placeholder="" {...register('q', { required: true })} className={errors.q && 'is-invalid'}/>
                              
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={4}>
                          <Form.Label>Search By</Form.Label>
                          <Form.Select {...register('searchBy')} className="mb-3">
                              <option value={'title'}>Title</option>
                              <option value={'tags'}>Tags</option>
                              <option value={'artistOrCulture'}>Artist or Culture</option>
                          </Form.Select>
                      </Col>
                      <Col md={4}>
                          <Form.Group className="mb-3">
                              <Form.Label>Geo Location</Form.Label>
                              <Form.Control type="text" placeholder="" {...register('geoLocation')} />
                              <Form.Text className="text-muted">
                                  Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                              </Form.Text>
                          </Form.Group>
                      </Col>
                      <Col md={4}>
                          <Form.Group className="mb-3">
                              <Form.Label>Medium</Form.Label>
                              <Form.Control type="text" placeholder="" {...register('medium')} />
                              <Form.Text className="text-muted">
                                  Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                              </Form.Text>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <Form.Check
                              type="checkbox"
                              label="Highlighted"
                              {...register('isHighlight')}
                          />
                          <Form.Check
                              type="checkbox"
                              label="Currently on View"
                              {...register('isOnView')}
                          />
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <br />
                          <Button variant="primary" type="submit">
                              Submit
                          </Button>
                      </Col>
                  </Row>
              </Form>
         </Container>
    </>
  )
}

export default search