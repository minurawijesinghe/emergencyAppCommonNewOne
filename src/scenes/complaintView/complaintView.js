import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './complaintViewStyles';
import {updateToken} from '../../actions';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from '../../components/molecules/videoPlayer';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import baseURL from '../../utils/baseURL';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/colors';

const ScreenSize = Dimensions.get('window');

const images = [
  {
    uri: 'null custom',
  },
];
let attachmentCount = 0;
let complaint_id;
class complaintView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleVideoModal: false,
      isVisibleImageModal: false,
      isSoundPlaying: false,
      note: '',
      isSoundModalVisible: false,
      videoLink: 'null',
      imageLink: 'null',
      audioLink: 'null',
      time: '',
      complaintLat: '',
      complaintLon: '',
      loadingForApi: true,
      viewNote: false,
      isNoteModalVisible: false,
      attachedCount: '',
    };
  }
  componentDidMount = () => {
    const {complaintId} = this.props.route.params;
    complaint_id = complaintId;
    this.getComplaintData();
  };
  customModal = () => {
    return (
      <View>
        <Modal isVisible={this.state.isVisibleVideoModal}>
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              width: ScreenSize.width * 0.9,
            }}
            onPress={() => {
              this.modalHide();
            }}>
            <AntDesign color={'white'} size={50} name={'close'} />
          </TouchableOpacity>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <VideoPlayer videoLink={this.state.videoLink} type={'video'} />
          </View>
        </Modal>
      </View>
    );
  };
  modalHide = () => {
    this.setState({
      isVisibleVideoModal: false,
      isSoundModalVisible: false,
      isNoteModalVisible: false,
    });
  };
  customModalAudio = () => {
    return (
      <View>
        <Modal isVisible={this.state.isSoundModalVisible}>
          {}
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              width: ScreenSize.width * 0.9,
              borderRadius: 10,
            }}
            onPress={() => {
              this.modalHide();
            }}>
            <AntDesign color={'white'} size={50} name={'close'} />
          </TouchableOpacity>
          <View style={{height: 150, width: ScreenSize.width * 0.9}}>
            <LottieView
              source={require('../../utils/lottieAnimations/audioPlay.json')}
              autoPlay
              loop
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <VideoPlayer videoLink={this.state.audioLink} type={'audio'} />
          </View>
        </Modal>
      </View>
    );
  };
  componentWillUnmount=()=>{
    attachmentCount=0;
  }
  customModalNote = () => {
    return (
      <View>
        <Modal isVisible={this.state.isNoteModalVisible}>
          {}
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              width: ScreenSize.width * 0.9,
              borderRadius: 10,
            }}
            onPress={() => {
              this.modalHide();
            }}>
            <AntDesign color={'white'} size={50} name={'close'} />
          </TouchableOpacity>
          <View style={{height: 150, width: ScreenSize.width * 0.9}}>
            <LottieView
              source={require('../../utils/lottieAnimations/note.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{this.state.note}</Text>
          </View>
        </Modal>
      </View>
    );
  };
  getComplaintData = () => {
    axios({
      method: 'GET',
      url: baseURL + '/complaint/' + complaint_id,
      headers: {Authorization: `Bearer ${this.props.token}`},
    })
      .then(
        complaint => {
          images[0].uri = complaint.data.image;
          //  let time = timeSplitter(complaint.data.createdAt);
          if (typeof complaint.data.note !== 'undefined') {
            this.setState({
              viewNote: true,
            });
          }
          this.setState({
            complaintLat: complaint.data.latitude,
            complaintLon: complaint.data.longitude,
            time: complaint.data.createdAt,
            videoLink: complaint.data.video,
            audioLink: complaint.data.audio,
            imageLink: complaint.data.image,
            loadingForApi: false,
            note: complaint.data.note,
          });
          if (this.state.videoLink !== 'null') {
            attachmentCount++;
          }
          if (this.state.audioLink !== 'null') {
            attachmentCount++;
          }
          if (this.state.viewNote) {
            attachmentCount++;
          }
          if (this.state.imageLink !== 'null') {
            attachmentCount++;
          }
          this.setState({
            attachedCount: '(' + attachmentCount + ')',
          });
        },
        err => console.log(err),
      )
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.state.loadingForApi}
          textContent={
            <Text style={{color: 'white'}}>Loading complaint data...</Text>
          }
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={
            ()=>this.props.navigation.navigate('PastComplaints')
          }>
            <Ionicons name={'arrow-back'} color={Colors.GRAY_MEDIUM} size={50}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {' '}
            {'Attachments' + this.state.attachedCount}
          </Text>
        </View>
        {this.state.videoLink == 'null' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={styles.lottieContainer}
            onPress={() => {
              this.setState({
                isVisibleVideoModal: true,
              });
            }}>
            <View style={styles.lottieInnerContainer}>
              <LottieView
                source={require('../../utils/lottieAnimations/video.json')}
                autoPlay
                loop></LottieView>
            </View>
            <Text style={styles.lottieText}>Play Video</Text>
          </TouchableOpacity>
        )}
        {this.state.audioLink == 'null' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={styles.lottieContainer}
            onPress={() => {
              this.setState({
                isSoundModalVisible: true,
              });
            }}>
            <View style={styles.lottieInnerContainer}>
              <LottieView
                source={require('../../utils/lottieAnimations/audio.json')}
                autoPlay
                loop
                speed={0.5}></LottieView>
            </View>
            <Text style={styles.lottieText}>Play Audio.</Text>
          </TouchableOpacity>
        )}
        {this.state.isSoundPlaying ? (
          <LottieView
            style={{alignSelf: 'center', justifyContent: 'center'}}
            source={require('../../utils/lottieAnimations/audioPlay.json')}
            autoPlay
            loop
            speed={0.1}></LottieView>
        ) : (
          <View></View>
        )}
        {this.state.imageLink == 'null' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={styles.lottieContainer}
            onPress={() => {
              this.setState({
                isVisibleImageModal: true,
              });
            }}>
            <View style={styles.lottieInnerContainer}>
              <LottieView
                source={require('../../utils/lottieAnimations/preview.json')}
                autoPlay
                loop
                speed={4}></LottieView>
            </View>
            <Text style={styles.lottieText}>View Images</Text>
          </TouchableOpacity>
        )}
        {!this.state.viewNote ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={styles.lottieContainer}
            onPress={() => {
              this.setState({
                isNoteModalVisible: true,
              });
            }}>
            <View style={styles.lottieInnerContainer}>
              <LottieView
                source={require('../../utils/lottieAnimations/note.json')}
                autoPlay
                loop></LottieView>
            </View>
            <Text style={styles.lottieText}>View Note</Text>
          </TouchableOpacity>
        )}
        <ImageView
          images={images}
          imageIndex={0}
          visible={this.state.isVisibleImageModal}
          onRequestClose={() => {
            this.setState({
              isVisibleImageModal: false,
            });
          }}
        />
        {attachmentCount == 0 ? (
          <View style={styles.noAttachmentTextContainer}>
                      <Text style={styles.noAttachmentText}>No attachment found </Text>
          </View>
        ) : (
          <View></View>
        )}
        <this.customModal></this.customModal>
        <this.customModalAudio></this.customModalAudio>
        <this.customModalNote></this.customModalNote>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.initialState.token,
    officerId: state.initialState.officerId,
  };
}

export default connect(mapStateToProps, {updateToken})(complaintView);
