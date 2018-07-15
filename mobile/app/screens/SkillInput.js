/* eslint-disable */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import WallpaperBackground from '../components/Common/WallpaperBackground';

const skillList = [
  'C++', 'Java', 'C#', 'Agile', 'Testing', 'Penestration Testing',
  'Waterfall', 'Project Management'
];

class SkillInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  handleSelected(indx) {
    const { selected } = this.state;
    if (selected.includes(indx)) {
      const i = selected.indexOf(indx);
      if (i > -1) selected.splice(i, 1);
      this.setState({ selected });
      return;
    }
    selected.push(indx);
    this.setState({ selected });
  }

  render() {
    const { selected } = this.state;
    const { navigation } = this.props;

    return (
      <WallpaperBackground>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'flex-end',
          }}>
            {
              skillList.map((e, i) =>
                selected.includes(i)
                ? <Button
                    key={i}
                    title={e}
                    icon={{name: 'check'}}
                    onPress={() => this.handleSelected(i)}
                    rounded
                    buttonStyle={{
                      marginTop: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}
                  />
                : <Button
                    key={i}
                    title={e}
                    onPress={() => this.handleSelected(i)}
                    rounded
                    buttonStyle={{
                      marginTop: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}
                  />
              )
            }
          </View>
          <View style={{
            flex: 1,
          }}>
            <Button
              title='Find me a favour'
              onPress={() => navigation.navigate('JobResult')}
              rounded
              buttonStyle={{
                marginTop: 25,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
                borderColor: '#bfe6ff',
              }}
              textStyle={{
                color: '#bfe6ff',
              }}
            />
          </View>
        </View>
      </WallpaperBackground>
    );
  }
}

export default SkillInput;