import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./contact_form.css";

interface IContactFormProps {}

const ContactForm: React.FunctionComponent<IContactFormProps> = props => {
  return (
    <div className="contact-form">
      <h3>Contacta al autor</h3>
      <Formik
        initialValues={{
          nombre: "",
          mensaje: "",
          email: "",
          "form-name": "Contacte al Autor",
        }}
        validationSchema={Yup.object({
          nombre: Yup.string()
            .max(15, "Debe tener 25 caracteres o menos")
            .required("Requerido"),
          mensaje: Yup.string()
            .min(15, "Debe tener al menos 25 caracteres")
            .required("Requerido"),
          email: Yup.string()
            .email("Dirección de correo electrónico no válida")
            .required("Requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="Contacte al Autor" />
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <Field name="nombre" type="text" className="form-control" />
            <ErrorMessage name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <Field
              name="mensaje"
              component="textarea"
              className="form-control"
            />
            <ErrorMessage name="mensaje" />
          </div>
          <div data-netlify-recaptcha="true"></div>
          <button type="submit" className="btn btn-baruc">
            Enviar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
