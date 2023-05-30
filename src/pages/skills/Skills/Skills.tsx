import React from "react";

import styles from "./Skills.module.css"

import * as Yup from "yup";
//import { Formik, Form } from "formik";

import Input from "../../../components/forms/Input/Input";

import Select from "../../../components/forms/Select";

import { InfoSkill, createOrUpdateInfoSkill } from "../../../services/serviceSkill";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../../components/common/Title/Title";
import Button from "../../../components/common/Button/Button";

import Form from "../../../components/forms/Form";

const Skills: React.FC = () => {

  const navigate = useNavigate();
  // const location = useLocation();
  const skill = useLocation().state as InfoSkill;


  const initialValues: InfoSkill = {
    // id: 0,
    name: "",
    image: "",
    tipo: "",
    // nome: "",
  };

  const validationSchema = Yup.object().shape({
    id:Yup.number(),
    image: Yup.string().required('Campo obrigatório'),
    name: Yup.string().required('Campo obrigatório'),
    tipo:Yup.string(),
  });

  const onSubmit = async (values: InfoSkill, { resetForm }: { resetForm: () => void }) => {
    try {
      await createOrUpdateInfoSkill(values);
      resetForm();
      navigate("/skill/lista");
      alert("Formulario enviado com Sucesso!");
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao enviar o formulario");
    }
  };


  return (
    <div className={styles.formWrapper}>
      <Form
        initialValues={skill||initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>

        {({ errors, touched }) => (

          <>
           { !skill ?
            <Title>Cadastrar Habilidade</Title>
            :
            <Title>Atualizar Habilidade</Title>
          }
            <Input
              label="Habilidade"
              name="name"
              errors={errors.name}
              touched={touched.name}
            />

            <Input
              label="Imagem"
              name="image"
              errors={errors.image}
              touched={touched.image}
            />

            <Select
              label="Nivel de Experiência"
              name="tipo"
              options={[
                { value: "aprimorando", label: "Aprimorando" },
                { value: "profissional", label: "Profissional" },
              ]}
              errors={errors.tipo}
              touched={touched.tipo}
            />

            <Button
              type="submit"
            >Cadastrar</Button>

          </>
        )}
      </Form>
    </div>
  );
};
export default Skills;