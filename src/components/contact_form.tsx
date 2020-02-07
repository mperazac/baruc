import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./contact_form.css";

interface IContactFormProps { }

function encode(data: any) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactForm: React.FunctionComponent<IContactFormProps> = props => {
  return (
    <div className="contact-form">
      <h3>Contacta al autor</h3>
      <Formik
        initialValues={{
          nombre: "",
          mensaje: "",
          email: "",
          "form-name": "contacto",
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
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': 'formik',
              ...values,
            }),
          })
            //.then(succ => navigate('/thanks'))
            .catch(error => console.log(error))
        }}
      >
        <Form
          name="contacto"
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="contacto" />
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
      <form data-netlify="true" hidden name="contacto" data-netlify-recaptcha="true">
        <input type="text" name="nombre" />
        <input type="email" name="email" />
        <input type="textarea" name="mensaje" />
      </form>
    </div>
  );
};

export default ContactForm;
