import React, {useState} from "react";
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
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="contact-form">
      <h3>Contacta al autor</h3>
      <Formik
        initialValues={{
          nombre: "",
          mensaje: "",
          email: "",
          "form-name": "contacto",
          "bot-field": "",
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setIsMessageSent(false);
          setError(false);
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': 'formik',
              ...values,
            }),
          })
            .then(succ => {
              setIsMessageSent(true);
              resetForm({});
              //navigate('/thanks')
            })
            .catch(error => setError(true))
        }}
      >
        <Form
          name="contacto"
          method="post"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <Field type="hidden" name="form-name" />
          <Field type="hidden" name="bot-field" />
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
          <button type="submit" className="btn btn-baruc">
            Enviar
          </button>
        </Form>
      </Formik>
      {isMessageSent && <p>¡Mensaje enviado exitósamente!</p>}
      {error && <p>Ocurrió un error al intentar enviar el mensaje. Por favor, intentelo de nuevo.</p>}
    </div>
  );
};

export default ContactForm;
