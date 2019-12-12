import React from 'react';
import { Link } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup';
import './CityList.css';

const CityList = (props) => {
    return (
        <div className="citiesList-container"> 
            <div className="citiesList">
                <h3>Cities</h3>
                <ListGroup >
                    {props.cityList && props.cityList.map((city, index)=> {
                        return (
                            <Link key={index} name={city.name} onClick={()=>props.handleSelect(city.name)}  style={{ textDecoration: 'none' }} to={"/cities/" + city.name.toLowerCase().split(' ').join('-')}>
                                <ListGroup.Item  name={city.name} onClick={()=>props.handleSelect(city.name)} className="list-item" action href={"/cities/" + city.name.toLowerCase().split(' ').join('-')} >
                                    <div name={city.name} onClick={()=>props.handleSelect(city.name)} className="city-container row">
                                        <div name={city.name} onClick={()=>props.handleSelect(city.name)} className="city-photo-container col-5">
                                            <img src={city.photo} alt="city" />
                                        </div>
                                        <p className="col-7 city-list-name" name={city.name} onClick={()=>props.handleSelect(city.name)}>{city.name}</p>
                                    </div>
                                </ListGroup.Item>
                            </Link>
                        ) 
                    })}
                </ListGroup>
            </div>
        </div>
    );
};

export default CityList;