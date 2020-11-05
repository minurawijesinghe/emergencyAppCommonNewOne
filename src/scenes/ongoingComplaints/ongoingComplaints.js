import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './ongoingComplaintsStyles';
import {updateToken} from '../../actions';
import {connect} from 'react-redux';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import VideoPlayer from '../../components/molecules/videoPlayer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Colors} from '../../styles/colors';
import storage from '@react-native-firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import Button from 'react-native-really-awesome-button/src/themes/blue';


const ScreenSize = Dimensions.get('window');
const images = [
  {
    uri: 'null custom',
  },
];
let videoUri = null;
let imageUri = null;
class ongoingComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerFirstName: '',
      officerLastName: '',
      officerCode: '',
      complaintLat: 0,
      complaintLon: 0,
      isOfficerAssigned: false,
      image: '',
      loadingForApi: true,
      isVisibleVideoModal: false,
      isVisibleImageModal: false,
      isSoundPlaying: false,
      note: '',
      isSoundModalVisible: false,
      videoLink: 'null',
      imageLink: 'null',
      audioLink: 'null',
      time: '',
      viewNote: false,
      isNoteModalVisible: false,
      attachedCount: '',
      officerId: '',
      officerLat: 0,
      officerLon: 0,
      uploadingImage: false,
      uploadingVideo: false,
      uploadingAudio: false,
      complaintId: '',
      isImageModalVisible: false,
      isVideoModalVisible: false,
      videoUri: '',
      inNotePreModalVisible:false,
      editedNote:'',
      updatingNote:false,
      isThereOnGoingComplaint:false,
      noComplaint:false,
      isCancelModalVisible:false,
    
  
    };
  }
  componentDidMount = () => {
    this.props.navigation.addListener('focus', () => {
      this._onGettingOnGoingComplaint();
      console.log('on going focused')  
    });
    this._onGettingOnGoingComplaint();
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
  _onRemoveComplaint=()=>{
    this.toggleCancelModal();
    axios({
      url: baseURL + '/complaint/remove',
      method: 'PUT',
      headers: {
        Authorization: `bearer ${this.props.token}`,
      },
      data: {
        complaintId: this.state.complaintId,
      },
    })
    .then((complaint)=>{
      console.log('successfully removed the complaint'),
      this.setState({
        isOfficerAssigned:false,
      })
      this._onGettingOnGoingComplaint();
    })

  }
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
  _onGettingOfficerLocation = () => {
    console.log('officer Id ', this.state.officerId);
    axios({
      method: 'GET',
      url: baseURL + '/officerLocations/' + this.state.officerId,
      headers: {Authorization: `Bearer ${this.props.token}`},
    })
      .then(officerLocation => {
        console.log('officer location ', officerLocation.data.latitude);
        this.setState({
          officerLat: officerLocation.data.latitude,
          officerLon: officerLocation.data.longitude,
        });
      })
      .catch(err => console.log(err));
  };
  _onGettingOnGoingComplaint = () => {
    this.setState({
      loadingForApi:true,
    })
    axios({
      method: 'GET',
      url: baseURL + '/complaint/myOnGoingComplaint',
      headers: {Authorization: `Bearer ${this.props.token}`},
    })
      .then(
        complaint => {
          console.log('complaint data from ingoing complaint screen', complaint.data)
          if (complaint.data !== null) {
            console.log('note ', complaint.data.note);
            images[0].uri = complaint.data.image;
            if(typeof complaint.data.officerInCharge == 'undefined'){
              console.log(' no officer assigned')
              if(typeof complaint.data.note !== 'undefined'){
                this.setState({
                  note: complaint.data.note,
                });
              }
              this.setState({
                //officerId: complaint.data.officerInCharge._id,
              //  officerFirstName: complaint.data.officerInCharge.firstname,
               // officerLastName: complaint.data.officerInCharge.lastname,
               // officerCode:
               //   'Officer Code ' + complaint.data.officerInCharge.officerCode,
               // image: complaint.data.officerInCharge.image,
                loadingForApi: false,
                complaintLat: complaint.data.latitude,
                complaintLon: complaint.data.longitude,
                time: complaint.data.createdAt,
                videoLink: complaint.data.video,
                audioLink: complaint.data.audio,
                imageLink: complaint.data.image,
                loadingForApi: false,
                noComplaint:false,
                //note: complaint.data.note,
                complaintId: complaint.data._id,
              });
            }else{
              if(typeof complaint.data.note !== 'undefined'){
                this.setState({
                  note: complaint.data.note,
                });
              }
              console.log('officer assigned')
              this.setState({
                officerId: complaint.data.officerInCharge._id,
                officerFirstName: complaint.data.officerInCharge.firstname,
                officerLastName: complaint.data.officerInCharge.lastname,
                officerCode:
                  'Officer Code ' + complaint.data.officerInCharge.officerCode,
                image: complaint.data.officerInCharge.image,
                loadingForApi: false,
                complaintLat: complaint.data.latitude,
                complaintLon: complaint.data.longitude,
                time: complaint.data.createdAt,
                videoLink: complaint.data.video,
                audioLink: complaint.data.audio,
                imageLink: complaint.data.image,
                loadingForApi: false,
                //note: complaint.data.note,
                complaintId: complaint.data._id,
                isOfficerAssigned:true,
                noComplaint:false,

              });
              this._onGettingOfficerLocation();

            }
           
            if (typeof complaint.data.note !== 'undefined') {
              this.setState({
                viewNote: true,
              });
            }
            this._onGettingOfficerLocation();
          }else{
            console.log('null data')

            this.setState({
              loadingForApi:false,
              noComplaint:true,
            })
          }
        },
        err => console.log(err),
      )
      .catch(err => {
        console.log(err);
      });
  };
  toggleImageModal = () => {
    this.setState({isImageModalVisible: !this.state.isImageModalVisible});
  };
  toggleVideoModal = () => {
    this.setState({isVideoModalVisible: !this.state.isVideoModalVisible});
  };
  toggleNoteModal = () => {
    this.setState({inNotePreModalVisible: !this.state.inNotePreModalVisible});
  };
  toggleCancelModal = () => {
    this.setState({isCancelModalVisible: !this.state.isCancelModalVisible});
  };
  uploadImage = complaintId => {
    this.setState({
      uploadingImage:true,
    })
    const reference2 = storage().ref(
      `/complaints/${this.state.complaintId}/image.jpg`,
    );
    reference2
      .putFile(imageUri)
      .then(
        () => {
          reference2.getDownloadURL().then(url => {
            console.log('image download url from after then', url);
            axios({
              url: baseURL + '/complaint/image',
              method: 'PUT',
              headers: {
                Authorization: `bearer ${this.props.token}`,
              },
              data: {
                image: url,
                complaintId: complaintId,
              },
            }).then(complaint => {
              this.setState({
                imageLink: url,
                uploadingImage:false
              });
              images[0].uri = url,
              console.log('image uploaded and saved in db and image link is, ', this.state.imageLink);
            });
          });
        },
        err => console.log('err', err),
      )
      .catch(err => console.log(err));
  };
  uploadAudio = complaintId => {
    // console.log('complaintId', complaintId);
    const reference1 = storage().ref(
      `/complaints/${this.state.complaintId}/audio.mp4`,
    );
    const url = reference1.getDownloadURL();

    console.log('url audio', url);

    reference1
      .putFile('file://sdcard/sound.mp4')
      .then(
        () => {
          reference1.getDownloadURL().then(url => {
            console.log('image download url from after then', url);
            axios({
              url: baseURL + '/complaint/audio',
              method: 'PUT',
              headers: {
                Authorization: `bearer ${this.props.token}`,
              },
              data: {
                audio: url,
                complaintId: complaintId,
              },
            }).then(complaint => {
              this.setState({
                audioLink: url,
              });
              console.log(complaint.data.complaint);
            });
          });
        },
        err => console.log('err', err),
      )
      .catch(err => console.log(err));
  };
  uploadVideo = complaintId => {
    const reference = storage().ref(
      `/complaints/${this.state.complaintId}/video.mp4`,
    );
    const url = reference.getDownloadURL();
    console.log('url video', url);
    reference
      .putFile(videoUri)
      .then(
        () => {
          reference.getDownloadURL().then(url => {
            console.log('video download url from after then', url);
            axios({
              url: baseURL + '/complaint/video',
              method: 'PUT',
              headers: {
                Authorization: `bearer ${this.props.token}`,
              },
              data: {
                video: url,
                complaintId: this.state.complaintId,
              },
            }).then(complaint => {
              this.setState({
                videoLink: url,
                uploadingVideo: false,
              });
             // console.log(complaint.data.complaint);
            });
          });
        },
        err => console.log('err', err),
      )
      .catch(err => console.log(err));
  };
  openGalleryImagePicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 600,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({
        isImageModalVisible: !this.state.isImageModalVisible,
        imageExist: true,
        imageUri: image.path,
      });
      imageUri = this.customizeUrl(image.path);
      this.uploadImage(this.state.complaintId);
    });
  };
  openGalleryVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('video path ', video);
      this.setState({
        isVideoModalVisible: !this.state.isVideoModalVisible,
        videoUri: video.path,
        uploadingVideo:true,
      });
      videoUri = this.customizeUrl(video.path);
      this.uploadVideo();
    });
  };
  openCameraImagePicker = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 600,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({
        isImageModalVisible: !this.state.isImageModalVisible,
        imageExist: true,
        imageUri: image.path,
      });
      imageUri = this.customizeUrl(image.path);
    });
  };
  start = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      console.log(image);
      this.setState({
        video: image.path,
        uploadingVideo: true,
        videoExist: true,
        isVideoModalVisible: !this.state.isVideoModalVisible,
      });
      videoUri = this.customizeUrl(image.path);
      this.uploadVideo();
    });
  };
  customizeUrl(url) {
    var str = url.slice(0, 6) + url.slice(7);
    console.log(str);
    return str;
  }
  updateNote =()=>{
    this.setState({
      updatingNote:true,
    });

 axios({
              url: baseURL + '/complaint/note',
              method: 'PUT',
              headers: {
                Authorization: `bearer ${this.props.token}`,
              },
              data: {
                note: this.state.editedNote,
                complaintId: this.state.complaintId,
              },
            }).then(complaint => {
              this.setState({
                updatingNote: false,
              });
              this._onGettingOnGoingComplaint();
            }).catch(err=>console.log(err))
  }
  render() {
    var base64Image = 'data:image/jpg;base64,' + this.state.image;
    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.state.loadingForApi}
          textContent={
            <Text style={{color: 'white'}}>Fetching your complaint</Text>
          }
        />
        <Spinner
          visible={this.state.uploadingAudio}
          textContent={<Text style={{color: 'white'}}>Audio uploading..</Text>}
        />
        <Spinner
          visible={this.state.uploadingImage}
          textContent={<Text style={{color: 'white'}}>Image uploading..</Text>}
        />
        <Spinner
          visible={this.state.uploadingVideo}
          textContent={<Text style={{color: 'white'}}>Video Uploading..</Text>}
        />
        <Spinner
          visible={this.state.updatingNote}
          textContent={<Text style={{color: 'white'}}>Note updating...</Text>}
        />
        <Modal isVisible={this.state.isImageModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity
                style={styles.modalCloseIconContainer}
                onPress={this.toggleImageModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={40}
                  color={Colors.BLACK}
                />
              </TouchableOpacity>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButtonsInnerContainer}
                  onPress={this.openGalleryImagePicker}>
                  <Text style={styles.buttonTextInnerModal}>
                    Choose Image from gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonsInnerContainer}
                  onPress={this.openCameraImagePicker}>
                  <Text style={styles.buttonTextInnerModal}>
                    Take image from camera
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isVideoModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity
                style={styles.modalCloseIconContainer}
                onPress={this.toggleVideoModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={40}
                  color={Colors.BLACK}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonsInnerContainer}
                onPress={this.openGalleryVideoPicker}>
                <Text style={styles.buttonTextInnerModal}>
                  Choose Video from gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonsInnerContainer}
                onPress={this.start}>
                <Text style={styles.buttonTextInnerModal}>
                  Record Video from camera
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isCancelModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity
                style={styles.modalCloseIconContainer}
                onPress={this.toggleCancelModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={40}
                  color={Colors.BLACK}
                />
              </TouchableOpacity>
              <Text style={styles.confirmText}>Confirm cancellation</Text>
              <TouchableOpacity
              onPress={()=>this._onRemoveComplaint()}
                style={styles.confirmModalButtonsInnerContainer}
                >
                <Text style={styles.buttonTextInnerModal}
                
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.inNotePreModalVisible}>
          <View style={styles.modal}>
            <View style={styles.noteModalInnerContainer}>
              <TouchableOpacity
                style={styles.modalCloseIconContainer}
                onPress={this.toggleNoteModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={40}
                  color={Colors.WHITE}
                />
              </TouchableOpacity>
              <View style={styles.noteInputTextContainer}>
                  <TextInput 
                  placeholder={'add note here'}
                  autoFocus={true}
                  style={styles.input}
                  multiline={true}
                  onChangeText={
                    (text)=>{
                      this.setState({
                        editedNote:text,
                      })
                    }
                  }
                  />
              </View>
              <View style={styles.noteModalButtonContainer}>
                <TouchableOpacity
                  style={styles.noteModalButtonsInnerContainer}
                  onPress={this.toggleNoteModal}
                  >
                  <Text style={styles.buttonTextInnerModal}>
                    cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.noteModalButtonsInnerContainer}
                  onPress={this.updateNote}
                  >
                  <Text style={styles.buttonTextInnerModal}>
                    update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <TouchableWithoutFeedback onPress={()=>{
            console.log('ongoing pressed');
            this._onGettingOnGoingComplaint()}}>
          <Text style={styles.headerText}>Ongoing</Text>
          </TouchableWithoutFeedback>
          
          <View style={styles.lottieContainerHeader}>
            <LottieView
              source={require('../../utils/lottieAnimations/proccesing.json')}
              autoPlay
              loop
            />
          </View>
        </View>
        { this.state.noComplaint ? (
          <View style={styles.noOnGoingComplaintContainer}>
             <Text style={styles.noOnGoingText}>no on going complaint</Text>
          </View>
         
        ):(
             <View>
               <Text style={styles.subHeaderText}> Officer in Charge </Text>
               {this.state.isOfficerAssigned ? (
                  <View style={styles.officerDetailContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri: base64Image}} style={styles.image} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.nameText}>{this.state.officerFirstName}</Text>
                    <Text style={styles.nameText}>{this.state.officerLastName}</Text>
                    <Text style={styles.officerCodeText}>{this.state.officerCode}</Text>
                  </View>
                </View>
               ):(
                <View style={styles.noOfficerContainer}>
                <Text style={styles.noOfficerText}>{'Still no Officer assigned '}</Text>
                </View>
               )}
            
             <Text style={styles.subHeaderText}> Attachments </Text>
             {this.state.videoLink == 'null' ? (
               <View style={styles.lottieContainer}>
                 <Text style={styles.lottieText}>No Video uploaded!</Text>
                 <TouchableOpacity style={styles.addButtonContainer}
                 onPress={this.toggleVideoModal}>
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Video</Text>
                 </TouchableOpacity>
               </View>
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
                 <TouchableOpacity
                   style={styles.addButtonContainer}
                   onPress={this.toggleVideoModal}>
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>video</Text>
                 </TouchableOpacity>
               </TouchableOpacity>
             )}
             {this.state.audioLink == 'null' ? (
               <View style={styles.lottieContainer}>
                 <Text style={styles.lottieText}>No Audio uploaded!</Text>
                 <TouchableOpacity style={styles.addButtonContainer}>
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Audio</Text>
                 </TouchableOpacity>
               </View>
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
                 <Text style={styles.lottieText}>Play Audio</Text>
                 <TouchableOpacity
                   style={styles.addButtonContainer}
                  >
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Audio</Text>
                 </TouchableOpacity>
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
               <View style={styles.lottieContainer}>
                 <Text style={styles.lottieText}>No Image uploaded!</Text>
                 <TouchableOpacity style={styles.addButtonContainer}
                 onPress={() => this.toggleImageModal()}>
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Image</Text>
                 </TouchableOpacity>
               </View>
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
                 <TouchableOpacity style={styles.addButtonContainer}
                  onPress={() => this.toggleImageModal()}
                 >
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Image</Text>
                 </TouchableOpacity>
               </TouchableOpacity>
             )}
             {!this.state.viewNote ? (
               <View style={styles.lottieContainer}>
                 <Text style={styles.lottieText}>No Note uploaded!</Text>
                 <TouchableOpacity style={styles.addButtonContainer}
                 onPress={this.toggleNoteModal}>
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Note</Text>
                 </TouchableOpacity>
               </View>
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
                 <TouchableOpacity style={styles.addButtonContainer}
                 onPress={this.toggleNoteModal}
                 >
                   <Ionicons name={'add'} size={30} color={Colors.WHITE} />
                   <Text style={styles.addText}>Update</Text>
                   <Text style={styles.addText}>Note</Text>
                 </TouchableOpacity>
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
             <this.customModal></this.customModal>
             <this.customModalAudio></this.customModalAudio>
             <this.customModalNote></this.customModalNote>
             <View style={styles.mapContainer}>
               <TouchableOpacity
                 style={styles.refreshContainer}
                 onPress={() => {
                   this._onGettingOnGoingComplaint();
                 }}>
                 <Ionicons
                   name={'md-refresh-sharp'}
                   size={50}
                   color={Colors.WHITE}
                 />
               </TouchableOpacity>
               {
                   this.state.isOfficerAssigned ? (
                     <MapView
                     showsUserLocation={true}
                     provider={PROVIDER_GOOGLE}
                     style={styles.map}
                     // liteMode={true}
                     //ref={this.setNativeMapRef}
                     region={{
                       latitude: this.state.complaintLat,
                       longitude: this.state.complaintLon,
                       latitudeDelta: 0.03,
                       longitudeDelta: 0.03,
                     }}
                     //onRegionChangeComplete={this.handleRegionChange}
                     // eslint-disable-next-line prettier/prettier
                   >
                    
                       <Marker
                         coordinate={{
                           latitude: this.state.complaintLat,
                           longitude: this.state.complaintLon,
                         }}
                         title={'complaint location'}
                       />
                     
                     
                       <Marker
                         coordinate={{
                           latitude: this.state.officerLat,
                           longitude: this.state.officerLon,
                         }}
                         title={'officer Location'}>
                         <View style={styles.policeIconContainer}>
                           <Image
                             source={require('../../utils/icons/policeCar.png')}
                             style={styles.policeIcon}
                           />
                         </View>
                       </Marker>
                     
                   </MapView>
                   ):(
                     <MapView
                     showsUserLocation={true}
                     provider={PROVIDER_GOOGLE}
                     style={styles.map}
                     // liteMode={true}
                     //ref={this.setNativeMapRef}
                     region={{
                       latitude: this.state.complaintLat,
                       longitude: this.state.complaintLon,
                       latitudeDelta: 0.03,
                       longitudeDelta: 0.03,
                     }}
                     //onRegionChangeComplete={this.handleRegionChange}
                     // eslint-disable-next-line prettier/prettier
                   >
                    
                       <Marker
                         coordinate={{
                           latitude: this.state.complaintLat,
                           longitude: this.state.complaintLon,
                         }}
                         title={'complaint location'}
                       />
                     
                   </MapView>
                   )
                 }
                 
              
             </View>
             <View style={styles.buttonContainer}>
            <Button
            width={ScreenSize.width * 0.9}
              type="secondary"
              backgroundDarker={Colors.BLACK}
              borderColor={Colors.RED_LIGHT}
              borderWidth={2}
              backgroundColor={Colors.BUTTON_DARK}
              backgroundShadow={Colors.RED_DARK}
              onPress={this.toggleCancelModal}>
              <Text style={styles.textInsideButtons}>Cancel Complaint</Text>
            </Button>
          </View>
             </View>
        )}
     
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

export default connect(mapStateToProps, {updateToken})(ongoingComplaints);
