import { useState, useEffect } from "react"
import './People.css'
import { Link } from "react-router-dom"

const People= (props) =>{
    // define our state variable - []
    // react state
    const [people,setPeople]= useState([])
    const [newForm, setNewForm]= useState({
      name:"",
      image: "",
      title: "",
})
    //fetch endpoint
    const BASE_URL= "http://localhost:4000/people"

    const getPeople = async()=> {
        try{
            const response = await fetch(BASE_URL)
            //fetch grabs the data from API - (mongo)
            const allPeople = await response.json()
            // assuming no errors - translate to JS
            setPeople(allPeople)
            // store that data (from api) in react state
        }catch(err){
            console.log(err)
        }
    }

    const handleChange= (e) => {
      const userInput = {...newForm}
      console.log(e.target.name, e.target.value)
      userInput[e.target.name] =  e.target.value
      setNewForm(userInput)
    }
    const handleSubmit = async (e) =>{
      e.preventDefault()
      // 1. capturing our local state
      const currentState = {...newForm}
      try{
        const requestOptions={
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentState)
        }
        const response= await fetch(BASE_URL, requestOptions)
        const createPerson = await response.json()
        console.log(createPerson)
        setPeople([...people, createPerson])
        // reset newForm state so that our form empties out
        setNewForm({
          name:"",
          image: "",
         title: "",
        })
      }catch(err){
        console.log(err)
      }

    }
    const loaded = () => {
      return(<>
      <section className="people-list">
      {people?.map((person) => {
                    return (
                      <Link key={person._id} to={`/people/${person._id}`}>
                        <div className="person-card">
                            {/* React optimization / difference */}
                            <h1>{person.name}</h1>
                            <img src={person.image} />
                            <h3>{person.title}</h3>
                        </div>
                        </Link>
                    )
                })
                }
      </section>
      </>
      )
    }
    const loading = () => (
          <section className="people-list">
            <h1>
              Loading...
              <span>
                <img
                  className="spinner"
                  src="https://freesvg.org/img/1544764567.png"
                />{" "}
              </span>
            </h1>
          </section>
        );
  
      useEffect(()=>{
          getPeople()
      }, [])
      return (
        <div>
          <section>
            <h2>Create a new person</h2>
           <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                Name
              <input 
              type="text" 
              id="name"
              name="name" 
              placeholder="enter a person's name"
              value={newForm.name}
              onChange={handleChange}
              />
               </label>
               <div>
              <label htmlFor="name">
               Image
              <input 
              type="text" 
              id="name"
              name="image" 
              placeholder="enter a person's image"
              value={newForm.image}
              onChange={handleChange}
              />
              </label>
              </div>
              <div>
              <label htmlFor="name">
                Title
              <input 
              type="text" 
              id="name"
              name="title" 
              placeholder="enter a person's title"
              value={newForm.title}
              onChange={handleChange}
             />
              </label>
               <br/>
              <input type="submit" value="create a new person"/>
               </div>
             </form>
           </section>
            
           {people && people.length ? loaded(): loading()}
    
        </div>
      )
}
export default People