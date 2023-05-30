import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SkillList.module.css";

import { InfoSkill, deleteInfoSkill, getInfoSkill, updateInfoSkill } from "../../../services/serviceSkill";

import { Table,Column } from "../../../components/common/Table";



const SkillList: React.FC = () => {

  const navigate = useNavigate();

  const [infoSkill, setInfoSkill] = React.useState<InfoSkill[]>([]);

  const fetchInfoSkill = async () => {
    try {
      const infoSkill = await getInfoSkill();
      setInfoSkill(infoSkill);
    } catch (error) {
      console.log('Erro ao buscar lista de habilidades', error);
    }
  };

  useEffect(() => {
    fetchInfoSkill();
  }, []);

  const handleDelet = async (infoSkill: InfoSkill) => {

    try {
      await deleteInfoSkill(infoSkill.id);
      fetchInfoSkill();
      alert('Habilidade deletada com sucesso!');
    } catch (error) {
      console.log('Erro ao deletar habilidade', error);
      alert('Erro ao deletar habilidade!');
    }

  };

  const handleEdit = (itemInfoSkill: InfoSkill) => {
    navigate("/skill/cadastrar", { state: itemInfoSkill })
  };

  const columns: Column<InfoSkill>[] = [
    {header: "Habilidade", accessor: "name"},
    {header: "Imagem", accessor: "image"},
    {header: "Nivel", accessor: "tipo"},
  ];

  return (

    <Table
     columns={columns}
     data={infoSkill}
     handleEdite={handleEdit}
     handleDelete={handleDelet}
     />
  );
};

export default SkillList;