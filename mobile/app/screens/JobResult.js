/* eslint-disable */
import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Icon, ListItem, Text } from 'react-native-elements';
import _ from 'lodash';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import { H1, H6, WhiteText } from '../components/Text';

const skillList = [
  'C++', 'Java', 'C#', 'Agile', 'Testing', 'Penestration Testing',
  'Waterfall', 'Project Management'
];

class JobResult extends PureComponent {

  componentDidMount() {
    const { fetchResult } = this.props;
    fetchResult();
  }

  itemPressHandler = (id) => {
    const { navigation } = this.props;
    navigation.navigate('Interview', {interviewId: id});
  }

  keyExtractor = (item) => item._id

  renderItem = ({ item }) => (
    <ListItem
      titleStyle={{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      }}
      onPress={() => this.itemPressHandler(item._id)}
      title={item.name}
      subtitle={
      <View marginLeft={10}>
        <Text style={{color: '#ddd'}}>{item.orgName} - <Text style={{color: '#42f462'}}>Matching 80%</Text></Text>
      </View>
      }
    />
  )

  render() {
    const {
      navigation,
      resultCount,
      result,
      oragnizations,
     } = this.props;

     const itemList = _.map(result, (e, i) =>
        ({...e, orgName: oragnizations[i] ? oragnizations[i].name : ''})
      );

    return (
      <WallpaperBackground>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          paddingTop: 25,
        }}>
          <WhiteText>
            <Text style={{
              fontSize: 24,
            }}>
              {resultCount < 0 ? `Đang tìm kiếm`: `Đã tìm thấy ${resultCount} kết quả`}
            </Text>
          </WhiteText>
          <FlatList
            data={itemList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{
              width: '100%'
            }}
          />
        </View>
      </WallpaperBackground>
    );
  }
}

export default JobResult;