import { useHistory } from "react-router-dom";
import "./CreateCourse.css";
const CreateCourse = (props) => {
  let history = useHistory();
  const registrarCurso = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      user_id: "",
      curso_id: form.curso_id.value,
      nombre: form.nombre.value,
      categoria: form.categoria.value,
    };
    
    history.push("/");
  };

  return (
    <div>
      <form className="form_Curso" onSubmit={registrarCurso}>
        <h1>CREAR CURSO</h1>
        <div>
          <div className="form__item">
            <div>
              <label htmlFor="curso_id">
                Codigo de curso
                <input
                  type="text"
                  name="curso_id"
                  id="curso_id"
                  placeholder="Ingrese codigo de curso"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="nombre">
                Nombre curso
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ingrese nombre de curso"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="categoria">
                Ingrese la categoria
                <input
                  type="text"
                  name="categoria"
                  id="categoria"
                  placeholder="Ingrese la categoria de curso"
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
