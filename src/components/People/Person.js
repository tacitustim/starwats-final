import React, { Component } from "react";
import { useQuery } from "react-query";
import Modal from "../Modal";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      planetData: null,
      planetStatus: "idle",
      hasPlanetError: false,
    };
  
  }
  

  componentDidMount() {
    const { person } = this.props;
    if (person.homeworld) {
      this.fetchPlanetData(person.homeworld);
    }
  }

  componentDidUpdate(prevProps) {
    const { person } = this.props;
    if (person.homeworld !== prevProps.person.homeworld) {
      if (person.homeworld) {
        this.fetchPlanetData(person.homeworld);
      } else {
        this.setState({ planetData: null, planetStatus: "idle" });
      }
    }
  }
  

  componentWillUnmount() {
    
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading planet image:", error);
    this.setState({ hasPlanetError: true });
  }

  fetchPlanetData = async (url) => {
    try {
      const res = await fetch(url);
      const planetData = await res.json();
      this.setState({ planetData, planetStatus: "success", hasPlanetError: false });
    } catch (error) {
      console.error("Error fetching planet data:", error);
      this.setState({ planetData: null, planetStatus: "error", hasPlanetError: true });
    }
  };

  getImageUrl = (personUrl) => {
    const personId = personUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`;
  };

  getPlanetImageUrl = (planetUrl) => {
    const planetId = planetUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { person } = this.props;
    const { modalOpen, planetData, planetStatus, hasPlanetError } = this.state;
    const placeholderImageUrl = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";


    return (
      <div className="card" >
      <div className="person">
        <div className="person-content">
          <div className="person-info">
            <h3>{person.name}</h3>
            <p>Skin Color - {person.skin_color}</p>
            <p>Birth Year - {person.birth_year}</p>
            
          </div>
          <div className="image-container">
            <img
              src={this.getImageUrl(person.url)}
              alt={person.name}
              className="person-image"
              onClick={this.openModal}
            />
          </div>
        </div>

        {modalOpen && (
          <Modal onClose={this.closeModal}>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            {person.homeworld && planetStatus === "success" && !hasPlanetError && (
              <>
                <h5>Homeworld: {planetData.name}</h5>
                <img
                  src={this.getPlanetImageUrl(person.homeworld)}
                  alt={`Planet of ${person.name}`}
                  onError={(e) => {
                    e.target.src = placeholderImageUrl;
                  }}
                  className="planet-image"
                />
              </>
            )}
            {person.homeworld && hasPlanetError && (
              <div>
                <p>Error loading planet image.</p>
                <img
                  src={placeholderImageUrl}
                  alt="Placeholder"
                  className="placeholder-image"
                />
              </div>
            )}
          </Modal>
        )}
      </div>
      </div>
    );
  }
}

export default Person;
