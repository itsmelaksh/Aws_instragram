import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { withApollo } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GlobalPostsStats } from '../GraphQL';


class TopPosts extends Component {

    state = {
        likes_chartdata:  [
              {caption: 'Caption 1', likes: 4},
              {caption: 'Caption 2', likes: 3},
              {caption: 'Caption 3', likes: 2}],
        tags_chartdata:  [
            {tag: 'Tag 1', count: 4},
            {tag: 'Tag 2', count: 3},
            {tag: 'Tag 3', count: 2}]
    }

    componentDidMount() {
        this.props.client.query({
            query: GlobalPostsStats
        }).then(response =>{

            var postFrq = [];
            var tagFrq = {};

            for (var i in response.data.getGlobalStats){
                if(response.data.getGlobalStats[i]["posts"]){
                    var posts_arr = response.data.getGlobalStats[i]["posts"];
                    for (var j in posts_arr){
                        postFrq.push({caption: posts_arr[j]["caption"],
                            likes: posts_arr[j]["likes"],
                            name: posts_arr[j]["caption"]
                        });
                        if(posts_arr[j]["tags"]){
                            var tags = posts_arr[j]["tags"].split(",");
                            for(var k in tags){
                                if(!tagFrq[tags[k]])
                                    tagFrq[tags[k]] = {tag: tags[k], count: 0};
                                tagFrq[tags[k]].count += 1;
                            }
                        }
                    }
                }
            }
            var tagarr = [];
            for (var tag in tagFrq) tagarr.push(tagFrq[tag]);

            postFrq = postFrq.sort((a,b) => b.likes - a.likes).slice(0, 10);
            tagarr = tagarr.sort((a,b) => b.count - a.count).slice(0, 10);

            this.setState({
                likes_chartdata: postFrq,
                tags_chartdata: tagarr
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
                    <h3>Top Posts</h3>
                    <BarChart width={600} height={300} data={this.state.likes_chartdata}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <XAxis dataKey="caption"/>
                       <YAxis/>
                       <Tooltip/>
                       <Legend/>
                       <Bar dataKey="likes" fill="#8884d8" name="Total Likes"/>
                    </BarChart>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h3>Top Tags</h3>
                    <BarChart width={600} height={300} data={this.state.tags_chartdata}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <XAxis dataKey="tag"/>
                       <YAxis/>
                       <Tooltip/>
                       <Legend />
                       <Bar dataKey="count" fill="#8884d8" name="Count"/>
                  </BarChart>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }

}
export default withApollo(TopPosts);
