import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Dropdown, Grid } from 'semantic-ui-react';
import { UserStats } from '../GraphQL';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell, Bar, BarChart } from 'recharts';

class UserInsights extends Component {

    state = {
        friend_count: 2,
        chart_data: [],
		posts:[],
		selectedPostLikeCount: 0,
		pie_chart_data: [{name: 'Friends', value: 2}],
		bar_chart_data: [
			{tag: 'basic', tag_count: 4},
			{tag: 'advanced', tag_count: 3}
		]
    }

	componentDidMount() {
		this.props.client.query({
            query: UserStats
        }).then(response =>{
            this.setState({
                friend_count: response.data.getUserStats.friends_count,
				posts: response.data.getUserStats.posts,
                chart_data: this.getCharData(response.data.getUserStats.posts, 7),
				pie_chart_data: [{name: 'Friends', value: response.data.getUserStats.friends_count}],
				bar_chart_data: this.getBarChartData(response.data.getUserStats.posts)
			})
        }).catch((err) => {
            console.log('catch', err)
        });
	}

    getPostMenuItems(posts){
        var menuItems = [];
        for(var index in posts) {
            menuItems.push({
					key: posts[index]["id"],
					value: posts[index]["id"] + "," +
						(posts[index]["liked"] ? (posts[index]["likes"] - 1) : posts[index]["likes"]),
                	text: posts[index]["caption"]
				})
        }
        return menuItems;
    }

    handleChange = (e, { value }) => this.setState({
		selectedPostLikeCount: value.split(',')[1],
		pie_chart_data: this.getPieChartData(this.state.friend_count, parseInt(value.split(',')[1], 10))
    })

    getCharData(posts, lastxdays){

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var post_arr = {}
        var today = new Date();
        var d_str = null;
        for (var i=0; i<=lastxdays; i++){
            var past_day = new Date();
            past_day.setDate(today.getDate()-i);
            d_str = past_day.getDate()+ " " +monthNames[past_day.getMonth()];
            post_arr[d_str] = 0;
        }

        for (var index in posts){
            var d = new Date(parseInt(posts[index]["createdAt"], 10));
            d_str = d.getDate() + " " +monthNames[d.getMonth()];
            if(d_str in post_arr) post_arr[d_str] += 1;
        }
        var chart_data = [];
        for (var day_str in post_arr) {
            chart_data.push({day: day_str, count: post_arr[day_str]});
        }
        return chart_data;
    }

	getPieChartData(friend_count, selectedPostLikeCount) {
		var pie_chart_data = [];
		pie_chart_data.push({name: 'Friends', value: friend_count});
		if (selectedPostLikeCount > 0) {
			pie_chart_data.push({name: 'Likes', value: selectedPostLikeCount})
		}
		return pie_chart_data;
	}

	getBarChartData(posts) {
		var tagFrequency = {};
        var tag = null;
		for (var index in posts) {
			var tagsList =  posts[index]["tags"];
			if (tagsList) {
				var tags = tagsList.split(',');
				for ( tag in tags) {
					if (!tagFrequency[tags[tag]])
						tagFrequency[tags[tag]] = {tag: tags[tag], tag_count: 0};
					tagFrequency[tags[tag]].tag_count += 1;
				}
			}
		}
		var tagsData = [];
		for (tag in tagFrequency) {
			tagsData.push(tagFrequency[tag]);
		}
		tagsData = tagsData.sort((a,b) => b.tag_count - a.tag_count).slice(0, 10);
		return tagsData;
	}

    render(){
		return(
			<div>
				<h3>You have {this.state.friend_count} friends, and you have posted {this.state.posts.length} times.</h3>
				<Grid container stackable>
					<Grid.Row>
						<Grid.Column width={10}>
							<p> Your posts in last 7 days </p>
							<br/>
							<LineChart width={600} height={300} data={this.state.chart_data}
									margin={{top: 5, right: 30, left: 20, bottom: 5}}>
							   <XAxis dataKey="day"/>
							   <YAxis/>
							   <CartesianGrid strokeDasharray="3 3"/>
							   <Tooltip/>
							   <Legend />
							   <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 8}}/>
						  	</LineChart>
						</Grid.Column>
						<Grid.Column width={6}>
							<p>Likes on your posts</p>
							<Dropdown placeholder='Posts'
								fluid search
								selection options={this.getPostMenuItems(this.state.posts)}
								onChange={this.handleChange}/>
							<PieChart width={800} height={400}>
								<Pie dataKey="value"
									data={this.state.pie_chart_data}
									cx="20%"
									cy="50%"
									innerRadius={70}
									outerRadius={90}
									fill="#E6E600"
									label
									>
									{
										<Cell fill={"#8884D8"}/>
									 }
								</Pie>
								<Legend verticalAlign="middle" align="center" layout="vertical"/>
							</PieChart>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered={true}>
						<Grid.Column width={10}>
							<p> Top Tags in your posts </p>
							<BarChart width={600} height={300} data={this.state.bar_chart_data}
								margin={{top: 5, right: 30, left: 20, bottom: 5}}>
							   	<CartesianGrid strokeDasharray="3 3"/>
							   	<XAxis dataKey="tag"/>
							   	<YAxis/>
							   	<Tooltip/>
							   	<Legend />
							   	<Bar dataKey="tag_count" fill="#8884d8" name="Tags Count"/>
					  		</BarChart>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
        )
    }
}
export default withApollo(UserInsights);
