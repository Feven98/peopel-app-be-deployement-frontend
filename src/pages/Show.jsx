import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"


const Show= (props) =>{
    const [person,setPerson]= useState(null)
    const [loading,setLoading]= useState(true)
    const [editForm, setEditForm] = useState("")
    const {id} = useParams()
    const navigate= useNavigate()
    const URL= `http://localhost:4000/people/${id}`
// edit
const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })


    const updatePerson = async (e) => {
        e.preventDefault()
        // console.log(editForm)
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            }
            const response = await fetch(URL, options)
            const updatedPerson = await response.json()

            setPerson(updatedPerson)
            setEditForm(updatedPerson)

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const getPerson = async () =>{
        try{
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setPerson(result)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }
    console.log(`Current Person: ${JSON.stringify(person)}`)

    const removePerson= async (e) => {
        try{
            const options={
                method:"DELETE"
            }
            const response = await fetch(URL, options)
            const deletaPerson= await response.json()
            console.log(deletaPerson)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    const isLoading=() =>(<h2>...Loading</h2>)
    const loaded=()=>(
        <>
        <div className="person-card">
                            {/* React optimization / difference */}
                            <h1>{person.name}</h1>
                            <div>
                                <p>Deleate Person</p>
                                <button onClick={removePerson}>X</button>
                                </div>
                            <img src={person.image || "placeholderImage"} />
                            <h3>{person.title || "Not tittle"}</h3>
                        </div>
                        <Link to="/">Back to Home</Link> 
                        </>
    )
    useEffect(() => {
        getPerson()
    },[])
    return(
        <div>
            <section>
                <h2>Edit this Person</h2>
                <form onSubmit={updatePerson}>
                    <input
                        type="text"
                        value={editForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Update Person" />
                </form> 
            </section>
            {loading ? isLoading(): loaded()}
        </div>
    )
    // console.log(`current person: ${person._id} || "no person" `)
    // return(
    // <section  className="ShowContainer">
        {/* <h2>Name: {person.name}</h2> */}
//         {loading ? isLoading(): loaded()}
//         </section>)
}
export default Show