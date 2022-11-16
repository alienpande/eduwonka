<template>
  <div class="online-class-section">
    <div style="height: calc(100vh - 80px)">
      <el-row v-if="pageView === 'online-video'">
        <el-col :span="20" style="overflow: hidden">
          <!-- <img
            style="margin: 20px; height: calc(100vh - 100px); width: 100%"
            src="@/assets/images/videoView.png"
            alt=""
          /> -->
          <video v-show="hideVideo"
              style="margin: 20px; height: calc(100vh - 150px); width: 100%"
              ref="video"
              autoplay muted playsinline
              >
          </video>
          <video v-show="!hideVideo"
              style="margin: 20px; height: calc(100vh - 150px); width: 100%"
              ref="screen"
              autoplay muted playsinline
              >
          </video>
        </el-col>
        <el-col
          :span="4"
          style="padding-left: 5px; overflow: auto; height: calc(100vh - 80px)"
        >
        <!-- <button v-if="peers.length > 0"
            style="
              background: #f14d4d;
              border-radius: 4px;
              padding: 6px;
              color: #f3f3f3;
              text-align: center;
              font-weight: 500;
              border: none;
              height: 25px;
              margin-top: 10px;
              font-size: 11px;
            "
            @click="getRemoveVideo(); getSudentsVideo = !getSudentsVideo"
          >
            {{ getSudentsVideo ? 'Get All Video' : 'Remove All Video' }}
          </button>
          <button v-if="peers.length > 0"
            style="
              background: #f14d4d;
              border-radius: 4px;
              padding: 6px;
              color: #f3f3f3;
              text-align: center;
              font-weight: 500;
              border: none;
              height: 25px;
              margin-top: 10px;
              margin-left: 5px;
              font-size: 11px;
            "
            @click="muteUnmuteAll(); muteAll = !muteAll"
          >
            {{ muteAll ? 'Unmute All' : 'Mute All' }}
          </button> -->
          <div
            v-for="(peer, i) in peers"
            :key="i"
            :class="{ 'is-active-participant': peer.peerAudioProducing }"
            class="class-participant"
          >
            <!-- <img
              style="width: 160px; height: 100px"
              src="@/assets/images/videoChek.png"
              alt=""
            /> -->
            <div v-loading="videoLoading && !peer.peerVideoAccess">
              <video
                  style="width: 160px; height: 100px"
                  :ref="peer.peerSessionId"
                  autoplay muted playsinline
                  >
              </video>
              <audio :ref="peer.peerUserId" autoplay ></audio>
            </div>
            <!-- <e-svg
              class="participant-audio-position"
              icon="microphoneClose"
            ></e-svg>
            <e-svg
              @click="mediaAccess('video', peer)"
              class="participant-riseHand-position"
              icon="videoIcon"
              style="padding: 0 2px; padding-top: 2px"
              :title="videoBtn"
            ></e-svg>-->
            <e-svg
              @click="mediaAccess('audio', peer)"
              class="participant-riseHand-position"              
              :icon="peer.peerAudioAccess ? 'microphone' : 'microphoneClose'"
              :title="peer.peerAudioAccess ? 'Mute' : 'Unmute'"
              style="padding: 0 5px; padding-top: 2px"
            ></e-svg> 
            <div class="class-participant-name">{{peer.peerName}}</div>
            <div style="position: relative">
              <e-svg
                :class="{ 'show-option-on': optionShow === i }"
                class="participant-option-position"
                icon="optionDot"
                @click="showOption(i)"
              ></e-svg>
              <div
                v-if="optionShow === i"
                style="
                  position: absolute;
                  top: 0;
                  background: #353535;
                  width: 142px;
                  border-radius: 8px;
                  z-index: 99999;
                  top: -75px;
                  right: 4px;
                "
              >
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                  @click="mediaAccess('audio', peer); showOption(i)"
                >
                  {{ peer.peerAudioAccess === true ? 'Mute' : 'Unmute' }}
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                  @click="mediaAccess('video', peer);showOption(i)"
                >
                  <!-- {{ videoBtn }} -->
                  {{ peer.peerVideoAccess === true ? 'Disable Video' : 'Enable Video' }}
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                  @click="mediaAccess('presentation', peer);showOption(i)"
                >
                  {{ peer.peerPresentationAccess === true ? 'Stop Presentation' : 'Presentation' }}
                  
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                  @click="mediaAccess('screen', peer);showOption(i)"
                >
                  {{ peer.peerScreenAccess === true ? 'Stop Screen Share' : 'Screen Share' }}
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    cursor: pointer;
                  "
                  @click="mediaAccess('screenPresentation', peer);showOption(i)"
                >
                  {{ peer.peerScreenPresentationAccess === true ? 'Stop Screen Presentation' : 'Screen Presentation' }}
                </div>
              </div>
            </div>  
          </div>

          <!-- <div class="class-participant is-active-participant">
            <img
              style="width: 160px;
