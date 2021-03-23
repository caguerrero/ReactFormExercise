import useSignupForm from "./customHooks";

import * as Joi from "joi";

export default function Singup(props) {

  const structure = props.structure.elements;
  let validate = {};
  Object.keys(structure).forEach((k) => {
    switch (structure[k].element_type) {
      case "email":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.string().email({ tlds: { allow: false } }).required();
        } else {
          validate[structure[k].element_id] = Joi.string().email({ tlds: { allow: false } });
        }
        break;
      case "password":
        if (structure[k].element_required && structure[k].element_id === "password") {
          validate[structure[k].element_id] = Joi.string().required();
        } else {
          validate[structure[k].element_id] = Joi.string();
        }
        break;
      case "text":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.string().required();
        } else {
          validate[structure[k].element_id] = Joi.string();
        }
        break;
      case "number":
        if (structure[k].element_required) {
          validate[structure[k].element_id] = Joi.number().required();
        } else {
          validate[structure[k].element_id] = Joi.number();
        }
        break;
      default:
        console.log("This type of element was not included in the JSON file");
        break;
    }
  });
  const schema = Joi.object(validate);

  const { handleSubmit, handleInputChange, errors } = useSignupForm(schema);
  return (
    <form onSubmit={handleSubmit}>
      {
        Object.keys(structure).map((e) => {
          return (
            <div key={structure[e].element_id}>
              <label htmlFor={structure[e].element_id}>
                {structure[e].element_label}
              </label>
              <input
                type={structure[e].element_type}
                placeholder={structure[e].element_placeholder}
                id={structure[e].element_id}
                name={structure[e].element_id}
                onChange={handleInputChange}
              />
            </div>
          )
        })}
      <div>
        <p>{errors.toString()}</p>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
