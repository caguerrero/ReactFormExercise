import useSignupForm from "./customHooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import * as Joi from "joi";
export default function Singup(props) {

  const structure = props.structure.elements;
  let validate = {};
  Object.keys(structure).forEach((k) => {
    switch (structure[k].element_type) {
      case "email":
        structure[k].autocomplete = "email";
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.string().email({ tlds: { allow: false } }).required();
        } else {
          validate[structure[k].element_id] = Joi.string().email({ tlds: { allow: false } }).allow(null, '');
        }
        break;
      case "password":
        structure[k].autocomplete = "new-password";
        if (structure[k].element_required && structure[k].element_id === "password") {
          validate[structure[k].element_id] = Joi.string().required();
        } else if (structure[k].element_required && structure[k].element_id !== "password") {
          validate[structure[k].element_id] = Joi.ref("password");
        }
        break;
      case "text":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.string().required();
        } else {
          validate[structure[k].element_id] = Joi.string().allow(null, '');
        }
        break;
      case "number":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.number().required();
        } else {
          validate[structure[k].element_id] = Joi.number().allow(null, '');
        }
        break;
      case "date":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.date().required();
        } else {
          validate[structure[k].element_id] = Joi.date().allow(null, '');
        }
        break;
      default:
        console.log("This type of element was not included in the JSON file");
        break;
    }
  });
  let schema = Joi.object(validate);
  schema = schema.with("password", "repeat_password");
  const { handleSubmit, handleInputChange, errors, manage } = useSignupForm(schema);
  return (
    <div>
      <h1>Register Form</h1>
      <Form onSubmit={handleSubmit}>
        {
          Object.keys(structure).map((e) => {
            return (
              <div key={structure[e].element_id}>
                <Form.Group>
                  <Form.Label htmlFor={structure[e].element_id}>
                    {structure[e].element_label}
                  </Form.Label>
                  <Form.Control
                    type={structure[e].element_type}
                    placeholder={structure[e].element_placeholder}
                    id={structure[e].element_id}
                    autoComplete={structure[e].autocomplete}
                    name={structure[e].element_id}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )
          })}
        <div>
          {manage && <Alert variant="success">{"Registro exitoso!"}</Alert>}
          {errors && <Alert variant="danger">{errors.toString()}</Alert>}
        </div>
        <div>
          <Button type="submit"> Register </Button>
        </div>
      </Form>
    </div>
  );
}