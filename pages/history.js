import React from 'react'
import { useRouter } from 'next/router'
import { ListGroup, Button, Card, Container } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useSearchHistoryState } from '@/store'
import { removeFromHistory } from '@/lib/userData'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'


const history = () => {
  const [searchHistory, setSearchHistory] = useAtom(favouritesAtom)
  let parsedHistory = [];
  
  const router = useRouter()
  searchHistory?.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });


  const historyClicked = (e, index) => {
    e.preventDefault()
    router.push(`/artwork?${searchHistory[index]}`)
  }


  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); 
    setSearchHistory(await removeFromHistory(searchHistory[index]))

  }
console.log(parsedHistory)

  if (!searchHistory) return null;
  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card style={{ marginTop: '5rem' }}>
          <Card.Body>
            <Card.Text style={{ fontWeight: 'semi-bold', fontSize: "1.5rem", margin: 0 }}>
              Nothing Here
            </Card.Text>
            <Card.Text style={{ fontSize: "1.2rem", margin: 0 }}>
              Try searching for something else
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup style={{ marginTop: '4.5rem' }}>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>

              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>

  )





}

export default history