// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function TableBody(props) {
  if (props.characterData === null) {
    return <caption>Data Unavailable</caption>;
  }

  return (
    <tbody>
      {props.characterData.map((character, index) => (
        <tr key={index}>
          <td>{character.name}</td>
          <td>{character.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  characterData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    })
  ), // array of objects with 'name' and 'job' strings
  removeCharacter: PropTypes.func.isRequired, // function to remove character
};

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Actions</th>
        </tr>
      </thead>
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
Table.propTypes = {
  characterData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    })
  ), // array of objects with 'name' and 'job' strings
  removeCharacter: PropTypes.func.isRequired, // function to remove character
};

export default Table;
