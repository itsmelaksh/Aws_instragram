import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { withApollo } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GlobalStats } from '../GraphQL';

class TopUsers extends Component {

    state = {
        active_chartdata:  [
              {username: 'User 1', posts_count: 4},
              {username: 'User 2', posts_count: 3},
              {username: 'User 3', posts_count: 2}],
        inf_chartdata:  [
            {username: 'User 1', friends_count: 4},
            {username: 'User 2', friends_count: 3},
            {username: 'User 3', friends_count: 2}]
    }

    componentDidMount() {
        this.props.client.query({
            query: GlobalStats
        }).then(response =>{
            var active_arr = [...response.data.getGlobalStats];
            active_arr = active_arr.sort((a,b) => b.posts_count - a.posts_count).slice(0, 10);

            var inf_arr = [...response.data.getGlobalStats];
            inf_arr = inf_arr.sort((a,b) => b.friends_count - a.friends_count).slice(0, 10);

            this.setState({
                inf_chartdata: inf_arr,
                active_chartdata: active_arr
            })
        }).catch((err) => {
            console.log('catch', err)
        });
    }

    render(){
        return(
            <Grid container stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <h3>Most Active Users</h3>
                    <BarChart width={600} height={300} data={this.state.active_chartdata}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <XAxis dataKey="username"/>
                       <YAxis/>
                       <Tooltip/>
                       <Legend/>
                       <Bar dataKey="posts_count" fill="#8884d8" name="Posts Count"/>
                    </BarChart>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h3>Most Followed Users</h3>
                    <BarChart width={600} height={300} data={this.state.inf_chartdata}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <XAxis dataKey="username"/>
                       <YAxis/>
                       <Tooltip/>
                       <Legend />
                       <Bar dataKey="friends_count" fill="#8884d8" name="Followers Count"/>
                  </BarChart>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}
export default withApollo(TopUsers);
