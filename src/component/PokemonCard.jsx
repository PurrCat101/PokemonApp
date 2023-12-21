import React, { useState } from "react";
import { Card, Tag, Button } from "antd";
import PokemonModal from "./PokemonModal";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        className="pokemon-card"
        style={{ width: 300, margin: 10 }}
        onClick={showModal}
      >
        <div>
          <Tag>#{pokemon.id.toString().padStart(3, "0")}</Tag>
          <span className="PokemonName">{pokemon.name}</span>
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ maxWidth: "100%" }}
          />
        </div>
      </Card>
      <PokemonModal
        visible={isModalVisible}
        onCancel={handleCancel}
        pokemon={pokemon}
      />
    </div>
  );
};

export default PokemonCard;
