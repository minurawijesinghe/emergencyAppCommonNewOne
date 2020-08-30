import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    Button,
    AsyncStorage,
    Alert,
} from 'react-native';
import styles from './finishComplaintStyles';
import CustomButton from 'react-native-really-awesome-button/src/themes/blue';
import { Colors } from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as Progress from 'react-native-progress';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import VideoPlayer from 'react-native-video-player';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import base64 from 'react-native-base64';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
import Axios from 'axios';
import baseURL from '../../utils/baseURL';


//const url =  reference.getDownloadURL();

const ScreenSize = Dimensions.get('window');
let videoUri = null;
let imageUri = null;
export default class finishComplaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPlayingAudio: false,
            isThereAudio: false,
            isRecording: false,
            audioTimeInSec: 0,
            progress: 0,
            uri: '',
            videoExist: false,
            imageExist: false,
            isImageModalVisible: false,
            isVideoModalVisible: false,
            imageUri: '',
            isConfirmModalVisible: false,
            complaintLat: 0,
            complaintLon: 0,
            userLat: 0,
            userLon: 0,
            token: '',
        };
    }
    audioRecorderPlayer = new AudioRecorderPlayer();
    toggleImageModal = () => {
        this.setState({ isImageModalVisible: !this.state.isImageModalVisible });
    };
    toggleVideoModal = () => {
        this.setState({ isVideoModalVisible: !this.state.isVideoModalVisible });
    };
    toggleConfirmModal = () => {
        this.setState({ isConfirmModalVisible: !this.state.isConfirmModalVisible });
    };
    onStartRecord = async () => {
        console.log('recordingstart');
        const result = await this.audioRecorderPlayer.startRecorder();
        this.audioRecorderPlayer.addRecordBackListener(e => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                isRecording: true,
            });
            console.log('isThereAudio', this.state.isThereAudio);
            console.log('isRecording', this.state.isRecording);

            return;
        });
        console.log();
        //console.log(result);
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            isRecording: false,
            isThereAudio: true,
        });
        //console.log('isRecording', this.state.isRecording);

        console.log('recording results', result);
    };
    onStartPlay = async () => {
        this.setState({
            isPlayingAudio: true,
        });
        console.log('isPLayingAudio', this.state.isPlayingAudio);
        const msg = await this.audioRecorderPlayer.startPlayer();
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener(e => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.setState({
                    isPlayingAudio: false,
                });
                console.log('isPLayingAudio', this.state.isPlayingAudio);
                this.audioRecorderPlayer.stopPlayer();
            }
            var hms = this.state.recordTime; // your input string
            var a = hms.split(':'); // split it at the colons

            var seconds = +a[0] * 60 * 1000 + +a[1] * 1000 + +a[2];
            var progress = this.state.currentPositionSec / seconds;

            this.setState({
                recordSecs: seconds,
                progress: progress,
            });

            console.log(progress);
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            //console.log('currentPositionSec', this.state.currentPositionSec);
            //console.log('currentDurationSec', this.state.currentDurationSec);
            //console.log("progress ", this.state.progress)

            return;
        });
    };

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
            isPlayingAudio: false,
        });
        this.audioRecorderPlayer.removePlayBackListener();
        console.log('isPLayingAudio', this.state.isPlayingAudio);
        this.audioToBase64();
    };
    onRemoveAudio() {
        this.setState({
            isThereAudio: false,
        });
        console.log('isThereAudio', this.state.isThereAudio);
    }
    onProgressBArShow() {
        return progress;
    }
    start = () => {
        ImagePicker.openCamera({
            mediaType: 'video',
        }).then(image => {
            console.log(image);
            this.setState({
                uri: image.path,
                videoExist: true,
                isVideoModalVisible: !this.state.isVideoModalVisible,
            });
            videoUri = this.customizeUrl(image.path);
        });
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
        });
    };
    openGalleryVideoPicker = () => {
        ImagePicker.openPicker({
            mediaType: 'video',
        }).then(video => {
            console.log(video);
            this.setState({
                isVideoModalVisible: !this.state.isVideoModalVisible,
                uri: video.path,
                videoExist: true,
            });
            videoUri = this.customizeUrl(video.path);
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
    /* downloadVideo() {
       RNFS.downloadFile({
         fromUrl:
           'https://firebasestorage.googleapis.com/v0/b/emergrncyapp.appspot.com/o/complaints%2FcomplaintId%2Fvideo2.mp4?alt=media&token=777230b5-38f3-4da3-ad1d-8101fd952d51',
         toFile: storagePath,
         background: true,
       })
         .promise.then(res => {
           console.log('File Downloaded', res);
         })
         .catch(err => {
           console.log('err downloadFile', err);
         });
     }*/
    componentDidMount() {
        // console.log('url ',url)
        // this.downloadVideo();
        this._retrieveData();
        const { latitude, longitude } = this.props.route.params;
        this.setState({
            complaintLat: latitude,
            complaintLon: longitude,
        });
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // Our data is fetched successfully
                console.log("saved Token", value);
                this.setState({
                    token: value,
                });
                return value;
            }
        } catch (error) {
            // Error retrieving data
            return error;
        }
    }
    uploadVideo = (complaintId) => {
        //console.log('video uri', videoUri);

        const reference = storage().ref(`/complaints/${complaintId}/video.mp4`);
        const url =reference.getDownloadURL();
        console.log('url video', url)
        reference
            .putFile(videoUri)
            .then(()=>{
                reference.getDownloadURL().then((url)=>{
                    console.log('video download url from after then', url);
                    Axios({
                        url: baseURL + '/complaint/video',
                        method: 'PUT',
                        headers: {
                            Authorization: `bearer ${this.state.token}`
                        },
                        data: {
                           video: url,
                           complaintId:complaintId
                        }
                    })
                    .then((complaint)=>{
                       console.log(complaint.data.complaint);
                    });
            
                })
            }, err => console.log('err', err))
            .catch((err)=> console.log(err));
            
                 /* Axios({
                url: baseURL + '/complaint/video',
                method: 'PUT',
                headers: {
                    Authorization: `bearer ${this.state.token}`
                },
                data: {
                   video: url,
                }
            })
            .then((complaint)=>{
               console.log(complaint.data.complaint);
            }) */
            
    }
    uploadAudio = (complaintId) => {
       // console.log('complaintId', complaintId);
        const reference1 = storage().ref(`/complaints/${complaintId}/audio.mp4`);
        const url =             reference1.getDownloadURL();

        console.log('url audio', url)

       reference1
            .putFile('file://sdcard/sound.mp4')
            .then(()=>{
                reference1.getDownloadURL().then((url)=>{
                    console.log('image download url from after then', url);
                    Axios({
                        url: baseURL + '/complaint/audio',
                        method: 'PUT',
                        headers: {
                            Authorization: `bearer ${this.state.token}`
                        },
                        data: {
                           audio: url,
                           complaintId:complaintId
                        }
                    })
                    .then((complaint)=>{
                       console.log(complaint.data.complaint);
                    });
            
                })
            }, err => console.log('err', err))
            .catch((err)=> console.log(err));
    }
    uploadImage = (complaintId) => {
       // console.log('image uri', imageUri);
        const reference2 = storage().ref(`/complaints/${complaintId}/image.jpg`);
        
       // console.log('url image', url);

        reference2
            .putFile(imageUri)
            .then(()=>{
                reference2.getDownloadURL().then((url)=>{
                    console.log('image download url from after then', url);
                    Axios({
                        url: baseURL + '/complaint/image',
                        method: 'PUT',
                        headers: {
                            Authorization: `bearer ${this.state.token}`
                        },
                        data: {
                           image: url,
                           complaintId:complaintId
                        }
                    })
                    .then((complaint)=>{
                       console.log('image uploaded and saved in db');
                    });
            
                })
            }, err => console.log('err', err))
            .catch((err)=> console.log(err));
           
    }
    sendComplaint() {
       // console.log(this.state.token);
        Axios({
            url: baseURL + '/complaint',
            method: 'POST',
            headers: {
                Authorization: `bearer ${this.state.token}`
            },
            data: {
                latitude: this.state.complaintLat,
                longitude: this.state.complaintLon,
            }
        }).then((complaint) => {
            console.log('complaint id', complaint.data.complaint._id);
            this.uploadAudio(complaint.data.complaint._id);
            this.uploadImage(complaint.data.complaint._id);
            this.uploadVideo(complaint.data.complaint._id);
            Alert.alert('successfully data uploading');
        }, err => console.log(err))
            .catch((err) => console.log(err));
    }
    customizeUrl(url) {
        var str = url.slice(0, 6) + url.slice(7);
        console.log(str)
        return str;
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: Colors.BLACK }}>
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
                <Modal isVisible={this.state.isConfirmModalVisible}>
                    <View style={styles.modalConfirm}>
                        <View style={styles.modalInnerContainerConfirm}>
                            <TouchableOpacity
                                style={styles.modalCloseIconContainer}
                                onPress={this.toggleConfirmModal}>
                                <MaterialCommunityIcons
                                    name="close"
                                    size={40}
                                    color={Colors.BLACK}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonsInnerContainer}
                                onPress={this.toggleConfirmModal}>
                                <Text style={styles.buttonTextInnerModal}>Wish to proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Send the complaint</Text>
                    <View style={styles.buttonContainer}>
                        <VideoRecorder
                            ref={ref => {
                                this.videoRecorder = ref;
                            }}
                        />
                        <Button
                            title={'button'}
                            onPress={async () => {
                                // path to existing file on filesystem
                                //  const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
                                // uploads file

                            }}></Button>
                        <View style={styles.voiceAddContainer}>
                            <Text style={styles.attachVoiceText}>Attach voice clip</Text>
                            {this.state.isThereAudio ? (
                                this.state.isPlayingAudio ? (
                                    <View style={styles.progressContainer}>
                                        <Progress.Bar
                                            progress={0.3}
                                            width={200}
                                            borderColor={Colors.RED_DARK}
                                            color={Colors.RED_LIGHT}
                                            progress={this.state.progress}
                                        />
                                    </View>
                                ) : (
                                        <Text style={styles.recordingText}>Audio added</Text>
                                    )
                            ) : this.state.isRecording ? (
                                <Text style={styles.recordingText}>Recording......</Text>
                            ) : (
                                        <View>
                                            <Text style={styles.recordingText}>No audio attached</Text>
                                            <Text style={styles.recordingText}>
                                                Press and hold record button to record
                  </Text>
                                        </View>
                                    )}
                            <View style={styles.voiceButtonContainer}>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => {
                                        this.onRemoveAudio();
                                    }}
                                    ont>
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={50}
                                        color={Colors.RED_LIGHT}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPressIn={() => {
                                        this.onStartRecord();
                                    }}
                                    onPressOut={() => {
                                        this.onStopRecord();
                                    }}>
                                    <MaterialCommunityIcons
                                        name="record-rec"
                                        size={110}
                                        color={Colors.RED_LIGHT}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => {
                                        this.onStartPlay();
                                    }}>
                                    <MaterialCommunityIcons
                                        name="play-circle-outline"
                                        size={50}
                                        color={Colors.RED_LIGHT}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonInnerContainer}>
                            <CustomButton
                                type="primary"
                                width={ScreenSize.width * 0.9}
                                backgroundDarker={Colors.BLACK}
                                borderColor={Colors.RED_LIGHT}
                                borderWidth={2}
                                backgroundColor={Colors.BUTTON_DARK}
                                backgroundShadow={Colors.RED_DARK}
                                onPress={this.toggleVideoModal}
                            //onPress={()=>this.props.navigation.navigate('AddComplaint')}
                            >
                                <Text style={styles.buttonText}>Attach video</Text>
                            </CustomButton>
                        </View>
                    </View>
                    {this.state.videoExist ? (
                        <View>
                            <View style={styles.videoPlayerContainer}>
                                <VideoPlayer
                                    video={{ uri: this.state.uri }}
                                    videoWidth={600}
                                    videoHeight={800}
                                />
                            </View>
                            <View style={styles.singleButtonContainer}>
                                <View style={styles.buttonInnerContainer}>
                                    <CustomButton
                                        type="primary"
                                        width={ScreenSize.width * 0.9}
                                        backgroundDarker={Colors.BLACK}
                                        borderColor={Colors.RED_LIGHT}
                                        borderWidth={2}
                                        backgroundColor={Colors.BUTTON_DARK}
                                        backgroundShadow={Colors.RED_DARK}
                                        onPress={() => {
                                            this.setState({
                                                uri: '',
                                                videoExist: false,
                                            });
                                        }}
                                    //onPress={()=>this.props.navigation.navigate('AddComplaint')}
                                    >
                                        <Text style={styles.buttonText}>Remove video</Text>
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    ) : (
                            <Text></Text>
                        )}

                    <View style={styles.buttonContainer2}>
                        <View style={styles.buttonInnerContainer}>
                            <CustomButton
                                type="primary"
                                width={ScreenSize.width * 0.9}
                                backgroundDarker={Colors.BLACK}
                                borderColor={Colors.RED_LIGHT}
                                borderWidth={2}
                                backgroundColor={Colors.BUTTON_DARK}
                                backgroundShadow={Colors.RED_DARK}
                                onPress={() => this.toggleImageModal()}>
                                <Text style={styles.buttonText}>Attach image</Text>
                            </CustomButton>
                        </View>
                    </View>

                    {this.state.imageExist ? (
                        <View>
                            <Image
                                style={styles.imageContainer}
                                source={{ uri: this.state.imageUri }}
                            />
                            <View style={styles.singleButtonContainer}>
                                <View style={styles.buttonInnerContainer}>
                                    <CustomButton
                                        type="primary"
                                        width={ScreenSize.width * 0.9}
                                        backgroundDarker={Colors.BLACK}
                                        borderColor={Colors.RED_LIGHT}
                                        borderWidth={2}
                                        backgroundColor={Colors.BUTTON_DARK}
                                        backgroundShadow={Colors.RED_DARK}
                                        onPress={() => {
                                            this.setState({
                                                imageUri: '',
                                                imageExist: false,
                                            });
                                        }}
                                    //onPress={()=>this.props.navigation.navigate('AddComplaint')}
                                    >
                                        <Text style={styles.buttonText}>Remove image</Text>
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    ) : (
                            <Text></Text>
                        )}

                    <View style={styles.singleButtonContainer}>
                        <View style={styles.buttonInnerContainer}>
                            <CustomButton
                                type="primary"
                                width={ScreenSize.width * 0.9}
                                backgroundDarker={Colors.BLACK}
                                borderColor={Colors.RED_LIGHT}
                                borderWidth={2}
                                backgroundColor={Colors.RED_DARK}
                                backgroundShadow={Colors.RED_DARK}
                                /* onPress={() => {
                                   this.setState({
                                     isConfirmModalVisible: true,
                                   });
                                 }}*/
                                onPress={() => this.sendComplaint()}
                            >
                                <Text style={styles.buttonTextSend}>Send complaint</Text>
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
