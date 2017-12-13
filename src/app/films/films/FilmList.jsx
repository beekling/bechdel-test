import React from "react";
import PropTypes from "prop-types";
import FilmItem from "./FilmItem.jsx";
import styles from "./FilmList.scss";

class FilmList extends React.Component {
  render() {
    let filmListNode = this.props.films.map(filmData => {
      return (
        <FilmItem
          film={filmData}
          key={filmData._id}
          className={styles.filmListNode}
        />
      );
    });

    return <div className={styles.filmList}>{filmListNode}</div>;
  }
}

FilmList.propTypes = {
  films: PropTypes.array
};

FilmList.defaultProps = {
  films: []
};

export default FilmList;