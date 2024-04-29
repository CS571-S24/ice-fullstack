import { useEffect, useState } from 'react'
import './App.css'
import { Button, Card, Form } from 'react-bootstrap'

function App() {

  const [thought, setThought] = useState("");

  const [comments, setComments] = useState([])

  async function load() {
    const resp = await fetch("http://localhost:53706/api/comments")
    let data = await resp.json();
    data = data
      .map(c => {
          return {
            ...c,
            created: new Date(c.created)
        }
      })
      .toSorted((c1, c2) => c2.created - c1.created)
    setComments(data)
  }

  async function handlePost(e) {
    e?.preventDefault();

    const resp = await fetch("http://localhost:53706/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: thought
      })
    })

    if (resp.ok) {
      alert("Created comment!")
      load();
      setThought("");
    } else {
      alert("Something went wrong!")
    }
  }

  async function handleDelete(id) {
    const resp = await fetch("http://localhost:53706/api/comments?id=" + id, {
      method: "DELETE"
    })
    
    if (resp.ok) {
      alert("Deleted comment!")
      load();
    } else {
      alert("Something went wrong!")
    }
  }

  useEffect(() => {
    load();
  }, []);

  return <div>
    <h1>Welcome to BadgerChat Nano!</h1>
    <Form onSubmit={handlePost}>
      <Form.Label htmlFor='comment-inp'>Comment</Form.Label>
      <Form.Control id='comment-inp' value={thought} onChange={(e) => setThought(e.target.value)}></Form.Control>
      <br/>
      <Button onClick={handlePost}>Submit</Button>
    </Form>
    {
      comments.map(m => <Card key={m.id} style={{marginTop: "1rem"}}>
        <p><strong>{m.comment}</strong></p>
        <p>{m.created.toLocaleString()}</p>
        <Button variant="danger" onClick={() => handleDelete(m.id)}>Delete</Button>
      </Card>
      )
    }
  </div>
}

export default App
