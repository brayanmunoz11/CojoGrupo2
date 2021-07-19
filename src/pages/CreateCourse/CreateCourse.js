import { useHistory } from "react-router-dom";
import "./CreateCourse.css";
const CreateCourse = (props) => {
  let history = useHistory();
  
  const registrarCurso = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      //user_id: "",
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      //students: form.students.value,
      //date: form.date.value,
      //image: form.image.value,
    };
    
    fetch('/createCourse', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {        
        setlogeado(true);        
      })
      .catch(err => seterrorRegister(errores[err.error] || 'Hubo un problema'));

    history.push("/");
  };

  return (
    <div>
      <form className="form_Curso" onSubmit={registrarCurso}>
        <h1>CREAR CURSO</h1>
        <div>
          <div className="form__item">
            <div>
              <label htmlFor="name">
                Codigo de curso
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ingrese nombre del curso"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="categoria">
                Nombre curso
                <input
                  type="text"
                  name="categoria"
                  id="categoria"
                  placeholder="Ingrese categoria de curso"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="descripcion">
                Ingrese la categoria
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Ingrese una descripcion"
                  required
                />
              </label>
            </div>
          </div>
          <div className="form_item">
            <input type="submit" className="button full" value="Crear" red />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