height: 100px;"
              src="@/assets/images/videoChek.png"
              alt=""
            />
            <e-svg
              class="participant-audio-position"
              icon="microphoneClose"
            ></e-svg>
            <div class="class-participant-name">Tarun Kumar</div>
          </div> -->
        </el-col>
      </el-row>
      <el-row v-if="pageView === 'allstudent'">
        <el-col
          :span="3"
          class="d-flex"
          style="padding-left: 25px; width: 100vw; flex-wrap: wrap"
        >
          <div
            v-for="(part, i) in allParticipant"
            :key="i"
            :class="{ 'is-active-participant': part.status == 'active' }"
            class="class-participant all-class-participant"
          >
            <div
              v-if="part.id"
              style="
                width: 160px;
                height: 100px;
                padding-top: 4px;
                background: #1492e6;
                border-radius: 8px;
                display: inline-block;
              "
            >
              <div
                style="
                  width: 48px;
                  height: 43px;
                  background: rgb(243, 243, 243);
                  font-size: 24px;
                  text-align: center;
                  border-radius: 50%;
                  padding-top: 7px;
                  margin: auto;
                  margin-top: 12px;
                "
              >
                {{ part.id }}
              </div>
            </div>
            <img
              v-else
              style="width: 160px; height: 100px"
              src="@/assets/images/videoChek.png"
              alt=""
            />

            <e-svg
              v-if="part.audio == 'mute'"
              class="participant-audio-position"
              icon="microphoneClose"
            ></e-svg>
            <div style="position: relative">
              <e-svg
                :class="{ 'show-option-on': optionShow === i }"
                class="participant-option-position"
                icon="optionDot"
                @click="showOption(i)"
              ></e-svg>
              <div
                v-if="optionShow === i"
                style="
                  position: absolute;
                  top: 0;
                  background: #353535;
                  width: 142px;
                  border-radius: 8px;
                  z-index: 99999;
                  top: -75px;
                  right: 4px;
                "
              >
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                >
                  Chat
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    border-bottom: 1px solid #404040;
                    cursor: pointer;
                  "
                >
                  Mute
                </div>
                <div
                  style="
                    padding: 8px 0px 8px 16px;
                    color: #f3f3f3;
                    cursor: pointer;
                  "
                >
                  Share files
                </div>
              </div>
            </div>
            <e-svg
              v-if="part.riseHand == true"
              class="participant-riseHand-position"
              icon="riseHandOn"
            ></e-svg>
            <e-svg
              v-if="part.audio == 'play'"
              class="participant-audio-position"
              icon="microphone"
              style="padding: 0 5px; padding-top: 2px"
            ></e-svg>
            <div class="class-participant-name">Tarun Kumar</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer-option">
      <div
        class="d-flex"
        style="justify-content: space-between; padding-top: 11px"
      >
        <div class="d-flex" style="padding-left: 20px">
          <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            :icon="pauseVideo ? 'videoMute' : 'videoIcon'"
            :title="pauseVideo ? 'Unpause' : 'Pause'"
            @click="pauseUnpauseVideo"
          ></e-svg>
          <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            :icon="pauseAudio ? 'microphoneClose' : 'microphone'"
            :title="pauseAudio ? 'Unmute' : 'Mute'"
            @click="pauseUnpauseAudio"
          ></e-svg>
        </div>
        <div class="d-flex">
          <div style="position: relative">
            <!-- <e-svg
              @click="viewCard = !viewCard"
              class="icon-bg-custom"
              :class="{ 'option-active': viewCard }"
              style="padding: 22px 20px"
              icon="viewVideo"
            ></e-svg> -->
            <!-- <div class="view-video-card" v-if="viewCard">
              <div
                @click="(pageView = 'online-video'), (viewCard = false)"
                class="d-flex"
                style="padding: 22px; border-bottom: 1px solid #404040"
              >
                <e-svg icon="activeVideo"></e-svg>
                <div
                  style="
                    color: #1492e6;
                    font-size: 16px;
                    margin-top: -2px;
                    margin-left: 10px;
                  "
                >
                  Teacher & Active Students
                </div>
              </div>
              <div
                @click="(pageView = 'allstudent'), (viewCard = false)"
                class="d-flex"
                style="padding: 22px"
              >
                <e-svg icon="allStudent"></e-svg>
                <div
                  style="
                    color: #f3f3f3;
                    font-size: 16px;
                    margin-top: -2px;
                    margin-left: 10px;
                  "
                >
                  All Students
                </div>
              </div>
            </div> -->
          </div>
          <!-- <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            icon="chatVideo"
            @click="showChatBar = true"
          ></e-svg> -->
          <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            icon="recordVideo"
            @click="shareScreen"
            :title="screenShareTxt"
          ></e-svg>
          <e-svg
            class="icon-bg-custom"
            :class="{ 'option-active': viewCard }"
            style="padding: 22px 20px"
            icon="riseHandVideo"
            @click="viewCard = !viewCard"
            v-if="handRisePeers.length > 0"
          >
          </e-svg>
          <span v-if="handRisePeers.length > 0" class="hand-rise-count">{{ handRisePeers.length }}</span>
          <div  v-if="viewCard">
            <div
              class="d-flex"
              v-for="(peer, i) in handRisePeers"
              :key="i"
            >
              <span 
              class="view-video-card"
              style="padding: 22px; border-bottom: 1px solid #404040"
              >{{ peer }}</span>
            </div>
          </div>
          <!-- <e-svg
            :class="{ 'option-active': riseHand }"
            class="icon-bg-custom"
            style="padding: 17px 18px"
            icon="riseHandVideo"
            @click="riseHand = !riseHand"
          ></e-svg> -->
          <!-- <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            icon="sheareVideo"
            @click="showSheareBar=!showSheareBar"
          ></e-svg> -->
        </div>
        <div class="d-flex" style="padding-right: 20px">
          <!-- <e-svg
            class="icon-bg-custom"
            style="padding: 17px 18px"
            icon="settingVideo"
          ></e-svg> -->
          
          <button
            style="
              background: #f14d4d;
              border-radius: 4px;
              padding: 8px 32px;
              color: #f3f3f3;
              text-align: center;
              font-weight: 500;
              border: none;
              height: 40px;
              margin-top: 10px;
              margin-left: 10px;
            "
            @click="endClass"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
    <!--==========================PRESENT MODAL===================-->
    <es-dialog
      v-model="presentCard"
      width="35%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="presentCard = false"
      @confirm="presentCard = false"
    >
      <div
        class="f-600 text-center"
        style="color: #f3f3f3; font-size: 24px; margin-top: -55px"
      >
        Present
      </div>
      <br />
      <div
        style="display: flex; flex-wrap: wrap; justify-content: space-evenly"
      >
        <div
          style="width: 190px; margin-bottom: 20px"
          v-for="(present, i) in presents"
          :key="i"
        >
          <div
            @click="(selectPresent = i), presentFileOpen(i)"
            :class="{ 'active-present': i === selectPresent }"
            style="
              background: rgb(40, 40, 40);
              border-radius: 8px;
              padding: 27px 63px;
              display: inline-block;
            "
          >
            <e-svg :icon="present.icon"></e-svg>
          </div>
          <div style="text-align: center; color: white; margin-top: 10px">
            {{ present.text }}
          </div>
        </div>
      </div>
    </es-dialog>
    <!-- =============PRESENT FILE================== -->
    <es-dialog
      v-model="presentFile"
      width="35%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="presentFile = false"
      @confirm="presentFile = false"
    >
      <div
        class="f-600 text-center"
        style="color: #f3f3f3; font-size: 24px; margin-top: -55px"
      >
        Present File
      </div>
      <br />
      <div
        style="
          background: #353535;
          border: 1px dashed #575757;
          border-radius: 8px;

          padding: 67px 0;
        "
      >
        <e-svg style="display: table; margin: auto" icon="uploadIcon"> </e-svg>
        <div style="color: #cfcfcf; text-align: center; font-size: 16px">
          Drag & drop file here or Click to add
        </div>
      </div>
      <br /><br /><br />
      <es-button text="Present" :plain="true"></es-button>
    </es-dialog>
    <!-- =================== -->
    <chat-right-bar
      :show="showChatBar"
      :__onCancel="() => (showChatBar = !showChatBar)"
    />
    <sheare-right-bar   :show="showSheareBar"
      :__onCancel="() => (showSheareBar = !showSheareBar)" />
  </div>
