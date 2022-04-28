import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';


import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const { loading, data} = useQuery(  QUERY_ME )
  const [ deleteBook , {error}] = useMutation(DELETE_BOOK)

  const userData = data?.me

  if (Auth.loggedIn()) {
    return <Navigate to="/saved" />;
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const booktoDelete = bookId

    if (!token) {
      return false;
    }

    const { data } = await deleteBook({
      variables: {booktoDelete}
    })
      
    if (data) {
      removeBookId(bookId);
      alert('Book deleted')
    } else {
      alert('failed to delete')
    }
  }

  return (
    <>
    { loading ? (<div>loading..</div>) : 
    (<div><Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      </div> 
      
      )}

{error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
    
    </>
    
  );
};

export default SavedBooks;
