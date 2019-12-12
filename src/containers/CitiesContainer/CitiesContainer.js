import React, {Component} from 'react';
import axios from 'axios';
import CityList from '../../components/CityList/CityList';
import CityView from '../../components/CityView/CityView';
import PostPreview from '../../components/PostPreview/PostPreview';

class CitiesContainer extends Component {

    state = {
        selectedCity: '',
        articleList: [],
        cityList: [],
        selectedCityObject: {},
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/cities`).then((res)=>{
            this.setState({
                cityList: res.data.data
            })
            this.getArticleList()
        }).catch((err)=>console.log(err));
    }

    refreshPage = () => {
        this.getArticleList();
    }

    handleSelect = (city) => {
        this.setState({
            selectedCity: city,
        }, function() {this.getArticleList()})
    }

    getArticleList = () => {
        let cityName = this.props.match.params.name;
        let capitalizedName = '';
        if (cityName) {
            if (cityName.split('-').length > 1) {
                let capitalizedNameList = [];
                cityName.split('-').forEach((word) => { 
                    capitalizedNameList.push(word.charAt(0).toUpperCase() + word.slice(1));
                })
                capitalizedName = capitalizedNameList.join(' ');
            } else {
                capitalizedName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            }
        }
        
        if (cityName) {
            axios.get(`${process.env.REACT_APP_API_URL}/posts/find?name=${capitalizedName}`, {
                withCredentials: true,
            }).then((res)=>{
                this.setState({articleList: res.data.data.sort((a, b) => (a.postDate < b.postDate) ? 1 : -1)})
            }).catch((err)=>console.log(err));
            let cityObject = this.state.cityList.filter(obj => {return obj.name === this.state.selectedCity})[0]
                this.setState({
                    selectedCityObject: cityObject,
                })
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/posts/all`, {
                withCredentials: true,
            }).then((res)=>{
                this.setState({articleList: res.data.data.sort((a, b) => (a.postDate < b.postDate) ? 1 : -1)})
            }).catch((err)=>console.log(err));
        }
    }

    render () {

        return (
            <>
                <div className="row cities-container">
                    <div className="col-md-4 city-list">
                        {this.state.cityList && <CityList cityList={this.state.cityList} handleSelect={this.handleSelect} getArticleList={this.getArticleList}/>}
                    </div>
                    <div className="col-md-8">
                        <CityView 
                            selectedCity={this.state.selectedCity} 
                            cityList={this.state.cityList} 
                            articleList={this.state.articleList} 
                            refreshPage={this.refreshPage} 
                            selectedCityObject={this.state.selectedCityObject}
                        />
                        {this.state.articleList && this.state.articleList.map((article, index) => 
                            <PostPreview article={article} index={index} />
                        )}
                    </div>
                </div>
            </>
        )
    }

}

export default CitiesContainer;