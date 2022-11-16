<template>
  <div class="about">
    <e-container
      pageTitle="Time Table"
      btnIcon="el-icon-edit"
      btnText="Edit"
      @btnClick="addNewEmployees"
    >
      <div style="display: flex;overflow:scroll;height:58vh;width:77vw;">
        <div style="display: flex" v-for="(time, i) in timeTable" :key="i">
          <div style="margin-top: 50px" v-if="time[0].type === 'week'">
            <div
              style="
                color: #000000;
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                text-align: right;
                padding-top: 36px;
                padding-bottom: 44px;
                margin-bottom: 10px;
              "
              v-for="(info, i) in time[0].info"
              :key="i"
            >
              {{ info }}
            </div>
          </div>
          <div v-else>
            <div style="margin: 15px 10px" v-for="(cls, j) in time" :key="j">
              <div
                style="
                  color: #000000;
                  opacity: 0.8;
                  font-size: 20px;
                  font-weight: 500;
                  text-align: center;
                "
                v-if="cls.time"
              >
                {{ cls.time }}
              </div>
              <div
                style="
                  width: 207px;
                  height: 101px;
                  background: rgb(188 108 66 / 10%);
                "
                v-if="cls.teacher && cls.subject && !cls.time"
              >
                <div
                  style="
                    color: #000000;
                    opacity: 0.8;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: center;
                    padding-top: 15px;
                  "
                >
                  {{ cls.teacher }}
                </div>
                <div
                  style="
                    color: #000000;
                    opacity: 0.6;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 15px;
                  "
                >
                  {{ cls.subject }}
                </div>
              </div>
              <div
                style="width: 207px; height: 101px; background: white"
                v-if="Object.keys(cls).length === 0"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </e-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    timeTable: [
      [
        {
          type: "week",
          info: ["Monday", "Tuesday", "Wednesday",'Thursday','Friday','Saturday'],
        },
      ],
      [
        { time: "8:30" },
        {},
        {},
        {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
        {},
        {},
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
        
      ],
      [
        { time: "9:00" },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
      ],
      [
        { time: "9:30" },
        {},
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
        
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
         
        }, {
          
        },
         
      ],
      [
        { time: "10:00" },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
      ],
      [
        { time: "10:30" },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
       
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
         
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
      ],
      [
        { time: "11:00" },
         {
         
        }, {
         
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        }, {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
         {
          teacher: "Social Studies",
          subject: "Mrs.Sandya Pandey",
        },
      ],
    ],
  }),
};
</script>
