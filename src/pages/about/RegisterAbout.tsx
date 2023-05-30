import React, { useEffect, useState } from "react";

import * as Yup from "yup";

//import { Formik, Form } from "formik";


import styles from "./RegisterAbout.module.css";
import Input from "../../components/forms/Input/Input";
import Textarea from "../../components/forms/Textarea";
import { InfoAbout, updateInfoAbout, getInfoAbout, deleteInfoAbout, createOrUpdateInfoAbout } from "../../services/serviceAbout";
import CardAbout from "./CardAbout";

import Button from "../../components/common/Button";

import Title from "../../components/common/Title/Title";

import Form from "../../components/forms/Form";
import { Axios, AxiosError } from "axios";



const RegisterAbout: React.FC = () => {

  const [infoAbout, setInfoAbout] = useState<InfoAbout>();


  const initialValues: InfoAbout = {
    foto: '',
    resumo: '',
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required('Campo obrigatório'),
    resumo: Yup.string().required('Campo obrigatório'),
  });

  const fetchInfoAbout = async () => {
    try {
      const infoAbout = await getInfoAbout();
      setInfoAbout(infoAbout);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error("Erro ao buscar informações:", error);
        }
      } else {
        console.error("Ocorreu um erro desconhecido ao buscar informações:", error);
      }
    }
  };
  // Hook para gerenciar vida do componente, serve para quando rendenizar pela priemira vez - useEffect
  useEffect(() => {
    fetchInfoAbout();
  }, []);


  const onSubmit = async (values: InfoAbout) => {
    try {
      await createOrUpdateInfoAbout(values);
      setInfoAbout(values);
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar formulario. Tente novamente.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInfoAbout();
      setInfoAbout(undefined);
      alert("Informações deletadas com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar informações", error);
      alert("Ocorreu um erro ao deletar as informações. Tente novamente.")
    }
  };

  return (
    <div className={styles.formWrapper}>

      <Form
        initialValues={infoAbout || initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>

        {({ errors, touched }) => (

          <>
            <Title>Informações Sobre</Title>

            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
            />

            <Textarea
              label="Resumo"
              name="resumo"
              errors={errors.resumo}
              touched={touched.resumo}
            />
            <Button type="submit">
              Salvar
            </Button>

          </>
        )}

      </Form>

      {infoAbout &&
        <div className={styles.cardContainer}>
          <CardAbout infoAbout={infoAbout} />

          <Button
            type="button"
            onClick={handleDelete}
            red
          >Deletar
          </Button>

        </div>
      }
    </div>
  );
};
export default RegisterAbout;




// {infoAbout && Object.keys(infoAbout).length > 0 && (
//   <div className={styles.cardContainer}>
//     <CardAbout infoAbout={infoAbout} />

//     <Button
//       type="button"
//       onClick={handleDelete}
//       red
//     >Deletar
//     </Button>

//   </div>
// )}