import Mod from "./Mod";

const ModList = ({ mods, onDelete }) => {
  return (
    <>
      {mods.map((mod) => (
        <Mod
          key={mod.moduleCode}
          mod={mod}
          onDelete={onDelete}
          deleteState={true}
        />
      ))}
    </>
  );
};

export default ModList;