</template>
<script>
import io from "socket.io-client";
const MediasoupClient = require("mediasoup-client");
import { getId } from '@/util/auth'
import moment from 'moment'
import { dispatchGraphql } from '@/api/dispatcher'
import chatRightBar from "../../student/learn/chatRightBar.vue";
import sheareRightBar from "../../student/learn/sheareRightBar.vue";

export default {
  components: { chatRightBar,sheareRightBar },
  data() {
    return {
      classroomApi: process.env.VUE_APP_CLASSROOM_API,
      socket:'',
      muteAll: true,
      getSudentsVideo: true,
      videoLoading: false,
      device:'',
      user: {},
      producer_id: '',
      publisher: '',
      peersCount: 0,
      peers: [],
      producer:'',
      sessionIds: [],
      consumeTransport: '',
      producerTransport: '',
      audioProducer: '',
      audioProducerData: '',
      videoProducerData: '',
      screenShareTxt: 'Screen Share',
      videoProducerCallback: '',
      audioProducerCallback: '',
      responseAvailable: true,
      showSideBar: false,
      showAudio: false,
      isPublish: true,
      isScreenShare: false,
      showChatBar: false,
      viewCard: false,
      presentFile: false,
      presentCard: false,
      showSheareBar:false,
      riseHand: false,
      hideVideo: true,
      pageView: "online-video",
      selectPresent: "",
      optionShow: "",
      participant: [],
      presents: [],
      allParticipants: [],
      pauseVideo: false,
      pauseAudio: false,
      handRisePeers: [],
      classroomData: {},
      query: `query($id: uuid!) {
        classrooms(where: {id: {_eq: $id}}) {
          id
          name
          topic_id
          class_date
          time_table {
            id
            start_time
            end_time
          }
        }
      }`,
      appointmentQuery: `query($id: uuid!) {
        appointments(where: {id: {_eq: $id}}) {
          id
          title
          start_time
          end_time
        }
      }`,
    };
  },
  created() {
    this.getUser()
    this.getClassroom()
  },
  methods: {
    fetchPeers() {
      setInterval(() => {
        this.getPeers()
        //this.conferenceCall()
      }, 5000);
    },
    getClassroom(){
      let type = 'appointment';
      let id = this.$route.params.appointmentId;
      let query = type === 'class' ? this.query : this.appointmentQuery;
      dispatchGraphql(query,{id:  id}).then((response) => {
        // console.log('Class Room Resp', response)
        if(type === 'class'){
          this.classroomData = response.classrooms[0]
          this.conferenceCall()
        }else{
          this.classroomData.name = response.appointments[0].title
          this.isPublish ? setTimeout(() => { this.publishClass() }, 2000)  : ''
        }        
      })
    },
    conferenceCall(){
      let classroom = this.classroomData
      var time = moment(),
        beforeTime = moment(classroom.time_table.start_time),
        afterTime = moment(classroom.time_table.end_time);
      if (time.isBetween(beforeTime, afterTime)) {
        this.isPublish ? setTimeout(() => { this.publishClass() }, 2000)  : ''
      }else {
        this.endClass()
        this.$router.push('/connect/dashboard/')
      } 
    },
    getUser() {
      const query = `
          query user($id: uuid!) {
            users_by_pk(id: $id) {
              id
              email
              first_name
              last_name
              role
            }
          }
        `
      dispatchGraphql(query, { id: getId() }).then(response => {
        this.user = response.users_by_pk
        console.log('user', response.users_by_pk)
      })
    },
    // Create JWT Token
    async getToken(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ userId: this.user.id, name:this.user.first_name, role:"Publisher" })
      };
      const uri = this.classroomApi + '/Classroom/createJWT'

      const response = await fetch(uri, requestOptions);
      const data = await response.json();
      return data.token;
    },
    // Publish Class
    async publishClass(){
      this.responseAvailable = false;
      const jwtToken = await this.getToken()
      console.log('JWT return Token', jwtToken)
      this.isPublish = false
      let headers = {
        'x-access-token': jwtToken
      };
      let className = this.classroomData.name
      className = className.replace(/[^A-Z0-9]+/ig, "_");

      let uri = this.classroomApi + '/Classroom/join?roomname='+ className
      fetch(uri, {
        "method": "GET",
        "headers": headers
      })
      .then(response => {
        if(response.ok){
          return response.json()
        } else{
          alert("Server returned " + response.status + " : " + response.statusText);
        }
      })
      .then(response => {
        // console.log('resp', response)
        response = response.connectionDetails
        let payload = response.payload
        let iv = response.iv
        let digest = response.digest
        this.responseAvailable = true;
  
        var connectionOptions =  {
          "force new connection" : true,
          "reconnection": true,
          "reconnectionDelay": 2000,                  //starts with 2 secs delay, then 4, 6, 8, until 60 where it stays forever until it reconnects
          "reconnectionDelayMax" : 60000,             //1 minute maximum delay between connections
          "reconnectionAttempts": "Infinity",         //to prevent dead clients, having the user to having to manually reconnect after a server restart.
          "timeout" : 10000,                           //before connect_error and connect_timeout are emitted.
          "transports" : ["websocket"],                //forces the transport to be only websocket. Server needs to be setup as well/
          "path": "/ClassRoomSocketServer",
          "query": "payload="+payload+"&iv="+iv+"&digest="+digest,
        }

        this.socket = io(this.classroomApi, connectionOptions);
        this.socket.on("connect", async () => {
          console.log('conenction id', this.socket.id); // x8WIv7-mJelg7on_ALbx
          await this.socket.emit('GET_ROUTER_RTP_CAPABILITIES', {}, async (rtpParams) => {
            this.rtpParams = JSON.parse(rtpParams)
            console.log('RTP PARAMS', this.rtpParams)
            try {
              const rtpCapabilities = JSON.parse(rtpParams);
              var caps = {routerRtpCapabilities: rtpCapabilities};
              this.device = new MediasoupClient.Device();

              // Load the mediasoup device with the router rtp capabilities gotten from the server
              await this.device.load(caps);
              console.log('Device RTP',this.device.rtpCapabilities)

              // Connection 
              await this.socket.emit('CREATE_PRODUCER_TRANSPORT', {
                forceTcp: false,
                rtpCapabilities: this.device.rtpCapabilities,
              }, async (response) =>{
                console.log('ICE Servers', JSON.parse(response))
                this.producerTransport = this.device.createSendTransport(JSON.parse(response));
                this.producerTransport.on('connect', async ({ dtlsParameters }, callback) => {
                  this.socket.emit('CONNECT_PRODUCER_TRANSPORT', { dtlsParameters }, (res) => { console.log('Connect Producer Transport', res)})
                    callback()
                });
                
                this.producerTransport.on('produce', async (data, callback, errback) => {
                  try {
                    if(data.kind === 'video' && (data.appData && data.appData.mediaTag === 'screen-video')){
                      console.log('screen kind',data)
                      const { id } = await this.socket.emit('SCREEN_PRODUCE', JSON.stringify({
                        kind: data.kind,
                        rtpParameters: data.rtpParameters,
                      }), async (videoRes)   => { 
                        console.log('Screen Produce', videoRes)
                      }); 
                      console.log('Screen Share ID', id)
                      callback(id);            
                    }else if(data.kind === 'video'){   
                      const { id } = await this.socket.emit('VIDEO_PRODUCE', {
                        transportId: this.producerTransport.id,
                        kind: data.kind,
                        rtpParameters: data.rtpParameters,
                      }, async (videoRes) => { 
                        console.log('Video Resp', videoRes)
                      });    
                      callback(id);            
                      console.log('Video Producer ID', id)                    
                    }else if(data.kind === 'audio'){
                      console.log('kind', data);
                      const { id } = await this.socket.emit('AUDIO_PRODUCE', {
                        transportId: this.producerTransport.id,
                        kind: data.kind,
                        rtpParameters: data.rtpParameters,
                      }, (audioResp) => { 
                        console.log('AUDIO Producer Data', audioResp)
                      });
                      console.log('Audio Producer ID', id)
                      callback(id);
                    }                   
                  } catch (err) {
                    errback(err);
                  }
                });
                this.producerTransport.on('connectionstatechange', (state) => {
                  switch (state) {
                    case 'connecting':
                      console.log('Connecting....')
                    break;

                    case 'connected':
                      console.log('Connected....', stream)
                      this.$refs.video.srcObject = stream; 
                      this.consumerTransport()  
                      this.fetchPeers()               
                    break;

                    case 'failed':
                      this.producerTransport.close();
                      console.log('Failed')
                    break;

                    default: break;
                  }
                });

                let stream
                try {
                  // if (!this.device.canProduce('video')) {
                  //   console.error('cannot produce video');
                  //   return;
                  // }
                  stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                  const track = stream.getVideoTracks()[0];
                  const audioTrack = stream.getAudioTracks()[0];
                  const params = { track };
                  // if ($chkSimulcast.checked) {
                    params.encodings = [
                      { rid: "r0", active: true, maxBitrate: 100000 },
                      { rid: "r1", active: true, maxBitrate: 300000 },
                      { rid: "r2", active: true, maxBitrate: 900000 }
                    ];
                    params.codecOptions = {
                      videoGoogleStartBitrate : 1000
                    };
                  // }
                  console.log('Params', params)
                  this.producer = await this.producerTransport.produce(params);

                  const audio_params = { track: audioTrack  };
                  audioTrack.codecOptions = {
                    opusStereo : 1,
                    opusDtx    : 1
                  }
                  this.audioProducer = await this.producerTransport.produce(audio_params);                 
                } catch (err) {
                  console.log('Stream Failed')
                }
              });
              
            } catch (error) {
              console.error('failed to init device [error:%o]', error);
              this.socket.disconnect();
            }
          })          
        });

        //Check Socket Connection Errors
        this.socket.on("connect_error", (err) => {
          console.log(`connect_error due to ${err.message}`);
        });

        //Socket Disconnect
        this.socket.on("disconnect", () => {
          console.log('disconnect', this.socket.id); // undefined
        });
      })
      .catch(err => {
        console.log('error', err);
      });
    },

    //Create Consumer Transport
    async consumerTransport(){
      await this.socket.emit('CREATE_CONSUMER_TRANSPORT', {
        forceTcp: false,
      }, async (response) =>{
        console.log('Create Consumer Transport', JSON.parse(response))
        this.consumeTransport = this.device.createRecvTransport(JSON.parse(response));
        console.log('Consumer Transport', this.consumeTransport)
        this.consumeTransport.on('connect', async ({ dtlsParameters }, callback) => {
          console.log('Consumer dtlsparams', dtlsParameters)
          this.socket.emit('CONNECT_CONSUMER_TRANSPORT', { dtlsParameters, transportId: this.consumeTransport.id }, (consumeData) => { console.log(consumeData) })
            callback()
        });
        this.consumeTransport.on('connectionstatechange', async (state) => {
          switch (state) {
            case 'connecting':
              console.log('subscribing....')
            break;

            case 'connected':
              setTimeout(() => {
                console.log('subscribed....')
                // this.$refs.remoteVideo.srcObject = this.track
                // this.$refs.remoteVideo.muted = true
                this.socket.emit('RESUME_CONSUMERS_FOR_PEER', JSON.stringify({consumersToBeResumed: this.sessionIds}), async (response) =>{
                  console.log('Resume ===>', response)
                })
              }, 2000) 
            break;

            case 'failed':
              this.consumeTransport.close();
              console.log('Failed')
            break;

            default: break;
          }
        });
      })
    },
    
    // Consume Peer Video
    async consumeVideo(transport, peer){
      let session_id = peer.peerSessionId
      console.log('session id', session_id)
      await this.socket.emit('VIDEO_CONSUME', {peerToBeConsumedSessionId: session_id, rtpCapabilities : this.device.rtpCapabilities}, async (consumeRes) => {  
        const {
          producerId,
          id,
          kind,
          rtpParameters,
        } = consumeRes;
        console.log('response', consumeRes)
        // let codecOptions = {};
        let codecs = this.device.rtpCapabilities.codecs
        for(const codec of codecs){
          codec.payloadType = codec.preferredPayloadType
        }
        console.log('Codecs', codecs)
        const consumer = await transport.consume({
          id,
          producerId,
          kind, 
          rtpParameters,
          codecs,
        });
        
        const { track } = consumer
        this.stream = new MediaStream([track])
        console.log('refs', this.$refs[peer.peerSessionId][0])
        this.$refs[peer.peerSessionId][0].srcObject = this.stream
        console.log('Get Consumer Video Stream', consumer)
        this.sessionIds.push(session_id)
        // await this.consumeAudio(transport, peer)
        this.socket.emit('RESUME_CONSUMERS_FOR_PEER', JSON.stringify({consumersToBeResumed: [session_id]}), async (response) =>{
          console.log('Resume ===>', response)
        })
        return consumer; 
      });
    },

    //Consume Screen Share of Peer
    async consumeScreen(session_id){
      this.isScreenShare = true
      await this.socket.emit('SCREEN_CONSUME', JSON.stringify({peerToBeConsumedSessionId: session_id, rtpCapabilities : this.device.rtpCapabilities}), async (consumeRes) => { 
        let response =  JSON.parse(consumeRes)
        const {
          producerId,
          id,
          kind,
          rtpParameters,
        } = response.screenConsumerObj;
        console.log('Consume Screen', JSON.parse(consumeRes))
        // let codecOptions = {};
        let codecs = this.device.rtpCapabilities.codecs
        for(const codec of codecs){
          codec.payloadType = codec.preferredPayloadType
        }
        const consumer = await this.consumeTransport.consume({
          id,
          producerId,
          kind, 
          rtpParameters,
          codecs,
        });
        // const stream = new MediaStream();
        // stream.addTrack(consumer.track);
        const { track } = consumer
        const stream = new MediaStream([track])
        console.log('Get Screen', stream)
        this.$refs.screen.srcObject = stream
        this.socket.emit('RESUME_CONSUMERS_FOR_PEER', JSON.stringify({consumersToBeResumed: [session_id] }), async (response) =>{
          console.log('Resume ===>', response)
        })
      })
    },

    // Consume Peer Audio
    async consumeAudio(transport, peer){
      let session_id = peer.peerSessionId
      await this.socket.emit('AUDIO_CONSUME', JSON.stringify({peerToBeConsumedSessionId: session_id, rtpCapabilities : this.device.rtpCapabilities}), async (consumeRes) => { 
        consumeRes = JSON.parse(consumeRes)
        consumeRes = consumeRes.audioConsumerObj 
        const {
          producerId,
          id,
          kind,
          rtpParameters,
        } = consumeRes;
        
        // let codecOptions = {};
        let codecs = this.device.rtpCapabilities.codecs
        for(const codec of codecs){
          codec.payloadType = codec.preferredPayloadType
        }
        console.log('Codecs', codecs)
        const consumer = await transport.consume({
          id,
          producerId,
          kind, 
          rtpParameters,
          codecs,
        });

        const { track } = consumer
        const stream = new MediaStream([track])
        console.log('Get Consumer Audio Stream', stream)
        this.$refs[peer.peerUserId][0].srcObject = stream
        this.resumeAudio(session_id)
      });
    },
    async resumeAudio(session_id){
      this.socket.emit('AUDIO_RESUME', JSON.stringify({peerSessionId: session_id}), async (response) =>{
        console.log('Resume ===>', response)
      })
    },
    // Get Joined Peers
    async getPeers(){
      this.handRisePeers = []
      this.socket.emit("GET_JOINED_PEERS", {}, (peers) => {
        peers = JSON.parse(peers)
        peers = peers.peersArray  
        this.peers = peers   
        console.log('peers', peers)
        for(const peer of peers){  
          //Conume Video and Audio from the Teacher
          if(peer.peerType === 'Publisher'){
            this.session_id = peer.peerSessionId
            this.publisher = peer
            if(peer.peerScreenProducing && this.screenShare){
              this.screenShare = false
              this.consumeScreen(peer.peerSessionId)
            }
          }

          if(!this.sessionIds.includes(peer.peerSessionId)){
            // this.sessionIds.push(peer.peerSessionId)
            peer.peerVideoAccess = true
            this.consumeVideo(this.consumeTransport, peer)
            this.consumeAudio(this.consumeTransport, peer)
            console.log('Connected Peers', peers)
          } 
        }
      });
    },
    // Screen Share 
    async shareScreen(){
        if(this.isScreenShare){
            this.isScreenShare = false
            this.hideVideo = true
            this.$refs.screen.srcObject = null
            this.screenShareTxt = 'Screen Share'
            this.socket.emit('SCREEN_STOP', JSON.stringify({peerSessionId: ''}), async (response) =>{
              console.log('GET PEER RESP ===>', response)
            })
        }else{
            this.isScreenShare = true
            this.hideVideo = false
            // get a screen share track
            let localScreen = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            this.$refs.screen.srcObject = localScreen

            // create a producer for video
            await this.producerTransport.produce({
                track: localScreen.getVideoTracks()[0],
                // encodings: screenshareEncodings(),
                codec : this.device.rtpCapabilities.codecs.find((codec) => codec.mimeType.toLowerCase() === 'video/vp8'),
                appData: { mediaTag: 'screen-video' }
            });

            this.screenShareTxt = 'Stop Screen Share'
        }
        
        //create a producer for audio, if we have it
        // if (localScreen.getAudioTracks().length) {
        //   let audioProducer = await this.producerTransport.produce({
        //     track: localScreen.getAudioTracks()[0],
        //     appData: { mediaTag: 'screen-video' }
        //   });
        //   console.log('audio share', audioProducer)
        // }      
    },

    muteUnmuteAll(){
      const peers = this.peers
      console.log('peer', this.peers)
      for(const peer of peers){
        this.mediaAccess('audio', peer)  
      }
    },

    getRemoveVideo(){
      const peers = this.peers
      console.log('peer', this.peers)
      for(const peer of peers){
        this.mediaAccess('video', peer)  
      }
    },

    // Video/Audio/Screen Access to Selected Peer
    mediaAccess(type, peer){
      if(type === 'video'){
        this.videoLoading = true
        this.socket.emit('UPDATE_ACCESS', JSON.stringify({peerSessionId: peer.peerSessionId, type: 'video'}), async (response) =>{
          console.log('Video Access ===>', response)
        })
        if(peer.peerVideoAccess){
          this.$refs[peer.peerSessionId][0].srcObject = null
          this.videoLoading = false
        }else{
          setTimeout(() => {
            this.consumeVideo(this.consumeTransport, peer)
            this.videoLoading = false
          }, 6000)
        }               
      }
      if(type === 'audio'){
        this.socket.emit('UPDATE_ACCESS', JSON.stringify({peerSessionId: peer.peerSessionId, type: 'audio'}), async (response) =>{
          console.log('Audio Access ===>', response)
        })

        if(peer.peerAudioAccess){
          this.$refs[peer.peerUserId][0].srcObject = null
        }else{
          setTimeout(() => {
            this.consumeAudio(this.consumeTransport, peer)
          }, 6000)
        }  
      }

      if(type === 'screen'){
        this.socket.emit('UPDATE_ACCESS', JSON.stringify({peerSessionId: peer.peerSessionId, type: 'screen'}), async (response) =>{
          console.log('Screen Access ===>', response)
        })

        if(peer.peerScreenAccess){
          this.$refs.screen.srcObject = null
          this.hideVideo = true
        }else{
          this.hideVideo = false
          setTimeout(() => {
            this.consumeScreen(peer.peerSessionId)
          }, 15000)
        }  
      }

      if(type === 'presentation'){
        this.socket.emit('UPDATE_ACCESS', JSON.stringify({peerSessionId: peer.peerSessionId, type: 'presentation'}), async (response) =>{
          console.log('Presentation Access ===>', response)
        })

        if(peer.peerPresentationAccess){
          // this.hideVideo = true
          this.$refs[peer.peerSessionId][0].srcObject = null
          this.$refs[peer.peerUserId][0].srcObject = null
        }else{
          // this.hideVideo = false
          setTimeout(() => {
            this.consumeVideo(this.consumeTransport, peer)
            this.consumeAudio(this.consumeTransport, peer)
          }, 6000)
        }  
      }      

      if(type === 'screenPresentation'){
        this.socket.emit('UPDATE_ACCESS', JSON.stringify({peerSessionId: peer.peerSessionId, type: 'screenPresentation'}), async (response) =>{
          console.log('Presentation Access ===>', response)
        })

        if(peer.peerPresentationAccess){
          this.hideVideo = true
          this.$refs[peer.peerSessionId][0].srcObject = null
          this.$refs[peer.peerUserId][0].srcObject = null
        }else{
          setTimeout(() => {
            this.consumeScreen(this.consumeTransport, peer)
          }, 6000)
          this.hideVideo = false
        }  
      }
    },

    removePeer(peer){
      console.log('Session id to remove peer', peer)
      this.socket.emit('REMOVE_CONSUMERS_FOR_PEER', JSON.stringify({peerSessionId: peer.peerSessionId}), async (response) =>{
        console.log('Remove Consumer ===>', response)
      })
    },
    // End Class
    endClass(){
        if(this.isScreenShare){
            this.$refs.screen.srcObject = null
        }
        if(!this.isPublish){
            this.$refs.video.srcObject = null
        }
        this.peers = []
        this.consumeTransport.close()
        this.producerTransport.close()
        this.socket.disconnect()
        this.$router.push('/learn/classroom')
    },
    pauseUnpauseVideo(){
      this.socket.emit('GET_PEER', JSON.stringify({peerSessionId: ''}), async (response) =>{
        let resp = JSON.parse(response)
        if(this.pauseVideo){
          this.pauseVideo = false
          this.socket.emit('VIDEO_RESUME', JSON.stringify({peerSessionId: resp.peer.peerSessionId}), () =>{})
        }else{
          this.pauseVideo = true
          this.socket.emit('VIDEO_PAUSE', JSON.stringify({peerSessionId: resp.peer.peerSessionId}), async (pauseResp) =>{
            console.log('Pause Resp', pauseResp)
          })
        }
      })
    },
    pauseUnpauseAudio(){
      this.socket.emit('GET_PEER', JSON.stringify({peerSessionId: ''}), async (response) =>{
        let resp = JSON.parse(response)
        console.log('audio icon check', this.pauseAudio)
        if(this.pauseAudio){
          this.pauseAudio = false
          this.socket.emit('AUDIO_RESUME', JSON.stringify({peerSessionId: resp.peer.peerSessionId}), () =>{})
        }else{
          this.pauseAudio = true
          this.socket.emit('AUDIO_PAUSE', JSON.stringify({peerSessionId: resp.peer.peerSessionId}), async (pauseResp) =>{
            console.log('Pause Resp', pauseResp)
          })
        }
      })
    },
    showOption(i) {
      if (this.optionShow === "") {
        this.optionShow = i;
      } else if (this.optionShow !== i) {
        this.optionShow = i;
      } else {
        this.optionShow = "";
      }
    },
    presentFileOpen(i) {
      if (i == 1) {
        this.presentFile = true;
        this.presentCard = false;
      }
    },
  },
};
</script>
<style>
.online-class-section {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #353535;
  z-index: 9999;
}
.footer-option {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1e1e1e;
  height: 80px;
}
.class-participant {
  width: 160px;
  height: 100px;
  border-radius: 8px;
  position: relative;
  margin: 15px;
  border: 2px solid #dddddd;
}
.class-participant-name {
  background: rgba(22, 22, 22, 0.7);
  border-radius: 4px;
  padding: 2px 8px 2px 6px;
  color: #f3f3f3;
  font-size: 12px;
  display: inline-block;
  position: absolute;
  left: 34px;
  bottom: 10px;
}
.participant-audio-position {
  background: rgb(22 22 22 / 70%);
  display: inline-block;
  border-radius: 50%;
  padding: 0px 5px;
  padding-top: 3px;
  position: absolute;
  right: 6px;
  top: 5px;
}
.participant-option-position {
  background: rgb(22 22 22 / 70%);
  display: inline-block;
  border-radius: 50%;
  padding: 0px 9px;
  padding-top: 0px;
  position: absolute;
  right: 6px;
  display: none;
  top: -99px;
  z-index: 9999;
}
.participant-riseHand-position {
  background: rgb(22 22 22 / 70%);
  display: inline-block;
  border-radius: 50%;
  padding: 0px 5px;
  padding-top: 1px;
  position: absolute;
  left: 6px;
  top: 5px;
}
.participant-audio-position img {
  height: 12px;
}
.is-active-participant {
  border: 2px solid #1fc24e;
}
.view-video-card {
  width: 320px;
  background: #353535;
  border-radius: 4px;
  position: absolute;
  bottom: 73px;
  color: #ffffff;
}
.option-active {
  background: rgb(20 146 230 / 20%) !important;
}
.active-present {
  border: 2px solid #fe9d2b;
}
.all-class-participant:hover .participant-audio-position {
  display: none;
}
.class-participant:hover .participant-option-position,
.show-option-on {
  display: block !important;
}
.hand-rise-count{
  color:#ffffff;
  font-weight:600;
  font-size:20px;
}
</style>
